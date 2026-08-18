import { useEffect, useMemo, useState } from "react";
import { destinations, defaults } from "./data/tripData";
import { suggestNightAllocation, calculateCosts } from "./utils/calculations";
import MonthPicker from "./components/MonthPicker";
import TripLengthPicker from "./components/TripLengthPicker";
import DestinationSelector from "./components/DestinationSelector";
import NightAllocator from "./components/NightAllocator";
import RouteTimeline from "./components/RouteTimeline";
import CostSummary from "./components/CostSummary";
import "./App.css";

const sortedDestinations = [...destinations].sort((a, b) => a.order - b.order);
const gatewayId = sortedDestinations.find((d) => d.isGateway)?.id;

export default function App() {
  const [month, setMonth] = useState("jun");
  const [tripLength, setTripLength] = useState(10);
  const [selectedIds, setSelectedIds] = useState([
    gatewayId,
    "cappadocia",
    "pamukkale",
  ]);
  const [nightsByDestination, setNightsByDestination] = useState({});
  const [manuallyEdited, setManuallyEdited] = useState(false);

  const selectedDestinations = useMemo(
    () => sortedDestinations.filter((d) => selectedIds.includes(d.id)),
    [selectedIds]
  );

  useEffect(() => {
    if (manuallyEdited) return;
    setNightsByDestination(
      suggestNightAllocation(selectedDestinations, tripLength)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds, tripLength]);

  function toggleDestination(id) {
    setManuallyEdited(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function adjustNights(id, delta) {
    setManuallyEdited(true);
    setNightsByDestination((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  }

  const costs = useMemo(
    () =>
      calculateCosts({
        selectedDestinations,
        nightsByDestination,
        month,
        tripLength,
        groupSize: defaults.groupSize,
        foodPerPersonPerDay: defaults.foodAndActivitiesPerPersonPerDay,
      }),
    [selectedDestinations, nightsByDestination, month, tripLength]
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Choose your own itinerary</p>
        <h1 className="app-title">Türkiye</h1>
        <p className="app-subtitle">
          Pick a month, a trip length, and the stops that call to you — the
          route, nights, and per-person cost build themselves for a group of{" "}
          {defaults.groupSize}.
        </p>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <MonthPicker month={month} onChange={setMonth} />
          <TripLengthPicker tripLength={tripLength} onChange={setTripLength} />
          <DestinationSelector
            destinations={sortedDestinations}
            selectedIds={selectedIds}
            onToggle={toggleDestination}
          />
          {selectedDestinations.length > 0 && (
            <NightAllocator
              selectedDestinations={selectedDestinations}
              nightsByDestination={nightsByDestination}
              tripLength={tripLength}
              onAdjust={adjustNights}
            />
          )}
          {selectedDestinations.length > 0 && (
            <RouteTimeline
              selectedDestinations={selectedDestinations}
              nightsByDestination={nightsByDestination}
            />
          )}
        </div>

        <CostSummary
          costs={costs}
          groupSize={defaults.groupSize}
          tripLength={tripLength}
          foodPerPersonPerDay={defaults.foodAndActivitiesPerPersonPerDay}
        />
      </main>
    </div>
  );
}
