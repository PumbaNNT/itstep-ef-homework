import { favoriteMovie, movies } from "./data/movies.js";
import FavoriteMovie from "./components/FavoriteMovie.jsx";
import MovieList from "./components/MovieList.jsx";

export default function App() {
    return (
        <div className="page">
            <h1 className="page__title">🎬 Улюблений фільм</h1>
            <FavoriteMovie movie={favoriteMovie} />

            <h2 className="page__subtitle">Моя колекція фільмів</h2>
            <MovieList movies={movies} />
        </div>
    );
}
