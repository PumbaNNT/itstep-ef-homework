import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="not-found">
            <h1>404</h1>
            <p>Такої сторінки не існує.</p>
            <Link className="btn" to="/">На головну</Link>
        </section>
    );
}
