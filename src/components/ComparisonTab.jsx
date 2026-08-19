import { calculateCosts } from "../utils/calculations";
import { defaults } from "../data/tripData";

const gbp = (n) =>
  n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

function presetCosts(preset) {
  return calculateCosts({
    selectedDestinations: preset.destinations,
    nightsByDestination: preset.nights,
    selectedActivitiesByDestination: preset.activities,
    month: preset.month,
    tripLength: preset.tripLength,
    groupSize: defaults.groupSize,
    foodPerPersonPerDay: defaults.foodPerPersonPerDay,
  });
}

function PresetCard({ preset, accentClass, onCustomize }) {
  const costs = presetCosts(preset);

  return (
    <div className={`compare-card ${accentClass}`}>
      <h3 className="compare-card-title">{preset.label}</h3>
      <p className="compare-card-meta">
        {preset.tripLength} days · {preset.destinations.length} stops
      </p>

      <div className="compare-card-chips">
        {preset.destinations.map((d, i) => (
          <span key={d.id} className="compare-card-chip">
            {i + 1}. {d.name}
          </span>
        ))}
      </div>

      <div className="compare-card-cost">
        <span className="compare-card-cost-value">
          {gbp(costs.perPersonTotal)}
        </span>
        <span className="compare-card-cost-label">
          per person · {gbp(costs.groupTotal)} for {defaults.groupSize}
        </span>
      </div>

      <button type="button" className="compare-card-button" onClick={onCustomize}>
        Customize from here →
      </button>
    </div>
  );
}

function PresetTimeline({ allDestinations, quickTripIds }) {
  return (
    <div className="compare-timeline">
      {allDestinations.map((d) => (
        <div
          key={d.id}
          className={`compare-timeline-stop ${
            quickTripIds.includes(d.id) ? "is-quick" : "is-full"
          }`}
        >
          <span className="compare-timeline-dot" />
          <span className="compare-timeline-name">{d.name}</span>
        </div>
      ))}
      <div className="compare-timeline-legend">
        <span className="compare-timeline-legend-item">
          <span className="compare-timeline-dot is-quick" /> Quick Trip
        </span>
        <span className="compare-timeline-legend-item">
          <span className="compare-timeline-dot is-full" /> Rest of the route
        </span>
      </div>
    </div>
  );
}

export default function ComparisonTab({ presets, allDestinations, onCustomize }) {
  return (
    <div className="picker-block compare-block">
      <h2 className="picker-label">
        Turkey isn't one pitch, it's both tracks in one country
      </h2>
      <p className="picker-sublabel">
        Every stop here is a self-contained 2–4 day block connected by a real
        flight or transfer — so cutting the trip short doesn't mean an
        awkward backtrack, and stretching it out doesn't mean padding. Same
        destinations, same cost logic, two very different trip lengths.
      </p>

      <div className="compare-cards">
        <PresetCard
          preset={presets.quickTrip}
          accentClass="compare-card-quick"
          onCustomize={() => onCustomize("quickTrip")}
        />
        <PresetCard
          preset={presets.fullOdyssey}
          accentClass="compare-card-full"
          onCustomize={() => onCustomize("fullOdyssey")}
        />
      </div>

      <PresetTimeline
        allDestinations={allDestinations}
        quickTripIds={presets.quickTrip.destinationIds}
      />
    </div>
  );
}
