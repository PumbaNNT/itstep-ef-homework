import AuthorInfo from "./AuthorInfo.jsx";
import Section from "./Section.jsx";
import Tags from "./Tags.jsx";

export default function Article({ title, author, date, cover, sections, tags }) {
    return (
        <article className="article">
            <h1 className="article__title">{title}</h1>
            <AuthorInfo author={author} date={date} />
            <img className="article__cover" src={cover.src} alt={cover.alt} />
            {sections.map(section => (
                <Section key={section.heading} heading={section.heading} text={section.text} />
            ))}
            <Tags tags={tags} />
        </article>
    );
}
