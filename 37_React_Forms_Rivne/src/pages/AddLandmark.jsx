import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = {
    name: "",
    year: "",
    category: "architecture",
    image: "",
    text: "",
    author: "",
    agree: false
};

// Керована форма: значення кожного поля зберігається у стані компонента
export default function AddLandmark({ onAdd }) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // один обробник для всіх полів (включно з checkbox)
    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    function validate(data) {
        const result = {};
        if (data.name.trim().length < 3) result.name = "Назва має містити щонайменше 3 символи";
        if (data.year && (Number(data.year) < 1000 || Number(data.year) > new Date().getFullYear())) {
            result.year = "Некоректний рік";
        }
        if (data.image && !/^https?:\/\/.+/.test(data.image)) result.image = "Посилання має починатися з http:// або https://";
        if (data.text.trim().length < 10) result.text = "Опис має містити щонайменше 10 символів";
        if (!data.agree) result.agree = "Потрібна згода на публікацію";
        return result;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        onAdd({
            name: form.name.trim(),
            year: form.year ? Number(form.year) : null,
            category: form.category,
            image: form.image.trim(),
            text: form.text.trim(),
            author: form.author.trim() || "Анонім"
        });
        setForm(emptyForm);
        navigate("/landmarks");
    }

    return (
        <section className="form-page">
            <h1>Запропонувати пам'ятку</h1>
            <form className="card form" onSubmit={handleSubmit} noValidate>
                <label>
                    Назва*
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Напр. Гідропарк" />
                    {errors.name && <span className="error">{errors.name}</span>}
                </label>

                <div className="form__row">
                    <label>
                        Рік побудови
                        <input name="year" type="number" value={form.year} onChange={handleChange} />
                        {errors.year && <span className="error">{errors.year}</span>}
                    </label>
                    <label>
                        Категорія
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="architecture">Архітектура</option>
                            <option value="religion">Храми</option>
                            <option value="nature">Природа</option>
                            <option value="museum">Музеї</option>
                            <option value="other">Інше</option>
                        </select>
                    </label>
                </div>

                <label>
                    Посилання на фото
                    <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
                    {errors.image && <span className="error">{errors.image}</span>}
                </label>

                <label>
                    Опис*
                    <textarea name="text" rows="4" value={form.text} onChange={handleChange} />
                    {errors.text && <span className="error">{errors.text}</span>}
                </label>

                <label>
                    Ваше ім'я
                    <input name="author" value={form.author} onChange={handleChange} />
                </label>

                <label className="checkbox">
                    <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
                    Погоджуюсь на публікацію
                </label>
                {errors.agree && <span className="error">{errors.agree}</span>}

                <div className="form__actions">
                    <button className="btn" type="submit">Додати</button>
                    <button className="btn btn--ghost" type="button" onClick={() => { setForm(emptyForm); setErrors({}); }}>
                        Очистити
                    </button>
                </div>
            </form>

            <aside className="card preview">
                <h3>Попередній перегляд</h3>
                <p><b>{form.name || "Назва"}</b> {form.year && `(${form.year})`}</p>
                <p>{form.text || "Опис пам'ятки..."}</p>
            </aside>
        </section>
    );
}
