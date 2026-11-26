import Header from "./components/Header.jsx";
import Article from "./components/Article.jsx";
import { article } from "./data.js";

// Головний компонент: дані передаються дочірнім компонентам через props
export default function App() {
    return (
        <>
            <Header siteName="Tech Notes" links={["Головна", "Статті", "Про нас"]} />
            <main className="container">
                <Article
                    title={article.title}
                    author={article.author}
                    date={article.date}
                    cover={article.cover}
                    sections={article.sections}
                    tags={article.tags}
                />
            </main>
        </>
    );
}
