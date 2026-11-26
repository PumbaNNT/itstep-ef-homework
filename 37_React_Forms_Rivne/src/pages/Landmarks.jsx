import { Link } from "react-router-dom";
import { images } from "../data/rivne.js";

const categoryLabels = {
    architecture: "Архітектура",
    religion: "Храми",
    nature: "Природа",
    museum: "Музеї",
    other: "Інше"
};

export default function Landmarks({ landmarks }) {
    return (
        <section>
            <div className="page-head">
                <h1>Пам'ятки Рівного</h1>
                <Link className="btn" to="/add">+ Запропонувати пам'ятку</Link>
            </div>
            <div className="grid">
                {landmarks.map(item => (
                    <article className="card place" key={item.id}>
                        <img src={item.image || images.cathedralSnow} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p className="muted">
                            {item.year ? `Рік: ${item.year}` : "Рік невідомий"}
                            {item.category && ` · ${categoryLabels[item.category]}`}
                        </p>
                        <p>{item.text}</p>
                        {item.author && <p className="muted">Додав(ла): {item.author}</p>}
                    </article>
                ))}
            </div>
        </section>
    );
}
