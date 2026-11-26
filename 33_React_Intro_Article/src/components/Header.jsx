// Бонус: компонент хедера сторінки
export default function Header({ siteName, links }) {
    return (
        <header className="header">
            <div className="container header__inner">
                <span className="logo">⚛ {siteName}</span>
                <nav>
                    {links.map(link => (
                        <a key={link} href="#">{link}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
