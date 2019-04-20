import React, {memo} from "react";
import styled from 'styled-components';
import {MouseHandlers, Row} from "./Models";
import BoardCol from "./BoardCol";

type BoardRowProps = MouseHandlers & {row: Row, identifier: number };
const BoardRow = memo<BoardRowProps>(styled(({row, onClick, onRightClick, className, identifier}) => {
    return (
        <div className={className}>
            {row.map((col, index) => <BoardCol key={`Col-${index}`} onClick={onClick} onRightClick={onRightClick} identifier={identifier + index} {...col}/>)}
        </div>
    )
})`
white-space: nowrap;
margin-bottom: 2px;
`)

export default BoardRow;
