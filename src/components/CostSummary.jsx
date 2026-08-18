const gbp = (n) =>
  n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

export default function CostSummary({ costs, groupSize, tripLength, foodPerPersonPerDay }) {
  const {
    flightToIstanbul,
    domesticFlights,
    flightsTotal,
    airbnbByStop,
    airbnbTotal,
    foodTotal,
    selectedActivities,
    activitiesTotal,
    perPersonTotal,
    groupTotal,
  } = costs;

  return (
    <aside className="cost-summary">
      <h2 className="cost-title">Per-person estimate</h2>
      <div className="cost-hero">{gbp(perPersonTotal)}</div>
      <div className="cost-hero-sub">
        {gbp(groupTotal)} total for {groupSize} people
      </div>

      <div className="cost-section">
        <div className="cost-section-title">Flights</div>
        <div className="cost-line">
          <span>London ↔ Istanbul</span>
          <span>{gbp(flightToIstanbul)}</span>
        </div>
        {domesticFlights > 0 && (
          <div className="cost-line">
            <span>Domestic hops from Istanbul</span>
            <span>{gbp(domesticFlights)}</span>
          </div>
        )}
        <div className="cost-line cost-line-subtotal">
          <span>Flights subtotal</span>
          <span>{gbp(flightsTotal)}</span>
        </div>
      </div>

      <div className="cost-section">
        <div className="cost-section-title">Airbnb</div>
        {airbnbByStop.map((s) => (
          <div className="cost-line" key={s.id}>
            <span>
              {s.name} · {s.nights}n
            </span>
            <span>{gbp(s.perPersonCost)}</span>
          </div>
        ))}
        <div className="cost-line cost-line-subtotal">
          <span>Airbnb subtotal</span>
          <span>{gbp(airbnbTotal)}</span>
        </div>
      </div>

      <div className="cost-section">
        <div className="cost-section-title">Activities</div>
        {selectedActivities.length === 0 ? (
          <div className="cost-line">
            <span>None selected</span>
            <span>{gbp(0)}</span>
          </div>
        ) : (
          selectedActivities.map((a) => (
            <div className="cost-line" key={a.id}>
              <span>{a.name}</span>
              <span>{gbp(a.pricePerPerson)}</span>
            </div>
          ))
        )}
        <div className="cost-line cost-line-subtotal">
          <span>Activities subtotal</span>
          <span>{gbp(activitiesTotal)}</span>
        </div>
      </div>

      <div className="cost-section">
        <div className="cost-section-title">Food</div>
        <div className="cost-line">
          <span>
            {gbp(foodPerPersonPerDay)}/day × {tripLength} days
          </span>
          <span>{gbp(foodTotal)}</span>
        </div>
      </div>

      <div className="cost-line cost-line-total">
        <span>Total per person</span>
        <span>{gbp(perPersonTotal)}</span>
      </div>
    </aside>
  );
}
