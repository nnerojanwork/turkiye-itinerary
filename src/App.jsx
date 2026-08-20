import { useEffect, useMemo, useState } from "react";
import { destinations, defaults } from "./data/tripData";
import { suggestNightAllocation, calculateCosts } from "./utils/calculations";
import MonthPicker from "./components/MonthPicker";
import TripLengthPicker from "./components/TripLengthPicker";
import DestinationSelector from "./components/DestinationSelector";
import NightAllocator from "./components/NightAllocator";
import ActivitySelector from "./components/ActivitySelector";
import RouteTimeline from "./components/RouteTimeline";
import CostSummary from "./components/CostSummary";
import FoodExplorer from "./components/FoodExplorer";
import ComparisonTab from "./components/ComparisonTab";
import TripMap from "./components/TripMap";
import GalleryTab from "./components/GalleryTab";
import { dishes } from "./data/food";
import { buildPresets } from "./data/presets";
import "./App.css";

const sortedDestinations = [...destinations].sort((a, b) => a.order - b.order);
const gatewayId = sortedDestinations.find((d) => d.isGateway)?.id;
const destinationsById = Object.fromEntries(sortedDestinations.map((d) => [d.id, d]));
const presets = buildPresets(sortedDestinations);

function defaultActivityIds(destinationId) {
  return (destinationsById[destinationId]?.activities ?? [])
    .filter((a) => a.defaultSelected)
    .map((a) => a.id);
}

const initialSelectedIds = [gatewayId, "cappadocia", "pamukkale"];

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [foodRegionFilter, setFoodRegionFilter] = useState(null);
  const [month, setMonth] = useState("jun");
  const [tripLength, setTripLength] = useState(10);
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);
  const [nightsByDestination, setNightsByDestination] = useState({});
  const [manuallyEdited, setManuallyEdited] = useState(false);
  const [selectedActivitiesByDestination, setSelectedActivitiesByDestination] = useState(
    () =>
      Object.fromEntries(
        initialSelectedIds.map((id) => [id, defaultActivityIds(id)])
      )
  );

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
    setSelectedActivitiesByDestination((prev) => {
      if (prev[id]) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: defaultActivityIds(id) };
    });
  }

  function adjustNights(id, delta) {
    setManuallyEdited(true);
    setNightsByDestination((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  }

  function viewFoodForDestination(destinationId) {
    setFoodRegionFilter(destinationId);
    setActiveTab("food");
  }

  function applyPreset(presetKey) {
    const preset = presets[presetKey];
    if (!preset) return;
    setSelectedIds(preset.destinationIds);
    setTripLength(preset.tripLength);
    setMonth(preset.month);
    setNightsByDestination(preset.nights);
    setManuallyEdited(true);
    setSelectedActivitiesByDestination(preset.activities);
    setActiveTab("itinerary");
  }

  function toggleActivity(destinationId, activityId) {
    setSelectedActivitiesByDestination((prev) => {
      const current = prev[destinationId] ?? [];
      const next = current.includes(activityId)
        ? current.filter((a) => a !== activityId)
        : [...current, activityId];
      return { ...prev, [destinationId]: next };
    });
  }

  const costs = useMemo(
    () =>
      calculateCosts({
        selectedDestinations,
        nightsByDestination,
        selectedActivitiesByDestination,
        month,
        tripLength,
        groupSize: defaults.groupSize,
        foodPerPersonPerDay: defaults.foodPerPersonPerDay,
      }),
    [
      selectedDestinations,
      nightsByDestination,
      selectedActivitiesByDestination,
      month,
      tripLength,
    ]
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Choose your own itinerary</p>
        <h1 className="app-title">
          Türkiye
          <svg
            className="flag-badge"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="48" fill="#e30a17" />
            <circle cx="38" cy="50" r="26" fill="#fff" />
            <circle cx="46" cy="50" r="26" fill="#e30a17" />
            <polygon
              fill="#fff"
              points="66,41 68.06,47.17 74.56,47.22 69.33,51.08 71.29,57.28 66,53.5 60.71,57.28 62.67,51.08 57.44,47.22 63.94,47.17"
            />
          </svg>
        </h1>
        <p className="app-subtitle">
          Pick a month, a trip length, and the stops that call to you — the
          route, nights, and per-person cost build themselves for a group of{" "}
          {defaults.groupSize}.
        </p>
        <nav className="app-tabs">
          <button
            type="button"
            className={`app-tab ${activeTab === "itinerary" ? "is-active" : ""}`}
            onClick={() => setActiveTab("itinerary")}
          >
            Build Your Trip
          </button>
          <button
            type="button"
            className={`app-tab ${activeTab === "food" ? "is-active" : ""}`}
            onClick={() => setActiveTab("food")}
          >
            What to Eat
          </button>
          <button
            type="button"
            className={`app-tab ${activeTab === "compare" ? "is-active" : ""}`}
            onClick={() => setActiveTab("compare")}
          >
            Quick Trip vs. Full Odyssey
          </button>
          <button
            type="button"
            className={`app-tab ${activeTab === "gallery" ? "is-active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            Sights & Flavors
          </button>
        </nav>
      </header>

      {activeTab === "itinerary" ? (
        <>
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
              <ActivitySelector
                selectedDestinations={selectedDestinations}
                selectedActivitiesByDestination={selectedActivitiesByDestination}
                onToggleActivity={toggleActivity}
                onViewFoodForDestination={viewFoodForDestination}
              />
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
              foodPerPersonPerDay={defaults.foodPerPersonPerDay}
            />
          </main>

          <TripMap
            selectedDestinations={selectedDestinations}
            nightsByDestination={nightsByDestination}
          />
        </>
      ) : activeTab === "food" ? (
        <main className="app-main app-main-single">
          <FoodExplorer
            dishes={dishes}
            destinationsById={destinationsById}
            regionFilter={foodRegionFilter}
            onClearRegionFilter={() => setFoodRegionFilter(null)}
          />
        </main>
      ) : activeTab === "compare" ? (
        <main className="app-main app-main-single">
          <ComparisonTab
            presets={presets}
            allDestinations={sortedDestinations}
            onCustomize={applyPreset}
          />
        </main>
      ) : (
        <main className="app-main app-main-single">
          <GalleryTab />
        </main>
      )}
    </div>
  );
}
