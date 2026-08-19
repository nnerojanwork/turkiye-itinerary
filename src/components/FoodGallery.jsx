import { useWikipediaImages } from "../hooks/useWikipediaImages";
import CardTrack from "./CardTrack";

const SPICE_LABEL = { none: "No spice", mild: "🌶️ Mild", medium: "🌶️🌶️ Medium", hot: "🌶️🌶️🌶️ Hot" };
const RICHNESS_LABEL = { light: "Light", moderate: "Moderate", rich: "Rich" };

function DishCard({ dish, imageState, destinationsById }) {
  const isLoading = imageState === undefined;
  const imageUrl = imageState || null;
  const badgeDestination = !dish.availableEverywhere && dish.regionHighlight?.[0]
    ? destinationsById[dish.regionHighlight[0]]
    : null;

  return (
    <div className="gallery-card dish-card">
      <div className="dish-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={dish.name} loading="lazy" />
        ) : (
          <div className="activity-card-placeholder">
            <span className="activity-card-placeholder-label">
              {isLoading ? "Loading…" : dish.name}
            </span>
          </div>
        )}
        {badgeDestination && (
          <span className="dish-card-badge">{badgeDestination.name} specialty</span>
        )}
        {(dish.spiceLevel || dish.richness) && (
          <div className="dish-card-meta">
            {dish.spiceLevel && (
              <span className="dish-card-spice">{SPICE_LABEL[dish.spiceLevel]}</span>
            )}
            {dish.richness && (
              <span className="dish-card-richness">{RICHNESS_LABEL[dish.richness]}</span>
            )}
          </div>
        )}
      </div>

      <div className="dish-card-body">
        <h3 className="dish-card-name">{dish.name}</h3>
        <p className="dish-card-turkish">{dish.turkishName}</p>
        <p className="dish-card-description">{dish.description}</p>
      </div>

      {(dish.dietary?.length > 0 || dish.safeOption) && (
        <div className="dish-card-tags">
          {dish.safeOption && (
            <span className="dish-tag dish-tag-safe">gentle option</span>
          )}
          {dish.dietary?.map((tag) => (
            <span key={tag} className="dish-tag">
              {tag.replace("-", " ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FoodGallery({ dishes, destinationsById }) {
  const images = useWikipediaImages(dishes);

  if (dishes.length === 0) {
    return <p className="food-empty">No dishes match these filters.</p>;
  }

  return (
    <CardTrack>
      {dishes.map((d) => (
        <DishCard
          key={d.id}
          dish={d}
          imageState={images[d.id]}
          destinationsById={destinationsById}
        />
      ))}
    </CardTrack>
  );
}
