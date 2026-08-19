import { useState } from "react";
import { useWikipediaImages } from "../hooks/useWikipediaImages";
import CardTrack from "./CardTrack";

function BeachCard({ beach, imageState }) {
  const isLoading = imageState === undefined;
  const imageUrl = imageState || null;

  return (
    <div className="gallery-card beach-card">
      <div className="beach-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={beach.name} loading="lazy" />
        ) : (
          <div className="activity-card-placeholder">
            <span className="activity-card-placeholder-label">
              {isLoading ? "Loading…" : beach.name}
            </span>
          </div>
        )}
      </div>
      <div className="beach-card-body">
        <h4 className="beach-card-name">{beach.name}</h4>
        <p className="beach-card-distance">{beach.distanceFromCenter}</p>
        <p className="beach-card-description">{beach.description}</p>
      </div>
    </div>
  );
}

export default function BeachSection({ destination }) {
  const [expanded, setExpanded] = useState(false);
  const beaches = destination.beaches ?? [];
  const images = useWikipediaImages(beaches);

  if (beaches.length === 0 && !destination.beachesNote) return null;

  return (
    <div className="beach-section">
      <button
        type="button"
        className="beach-section-toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="beach-wave-icon" aria-hidden="true">
          〰
        </span>
        Nearby beaches
        <span className="beach-section-chevron">{expanded ? "▾" : "▸"}</span>
      </button>

      {expanded &&
        (beaches.length > 0 ? (
          <div className="beach-section-cards">
            <CardTrack>
              {beaches.map((b) => (
                <BeachCard key={b.id} beach={b} imageState={images[b.id]} />
              ))}
            </CardTrack>
          </div>
        ) : (
          <p className="beach-section-note">{destination.beachesNote}</p>
        ))}
    </div>
  );
}
