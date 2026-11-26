import { Link } from "react-router-dom";
import { city, images } from "../data/rivne.js";

export default function CityInfo() {
    return (
        <section>
            <div className="hero" style={{ backgroundImage: `url(${images.cathedralSnow})` }}>
                <h1>{city.name}</h1>
                <p>Місто кохання на Західному Поліссі</p>
            </div>

            <div className="city">
                <div className="city__text">
                    {city.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    <Link className="btn" to="/landmark">Найвідоміша пам'ятка →</Link>
                </div>

                <aside className="card">
                    <h3>Коротко про місто</h3>
                    <dl className="stats">
                        <dt>Засноване</dt><dd>{city.founded} р.</dd>
                        <dt>Область</dt><dd>{city.region}</dd>
                        <dt>Населення</dt><dd>{city.population}</dd>
                        <dt>Площа</dt><dd>{city.area}</dd>
                        <dt>Річка</dt><dd>{city.river}</dd>
                    </dl>
                    <h3>Цікаві факти</h3>
                    <ul>
                        {city.facts.map(fact => <li key={fact}>{fact}</li>)}
                    </ul>
                </aside>
            </div>
        </section>
    );
}
