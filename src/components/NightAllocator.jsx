export default function NightAllocator({
  selectedDestinations,
  nightsByDestination,
  tripLength,
  onAdjust,
}) {
  const allocatedTotal = Object.values(nightsByDestination).reduce(
    (a, b) => a + b,
    0
  );
  const diff = tripLength - allocatedTotal;

  return (
    <div className="picker-block">
      <h2 className="picker-label">Nights per stop</h2>
      <p className="picker-sublabel">
        Auto-suggested from your trip length — nudge any stop up or down.
      </p>
      <div className="night-list">
        {selectedDestinations.map((d) => {
          const nights = nightsByDestination[d.id] ?? 0;
          return (
            <div key={d.id} className="night-row">
              <span className="night-row-name">{d.name}</span>
              <div className="night-row-controls">
                <button
                  type="button"
                  className="night-btn"
                  onClick={() => onAdjust(d.id, -1)}
                  disabled={nights <= 1}
                  aria-label={`Remove a night from ${d.name}`}
                >
                  −
                </button>
                <span className="night-count">{nights}</span>
                <button
                  type="button"
                  className="night-btn"
                  onClick={() => onAdjust(d.id, 1)}
                  aria-label={`Add a night to ${d.name}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`night-total ${diff !== 0 ? "is-off" : ""}`}>
        {allocatedTotal} of {tripLength} nights allocated
        {diff !== 0 && (
          <span className="night-total-diff">
            {" "}
            ({diff > 0 ? `${diff} unallocated` : `${Math.abs(diff)} over`})
          </span>
        )}
      </div>
    </div>
  );
}
