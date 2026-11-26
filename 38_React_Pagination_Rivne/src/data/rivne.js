// Дані про місто Рівне. Фото — Wikimedia Commons.
const W = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

export const images = {
    tunnel: "https://upload.wikimedia.org/wikipedia/commons/6/64/Green_Mile_Tunnel%2C_Rivne.jpg",
    cathedral: `${W}/2/24/Resurrection_Cathedral_in_Rivne.jpg/960px-Resurrection_Cathedral_in_Rivne.jpg`,
    cathedralSnow: `${W}/8/87/Resurrection_cathedral%2C_Rivne_in_the_snow_2015.jpg/960px-Resurrection_cathedral%2C_Rivne_in_the_snow_2015.jpg`,
    palace: `${W}/8/82/Lubomirski_Palace%2C_Rivne_%285817172%29.jpg/960px-Lubomirski_Palace%2C_Rivne_%285817172%29.jpg`,
    theatre: `${W}/c/c3/Rivne_theatre.jpg/960px-Rivne_theatre.jpg`,
    church: `${W}/c/ce/%D0%A0%D1%96%D0%B2%D0%BD%D0%B5._%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0_%D0%A3%D1%81%D0%BF%D1%96%D0%BD%D0%BD%D1%8F_%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96.jpg/960px-%D0%A0%D1%96%D0%B2%D0%BD%D0%B5._%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0_%D0%A3%D1%81%D0%BF%D1%96%D0%BD%D0%BD%D1%8F_%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96.jpg`
};

export const city = {
    name: "Рівне",
    founded: 1283,
    region: "Рівненська область",
    population: "≈ 245 тис. осіб",
    area: "58 км²",
    river: "Устя",
    description: [
        "Рівне — обласний центр на північному заході України, головне місто історичного Західного Полісся та Волині. " +
        "Уперше місто згадується в літописах у 1283 році.",
        "У XVI–XVIII століттях Рівне належало князям Острозьким, а згодом — Любомирським, які збудували тут палац " +
        "і заклали парк. Сьогодні це сучасне місто з університетами, театрами та затишними парками вздовж річки Устя.",
        "Рівне часто називають «містом кохання» — завдяки знаменитому Тунелю кохання поблизу, " +
        "а також «зеленим містом» через велику кількість скверів і парків."
    ],
    facts: [
        "Перша письмова згадка — 1283 рік",
        "Магдебурзьке право отримало у 1492 році",
        "У місті працюють 5 закладів вищої освіти",
        "Гідропарк на річці Устя — улюблене місце відпочинку містян"
    ]
};

export const mainLandmark = {
    name: "Тунель кохання",
    location: "смт Клевань, 20 км від Рівного",
    image: images.tunnel,
    text: [
        "Тунель кохання — це ділянка залізничної колії довжиною близько 3 км, " +
        "над якою дерева та кущі утворили суцільну зелену арку.",
        "Колією досі курсує невеликий потяг, що підвозить деревину на фабрику, тому «стіни» тунелю " +
        "залишаються рівними, ніби їх підстригли.",
        "За легендою, закохані, які пройдуть тунелем, тримаючись за руки, будуть разом усе життя. " +
        "Тунель став однією з найвідоміших туристичних локацій України."
    ]
};

export const landmarks = [
    {
        id: 1,
        name: "Свято-Воскресенський собор",
        year: 1895,
        image: images.cathedral,
        text: "Головний православний храм міста в центрі на Соборній вулиці, збудований наприкінці XIX століття."
    },
    {
        id: 2,
        name: "Палац Любомирських",
        year: 1723,
        image: images.palace,
        text: "Резиденція князів Любомирських, від якої до наших днів зберіглась частина будівлі та парк."
    },
    {
        id: 3,
        name: "Рівненський академічний український музично-драматичний театр",
        year: 1939,
        image: images.theatre,
        text: "Будівля театру на Театральній площі — один з архітектурних символів центру Рівного."
    },
    {
        id: 4,
        name: "Успенська церква",
        year: 1756,
        image: images.church,
        text: "Дерев'яна церква XVIII століття — найстаріша споруда міста, пам'ятка волинської дерев'яної архітектури."
    }
];

export const photos = [
    { id: 1, src: images.tunnel, caption: "Тунель кохання" },
    { id: 2, src: images.cathedral, caption: "Свято-Воскресенський собор" },
    { id: 3, src: images.cathedralSnow, caption: "Собор узимку" },
    { id: 4, src: images.palace, caption: "Палац Любомирських" },
    { id: 5, src: images.theatre, caption: "Театр на Театральній площі" },
    { id: 6, src: images.church, caption: "Успенська церква" }
];
