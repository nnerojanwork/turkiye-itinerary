const PRESETS = [7, 10, 14];

export default function TripLengthPicker({ tripLength, onChange }) {
  return (
    <div className="picker-block">
      <h2 className="picker-label">How many days?</h2>
      <div className="length-row">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            className={`preset-chip ${tripLength === p ? "is-active" : ""}`}
            onClick={() => onChange(p)}
          >
            {p} days
          </button>
        ))}
      </div>
      <div className="slider-row">
        <input
          type="range"
          min={3}
          max={21}
          value={tripLength}
          onChange={(e) => onChange(Number(e.target.value))}
          className="length-slider"
        />
        <span className="slider-value">{tripLength} days</span>
      </div>
    </div>
  );
}
