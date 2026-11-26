import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
    const { addToCart, removeFromCart, getQuantity } = useCart();
    const quantity = getQuantity(product.id);

    return (
        <article className={`product ${quantity ? "product--in-cart" : ""}`}>
            <div className="product__emoji">{product.emoji}</div>
            <h3>{product.name}</h3>
            <p className="product__description">{product.description}</p>
            <p className="product__price">{product.price.toLocaleString("uk-UA")} ₴</p>
            <div className="product__actions">
                <button className="btn" onClick={() => addToCart(product)}>
                    {quantity ? `Додати ще (${quantity})` : "У кошик"}
                </button>
                {quantity > 0 && (
                    <button className="btn btn--danger" onClick={() => removeFromCart(product.id)}>
                        Видалити
                    </button>
                )}
            </div>
        </article>
    );
}
