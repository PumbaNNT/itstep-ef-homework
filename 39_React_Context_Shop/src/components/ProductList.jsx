import { products } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

export default function ProductList() {
    return (
        <section>
            <h1>Каталог товарів</h1>
            <div className="products">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </section>
    );
}
