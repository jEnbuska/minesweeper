import {MouseEventHandler} from "react";

export type Col = {isMine?: boolean, isOpen?: boolean, flagged?: boolean, danger?: number}
export type Row = Col[];
export type Grid = Row[];

export type MouseHandlers = {
    onClick: MouseEventHandler;
    onRightClick: MouseEventHandler
}

export type Coordinate = [number, number];
