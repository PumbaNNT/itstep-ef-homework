// ДЗ 1.4. Вступ до JavaScript. Функції

// 1. Порівняння двох чисел: -1, 1 або 0
function compare(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

// 2. Факторіал (цикл)
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// 3. Три цифри -> одне число (1, 4, 9 -> 149)
function digitsToNumber(a, b, c) {
    return a * 100 + b * 10 + c;
}

// 4. Площа прямокутника; якщо передано 1 параметр — площа квадрата
function area(width, height) {
    if (height === undefined) return width * width;
    return width * height;
}

// 5. Чи є число досконалим (дорівнює сумі власних дільників)
function isPerfect(n) {
    if (n < 2) return false;
    let sum = 1;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            sum += i;
            if (i !== n / i) sum += n / i;
        }
    }
    return sum === n;
}

// 6. Досконалі числа з діапазону (використовує isPerfect)
function perfectInRange(min, max) {
    const result = [];
    for (let i = min; i <= max; i++) {
        if (isPerfect(i)) result.push(i);
    }
    return result;
}

const pad = n => String(n).padStart(2, "0");

// 7. Вивести час у форматі "гг:хх:сс"; хвилини / секунди за замовчуванням 00
function formatTime(hours, minutes = 0, seconds = 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// 8. Час -> секунди
function toSeconds(hours, minutes = 0, seconds = 0) {
    return hours * 3600 + minutes * 60 + seconds;
}

// 9. Секунди -> "гг:хх:сс"
function fromSeconds(total) {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return formatTime(h, m, s);
}

// 10. Різниця між двома "датами" (час1 і час2) у вигляді "гг:хх:сс"
function timeDiff(h1, m1, s1, h2, m2, s2) {
    const diff = Math.abs(toSeconds(h1, m1, s1) - toSeconds(h2, m2, s2));
    return fromSeconds(diff);
}

// ---------- Демонстрація ----------
const lines = [
    `1. compare(3, 7) = ${compare(3, 7)}; compare(7, 3) = ${compare(7, 3)}; compare(5, 5) = ${compare(5, 5)}`,
    `2. factorial(5) = ${factorial(5)}; factorial(10) = ${factorial(10)}`,
    `3. digitsToNumber(1, 4, 9) = ${digitsToNumber(1, 4, 9)}`,
    `4. area(4, 6) = ${area(4, 6)}; area(5) = ${area(5)}`,
    `5. isPerfect(28) = ${isPerfect(28)}; isPerfect(12) = ${isPerfect(12)}`,
    `6. perfectInRange(1, 10000) = ${perfectInRange(1, 10000).join(", ")}`,
    `7. formatTime(9) = ${formatTime(9)}; formatTime(9, 5) = ${formatTime(9, 5)}; formatTime(23, 59, 7) = ${formatTime(23, 59, 7)}`,
    `8. toSeconds(1, 30, 15) = ${toSeconds(1, 30, 15)}`,
    `9. fromSeconds(5415) = ${fromSeconds(5415)}`,
    `10. timeDiff(10, 15, 0, 7, 45, 30) = ${timeDiff(10, 15, 0, 7, 45, 30)}`
];

document.getElementById("output").innerHTML = lines.map(l => `<li>${l}</li>`).join("");
lines.forEach(l => console.log(l));
