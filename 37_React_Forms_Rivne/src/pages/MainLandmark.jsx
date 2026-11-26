import { Link } from "react-router-dom";
import { mainLandmark } from "../data/rivne.js";

export default function MainLandmark() {
    return (
        <section className="landmark">
            <h1>{mainLandmark.name}</h1>
            <p className="muted">📍 {mainLandmark.location}</p>
            <img className="landmark__image" src={mainLandmark.image} alt={mainLandmark.name} />
            {mainLandmark.text.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            <Link className="btn" to="/landmarks">Інші пам'ятки міста →</Link>
        </section>
    );
}
