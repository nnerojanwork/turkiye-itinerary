import { useState } from "react";
import FoodGallery from "./FoodGallery";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "light", label: "Light" },
  { id: "decadent", label: "Decadent" },
  { id: "dessert", label: "Dessert" },
  { id: "specialty", label: "Specialty" },
];

const DIETARY_OPTIONS = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "gluten-free", label: "Gluten-free" },
];

const SPICE_LEVELS = [
  { id: "any", label: "Any spice" },
  { id: "none", label: "None" },
  { id: "mild", label: "Mild or less" },
  { id: "medium", label: "Medium or less" },
  { id: "hot", label: "Hot or less" },
];

const SPICE_RANK = { none: 0, mild: 1, medium: 2, hot: 3 };

export default function FoodExplorer({
  dishes,
  destinationsById,
  regionFilter,
  onClearRegionFilter,
}) {
  const [category, setCategory] = useState("all");
  const [dietary, setDietary] = useState([]);
  const [maxSpice, setMaxSpice] = useState("any");

  function toggleDietary(id) {
    setDietary((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  const filtered = dishes.filter((d) => {
    if (category !== "all" && d.category !== category) return false;
    if (dietary.length > 0 && !d.dietary?.some((t) => dietary.includes(t))) {
      return false;
    }
    if (
      maxSpice !== "any" &&
      SPICE_RANK[d.spiceLevel ?? "none"] > SPICE_RANK[maxSpice]
    ) {
      return false;
    }
    if (regionFilter && !d.regionHighlight?.includes(regionFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div className="picker-block">
      <h2 className="picker-label">What to Eat</h2>
      <p className="picker-sublabel">
        Browse the dishes worth seeking out on this trip — nothing here
        affects the cost estimate.
      </p>

      {regionFilter && (
        <div className="food-region-banner">
          Showing {destinationsById[regionFilter]?.name ?? regionFilter}{" "}
          specialties only
          <button type="button" onClick={onClearRegionFilter}>
            Clear ✕
          </button>
        </div>
      )}

      <div className="food-filters">
        <div className="food-filter-row">
          <span className="food-filter-label">Category</span>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`food-filter-chip ${category === c.id ? "is-active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="food-filter-row">
          <span className="food-filter-label">Dietary</span>
          {DIETARY_OPTIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`food-filter-chip ${dietary.includes(d.id) ? "is-active" : ""}`}
              onClick={() => toggleDietary(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="food-filter-row">
          <span className="food-filter-label">Spice tolerance</span>
          {SPICE_LEVELS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`food-filter-chip ${maxSpice === s.id ? "is-active" : ""}`}
              onClick={() => setMaxSpice(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <FoodGallery dishes={filtered} destinationsById={destinationsById} />
    </div>
  );
}
