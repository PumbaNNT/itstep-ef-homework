// Колекція фільмів. Поле poster описує "афішу": кольори та емодзі для намальованого постера.
export const favoriteMovie = {
    id: 1,
    title: "Інтерстеллар",
    originalTitle: "Interstellar",
    director: "Нолан Крістофер Джонатан Джеймс",
    year: 2014,
    studio: "Paramount Pictures, Warner Bros., Legendary Pictures",
    genres: ["фантастика", "драма", "пригоди"],
    duration: 169,
    rating: 8.7,
    poster: { emoji: "🪐", from: "#0f172a", to: "#b45309" },
    description:
        "Коли Земля стає непридатною для життя, група дослідників вирушає крізь червоточину " +
        "біля Сатурна, щоб знайти людству новий дім."
};

export const movies = [
    favoriteMovie,
    {
        id: 2,
        title: "Початок",
        originalTitle: "Inception",
        director: "Нолан Крістофер Джонатан Джеймс",
        year: 2010,
        studio: "Warner Bros., Legendary Pictures",
        genres: ["фантастика", "трилер"],
        duration: 148,
        rating: 8.8,
        poster: { emoji: "🌀", from: "#1e293b", to: "#475569" }
    },
    {
        id: 3,
        title: "Матриця",
        originalTitle: "The Matrix",
        director: "Вачовскі Лана, Вачовскі Лілі",
        year: 1999,
        studio: "Warner Bros., Village Roadshow Pictures",
        genres: ["фантастика", "бойовик"],
        duration: 136,
        rating: 8.7,
        poster: { emoji: "💊", from: "#022c22", to: "#16a34a" }
    },
    {
        id: 4,
        title: "Втеча з Шоушенка",
        originalTitle: "The Shawshank Redemption",
        director: "Дарабонт Френк",
        year: 1994,
        studio: "Castle Rock Entertainment",
        genres: ["драма"],
        duration: 142,
        rating: 9.3,
        poster: { emoji: "🔨", from: "#422006", to: "#a16207" }
    },
    {
        id: 5,
        title: "Король Лев",
        originalTitle: "The Lion King",
        director: "Аллерс Роджер, Мінкофф Роб",
        year: 1994,
        studio: "Walt Disney Pictures",
        genres: ["мультфільм", "сімейний"],
        duration: 88,
        rating: 8.5,
        poster: { emoji: "🦁", from: "#7c2d12", to: "#f59e0b" }
    },
    {
        id: 6,
        title: "Назад у майбутнє",
        originalTitle: "Back to the Future",
        director: "Земекіс Роберт",
        year: 1985,
        studio: "Universal Pictures, Amblin Entertainment",
        genres: ["фантастика", "комедія"],
        duration: 116,
        rating: 8.5,
        poster: { emoji: "⏰", from: "#4c0519", to: "#e11d48" }
    }
];
