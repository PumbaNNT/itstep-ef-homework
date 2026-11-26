export default function Genres({ genres }) {
    return (
        <ul className="genres">
            {genres.map(genre => <li key={genre}>{genre}</li>)}
        </ul>
    );
}
