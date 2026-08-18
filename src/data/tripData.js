// All prices in GBP, per person unless noted.
// Placeholder figures — tune freely, nothing else in the app hardcodes numbers.
//
// Activity prices were sourced in EUR and converted at a fixed placeholder
// rate (see EUR_TO_GBP) so they total cleanly against the GBP flight/Airbnb
// figures above. Re-convert at the live rate before using this for a real
// pitch, and note that entries with sourced: false are estimates, not
// confirmed prices — verify before including in a budget.
const EUR_TO_GBP = 0.86;
const gbp = (eur) => Math.round(eur * EUR_TO_GBP);

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
    activities: [
      {
        id: "istanbul-bosphorus-cruise",
        name: "Bosphorus sightseeing cruise",
        description: "Sail between two continents past Dolmabahçe Palace, Ortaköy Mosque and the Bosphorus Bridge. Public ferry is the budget option; private sightseeing boats add a live guide.",
        pricePerPerson: gbp(18),
        durationHours: 1.5,
        category: "signature",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "istanbul-hagia-sophia",
        name: "Hagia Sophia",
        description: "Byzantine cathedral turned mosque turned museum turned mosque again — 1,500 years of architectural history in one building.",
        pricePerPerson: gbp(25),
        durationHours: 1.5,
        category: "self-guided",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "istanbul-topkapi-palace",
        name: "Topkapi Palace (incl. Harem)",
        description: "Ottoman sultans' residence for 400 years — courtyards, treasury, and the Harem quarters. Closed Tuesdays.",
        pricePerPerson: gbp(55),
        durationHours: 3,
        category: "self-guided",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "istanbul-basilica-cistern",
        name: "Basilica Cistern",
        description: "6th-century underground reservoir with 336 columns, including the famous upside-down Medusa heads.",
        pricePerPerson: gbp(40),
        durationHours: 1,
        category: "self-guided",
        defaultSelected: false,
        sourced: true,
      },
    ],
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
    activities: [
      {
        id: "cappadocia-balloon",
        name: "Hot-air balloon flight",
        description: "Dawn flight over fairy chimneys and valleys — the single most-photographed thing to do in Turkey. Weather-dependent; don't book on your last morning. Groups of 8 often get a 10-15% discount.",
        pricePerPerson: gbp(180),
        durationHours: 1,
        category: "signature",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "cappadocia-underground-valleys-tour",
        name: "Underground city + valleys guided tour",
        description: "Derinkuyu or Kaymaklı underground city plus Selime and valley viewpoints — sights are spread out, worth a driver/guide over DIY.",
        pricePerPerson: gbp(45),
        durationHours: 6,
        category: "guided",
        defaultSelected: false,
        sourced: false,
      },
      {
        id: "cappadocia-open-air-museum",
        name: "Göreme Open-Air Museum",
        description: "UNESCO site of rock-cut churches with Byzantine frescoes, walkable from central Göreme.",
        pricePerPerson: gbp(15),
        durationHours: 2,
        category: "self-guided",
        defaultSelected: true,
        sourced: false,
      },
    ],
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
    activities: [
      {
        id: "gaziantep-zeugma-museum",
        name: "Zeugma Mosaic Museum",
        description: "World's largest mosaic museum, home to the famous 'Gypsy Girl' — Roman mosaics rescued from the Zeugma site before it was flooded by a dam.",
        pricePerPerson: gbp(7),
        durationHours: 1.5,
        category: "self-guided",
        defaultSelected: true,
        sourced: false,
      },
      {
        id: "gaziantep-food-tour",
        name: "Food tour / baklava & kebab crawl",
        description: "Gaziantep is UNESCO Creative City of Gastronomy — a guided food tour through the copper bazaar and baklava houses is the best way to do the region justice.",
        pricePerPerson: gbp(50),
        durationHours: 3,
        category: "guided",
        defaultSelected: true,
        sourced: false,
      },
    ],
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
    activities: [
      {
        id: "pamukkale-hierapolis-combined",
        name: "Pamukkale travertines + Hierapolis ruins",
        description: "Combined ticket covers the white calcium terraces, the Roman ruins of Hierapolis (theatre, necropolis), and the on-site archaeology museum.",
        pricePerPerson: gbp(30),
        durationHours: 4,
        category: "signature",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "pamukkale-antique-pool",
        name: "Cleopatra's Antique Pool",
        description: "Swim among submerged Roman columns in a warm mineral pool — optional add-on to the main ticket.",
        pricePerPerson: gbp(10),
        durationHours: 1.5,
        category: "self-guided",
        defaultSelected: false,
        sourced: true,
      },
    ],
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
    activities: [
      {
        id: "ephesus-entrance",
        name: "Ephesus ancient city",
        description: "One of the best-preserved Roman cities anywhere — Library of Celsus, the Great Theatre, marble streets. Go early to beat the heat and tour groups.",
        pricePerPerson: gbp(40),
        durationHours: 3,
        category: "signature",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "ephesus-house-of-virgin-mary",
        name: "House of the Virgin Mary",
        description: "Small stone chapel in the hills above Ephesus, believed to be where Mary spent her final years — a quiet, contemplative stop.",
        pricePerPerson: gbp(12),
        durationHours: 1,
        category: "self-guided",
        defaultSelected: false,
        sourced: false,
      },
    ],
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
    activities: [
      {
        id: "bodrum-boat-trip",
        name: "Full-day peninsula boat trip",
        description: "Classic Bodrum day out — cruise between turquoise bays, swim/snorkel stops, lunch on board. Standard group boats take ~40 people; smaller gulet options cost more for a quieter day.",
        pricePerPerson: gbp(35),
        durationHours: 7,
        category: "signature",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "bodrum-castle-museum",
        name: "Bodrum Castle & Museum of Underwater Archaeology",
        description: "15th-century Crusader castle housing shipwreck artefacts recovered from the Aegean, including the Uluburun shipwreck finds.",
        pricePerPerson: gbp(20),
        durationHours: 2,
        category: "self-guided",
        defaultSelected: true,
        sourced: true,
      },
    ],
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
    activities: [
      {
        id: "antalya-perge-aspendos-side",
        name: "Perge, Aspendos & Side day tour",
        description: "Full-day loop covering the Perge ruins, the extraordinarily preserved Aspendos Roman theatre (still used for opera), and the coastal ruins at Side. Usually includes lunch and hotel transfers.",
        pricePerPerson: gbp(75),
        durationHours: 9,
        category: "guided",
        defaultSelected: true,
        sourced: true,
      },
      {
        id: "antalya-termessos-duden",
        name: "Termessos ruins + Düden Waterfalls",
        description: "Mountaintop Pisidian ruins (never conquered by Alexander the Great) with a hike required to reach them, paired with a stop at Düden Waterfalls on the way back.",
        pricePerPerson: gbp(50),
        durationHours: 7,
        category: "guided",
        defaultSelected: false,
        sourced: false,
      },
      {
        id: "antalya-kaleici-old-town",
        name: "Kaleiçi old town walk (self-guided)",
        description: "Roman harbour, Hadrian's Gate, the fluted minaret — free to wander, easily fills half a day.",
        pricePerPerson: gbp(0),
        durationHours: 3,
        category: "self-guided",
        defaultSelected: true,
        sourced: true,
      },
    ],
  },
];

export const defaults = {
  groupSize: 8,
  foodPerPersonPerDay: 35,
};
