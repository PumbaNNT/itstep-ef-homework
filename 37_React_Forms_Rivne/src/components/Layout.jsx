import { NavLink, Outlet } from "react-router-dom";

const links = [
    { to: "/", label: "Про місто", end: true },
    { to: "/landmark", label: "Тунель кохання" },
    { to: "/landmarks", label: "Пам'ятки" },
    { to: "/photos", label: "Фото" },
    { to: "/add", label: "+ Додати" }
];

export default function Layout() {
    return (
        <>
            <header className="header">
                <div className="container header__inner">
                    <NavLink to="/" className="logo">Рівне</NavLink>
                    <nav className="nav">
                        {links.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="container main">
                <Outlet />
            </main>

            <footer className="footer">© {new Date().getFullYear()} Сайт про місто Рівне</footer>
        </>
    );
}
