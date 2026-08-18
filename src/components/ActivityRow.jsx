import { useState } from "react";

export default function ActivityRow({ activity, checked, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`activity-row ${expanded ? "is-expanded" : ""}`}>
      <label className="activity-row-main">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(activity.id)}
        />
        <span className="activity-row-name">{activity.name}</span>
        <span className="activity-row-meta">
          {activity.pricePerPerson === 0 ? "Free" : `£${activity.pricePerPerson}pp`}
          {" · "}
          {activity.durationHours}h
        </span>
        <button
          type="button"
          className="activity-row-expand"
          aria-label={expanded ? "Hide details" : "Show details"}
          onClick={(e) => {
            e.preventDefault();
            setExpanded((v) => !v);
          }}
        >
          {expanded ? "−" : "+"}
        </button>
      </label>
      {expanded && (
        <p className="activity-row-description">{activity.description}</p>
      )}
    </div>
  );
}
