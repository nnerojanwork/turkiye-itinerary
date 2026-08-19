# Türkiye — Choose Your Own Itinerary

An interactive trip-planning pitch for a group of 8. Pick a travel month, a
trip length, and a subset of Turkish destinations (Istanbul is always first,
as the international gateway) — the app builds a route, suggests a night
allocation per stop, and produces a live per-person cost estimate.

## Stack

React 19 + Vite, no backend. All pricing and activity data lives under
[`src/data/`](src/data) — nothing is hardcoded in components.

- [`tripData.js`](src/data/tripData.js) — per-destination flight/Airbnb
  pricing, sourced Aug 2026 (see the file header for methodology and
  confidence notes).
- [`turkey_activities.json`](src/data/turkey_activities.json) — activity
  name/description/price/duration per destination.
- [`turkey_activity_links.json`](src/data/turkey_activity_links.json) —
  booking URLs and Wikipedia page titles per activity, merged onto the
  activities above by id (see [`activities.js`](src/data/activities.js)).
- [`turkey_food.json`](src/data/turkey_food.json) — a flat list of dishes
  (browse-only, no cost impact) with category, dietary tags, `spiceLevel`,
  `richness`, a derived `safeOption` flag, and an optional `regionHighlight`
  used for the "What to Eat" tab and the per-destination "Local specialties"
  strip.
- [`turkey_beaches.json`](src/data/turkey_beaches.json) — per-destination
  beach lists, or a `note` explaining why a landlocked stop has none.

All gallery images (activities, dishes, beaches) are fetched at runtime from
the Wikipedia REST API (`/page/summary/{title}`) using each item's
`wikipediaTitle`, via the shared [`useWikipediaImages`](src/hooks/useWikipediaImages.js)
hook, and cached in memory for the session — no image files are hosted in the
repo. Titles with no dedicated Wikipedia article (common for specific
regional dishes) fall back to a client-side Wikimedia Commons image search
rather than leaving the card on its gradient placeholder. The scroll-snap
card shell itself ([`CardTrack.jsx`](src/components/CardTrack.jsx)) is shared
across all three galleries.

## Calculation logic

- **Flights**: one London ↔ Istanbul return (month-indexed) plus one
  Istanbul ↔ [destination] domestic hop per additional stop selected.
- **Airbnb**: `(monthly per-night group-of-8 rate ÷ 8) × nights` for each stop.
- **Activities**: sum of `pricePerPerson` across every activity selected in
  the gallery, per destination.
- **Food**: a flat per-person daily rate (editable in `tripData.js` under
  `defaults.foodPerPersonPerDay`), tracked separately from activities.

Flight/Airbnb figures are sourced estimates (see `tripData.js`); activity
prices were sourced in EUR and converted to GBP at a fixed placeholder rate
(see `turkey_activities.json`). Entries marked `sourced: false` are estimates
— verify before using this for a real budget.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
