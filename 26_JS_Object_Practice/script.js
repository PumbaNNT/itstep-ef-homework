// Практичне завдання 2.1. Об'єкт-прямокутник
// Прямокутник задається лівою верхньою (x1, y1) і правою нижньою (x2, y2) точками.
// Вісь Y направлена вниз (як на екрані), тому y2 > y1.
const out = [];
const print = text => { out.push(text); console.log(text); };

const rect = {
    topLeft: { x: 2, y: 3 },
    bottomRight: { x: 10, y: 8 }
};

function info(r) {
    print(`Ліва верхня точка: (${r.topLeft.x}, ${r.topLeft.y}); права нижня точка: (${r.bottomRight.x}, ${r.bottomRight.y})`);
}
const width     = r => r.bottomRight.x - r.topLeft.x;
const height    = r => r.bottomRight.y - r.topLeft.y;
const area      = r => width(r) * height(r);
const perimeter = r => 2 * (width(r) + height(r));

function changeWidth(r, delta) {
    r.bottomRight.x += delta;
}
function changeHeight(r, delta) {
    r.bottomRight.y += delta;
}
function changeSize(r, dw, dh) {
    changeWidth(r, dw);
    changeHeight(r, dh);
}
function moveX(r, dx) {
    r.topLeft.x += dx;
    r.bottomRight.x += dx;
}
function moveY(r, dy) {
    r.topLeft.y += dy;
    r.bottomRight.y += dy;
}
function move(r, dx, dy) {
    moveX(r, dx);
    moveY(r, dy);
}
function containsPoint(r, x, y) {
    return x >= r.topLeft.x && x <= r.bottomRight.x && y >= r.topLeft.y && y <= r.bottomRight.y;
}

info(rect);
print(`Ширина: ${width(rect)}, висота: ${height(rect)}, площа: ${area(rect)}, периметр: ${perimeter(rect)}`);

changeWidth(rect, 2);
print(`Після changeWidth(+2): ширина = ${width(rect)}`);
changeHeight(rect, -1);
print(`Після changeHeight(-1): висота = ${height(rect)}`);
changeSize(rect, 3, 3);
print(`Після changeSize(+3, +3): ${width(rect)} x ${height(rect)}`);

moveX(rect, 5);
info(rect);
moveY(rect, -2);
info(rect);
move(rect, 1, 1);
info(rect);

print(`Точка (10, 5) всередині? ${containsPoint(rect, 10, 5)}`);
print(`Точка (0, 0) всередині? ${containsPoint(rect, 0, 0)}`);

document.getElementById("output").textContent = out.join("\n");
