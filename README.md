# Türkiye — Choose Your Own Itinerary

An interactive trip-planning pitch for a group of 8. Pick a travel month, a
trip length, and a subset of Turkish destinations (Istanbul is always first,
as the international gateway) — the app builds a route, suggests a night
allocation per stop, and produces a live per-person cost estimate.

## Stack

React 19 + Vite, no backend. All pricing data lives in
[`src/data/tripData.js`](src/data/tripData.js) — nothing is hardcoded in
components.

## Calculation logic

- **Flights**: one London ↔ Istanbul return (month-indexed) plus one
  Istanbul ↔ [destination] domestic hop per additional stop selected.
- **Airbnb**: `(monthly per-night group-of-8 rate ÷ 8) × nights` for each stop.
- **Food & activities**: a flat per-person daily rate (editable in
  `src/data/tripData.js` under `defaults.foodAndActivitiesPerPersonPerDay`).

All prices are placeholder figures with realistic seasonal shape — swap in
real quotes before using this for actual budgeting.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
