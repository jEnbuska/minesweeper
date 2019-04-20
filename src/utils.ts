import {Col, Coordinate, Grid, Row} from "./Models";

const {floor, random, min, max} = Math;

export function range(from: number, to: number){
    const addition = from<to ? 1 : -1;
    const acc: number[] = [];
    while(true) {
        if(from===to) return acc;
        acc.push(from);
        from += addition;
    }
}

function countSurroundingMines(state: Grid, y: number, x: number) {
    return getSurroundingTiles(state, y, x)
        .reduce((acc, [y, x]) =>   state[y][x].isMine ? acc + 1 : acc, 0)
}

export function createBoard(size: number, density: number): Grid {
    if (density>=1 ||density < 0) throw new Error('density cannot be between 0 & 1');
    const row = range(0, size).map(() => false);
    const state: Grid = row.map(() => row.map(() => ({})));
    const cells = size**2;
    const positions = range(0, size**2);
    const mines = Math.floor(cells * density);
    for (let i = 0; i < mines; i++) {
        const [index] = positions.splice(floor(random() * positions.length), 1);
        state[floor(index / size)][floor(index % size)] = {isMine: true};
    }
    state.forEach((row, y) => row.forEach(
        (col, x) => col.danger = countSurroundingMines(state, y, x))
    );
    return state;
}

export function getSurroundingTiles(state: Grid, y: number, x: number) {
    const rows = range(max(0, y-1), min(y + 2, state.length));
    const cols = range(max(0, x-1), min(x + 2, state[0].length));
    return rows.reduce((acc: any[], y): Coordinate[] => {
        return [...acc, ...cols.map((x) => [y, x])]
    }, []).filter((e) => e[0] !== y || e[1] !== x);
}

export function openSafeSurroundings(state: Grid, y: number, x: number): Grid {
    state = insertToGrid(state, y, x, {isOpen: true});
    if(state[y][x].danger) return state;
    return getSurroundingTiles(state, y, x)
        .filter(([y, x]) => {
            const {isOpen, isMine} = state[y][x];
            return !(isMine || isOpen);
        })
        .reduce((acc, [y, x]) => openSafeSurroundings(acc, y, x), state);
}

export function findColumnByIdentifier(state: Grid, payload: number) {
    const rowLength = state[0].length;
    const y = floor(payload / rowLength);
    const x = payload - y * rowLength;
    return [y, x]
}

export function insertToRow(gridRow: Row, col, value: Partial<Col>): Row {
    gridRow = [...gridRow];
    gridRow[col] = {...gridRow[col], ...value};
    return gridRow;
}

export function insertToGrid(grid, row, col, value: Partial<Col>): Grid {
    grid = [...grid];
    grid[row] = insertToRow(grid[row], col, value);
    return grid;
}

export function preventDefault(e){
    e.preventDefault();
}
