import { useRef } from "react";

// Shared scroll-snap shell for any card gallery (activities, dishes, beaches).
// Cards inside must carry the "gallery-card" class so arrow-scroll can find
// snap boundaries generically, regardless of what kind of card it is.
export default function CardTrack({ children, className = "" }) {
  const trackRef = useRef(null);

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.querySelectorAll(".gallery-card")];
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
    <div className={`card-gallery ${className}`}>
      <button
        type="button"
        className="card-gallery-arrow card-gallery-arrow-left"
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll left"
      >
        ‹
      </button>
      <div className="card-gallery-track" ref={trackRef}>
        {children}
      </div>
      <button
        type="button"
        className="card-gallery-arrow card-gallery-arrow-right"
        onClick={() => scrollByCard(1)}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}
