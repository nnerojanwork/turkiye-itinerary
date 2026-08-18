export default function RouteTimeline({ selectedDestinations, nightsByDestination }) {
  return (
    <div className="timeline-block">
      <h2 className="picker-label">Your route</h2>
      <div className="timeline-strip">
        {selectedDestinations.map((d, i) => (
          <div className="timeline-stop" key={d.id}>
            <div className="timeline-node">
              <span className="timeline-dot" />
              {i < selectedDestinations.length - 1 && (
                <span className="timeline-connector" />
              )}
            </div>
            <div className="timeline-info">
              <span className="timeline-name">{d.name}</span>
              <span className="timeline-nights">
                {nightsByDestination[d.id] ?? 0} nights
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
