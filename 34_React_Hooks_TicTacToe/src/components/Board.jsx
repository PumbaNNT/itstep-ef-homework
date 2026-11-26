import Square from "./Square.jsx";
import { calculateWinner } from "../utils/calculateWinner.js";

export default function Board({ xIsNext, squares, winningLine, onPlay }) {
    function handleClick(i) {
        // клітинка вже зайнята або гра закінчена
        if (squares[i] || calculateWinner(squares).winner) return;

        const nextSquares = squares.slice(); // незмінність стану: працюємо з копією
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    // дошка 3x3 будується двома циклами, а не вручну
    return (
        <div className="board">
            {[0, 1, 2].map(row => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map(col => {
                        const i = row * 3 + col;
                        return (
                            <Square
                                key={i}
                                value={squares[i]}
                                highlight={winningLine?.includes(i)}
                                onSquareClick={() => handleClick(i)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
