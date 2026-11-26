// Практичне завдання 2.3. Рядки
const out = [];
const print = text => { out.push(text); console.log(text); };

// 1. Порівняння довжини рядків: 1, -1 або 0
function compareLength(a, b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return 0;
}

// 2. Перший символ у верхній регістр
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 3. Кількість голосних (українські та англійські)
function countVowels(str) {
    const vowels = "аеєиіїоуюяaeiouy";
    let count = 0;
    for (const ch of str.toLowerCase()) {
        if (vowels.includes(ch)) count++;
    }
    return count;
}

// 4. Перевірка на спам (без урахування регістру)
function checkSpam(str) {
    const spam = ["100% безкоштовно", "збільшення продажів", "тільки сьогодні", "не видаляйте", "ххх"];
    const lower = str.toLowerCase();
    return spam.some(word => lower.includes(word));
}

// 5. Скорочення рядка з трикрапкою
function truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, Math.max(0, maxLength - 3)) + "...";
}

// 6. Паліндром (ігноруємо регістр, пробіли та розділові знаки)
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-zа-яієїґ0-9]/g, "");
    return clean === [...clean].reverse().join("");
}

// Слова речення (без розділових знаків)
const words = sentence => sentence.split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}'-]/gu, "")).filter(Boolean);

// 7. Кількість слів
function countWords(sentence) {
    return words(sentence).length;
}

// 8. Найдовше слово
function longestWord(sentence) {
    return words(sentence).reduce((longest, w) => w.length > longest.length ? w : longest, "");
}

// 9. Середня довжина слова
function averageWordLength(sentence) {
    const list = words(sentence);
    if (!list.length) return 0;
    return list.reduce((sum, w) => sum + w.length, 0) / list.length;
}

// 10. Індекси символу та кількість входжень
function charIndexes(str, ch) {
    const indexes = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ch) indexes.push(i);
    }
    print(`Символ "${ch}" у рядку "${str}": індекси [${indexes.join(", ")}], зустрічається ${indexes.length} раз(и)`);
    return indexes;
}

// ---------- Демонстрація ----------
const sentence = "JavaScript — це мова програмування, яка працює в кожному браузері.";
print(`1. compareLength("кіт", "собака") = ${compareLength("кіт", "собака")}; ("abc", "ab") = ${compareLength("abc", "ab")}; ("ab", "cd") = ${compareLength("ab", "cd")}`);
print(`2. capitalize("привіт, світе") = "${capitalize("привіт, світе")}"`);
print(`3. countVowels("Hello, світ!") = ${countVowels("Hello, світ!")}`);
print(`4. checkSpam("Купуйте ТІЛЬКИ СЬОГОДНІ!") = ${checkSpam("Купуйте ТІЛЬКИ СЬОГОДНІ!")}; checkSpam("Звичайний лист") = ${checkSpam("Звичайний лист")}`);
print(`5. truncate("Hello, world!", 8) = "${truncate("Hello, world!", 8)}"`);
print(`6. isPalindrome("А роза упала на лапу Азора") = ${isPalindrome("А роза упала на лапу Азора")}; isPalindrome("JavaScript") = ${isPalindrome("JavaScript")}`);
print(`7. countWords: ${countWords(sentence)}`);
print(`8. longestWord: "${longestWord(sentence)}"`);
print(`9. averageWordLength: ${averageWordLength(sentence).toFixed(2)}`);
charIndexes("programming", "m");

document.getElementById("output").textContent = `Речення для 7-9: "${sentence}"\n\n` + out.join("\n");
