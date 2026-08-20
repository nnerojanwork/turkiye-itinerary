import { useWikipediaImages } from "../hooks/useWikipediaImages";
import CardTrack from "./CardTrack";

function ActivityCard({ activity, imageState, selected, onToggle }) {
  // Joke entries (e.g. the Istanbul hair transplant card) ship their own
  // local image and skip the Wikipedia lookup entirely.
  const isLoading = !activity.localImage && imageState === undefined;
  const imageUrl = activity.localImage || imageState || null;

  return (
    <div className="gallery-card activity-card">
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
        {activity.isJoke && (
          <span className="activity-card-joke-badge">
            😏 not a real itinerary item
          </span>
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
  const images = useWikipediaImages(activities);

  return (
    <CardTrack>
      {activities.map((a) => (
        <ActivityCard
          key={a.id}
          activity={a}
          imageState={images[a.id]}
          selected={selectedIds.includes(a.id)}
          onToggle={onToggle}
        />
      ))}
    </CardTrack>
  );
}
