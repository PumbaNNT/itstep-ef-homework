import MovieCard from "./MovieCard.jsx";

// Мапінг колекції: кожен елемент масиву перетворюється на компонент MovieCard
export default function MovieList({ movies }) {
    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    );
}
