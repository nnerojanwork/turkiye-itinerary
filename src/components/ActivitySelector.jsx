import ActivityRow from "./ActivityRow";

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
        Pre-picked highlights per stop — untick what you don't want, add what
        you do.
      </p>
      <div className="activity-groups">
        {destinationsWithActivities.map((d) => {
          const selectedIds = selectedActivitiesByDestination[d.id] ?? [];
          return (
            <div className="activity-group" key={d.id}>
              <h3 className="activity-group-title">{d.name}</h3>
              <div className="activity-list">
                {d.activities.map((a) => (
                  <ActivityRow
                    key={a.id}
                    activity={a}
                    checked={selectedIds.includes(a.id)}
                    onToggle={(id) => onToggleActivity(d.id, id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
