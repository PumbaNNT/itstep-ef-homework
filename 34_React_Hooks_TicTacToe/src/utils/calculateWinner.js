const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // рядки
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // стовпці
    [0, 4, 8], [2, 4, 6]             // діагоналі
];

export function calculateWinner(squares) {
    for (const [a, b, c] of LINES) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return { winner: null, line: null };
}
