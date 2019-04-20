import React, {useReducer, ComponentType, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {Grid} from "./Models";
import BoardRow from "./BoardRow";
import {createBoard, findColumnByIdentifier, openSafeSurroundings, insertToGrid, preventDefault} from "./utils";

type Action = {type: 'CLICK' |'RIGHT_CLICK', payload: number} | {type: 'RESTART', payload: Grid};

function reducer(state: Grid, action: Action): Grid {
    switch(action.type) {
        case 'CLICK': {
            const [y, x] = findColumnByIdentifier(state, action.payload);
            console.log(y, x)
            const {flagged, isMine} = state[y][x];
            if(flagged) return state;
            if(isMine) return insertToGrid(state, y, x, {isOpen: true});
            else return openSafeSurroundings(state, y, x);
        }
        case 'RIGHT_CLICK': {
            const [y, x] = findColumnByIdentifier(state, action.payload);
            const {isOpen, flagged} = state[y][x];
            if(isOpen) return state;
            return insertToGrid(state, y, x, {flagged: !flagged});
        }
        case 'RESTART': {
            return action.payload;
        }
    }
}
const density = .18;
const size = 15;
const cells = size**2;
const safeTiles = (cells) - (Math.floor(cells * density));
const Board: ComponentType<{className: string}> = ({className}) => {
    const initialState = useMemo(() => createBoard(size, density), []);
    const [state, dispatch] = useReducer(reducer, initialState);
    const onClick = useCallback((e) => {
        dispatch({type: 'CLICK', payload: parseInt(e.target.name)})
    }, []);
    const onRightClick = useCallback((e) => {
        e.preventDefault();
        dispatch({type: 'RIGHT_CLICK', payload: parseInt(e.target.name)})
    }, []);
    const restart= useCallback(() => {
        dispatch({type: 'RESTART', payload: createBoard(size, density)})
    }, []);
    const {length} = state;
    const failed = state.some((row) => row.some((col) => !!(col.isOpen && col.isMine)));
    const closedTiles = state.reduce((acc, row) => row.reduce((acc, col) => col.isOpen ? acc - 1: acc, acc), safeTiles );

    return (
        <div onContextMenu={preventDefault} className={className}>
            <div className="header">
                <button onClick={restart}>Restart</button>
                <p>{`${closedTiles}/${safeTiles}`}</p>
            </div>
            <div className="grid">
                {failed && <div className="failed"/>}
                {!closedTiles && <div className="success">All Clear</div>}
                {state.map((row, index) => (
                    <BoardRow
                        key={`row-${index}`}
                        identifier={length * index}
                        row={row}
                        onClick={onClick}
                        onRightClick={onRightClick}
                    />
                ))}
            </div>
        </div>
    );
}
export default styled(Board)`
padding: 7px;
position: relative;
display: inline-block;
background: ${props => props.theme.background};
> p {
  display: inline-block;
}
.header {
display: flex;
align-items: center;
justify-content: space-around;
}
.success {
  position: absolute;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.failed {
  z-index: 1;
  position: absolute;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  background: white;
  opacity: 0.3;
  justify-content: center;
  align-items: center;
  display: flex;
  :before, :after {
    display: block;
    height: 100%;
    width: 15px;
    position: relative;
    background: black;
    content: '';
  }
  :before {
    transform:rotate(45deg);
  }
  :after {
    transform:rotate(-45deg);
  }
}
.grid {
    border: 3px solid;
    position: relative;
    border-color: ${({theme}) => theme.borderColor1};}
`;
