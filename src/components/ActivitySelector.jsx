import ActivityGallery from "./ActivityGallery";
import BeachSection from "./BeachSection";
import { dishesForDestination } from "../data/food";

export default function ActivitySelector({
  selectedDestinations,
  selectedActivitiesByDestination,
  onToggleActivity,
  onViewFoodForDestination,
}) {
  const relevantDestinations = selectedDestinations.filter(
    (d) =>
      (d.activities ?? []).length > 0 ||
      (d.beaches ?? []).length > 0 ||
      d.beachesNote
  );

  if (relevantDestinations.length === 0) return null;

  return (
    <div className="picker-block">
      <h2 className="picker-label">Activities</h2>
      <p className="picker-sublabel">
        Pre-picked highlights per stop — swipe through, add or drop what you
        want.
      </p>
      <div className="activity-groups">
        {relevantDestinations.map((d) => {
          const specialties = dishesForDestination(d.id);
          return (
            <div className="activity-group" key={d.id}>
              <h3 className="activity-group-title">{d.name}</h3>

              {specialties.length > 0 && (
                <div className="local-specialties">
                  <span className="local-specialties-label">
                    Local specialties
                  </span>
                  {specialties.slice(0, 4).map((dish) => (
                    <span key={dish.id} className="local-specialty-chip">
                      {dish.name}
                    </span>
                  ))}
                  <button
                    type="button"
                    className="local-specialties-link"
                    onClick={() => onViewFoodForDestination(d.id)}
                  >
                    See all in Food →
                  </button>
                </div>
              )}

              {(d.activities ?? []).length > 0 && (
                <ActivityGallery
                  activities={d.activities}
                  selectedIds={selectedActivitiesByDestination[d.id] ?? []}
                  onToggle={(activityId) => onToggleActivity(d.id, activityId)}
                />
              )}

              <BeachSection destination={d} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
