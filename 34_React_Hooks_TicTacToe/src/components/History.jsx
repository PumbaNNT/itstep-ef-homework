// Список ходів для "подорожі в часі"
export default function History({ history, currentMove, ascending, onJump, onToggleOrder }) {
    const moves = history.map((squares, move) => {
        let description;
        if (move === 0) {
            description = "На початок гри";
        } else {
            // знаходимо клітинку, що змінилась цим ходом, і показуємо її координати
            const prev = history[move - 1];
            const index = squares.findIndex((value, i) => value !== prev[i]);
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;
            description = `Хід #${move}: ${squares[index]} (${row}, ${col})`;
        }

        return (
            <li key={move}>
                {move === currentMove
                    ? <span className="current">Ви тут — {move === 0 ? "початок" : `хід #${move}`}</span>
                    : <button onClick={() => onJump(move)}>{description}</button>}
            </li>
        );
    });

    return (
        <div className="history">
            <button className="toggle" onClick={onToggleOrder}>
                Сортування: {ascending ? "за зростанням" : "за спаданням"}
            </button>
            <ol>{ascending ? moves : [...moves].reverse()}</ol>
        </div>
    );
}
