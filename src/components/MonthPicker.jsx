import { MONTHS, MONTH_LABELS } from "../data/tripData";

export default function MonthPicker({ month, onChange }) {
  return (
    <div className="picker-block">
      <h2 className="picker-label">When are you going?</h2>
      <div className="month-grid">
        {MONTHS.map((m) => (
          <button
            key={m}
            type="button"
            className={`month-chip ${m === month ? "is-active" : ""}`}
            onClick={() => onChange(m)}
          >
            {MONTH_LABELS[m].slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}
