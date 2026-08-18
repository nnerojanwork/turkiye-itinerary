import { useEffect, useRef, useState } from "react";

// Shared across every gallery instance so switching destinations back and
// forth never re-fetches an image already looked up this session.
const imageCache = new Map();

async function fetchWikipediaImage(wikipediaTitle) {
  if (imageCache.has(wikipediaTitle)) return imageCache.get(wikipediaTitle);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`
    );
    if (!res.ok) throw new Error(`Wikipedia summary failed: ${res.status}`);
    const data = await res.json();
    const url = data.thumbnail?.source ?? data.originalimage?.source ?? null;
    imageCache.set(wikipediaTitle, url);
    return url;
  } catch {
    imageCache.set(wikipediaTitle, null);
    return null;
  }
}

function useActivityImages(activities) {
  const [images, setImages] = useState(() => {
    const initial = {};
    for (const a of activities) {
      if (a.wikipediaTitle && imageCache.has(a.wikipediaTitle)) {
        initial[a.id] = imageCache.get(a.wikipediaTitle);
      }
    }
    return initial;
  });

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled(
      activities.map(async (a) => {
        if (!a.wikipediaTitle) return { id: a.id, url: null };
        const url = await fetchWikipediaImage(a.wikipediaTitle);
        return { id: a.id, url };
      })
    ).then((results) => {
      if (cancelled) return;
      setImages((prev) => {
        const next = { ...prev };
        for (const r of results) {
          if (r.status === "fulfilled") next[r.value.id] = r.value.url;
        }
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [activities]);

  return images;
}

function ActivityCard({ activity, imageState, selected, onToggle }) {
  const isLoading = imageState === undefined;
  const imageUrl = imageState || null;

  return (
    <div className="activity-card">
      <div className="activity-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={activity.name} loading="lazy" />
        ) : (
          <div className="activity-card-placeholder">
            {isLoading ? (
              <span className="activity-card-placeholder-label">Loading…</span>
            ) : (
              <span className="activity-card-placeholder-label">{activity.name}</span>
            )}
          </div>
        )}
        <div className="activity-card-meta">
          <span className="activity-card-price">
            {activity.pricePerPerson === 0 ? "Free" : `£${activity.pricePerPerson}pp`}
          </span>
          <span className="activity-card-duration">{activity.durationHours}h</span>
        </div>
      </div>

      <div className="activity-card-body">
        <h3 className="activity-card-name">{activity.name}</h3>
        <p className="activity-card-description">{activity.description}</p>
      </div>

      <div className="activity-card-actions">
        <button
          type="button"
          className={`activity-card-toggle ${selected ? "is-selected" : ""}`}
          onClick={() => onToggle(activity.id)}
        >
          {selected ? "Added ✓" : "Add to trip"}
        </button>
        {activity.bookingUrl && (
          <a
            className="activity-card-link"
            href={activity.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Details / Book ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ActivityGallery({ activities, selectedIds, onToggle }) {
  const trackRef = useRef(null);
  const images = useActivityImages(activities);

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.querySelectorAll(".activity-card")];
    if (cards.length === 0) return;

    const trackLeft = track.getBoundingClientRect().left;
    const currentIndex = cards.findIndex(
      (card) => card.getBoundingClientRect().left - trackLeft > -20
    );
    const targetIndex = Math.min(
      Math.max((currentIndex === -1 ? 0 : currentIndex) + direction, 0),
      cards.length - 1
    );

    track.scrollTo({ left: cards[targetIndex].offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="activity-gallery">
      <button
        type="button"
        className="activity-gallery-arrow activity-gallery-arrow-left"
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll left"
      >
        ‹
      </button>
      <div className="activity-gallery-track" ref={trackRef}>
        {activities.map((a) => (
          <ActivityCard
            key={a.id}
            activity={a}
            imageState={images[a.id]}
            selected={selectedIds.includes(a.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
      <button
        type="button"
        className="activity-gallery-arrow activity-gallery-arrow-right"
        onClick={() => scrollByCard(1)}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}
