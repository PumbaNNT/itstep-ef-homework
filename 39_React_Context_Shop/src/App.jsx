import { useState } from "react";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";

// Завдання 1: список товарів, додавання / видалення з кошика, кількість товарів у хедері.
// Завдання 2*: перегляд списку товарів у кошику. Стан кошика — у Context API.
export default function App() {
    const [view, setView] = useState("catalog"); // "catalog" | "cart"

    return (
        <CartProvider>
            <Header view={view} onNavigate={setView} />
            <main className="container">
                {view === "catalog" ? <ProductList /> : <Cart onBack={() => setView("catalog")} />}
            </main>
        </CartProvider>
    );
}
