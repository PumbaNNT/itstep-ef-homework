import { useCart } from "../context/CartContext.jsx";

export default function Header({ view, onNavigate }) {
    const { count, total } = useCart();

    return (
        <header className="header">
            <div className="container header__inner">
                <button className="logo" onClick={() => onNavigate("catalog")}>🛒 TechShop</button>
                <nav className="nav">
                    <button className={view === "catalog" ? "active" : ""} onClick={() => onNavigate("catalog")}>
                        Каталог
                    </button>
                    <button className={`cart-button ${view === "cart" ? "active" : ""}`} onClick={() => onNavigate("cart")}>
                        Кошик <span className="cart-count">{count}</span>
                        {count > 0 && <span className="cart-total">{total.toLocaleString("uk-UA")} ₴</span>}
                    </button>
                </nav>
            </div>
        </header>
    );
}
