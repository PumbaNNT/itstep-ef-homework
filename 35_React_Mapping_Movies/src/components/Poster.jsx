// Афіша фільму (намальована CSS-градієнтом)
export default function Poster({ title, year, poster, large = false }) {
    return (
        <div
            className={`poster ${large ? "poster--large" : ""}`}
            style={{ background: `linear-gradient(160deg, ${poster.from}, ${poster.to})` }}
        >
            <span className="poster__emoji">{poster.emoji}</span>
            <span className="poster__title">{title}</span>
            <span className="poster__year">{year}</span>
        </div>
    );
}
