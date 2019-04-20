import *  as utils from './utils';
import {Grid} from "./Models";

function visualizeResults(grid: Grid) {
    return clean(Object.entries(grid).reduce((g: any, [rIndex, row]: any) => {
        const rowData = Object.keys(row).reduce((r: any, cIndex: any) => {
            if(grid[rIndex][cIndex].isOpen) {
                return [...r, 1]
            }
            return [...r, 0]
        }, []).join(',');
        return [...g, rowData]
    }, []).join('\n'));
}

function clean(str) {
    return `
${str.replace(/ /g, '').trim()}`
}
describe(utils.getSurroundingTiles.name, () => {
    const grid = [
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
    ]
    it('top left', () => {
        const tuples = utils.getSurroundingTiles(grid, 0, 0);
        expect(tuples).toEqual([[0, 1], [1,0], [1,1]])
    })
    it('left', () => {
        const tuples = utils.getSurroundingTiles(grid, 1, 0);
        expect(tuples).toEqual([[0, 0], [0, 1], [1,1], [2, 0], [2, 1]])
    })
    it('top right', () => {
        const tuples = utils.getSurroundingTiles(grid, 0, 3);
        expect(tuples).toEqual([[0, 2], [1, 2], [1,3]])
    })
    it('right', () => {
        const tuples = utils.getSurroundingTiles(grid, 1, 3);
        expect(tuples).toEqual([[0,2], [0, 3], [1, 2], [2, 2], [2, 3]])
    })
    it('top', () => {
        const tuples = utils.getSurroundingTiles(grid, 0, 1);
        expect(tuples).toEqual([[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]])
    })
    it('center', () => {
        const tuples = utils.getSurroundingTiles(grid, 1, 1);
        expect(tuples).toEqual([[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]])
    })
    it('bottom left', () => {
        const tuples = utils.getSurroundingTiles(grid, 3, 0);
        expect(tuples).toEqual([[2, 0], [2, 1], [3, 1]])
    })
    it('bottom right', () => {
        const tuples = utils.getSurroundingTiles(grid, 3, 3);
        expect(tuples).toEqual([[2, 2], [2, 3], [3, 2]])
    })
})

describe('findEmptySurroundingCols', () =>{
    describe('all clear', () => {
        const visualized = clean(`
        1,1,1,1
        1,1,1,1
        1,1,1,1
        1,1,1,1
        `);
        const grid: Grid = [
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false}],
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false}],
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false}],
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false}],
        ];
        it('center', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 1, 1);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });

        it('up left', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 0, 0);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
        it('up right', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 3, 0);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
        it('down right', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 3, 3);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
        it('down left', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 0, 3);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
    })
    describe('spots', () => {
        const grid: Grid = [
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false, isMine: true}],
            [{isOpen: false}, {isOpen: false, isMine: true}, {isOpen: true}, {isOpen: false}],
            [{isOpen: false}, {isOpen: false}, {isOpen: false}, {isOpen: false}],
            [{isOpen: true}, {isOpen: false}, {isOpen: false, isMine: true}, {isOpen: false}],
        ];
        const visualized = clean(`
        1,1,1,0
        1,0,1,1
        1,1,1,1
        1,1,0,1
        `);

        it('center', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 2, 2);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });

        it('up left', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 0, 0);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
        it('down right', () => {
            const nextGrid = utils.openSafeSurroundings(grid, 3, 3);
            expect(visualizeResults(nextGrid)).toBe(visualized)
        });
    })

})
