// Intro to DOM
// Завдання 1: сторінка зі списком продуктів, кожен продукт — картка фіксованої ширини.
// Завдання 2: три кнопки додають у список картки Fish, Apple, Eggs.

const productTypes = {
    fish:  { name: "Fish",  emoji: "🐟", price: 180, description: "Свіжа морська риба" },
    apple: { name: "Apple", emoji: "🍎", price: 35,  description: "Соковиті червоні яблука" },
    eggs:  { name: "Eggs",  emoji: "🥚", price: 60,  description: "Курячі яйця, 10 шт." }
};

const initialProducts = [
    { name: "Milk",   emoji: "🥛", price: 42,  description: "Молоко 2.5%, 1 л" },
    { name: "Bread",  emoji: "🍞", price: 30,  description: "Свіжий білий хліб" },
    { name: "Cheese", emoji: "🧀", price: 120, description: "Твердий сир, 200 г" },
    { name: "Banana", emoji: "🍌", price: 55,  description: "Банани, 1 кг" }
];

const container = document.getElementById("products");

function createCard(product) {
    const card = document.createElement("div");
    card.className = "card product-card shadow-sm";

    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = product.emoji;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const text = document.createElement("p");
    text.className = "card-text text-muted";
    text.textContent = product.description;

    const price = document.createElement("p");
    price.className = "fw-bold mb-2";
    price.textContent = `${product.price} грн`;

    const remove = document.createElement("button");
    remove.className = "btn btn-outline-danger btn-sm";
    remove.textContent = "Видалити";
    remove.addEventListener("click", () => card.remove());

    body.append(title, text, price, remove);
    card.append(emoji, body);
    return card;
}

function addProduct(product) {
    container.appendChild(createCard(product));
}

initialProducts.forEach(addProduct);

document.getElementById("addFish").addEventListener("click", () => addProduct(productTypes.fish));
document.getElementById("addApple").addEventListener("click", () => addProduct(productTypes.apple));
document.getElementById("addEggs").addEventListener("click", () => addProduct(productTypes.eggs));
