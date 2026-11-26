import { useCart } from "../context/CartContext.jsx";

export default function Cart({ onBack }) {
    const { items, count, total, addToCart, decrease, removeFromCart, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <section className="cart cart--empty">
                <h1>Кошик порожній</h1>
                <button className="btn" onClick={onBack}>До каталогу</button>
            </section>
        );
    }

    return (
        <section className="cart">
            <h1>Кошик ({count})</h1>
            <table className="cart__table">
                <thead>
                    <tr><th>Товар</th><th>Ціна</th><th>Кількість</th><th>Сума</th><th></th></tr>
                </thead>
                <tbody>
                    {items.map(({ product, quantity }) => (
                        <tr key={product.id}>
                            <td>{product.emoji} {product.name}</td>
                            <td>{product.price.toLocaleString("uk-UA")} ₴</td>
                            <td>
                                <div className="qty">
                                    <button onClick={() => decrease(product.id)}>−</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => addToCart(product)}>+</button>
                                </div>
                            </td>
                            <td>{(product.price * quantity).toLocaleString("uk-UA")} ₴</td>
                            <td><button className="link" onClick={() => removeFromCart(product.id)}>✕</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart__footer">
                <button className="btn btn--ghost" onClick={clearCart}>Очистити кошик</button>
                <p className="cart__total">Разом: <b>{total.toLocaleString("uk-UA")} ₴</b></p>
            </div>
        </section>
    );
}
