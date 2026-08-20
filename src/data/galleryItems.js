import { destinations } from "./tripData";
import { dishes } from "./food";

// Destinations don't carry a wikipediaTitle in tripData.js (only activities
// and dishes do) — this is the only place that needs one, so it's kept
// local rather than growing the shared destination schema for one tab.
const DESTINATION_WIKIPEDIA_TITLES = {
  istanbul: "Istanbul",
  cappadocia: "Cappadocia",
  gaziantep: "Gaziantep",
  pamukkale: "Pamukkale",
  ephesus: "Ephesus",
  bodrum: "Bodrum",
  antalya: "Antalya",
};

// Every destination + every real activity + every dish, deduplicated by
// wikipediaTitle. Items with no title (the joke activity, which ships its
// own localImage) are naturally excluded.
export function buildGalleryItems() {
  const items = [];

  for (const d of destinations) {
    const wikipediaTitle = DESTINATION_WIKIPEDIA_TITLES[d.id];
    if (wikipediaTitle) {
      items.push({ id: `dest-${d.id}`, name: d.name, wikipediaTitle });
    }
  }

  for (const d of destinations) {
    for (const a of d.activities ?? []) {
      if (a.wikipediaTitle) {
        items.push({ id: `act-${a.id}`, name: a.name, wikipediaTitle: a.wikipediaTitle });
      }
    }
  }

  for (const dish of dishes) {
    if (dish.wikipediaTitle) {
      items.push({ id: `dish-${dish.id}`, name: dish.name, wikipediaTitle: dish.wikipediaTitle });
    }
  }

  const seenTitles = new Set();
  return items.filter((item) => {
    if (seenTitles.has(item.wikipediaTitle)) return false;
    seenTitles.add(item.wikipediaTitle);
    return true;
  });
}
