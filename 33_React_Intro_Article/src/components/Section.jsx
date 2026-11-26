export default function Section({ heading, text }) {
    return (
        <section className="section">
            <h2>{heading}</h2>
            <p>{text}</p>
        </section>
    );
}
