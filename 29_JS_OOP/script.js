// ДЗ 2.4. Вступ до ООП

// ===================== Завдання 1. Коло =====================
class Circle {
    #radius;

    constructor(radius) {
        this.radius = radius;
    }

    get radius() {
        return this.#radius;
    }

    set radius(value) {
        if (value <= 0) throw new Error("Радіус має бути додатним");
        this.#radius = value;
    }

    get diameter() {
        return this.#radius * 2;
    }

    area() {
        return Math.PI * this.#radius ** 2;
    }

    length() {
        return 2 * Math.PI * this.#radius;
    }
}

const circle = new Circle(5);
const circleLog = [];
circleLog.push(`Радіус: ${circle.radius}, діаметр: ${circle.diameter}`);
circleLog.push(`Площа: ${circle.area().toFixed(2)}, довжина кола: ${circle.length().toFixed(2)}`);
circle.radius = 10;
circleLog.push(`Після зміни радіуса на 10 -> діаметр: ${circle.diameter}, площа: ${circle.area().toFixed(2)}`);
document.write(`<h2>Завдання 1. Circle</h2><pre>${circleLog.join("\n")}</pre>`);
console.log(circleLog.join("\n"));

// ===================== Завдання 2. HtmlElement =====================
class HtmlElement {
    constructor(tagName, selfClosing = false, text = "") {
        this.tagName = tagName;
        this.selfClosing = selfClosing;
        this.text = text;
        this.attributes = [];   // [{ name, value }]
        this.styles = [];       // [{ name, value }]
        this.children = [];
    }

    setAttribute(name, value) {
        const existing = this.attributes.find(a => a.name === name);
        if (existing) existing.value = value;
        else this.attributes.push({ name, value });
        return this;
    }

    setStyle(name, value) {
        const existing = this.styles.find(s => s.name === name);
        if (existing) existing.value = value;
        else this.styles.push({ name, value });
        return this;
    }

    append(element) {
        this.children.push(element);
        return this;
    }

    prepend(element) {
        this.children.unshift(element);
        return this;
    }

    getHtml() {
        let attrs = this.attributes.map(a => ` ${a.name}="${a.value}"`).join("");
        if (this.styles.length) {
            attrs += ` style="${this.styles.map(s => `${s.name}: ${s.value};`).join(" ")}"`;
        }
        if (this.selfClosing) return `<${this.tagName}${attrs}>`;
        const inner = this.text + this.children.map(c => c.getHtml()).join("");
        return `<${this.tagName}${attrs}>${inner}</${this.tagName}>`;
    }
}

const LOREM = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
    "printer took a galley of type and scrambled it to make a type specimen book. ";
const IMG = "lipsum.jpg";

// Блок з рисунка 1 (стилі задаються через setStyle)
function createStyledBlock() {
    const block = new HtmlElement("div").setStyle("width", "300px").setStyle("margin", "10px");
    block.append(new HtmlElement("h3", false, "What is Lorem Ipsum?"));
    block.append(new HtmlElement("img", true)
        .setStyle("width", "100%")
        .setAttribute("src", IMG)
        .setAttribute("alt", "Lorem Ipsum"));
    const p = new HtmlElement("p", false, LOREM).setStyle("text-align", "justify");
    p.append(new HtmlElement("a", false, "More...")
        .setAttribute("href", "https://www.lipsum.com/")
        .setAttribute("target", "_blank"));
    block.append(p);
    return block;
}

const wrapper = new HtmlElement("div")
    .setAttribute("id", "wrapper")
    .setStyle("display", "flex");
wrapper.append(createStyledBlock());
wrapper.append(createStyledBlock());

document.write("<h2>Завдання 2. HtmlElement</h2>");
document.write(wrapper.getHtml());   // getHtml викликається лише у wrapper

// ===================== Завдання 3. CssClass =====================
class CssClass {
    constructor(name) {
        this.name = name;
        this.styles = [];
    }

    setStyle(name, value) {
        const existing = this.styles.find(s => s.name === name);
        if (existing) existing.value = value;
        else this.styles.push({ name, value });
        return this;
    }

    removeStyle(name) {
        this.styles = this.styles.filter(s => s.name !== name);
        return this;
    }

    getCss() {
        return `.${this.name} {\n${this.styles.map(s => `    ${s.name}: ${s.value};`).join("\n")}\n}`;
    }
}

const demoClass = new CssClass("demo").setStyle("color", "red").setStyle("font-size", "20px").setStyle("padding", "5px");
demoClass.removeStyle("padding");
document.write(`<h2>Завдання 3. CssClass</h2><pre>${demoClass.getCss()}</pre>`);

// ===================== Завдання 4. HtmlBlock =====================
class HtmlBlock {
    constructor(root, cssClasses = []) {
        this.root = root;           // HtmlElement
        this.cssClasses = cssClasses; // CssClass[]
    }

    addCssClass(cssClass) {
        this.cssClasses.push(cssClass);
        return this;
    }

    getCode() {
        const css = this.cssClasses.map(c => c.getCss()).join("\n");
        return `<style>\n${css}\n</style>\n${this.root.getHtml()}`;
    }
}

// Блок з рисунка 2 (стилі через CSS-класи)
function createClassBlock() {
    const block = new HtmlElement("div").setAttribute("class", "block");
    block.append(new HtmlElement("h3", false, "What is Lorem Ipsum?"));
    block.append(new HtmlElement("img", true)
        .setAttribute("class", "img")
        .setAttribute("src", IMG)
        .setAttribute("alt", "Lorem Ipsum"));
    const p = new HtmlElement("p", false, LOREM).setAttribute("class", "text");
    p.append(new HtmlElement("a", false, "More...")
        .setAttribute("href", "https://www.lipsum.com/")
        .setAttribute("target", "_blank"));
    block.append(p);
    return block;
}

const root = new HtmlElement("div").setAttribute("id", "wrapper2").setAttribute("class", "wrap");
root.append(createClassBlock());
root.append(createClassBlock());

const htmlBlock = new HtmlBlock(root, [
    new CssClass("wrap").setStyle("display", "flex"),
    new CssClass("block").setStyle("width", "300px").setStyle("margin", "10px"),
    new CssClass("img").setStyle("width", "100%"),
    new CssClass("text").setStyle("text-align", "justify")
]);

document.write("<h2>Завдання 4. HtmlBlock</h2>");
document.write(htmlBlock.getCode());
