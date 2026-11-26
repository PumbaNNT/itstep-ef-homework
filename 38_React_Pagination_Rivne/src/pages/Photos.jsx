import { photos } from "../data/rivne.js";

export default function Photos() {
    return (
        <section>
            <h1>Фотографії міста</h1>
            <div className="gallery">
                {photos.map(photo => (
                    <figure key={photo.id}>
                        <img src={photo.src} alt={photo.caption} loading="lazy" />
                        <figcaption>{photo.caption}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
