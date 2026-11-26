export default function AuthorInfo({ author, date }) {
    return (
        <div className="author">
            <img className="author__avatar" src={author.avatar} alt={author.name} />
            <div>
                <a className="author__name" href={author.link} target="_blank" rel="noreferrer">
                    {author.name}
                </a>
                <div className="author__meta">{author.role} · {date}</div>
                <p className="author__bio">{author.bio}</p>
            </div>
        </div>
    );
}
