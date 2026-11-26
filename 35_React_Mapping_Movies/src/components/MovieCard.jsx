import Poster from "./Poster.jsx";
import Genres from "./Genres.jsx";

export default function MovieCard({ title, director, year, studio, genres, rating, poster }) {
    return (
        <article className="movie-card">
            <Poster title={title} year={year} poster={poster} />
            <div className="movie-card__body">
                <h3>{title}</h3>
                <p><b>Режисер:</b> {director}</p>
                <p><b>Рік:</b> {year}</p>
                <p><b>Кіностудія:</b> {studio}</p>
                <p><b>Рейтинг:</b> ⭐ {rating}</p>
                <Genres genres={genres} />
            </div>
        </article>
    );
}
