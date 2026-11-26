import { useState } from "react";
import Board from "./components/Board.jsx";
import History from "./components/History.jsx";
import { calculateWinner } from "./utils/calculateWinner.js";

// Гра "Хрестики-нулики" (за туторіалом https://react.dev/learn/tutorial-tic-tac-toe)
// Стан гри зберігається через хук useState у компоненті Game (App):
//  - history: масив усіх станів дошки (для "подорожі в часі");
//  - currentMove: номер ходу, який зараз показано.
export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [ascending, setAscending] = useState(true);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentMove(move);
    }

    function restart() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const { winner, line } = calculateWinner(currentSquares);
    let status;
    if (winner) status = `Переможець: ${winner}`;
    else if (currentSquares.every(Boolean)) status = "Нічия!";
    else status = `Наступний хід: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="game">
            <h1>Хрестики-нулики</h1>
            <div className="game__body">
                <div>
                    <div className={`status ${winner ? "status--win" : ""}`}>{status}</div>
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        winningLine={line}
                        onPlay={handlePlay}
                    />
                    <button className="restart" onClick={restart}>Нова гра</button>
                </div>
                <History
                    history={history}
                    currentMove={currentMove}
                    ascending={ascending}
                    onJump={jumpTo}
                    onToggleOrder={() => setAscending(!ascending)}
                />
            </div>
        </div>
    );
}
