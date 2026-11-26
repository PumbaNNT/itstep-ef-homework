import { createContext, useContext, useState } from "react";

// Контекст кошика: будь-який компонент може додати / видалити товар
// і дізнатися кількість товарів без передачі props через усе дерево.
const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]); // [{ product, quantity }]

    function addToCart(product) {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }

    function decrease(productId) {
        setItems(prev => prev
            .map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
            .filter(item => item.quantity > 0));
    }

    function removeFromCart(productId) {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    }

    function clearCart() {
        setItems([]);
    }

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    const getQuantity = productId => items.find(item => item.product.id === productId)?.quantity ?? 0;

    const value = { items, count, total, addToCart, decrease, removeFromCart, clearCart, getQuantity };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// власний хук для зручного доступу до контексту
export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart має використовуватись всередині CartProvider");
    return context;
}
