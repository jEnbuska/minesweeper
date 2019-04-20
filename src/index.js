import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import {ThemeProvider} from 'styled-components'

const darkGrey = '#7d7d7d';
const white = '#fff';
const theme = {
    darkGrey,
    white,
    background: '#bdbdbd',
    borderColor1: `${darkGrey} ${white} ${white} ${darkGrey}`,
    borderColor2: `${white} ${darkGrey} ${darkGrey} ${white}`,
    cellColors: {
        [undefined]: 'transparent',
        flagged: 'black',
        1: '#0000ff',
        2: '#008100',
        3: 'red',
        4: '#00009c',
        5: '#80000c',
        6: '#009896',
        7: 'black',
        8: '#969699',

    }
}
const App = () => (
    <ThemeProvider theme={theme}>
        <Board />
    </ThemeProvider>
)
ReactDOM.render(<App />, document.getElementById('root'));
