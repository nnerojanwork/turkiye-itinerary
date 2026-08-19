import { suggestNightAllocation } from "../utils/calculations";

function defaultActivityIds(destination) {
  return (destination.activities ?? [])
    .filter((a) => a.defaultSelected)
    .map((a) => a.id);
}

function buildPreset({ id, label, destinationIds, tripLength, month }, byId) {
  const destinations = destinationIds.map((did) => byId[did]).filter(Boolean);
  const nights = suggestNightAllocation(destinations, tripLength);
  const activities = Object.fromEntries(
    destinations.map((d) => [d.id, defaultActivityIds(d)])
  );

  return { id, label, destinationIds, destinations, tripLength, month, nights, activities };
}

// Two fixed configurations of the existing destination/activity data — the
// "Quick Trip vs. Full Odyssey" tab reuses suggestNightAllocation and
// calculateCosts rather than any bespoke calculation.
export function buildPresets(destinations) {
  const byId = Object.fromEntries(destinations.map((d) => [d.id, d]));

  return {
    quickTrip: buildPreset(
      {
        id: "quickTrip",
        label: "Quick Trip",
        destinationIds: ["istanbul", "antalya"],
        tripLength: 5,
        month: "jun",
      },
      byId
    ),
    fullOdyssey: buildPreset(
      {
        id: "fullOdyssey",
        label: "Full Odyssey",
        destinationIds: [
          "istanbul",
          "cappadocia",
          "gaziantep",
          "pamukkale",
          "ephesus",
          "bodrum",
        ],
        tripLength: 14,
        month: "jun",
      },
      byId
    ),
  };
}
