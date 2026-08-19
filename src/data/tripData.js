// Flights and Airbnb are in GBP, sourced Aug 2026 (see _methodology below).
// Activity data lives in turkey_activities.json / turkey_activity_links.json —
// see ./activities.js for how it's merged in. Nothing here is hardcoded in components.

import { activitiesByDestination } from "./activities";
import { beachesByDestination } from "./beaches";

export const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

export const MONTH_LABELS = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", oct: "October", nov: "November", dec: "December",
};

// currency: GBP, groupSize: 8. Flights are per-person return trips built from
// live search-engine averages (Aug 2026), spread across 12 months using each
// route's own documented cheap/expensive months. Airbnb is per-night, whole-place
// rate sized for a group of 8. Confidence: medium-high for flights (real fare
// data, moves daily), medium for Airbnb (planning estimate — pull 2-3 actual
// whole-place listings per destination before finalizing). Last updated 2026-08-18.
const baseDestinations = [
  {
    id: "istanbul",
    name: "Istanbul",
    order: 1,
    isGateway: true,
    mandatory: true,
    recommendedNights: 3,
    vibe: "History, culture, museums, street food",
    blurb: "Where East meets West — mosques, bazaars, and the Bosphorus skyline.",
    flightFromLondon: {
      jan: 145, feb: 130, mar: 150, apr: 175, may: 190, jun: 215,
      jul: 270, aug: 265, sep: 150, oct: 175, nov: 115, dec: 140,
    },
    airbnbPerNightGroupOf8: {
      jan: 110, feb: 100, mar: 120, apr: 140, may: 160, jun: 180,
      jul: 210, aug: 220, sep: 170, oct: 150, nov: 110, dec: 130,
    },
  },
  {
    id: "cappadocia",
    name: "Cappadocia (Göreme)",
    order: 2,
    isGateway: false,
    recommendedNights: 3,
    vibe: "Landscapes, balloon flights, underground cities",
    blurb: "Cave hotels, fairy chimneys, and sunrise hot-air balloons over the valley.",
    flightFromIstanbul: {
      jan: 55, feb: 50, mar: 60, apr: 70, may: 80, jun: 90,
      jul: 100, aug: 105, sep: 75, oct: 60, nov: 45, dec: 50,
    },
    airbnbPerNightGroupOf8: {
      jan: 140, feb: 130, mar: 160, apr: 200, may: 230, jun: 260,
      jul: 290, aug: 300, sep: 250, oct: 200, nov: 150, dec: 160,
    },
  },
  {
    id: "gaziantep",
    name: "Gaziantep",
    order: 3,
    isGateway: false,
    recommendedNights: 2,
    vibe: "Food scene, mosaics, old city",
    blurb: "Turkey's culinary capital — baklava, kebabs, and the Zeugma mosaics.",
    flightFromIstanbul: {
      jan: 60, feb: 45, mar: 55, apr: 65, may: 75, jun: 85,
      jul: 95, aug: 100, sep: 70, oct: 60, nov: 50, dec: 55,
    },
    airbnbPerNightGroupOf8: {
      jan: 70, feb: 65, mar: 75, apr: 85, may: 90, jun: 95,
      jul: 100, aug: 100, sep: 90, oct: 80, nov: 70, dec: 70,
    },
  },
  {
    id: "pamukkale",
    name: "Pamukkale",
    order: 4,
    isGateway: false,
    recommendedNights: 2,
    vibe: "Travertines, Hierapolis ruins",
    blurb: "White mineral terraces and the ruins of an ancient Roman spa town.",
    flightFromIstanbul: {
      jan: 90, feb: 80, mar: 95, apr: 110, may: 120, jun: 130,
      jul: 150, aug: 155, sep: 115, oct: 95, nov: 75, dec: 85,
    },
    airbnbPerNightGroupOf8: {
      jan: 75, feb: 70, mar: 85, apr: 100, may: 115, jun: 125,
      jul: 140, aug: 145, sep: 120, oct: 100, nov: 75, dec: 75,
    },
  },
  {
    id: "ephesus",
    name: "Ephesus / Selçuk",
    order: 5,
    isGateway: false,
    recommendedNights: 2,
    vibe: "Ancient ruins",
    blurb: "One of the best-preserved classical cities in the Mediterranean.",
    flightFromIstanbul: {
      jan: 55, feb: 45, mar: 55, apr: 65, may: 75, jun: 85,
      jul: 95, aug: 100, sep: 70, oct: 60, nov: 45, dec: 50,
    },
    airbnbPerNightGroupOf8: {
      jan: 75, feb: 70, mar: 85, apr: 100, may: 115, jun: 130,
      jul: 150, aug: 155, sep: 125, oct: 100, nov: 75, dec: 75,
    },
  },
  {
    id: "bodrum",
    name: "Bodrum",
    order: 6,
    isGateway: false,
    recommendedNights: 3,
    vibe: "Coast, castle, boat trips",
    blurb: "Whitewashed marina town with a crusader castle and turquoise coves.",
    flightFromIstanbul: {
      jan: 70, feb: 55, mar: 70, apr: 85, may: 95, jun: 110,
      jul: 130, aug: 135, sep: 90, oct: 75, nov: 55, dec: 60,
    },
    airbnbPerNightGroupOf8: {
      jan: 120, feb: 110, mar: 130, apr: 160, may: 190, jun: 230,
      jul: 300, aug: 320, sep: 250, oct: 190, nov: 130, dec: 130,
    },
  },
  {
    id: "antalya",
    name: "Antalya / Kaleiçi",
    order: 7,
    isGateway: false,
    recommendedNights: 4,
    vibe: "Beach + Roman ruins + nature",
    blurb: "Old-town alleys tumbling down to the beach, with waterfalls nearby.",
    flightFromIstanbul: {
      jan: 45, feb: 35, mar: 40, apr: 50, may: 55, jun: 65,
      jul: 80, aug: 85, sep: 55, oct: 45, nov: 30, dec: 40,
    },
    airbnbPerNightGroupOf8: {
      jan: 100, feb: 90, mar: 110, apr: 140, may: 160, jun: 190,
      jul: 230, aug: 240, sep: 190, oct: 150, nov: 100, dec: 110,
    },
  },
];

export const destinations = baseDestinations.map((d) => ({
  ...d,
  activities: activitiesByDestination[d.id] ?? [],
  beaches: beachesByDestination[d.id]?.beaches ?? [],
  beachesNote: beachesByDestination[d.id]?.note ?? null,
}));

export const defaults = {
  groupSize: 8,
  foodPerPersonPerDay: 35,
};
