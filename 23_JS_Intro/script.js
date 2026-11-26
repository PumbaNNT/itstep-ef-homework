// ДЗ 1.2. Вступ до JavaScript. Умови
// Кожне завдання має "чисту" функцію (логіка) і функцію taskN() (запит у користувача + виведення).

// 1. Вік -> категорія (діапазони -> if / else if)
function ageCategory(age) {
    if (age < 0 || isNaN(age)) return "Некоректний вік";
    if (age < 12) return "Дитина";
    if (age < 18) return "Підліток";
    if (age < 60) return "Дорослий";
    return "Пенсіонер";
}
function task1() {
    const age = Number(prompt("Введіть ваш вік:"));
    alert(ageCategory(age));
}

// 2. Цифра 0-9 -> спецсимвол на цій клавіші (конкретні значення -> switch)
function specialChar(digit) {
    switch (digit) {
        case 1: return "!";
        case 2: return "@";
        case 3: return "#";
        case 4: return "$";
        case 5: return "%";
        case 6: return "^";
        case 7: return "&";
        case 8: return "*";
        case 9: return "(";
        case 0: return ")";
        default: return "Потрібна цифра від 0 до 9";
    }
}
function task2() {
    const d = Number(prompt("Введіть число від 0 до 9:"));
    alert(specialChar(d));
}

// 3. Тризначне число: чи є однакові цифри (так/ні -> тернарний)
function hasSameDigits(n) {
    n = Math.abs(n);
    const a = Math.floor(n / 100), b = Math.floor(n / 10) % 10, c = n % 10;
    return a === b || b === c || a === c;
}
function task3() {
    const n = Number(prompt("Введіть тризначне число:"));
    if (n < 100 || n > 999) { alert("Це не тризначне число"); return; }
    alert(hasSameDigits(n) ? "Є однакові цифри" : "Однакових цифр немає");
}

// 4. Високосний рік (тернарний)
function isLeapYear(y) {
    return y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0);
}
function task4() {
    const y = Number(prompt("Введіть рік:"));
    alert(isLeapYear(y) ? `${y} — високосний` : `${y} — не високосний`);
}

// 5. П'ятирозрядне число — паліндром? (тернарний)
function isPalindrome5(n) {
    const d1 = Math.floor(n / 10000), d2 = Math.floor(n / 1000) % 10;
    const d4 = Math.floor(n / 10) % 10, d5 = n % 10;
    return d1 === d5 && d2 === d4;
}
function task5() {
    const n = Number(prompt("Введіть п'ятирозрядне число:"));
    if (n < 10000 || n > 99999) { alert("Це не п'ятирозрядне число"); return; }
    alert(isPalindrome5(n) ? "Паліндром" : "Не паліндром");
}

// 6. Конвертор валют (вибір валюти -> switch)
function convertUsd(usd, currency) {
    switch (currency.toUpperCase()) {
        case "EUR": return usd * 0.92;
        case "UAN": return usd * 41.5;
        case "AZN": return usd * 1.7;
        default: return NaN;
    }
}
function task6() {
    const usd = Number(prompt("Кількість USD:"));
    const cur = prompt("У яку валюту перевести? (EUR, UAN, AZN)", "EUR") || "";
    const res = convertUsd(usd, cur);
    alert(isNaN(res) ? "Невідома валюта" : `${usd} USD = ${res.toFixed(2)} ${cur.toUpperCase()}`);
}

// 7. Знижка (діапазони -> if)
function priceWithDiscount(sum) {
    let discount = 0;
    if (sum >= 500) discount = 7;
    else if (sum >= 300) discount = 5;
    else if (sum >= 200) discount = 3;
    return sum - sum * discount / 100;
}
function task7() {
    const sum = Number(prompt("Сума покупки:"));
    alert(`До сплати: ${priceWithDiscount(sum).toFixed(2)}`);
}

// 8. Чи поміститься коло (довжина кола) у квадрат (периметр): діаметр <= сторони
function circleFitsSquare(circumference, perimeter) {
    const diameter = circumference / Math.PI;
    const side = perimeter / 4;
    return diameter <= side;
}
function task8() {
    const c = Number(prompt("Довжина кола:"));
    const p = Number(prompt("Периметр квадрата:"));
    alert(circleFitsSquare(c, p) ? "Коло поміститься в квадрат" : "Коло не поміститься");
}

// 9. Вікторина: 3 питання по 3 варіанти, 2 бали за правильну відповідь
const quiz = [
    { q: "Яка столиця України?\n1) Львів\n2) Київ\n3) Одеса", answer: 2 },
    { q: "Скільки буде 2 + 2 * 2?\n1) 6\n2) 8\n3) 4", answer: 1 },
    { q: "Яка мова виконується в браузері?\n1) C#\n2) Python\n3) JavaScript", answer: 3 }
];
function quizScore(answers) {
    let score = 0;
    for (let i = 0; i < quiz.length; i++) {
        if (answers[i] === quiz[i].answer) score += 2;
    }
    return score;
}
function task9() {
    const answers = quiz.map(item => Number(prompt(item.q)));
    alert(`Ви набрали ${quizScore(answers)} балів з ${quiz.length * 2}`);
}

// 10. Наступна дата (з урахуванням переходу місяця, року і високосного року)
function daysInMonth(month, year) {
    switch (month) {
        case 2: return isLeapYear(year) ? 29 : 28;
        case 4: case 6: case 9: case 11: return 30;
        default: return 31;
    }
}
function nextDate(day, month, year) {
    day++;
    if (day > daysInMonth(month, year)) {
        day = 1;
        month++;
        if (month > 12) { month = 1; year++; }
    }
    const pad = n => String(n).padStart(2, "0");
    return `${pad(day)}.${pad(month)}.${year}`;
}
function task10() {
    const d = Number(prompt("День:"));
    const m = Number(prompt("Місяць:"));
    const y = Number(prompt("Рік:"));
    if (m < 1 || m > 12 || d < 1 || d > daysInMonth(m, y)) { alert("Некоректна дата"); return; }
    alert(`Наступна дата: ${nextDate(d, m, y)}`);
}
