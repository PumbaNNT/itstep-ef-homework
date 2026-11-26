import Poster from "./Poster.jsx";
import Genres from "./Genres.jsx";

export default function FavoriteMovie({ movie }) {
    const { title, originalTitle, director, year, studio, genres, duration, rating, poster, description } = movie;

    return (
        <section className="favorite">
            <Poster title={title} year={year} poster={poster} large />
            <div className="favorite__info">
                <h2>{title} <small>({originalTitle})</small></h2>
                <p className="favorite__description">{description}</p>
                <dl>
                    <dt>Режисер</dt><dd>{director}</dd>
                    <dt>Рік випуску</dt><dd>{year}</dd>
                    <dt>Кіностудія</dt><dd>{studio}</dd>
                    <dt>Тривалість</dt><dd>{Math.floor(duration / 60)} год {duration % 60} хв</dd>
                    <dt>Рейтинг</dt><dd>⭐ {rating}</dd>
                </dl>
                <Genres genres={genres} />
            </div>
        </section>
    );
}
