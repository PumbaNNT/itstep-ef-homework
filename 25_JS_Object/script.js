// ДЗ 2.1. Об'єкт. Масиви. Рядки. Об'єкти Array, String, Date, Math
const out = [];
const print = text => { out.push(text); console.log(text); };

// ===================== Завдання 1. Автомобіль =====================
const car = {
    manufacturer: "Toyota",
    model: "Camry",
    year: 2020,
    averageSpeed: 90 // км/год
};

function showCar(c) {
    print(`Автомобіль: ${c.manufacturer} ${c.model}, ${c.year} р., середня швидкість ${c.averageSpeed} км/год`);
}

// Час на відстань: кожні 4 години водіння — 1 година перерви
function travelTime(c, distance) {
    const driving = distance / c.averageSpeed;
    // перерва потрібна лише якщо після 4 годин ще треба їхати
    const breaks = Math.max(0, Math.ceil(driving / 4) - 1);
    return driving + breaks;
}

print("--- Завдання 1 ---");
showCar(car);
print(`Час на 300 км: ${travelTime(car, 300).toFixed(2)} год (без перерв)`);
print(`Час на 720 км: ${travelTime(car, 720).toFixed(2)} год (8 год дороги + 1 перерва)`);
print(`Час на 1000 км: ${travelTime(car, 1000).toFixed(2)} год (11.11 год дороги + 2 перерви)`);

// ===================== Завдання 2. Дріб =====================
function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
}

function reduce(f) {
    const d = gcd(f.numerator, f.denominator);
    const sign = f.denominator < 0 ? -1 : 1;
    return { numerator: sign * f.numerator / d, denominator: sign * f.denominator / d };
}

const add      = (a, b) => reduce({ numerator: a.numerator * b.denominator + b.numerator * a.denominator, denominator: a.denominator * b.denominator });
const subtract = (a, b) => reduce({ numerator: a.numerator * b.denominator - b.numerator * a.denominator, denominator: a.denominator * b.denominator });
const multiply = (a, b) => reduce({ numerator: a.numerator * b.numerator, denominator: a.denominator * b.denominator });
const divide   = (a, b) => reduce({ numerator: a.numerator * b.denominator, denominator: a.denominator * b.numerator });

const fr = f => `${f.numerator}/${f.denominator}`;

const f1 = { numerator: 1, denominator: 2 };
const f2 = { numerator: 3, denominator: 4 };

print("--- Завдання 2 ---");
print(`${fr(f1)} + ${fr(f2)} = ${fr(add(f1, f2))}`);
print(`${fr(f1)} - ${fr(f2)} = ${fr(subtract(f1, f2))}`);
print(`${fr(f1)} * ${fr(f2)} = ${fr(multiply(f1, f2))}`);
print(`${fr(f1)} / ${fr(f2)} = ${fr(divide(f1, f2))}`);
print(`Скорочення 12/16 = ${fr(reduce({ numerator: 12, denominator: 16 }))}`);

// ===================== Завдання 3. Час =====================
const time = { hours: 20, minutes: 30, seconds: 45 };

const pad = n => String(n).padStart(2, "0");
function showTime(t) {
    return `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;
}

// Усі зміни зводимо до секунд, щоб коректно переходити через хвилини / години / добу
function addSeconds(t, sec) {
    const day = 24 * 3600;
    let total = (t.hours * 3600 + t.minutes * 60 + t.seconds + sec) % day;
    if (total < 0) total += day;
    t.hours = Math.floor(total / 3600);
    t.minutes = Math.floor((total % 3600) / 60);
    t.seconds = total % 60;
    return t;
}
const addMinutes = (t, min) => addSeconds(t, min * 60);
const addHours   = (t, h)   => addSeconds(t, h * 3600);

print("--- Завдання 3 ---");
print(`Початковий час: ${showTime(time)}`);
print(`+30 секунд: ${showTime(addSeconds(time, 30))}`);
print(`+45 хвилин: ${showTime(addMinutes(time, 45))}`);
print(`+5 годин: ${showTime(addHours(time, 5))}`);
print(`-100 секунд: ${showTime(addSeconds(time, -100))}`);

document.getElementById("output").textContent = out.join("\n");
