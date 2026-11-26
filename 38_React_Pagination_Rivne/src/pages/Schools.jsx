import { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";

// Сторінка зі школами міста.
// Дані завантажуються HTTP-запитом (fetch) у хуку useEffect з файлу public/schools.json.
export default function Schools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        fetch("/schools.json", { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => setSchools(data))
            .catch(err => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => setLoading(false));

        // прибирання: скасовуємо запит, якщо компонент зникне раніше
        return () => controller.abort();
    }, []);

    // при зміні пошуку або розміру сторінки повертаємось на першу сторінку
    useEffect(() => {
        setPage(1);
    }, [search, pageSize]);

    const filtered = schools.filter(school =>
        `${school.name} ${school.district}`.toLowerCase().includes(search.trim().toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const start = (page - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);

    if (loading) return <p className="loader">Завантаження шкіл...</p>;
    if (error) return <p className="error">Не вдалося завантажити дані: {error}</p>;

    return (
        <section>
            <h1>Школи Рівного</h1>

            <div className="toolbar">
                <input
                    className="search"
                    placeholder="Пошук за назвою або мікрорайоном"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <label>
                    На сторінці:{" "}
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {[3, 6, 9, 12].map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </label>
            </div>

            <p className="muted">
                Знайдено: {filtered.length}. Показано {filtered.length ? start + 1 : 0}–{Math.min(start + pageSize, filtered.length)}
            </p>

            <div className="grid">
                {visible.map(school => (
                    <article className="card school" key={school.id}>
                        <span className="school__type">{school.type}</span>
                        <h3>{school.name}</h3>
                        <p>📍 мікрорайон {school.district}</p>
                        <p>👩‍🎓 учнів: {school.students}</p>
                        <p>🏫 відкрито у {school.founded} р.</p>
                    </article>
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </section>
    );
}
