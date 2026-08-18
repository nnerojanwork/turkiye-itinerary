// Pure functions — no component should compute cost math inline.

export function suggestNightAllocation(selectedDestinations, tripLength) {
  const totalRecommended = selectedDestinations.reduce(
    (sum, d) => sum + d.recommendedNights,
    0
  );

  if (totalRecommended === 0) return {};

  const scale = tripLength / totalRecommended;

  const raw = selectedDestinations.map((d) => ({
    id: d.id,
    nights: Math.max(1, Math.round(d.recommendedNights * scale)),
  }));

  let diff = tripLength - raw.reduce((sum, r) => sum + r.nights, 0);
  let i = 0;
  const guard = raw.length * 20;
  let steps = 0;
  while (diff !== 0 && raw.length > 0 && steps < guard) {
    const idx = i % raw.length;
    if (diff > 0) {
      raw[idx].nights += 1;
      diff -= 1;
    } else if (raw[idx].nights > 1) {
      raw[idx].nights -= 1;
      diff += 1;
    }
    i += 1;
    steps += 1;
  }

  return Object.fromEntries(raw.map((r) => [r.id, r.nights]));
}

export function calculateCosts({
  selectedDestinations,
  nightsByDestination,
  selectedActivitiesByDestination,
  month,
  tripLength,
  groupSize,
  foodPerPersonPerDay,
}) {
  const gateway = selectedDestinations.find((d) => d.isGateway);
  const flightToIstanbul = gateway?.flightFromLondon?.[month] ?? 0;

  const domesticFlights = selectedDestinations
    .filter((d) => !d.isGateway)
    .reduce((sum, d) => sum + (d.flightFromIstanbul?.[month] ?? 0), 0);

  const flightsTotal = flightToIstanbul + domesticFlights;

  const airbnbByStop = selectedDestinations.map((d) => {
    const nights = nightsByDestination[d.id] ?? 0;
    const nightlyRate = d.airbnbPerNightGroupOf8?.[month] ?? 0;
    const perPersonCost = (nightlyRate / groupSize) * nights;
    return { id: d.id, name: d.name, nights, nightlyRate, perPersonCost };
  });

  const airbnbTotal = airbnbByStop.reduce((sum, s) => sum + s.perPersonCost, 0);

  const foodTotal = foodPerPersonPerDay * tripLength;

  const selectedActivities = selectedDestinations.flatMap((d) => {
    const selectedIds = selectedActivitiesByDestination[d.id] ?? [];
    return (d.activities ?? [])
      .filter((a) => selectedIds.includes(a.id))
      .map((a) => ({ ...a, destinationId: d.id, destinationName: d.name }));
  });

  const activitiesTotal = selectedActivities.reduce(
    (sum, a) => sum + a.pricePerPerson,
    0
  );

  const perPersonTotal = flightsTotal + airbnbTotal + foodTotal + activitiesTotal;
  const groupTotal = perPersonTotal * groupSize;

  return {
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
  };
}
