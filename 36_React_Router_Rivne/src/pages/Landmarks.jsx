import { landmarks } from "../data/rivne.js";

export default function Landmarks() {
    return (
        <section>
            <h1>Пам'ятки Рівного</h1>
            <div className="grid">
                {landmarks.map(item => (
                    <article className="card place" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p className="muted">Рік: {item.year}</p>
                        <p>{item.text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
