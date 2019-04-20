import React, {memo} from "react";
import styled from 'styled-components';
import {Col, MouseHandlers} from "./Models";


type BoardColProps = MouseHandlers & Col & {identifier: number  }
const BoardCol = memo<BoardColProps>(styled(({onClick, className, isOpen, identifier, isMine, onRightClick, danger = 0}) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={isOpen}
            name={identifier}
            onContextMenu={onRightClick}
        >
            {isOpen && !isMine ? danger : '!'}
        </button>
    );
})`
font-weight: bold;
width: 20px;
font-size: 14px;
line-height: 16px;
border-width: 1px;
border-color: ${props => props.theme.borderColor2};
color: transparent;
user-select: none;
margin-right: 2px;
display: inline-flex;
justify-content: center;
align-items: center;
background: ${props => props.theme.background};
box-sizing: border-box;
outline: none;
cursor: pointer;
${props => props.flagged && `
color: ${props.theme.cellColors.flagged};
cursor: default;
`}

:disabled {
  cursor: default;
  color: ${({danger, flagged, theme}) => theme.cellColors[flagged ? 'flagged' : danger]};
  border-color: ${props => !props.flagged && props.theme.borderColor1};
}
${props => props.flagged && 'color: black'};
${props => props.isOpen && props.isMine && 'background: red !important;'}
`);
export default BoardCol;
