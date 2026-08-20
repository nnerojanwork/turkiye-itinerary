import { useGalleryImages } from "../hooks/useGalleryImages";
import { buildGalleryItems } from "../data/galleryItems";

const items = buildGalleryItems();

function GalleryTile({ item, imageUrl }) {
  if (!imageUrl) return null;

  return (
    <a
      className="gallery-tile"
      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item.wikipediaTitle)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={imageUrl} alt={item.name} loading="lazy" />
      <span className="gallery-tile-overlay">
        <span className="gallery-tile-name">{item.name}</span>
      </span>
    </a>
  );
}

export default function GalleryTab() {
  const images = useGalleryImages(items);

  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <GalleryTile key={item.id} item={item} imageUrl={images[item.id]} />
      ))}
    </div>
  );
}
