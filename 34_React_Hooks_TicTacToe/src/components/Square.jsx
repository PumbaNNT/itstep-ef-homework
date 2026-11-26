export default function Square({ value, highlight, onSquareClick }) {
    return (
        <button
            className={`square ${value ? `square--${value.toLowerCase()}` : ""} ${highlight ? "square--win" : ""}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
