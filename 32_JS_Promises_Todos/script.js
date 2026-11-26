// Promises. Fetch
// При відкритті завантажуються користувачі, при кліку на користувача — його список справ.
// Ресурс: https://jsonplaceholder.typicode.com

const API = "https://jsonplaceholder.typicode.com";

const usersList = document.getElementById("users");
const usersStatus = document.getElementById("usersStatus");
const todosList = document.getElementById("todos");
const todosTitle = document.getElementById("todosTitle");
const todosStatus = document.getElementById("todosStatus");

// fetch повертає Promise; обробляємо його через then / catch
function getJson(url) {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    });
}

function renderUsers(users) {
    usersList.replaceChildren();
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.name;
        const small = document.createElement("small");
        small.textContent = `@${user.username} · ${user.email}`;
        li.append(small);
        li.addEventListener("click", () => selectUser(user, li));
        usersList.append(li);
    });
}

function renderTodos(todos) {
    todosList.replaceChildren();
    todos.forEach(todo => {
        const li = document.createElement("li");
        if (todo.completed) li.classList.add("done");
        const badge = document.createElement("b");
        badge.className = "badge";
        badge.textContent = todo.completed ? "✔" : "○";
        const text = document.createElement("span");
        text.textContent = todo.title;
        li.append(badge, text);
        todosList.append(li);
    });
    const done = todos.filter(t => t.completed).length;
    todosStatus.textContent = `Виконано ${done} з ${todos.length}`;
}

function selectUser(user, li) {
    document.querySelectorAll("#users li").forEach(item => item.classList.remove("active"));
    li.classList.add("active");

    todosTitle.textContent = `Справи: ${user.name}`;
    todosStatus.textContent = "Завантаження...";
    todosList.replaceChildren();

    getJson(`${API}/users/${user.id}/todos`)
        .then(renderTodos)
        .catch(error => todosStatus.textContent = `Помилка завантаження: ${error.message}`);
}

getJson(`${API}/users`)
    .then(users => {
        usersStatus.textContent = "";
        renderUsers(users);
    })
    .catch(error => usersStatus.textContent = `Помилка завантаження: ${error.message}`);
