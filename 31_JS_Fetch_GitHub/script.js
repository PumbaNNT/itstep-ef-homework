// DOM. HTTP Client. Fetch — інформація про акаунт GitHub за логіном
// API: https://api.github.com/users/{username}

const form = document.getElementById("searchForm");
const loginInput = document.getElementById("login");
const statusEl = document.getElementById("status");
const profileEl = document.getElementById("profile");

async function getUser(login) {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(login)}`);
    if (response.status === 404) throw new Error("Користувача не знайдено");
    if (!response.ok) throw new Error(`Помилка ${response.status}`);
    return response.json();
}

// безпечне виведення тексту (без вставки HTML з відповіді)
function el(tag, text, attrs = {}) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
}

function link(url) {
    if (!url) return el("span", "—");
    const href = url.startsWith("http") ? url : `https://${url}`;
    return el("a", url, { href, target: "_blank", rel: "noopener" });
}

function renderUser(user) {
    profileEl.replaceChildren();

    const avatar = el("img", undefined, { src: user.avatar_url, alt: user.login });

    const info = el("div");
    info.append(el("h2", user.name || user.login), el("p", `@${user.login}`, { class: "login" }));

    const dl = el("dl");
    const rows = [
        ["Акаунт", link(user.html_url)],
        ["Блог", link(user.blog)],
        ["Місто / країна", user.location || "—"],
        ["Email", user.email || "приховано"],
        ["Компанія", user.company || "—"],
        ["Репозиторіїв", user.public_repos],
        ["Followers", user.followers],
        ["Following", user.following],
        ["На GitHub з", new Date(user.created_at).toLocaleDateString("uk-UA")]
    ];
    rows.forEach(([label, value]) => {
        const dd = el("dd");
        if (value instanceof Node) dd.append(value); else dd.textContent = value;
        dl.append(el("dt", label), dd);
    });
    info.append(dl);

    profileEl.append(avatar, info);
    profileEl.classList.remove("hidden");
}

form.addEventListener("submit", async event => {
    event.preventDefault();
    const login = loginInput.value.trim();
    if (!login) return;

    statusEl.textContent = "Завантаження...";
    profileEl.classList.add("hidden");
    try {
        const user = await getUser(login);
        renderUser(user);
        statusEl.textContent = "";
    } catch (error) {
        statusEl.textContent = error.message;
    }
});
