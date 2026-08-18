import ActivityGallery from "./ActivityGallery";

export default function ActivitySelector({
  selectedDestinations,
  selectedActivitiesByDestination,
  onToggleActivity,
}) {
  const destinationsWithActivities = selectedDestinations.filter(
    (d) => (d.activities ?? []).length > 0
  );

  if (destinationsWithActivities.length === 0) return null;

  return (
    <div className="picker-block">
      <h2 className="picker-label">Activities</h2>
      <p className="picker-sublabel">
        Pre-picked highlights per stop — swipe through, add or drop what you
        want.
      </p>
      <div className="activity-groups">
        {destinationsWithActivities.map((d) => (
          <div className="activity-group" key={d.id}>
            <h3 className="activity-group-title">{d.name}</h3>
            <ActivityGallery
              activities={d.activities}
              selectedIds={selectedActivitiesByDestination[d.id] ?? []}
              onToggle={(activityId) => onToggleActivity(d.id, activityId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
