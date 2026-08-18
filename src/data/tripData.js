// All prices in GBP, per person unless noted.
// Placeholder figures — tune freely, nothing else in the app hardcodes numbers.

export const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

export const MONTH_LABELS = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", oct: "October", nov: "November", dec: "December",
};

export const destinations = [
  {
    id: "istanbul",
    name: "Istanbul",
    order: 1,
    isGateway: true,
    mandatory: true,
    recommendedNights: 3,
    vibe: "History, culture, museums",
    blurb: "Where East meets West — mosques, bazaars, and the Bosphorus skyline.",
    flightFromLondon: {
      jan: 165, feb: 170, mar: 195, apr: 215, may: 235, jun: 265,
      jul: 285, aug: 290, sep: 250, oct: 220, nov: 180, dec: 245,
    },
    airbnbPerNightGroupOf8: {
      jan: 140, feb: 145, mar: 160, apr: 180, may: 195, jun: 215,
      jul: 225, aug: 225, sep: 205, oct: 185, nov: 155, dec: 175,
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
      jan: 65, feb: 65, mar: 75, apr: 90, may: 105, jun: 100,
      jul: 95, aug: 95, sep: 105, oct: 100, nov: 70, dec: 70,
    },
    airbnbPerNightGroupOf8: {
      jan: 150, feb: 155, mar: 175, apr: 210, may: 230, jun: 220,
      jul: 210, aug: 205, sep: 225, oct: 220, nov: 165, dec: 160,
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
      jan: 60, feb: 60, mar: 65, apr: 70, may: 75, jun: 85,
      jul: 90, aug: 90, sep: 80, oct: 70, nov: 60, dec: 65,
    },
    airbnbPerNightGroupOf8: {
      jan: 90, feb: 90, mar: 95, apr: 100, may: 105, jun: 115,
      jul: 120, aug: 120, sep: 110, oct: 100, nov: 90, dec: 95,
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
      jan: 65, feb: 65, mar: 70, apr: 80, may: 90, jun: 100,
      jul: 105, aug: 105, sep: 95, oct: 85, nov: 65, dec: 70,
    },
    airbnbPerNightGroupOf8: {
      jan: 105, feb: 105, mar: 115, apr: 130, may: 140, jun: 150,
      jul: 155, aug: 155, sep: 145, oct: 130, nov: 110, dec: 110,
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
      jan: 60, feb: 60, mar: 65, apr: 75, may: 85, jun: 95,
      jul: 100, aug: 100, sep: 90, oct: 80, nov: 60, dec: 65,
    },
    airbnbPerNightGroupOf8: {
      jan: 100, feb: 100, mar: 110, apr: 125, may: 135, jun: 145,
      jul: 150, aug: 150, sep: 140, oct: 125, nov: 105, dec: 105,
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
      jan: 70, feb: 70, mar: 80, apr: 100, may: 125, jun: 155,
      jul: 175, aug: 180, sep: 150, oct: 115, nov: 75, dec: 75,
    },
    airbnbPerNightGroupOf8: {
      jan: 150, feb: 150, mar: 170, apr: 220, may: 280, jun: 340,
      jul: 395, aug: 400, sep: 330, oct: 245, nov: 165, dec: 155,
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
      jan: 65, feb: 65, mar: 75, apr: 95, may: 115, jun: 145,
      jul: 165, aug: 170, sep: 140, oct: 105, nov: 70, dec: 70,
    },
    airbnbPerNightGroupOf8: {
      jan: 140, feb: 140, mar: 160, apr: 205, may: 255, jun: 310,
      jul: 360, aug: 370, sep: 300, oct: 225, nov: 155, dec: 145,
    },
  },
];

export const defaults = {
  groupSize: 8,
  foodAndActivitiesPerPersonPerDay: 35,
};
