export default function DestinationSelector({
  destinations,
  selectedIds,
  onToggle,
}) {
  return (
    <div className="picker-block">
      <h2 className="picker-label">Where do you want to go?</h2>
      <p className="picker-sublabel">
        Istanbul is your gateway city — everyone flies in and out from there.
      </p>
      <div className="destination-grid">
        {destinations.map((d) => {
          const selected = selectedIds.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              disabled={d.mandatory}
              className={`destination-card ${selected ? "is-selected" : ""} ${
                d.mandatory ? "is-mandatory" : ""
              }`}
              onClick={() => !d.mandatory && onToggle(d.id)}
            >
              <span className="destination-order">{d.order}</span>
              <span className="destination-name">{d.name}</span>
              <span className="destination-vibe">{d.vibe}</span>
              {d.mandatory && <span className="destination-tag">Gateway city</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
