// Домашнє завдання: setTimeout, setInterval, Date, Math
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");

// ---------- Частина 1 ----------
// 1.1 Повідомлення через 3 секунди
function delayedMessage() {
    $("p1-1").textContent = "Чекаємо 3 секунди...";
    setTimeout(() => {
        $("p1-1").textContent = "Минуло 3 секунди!";
    }, 3000);
}

// 1.2 Привітання через 2 секунди
function greetLater(name) {
    $("p1-2").textContent = "...";
    setTimeout(() => {
        $("p1-2").textContent = `Привіт, ${name}!`;
    }, 2000);
}

// ---------- Частина 2 ----------
// 2.1 Лічильник 1..10 щосекунди
function countUp() {
    let i = 1;
    $("p2-1").textContent = i;
    const id = setInterval(() => {
        i++;
        $("p2-1").textContent = i;
        if (i >= 10) clearInterval(id);
    }, 1000);
}

// 2.2 Зворотний відлік 10..0, потім "Старт!"
function countDown() {
    let i = 10;
    $("p2-2").textContent = i;
    const id = setInterval(() => {
        i--;
        if (i < 0) {
            clearInterval(id);
            $("p2-2").textContent = "Старт!";
        } else {
            $("p2-2").textContent = i;
        }
    }, 1000);
}

// ---------- Частина 3 ----------
// 3.1 Поточна дата ДД.ММ.РРРР
function formatDate(d = new Date()) {
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

// 3.2 Вік за роком народження
function getAge(birthYear) {
    return new Date().getFullYear() - birthYear;
}

// 3.3 Днів до Нового року
function daysToNewYear() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    return Math.ceil((newYear - now) / (1000 * 60 * 60 * 24));
}

// ---------- Частина 4 ----------
// 4.1 Випадкове число 1..100
const random1to100 = () => Math.floor(Math.random() * 100) + 1;
// 4.2 Кидок кубика 1..6
const rollDice = () => Math.floor(Math.random() * 6) + 1;
// 4.3 Найбільше з трьох
const maxOfThree = (a, b, c) => Math.max(a, b, c);

// ---------- Частина 5 ----------
// 5.1 Таймер зворотного відліку до дати
let countdownId = null;
function startCountdown(target) {
    clearInterval(countdownId);
    const tick = () => {
        let diff = Math.floor((target - new Date()) / 1000);
        if (diff <= 0) {
            clearInterval(countdownId);
            $("p5").textContent = "Час настав!";
            return;
        }
        const days = Math.floor(diff / 86400); diff %= 86400;
        const hours = Math.floor(diff / 3600); diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        $("p5").textContent = `Залишилось: ${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
    };
    tick();
    countdownId = setInterval(tick, 1000);
}

// ---------- Частина 6 ----------
// 6.1 Цифровий годинник
function updateClock() {
    const d = new Date();
    $("clock").textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
updateClock();
setInterval(updateClock, 1000);

// 6.2 "Мигалка" — зміна кольору кожні 0.5 с
const colors = ["red", "orange", "green", "blue", "purple"];
let colorIndex = 0;
setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    $("blink").style.color = colors[colorIndex];
}, 500);

// ---------- Обробники кнопок ----------
$("btn1-1").onclick = delayedMessage;
$("btn1-2").onclick = () => greetLater($("name").value || "користувач");
$("btn2-1").onclick = countUp;
$("btn2-2").onclick = countDown;

$("p3-1").textContent = formatDate();
$("btn3-2").onclick = () => $("p3-2").textContent = `Вік: ${getAge(Number($("year").value))}`;
$("p3-3").textContent = `До Нового року: ${daysToNewYear()} днів`;

$("btn4-1").onclick = () => $("p4-1").textContent = random1to100();
$("btn4-2").onclick = () => $("p4-2").textContent = rollDice();
$("btn4-3").onclick = () => $("p4-3").textContent =
    maxOfThree(Number($("a").value), Number($("b").value), Number($("c").value));

$("btn5").onclick = () => {
    const value = $("target").value;
    if (value) startCountdown(new Date(value));
};
startCountdown(new Date(new Date().getFullYear() + 1, 0, 1));
