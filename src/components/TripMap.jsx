import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import coordinates from "../data/turkey_coordinates.json";

const TURKEY_CENTER = [39.0, 35.0];
const TURKEY_ZOOM = 6;

function dotIcon(className, size) {
  return L.divIcon({
    className: "map-dot-wrapper",
    html: `<span class="${className}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const destinationIcon = dotIcon("map-pin-dot", 20);
const beachIcon = dotIcon("map-wave-dot", 14);

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) {
      map.setView(TURKEY_CENTER, TURKEY_ZOOM);
    } else if (points.length === 1) {
      map.setView(points[0], 10);
    } else {
      map.fitBounds(points, { padding: [36, 36] });
    }
  }, [points, map]);

  return null;
}

export default function TripMap({ selectedDestinations, nightsByDestination }) {
  const hasSelection = selectedDestinations.length > 0;

  const destinationMarkers = useMemo(() => {
    if (hasSelection) {
      return selectedDestinations
        .map((d) => {
          const coords = coordinates.destinations[d.id]?.coords;
          if (!coords) return null;
          return { id: d.id, name: d.name, coords, nights: nightsByDestination[d.id] };
        })
        .filter(Boolean);
    }
    return Object.entries(coordinates.destinations).map(([id, info]) => ({
      id,
      name: info.name,
      coords: info.coords,
      nights: null,
    }));
  }, [hasSelection, selectedDestinations, nightsByDestination]);

  const beachMarkers = useMemo(() => {
    if (!hasSelection) return [];
    return selectedDestinations.flatMap((d) => {
      const beachCoordsById = Object.fromEntries(
        (coordinates.beaches[d.id] ?? []).map((b) => [b.id, b.coords])
      );
      return (d.beaches ?? [])
        .map((b) => {
          const coords = beachCoordsById[b.id];
          if (!coords) return null;
          return { id: b.id, name: b.name, coords, description: b.description };
        })
        .filter(Boolean);
    });
  }, [hasSelection, selectedDestinations]);

  const routePoints = destinationMarkers.map((m) => m.coords);
  const boundsPoints = hasSelection ? routePoints : destinationMarkers.map((m) => m.coords);

  return (
    <div className="map-block">
      <h2 className="picker-label">Your route on the map</h2>
      <p className="picker-sublabel">
        {hasSelection
          ? "Selected stops, with any nearby beaches you've expanded."
          : "All seven possible stops — pick some destinations above to build a route."}
      </p>
      <div className="map-container">
        <MapContainer
          center={TURKEY_CENTER}
          zoom={TURKEY_ZOOM}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {routePoints.length > 1 && (
            <Polyline
              positions={routePoints}
              pathOptions={{ color: "#c4551f", weight: 2, opacity: 0.6, dashArray: "6 8" }}
            />
          )}

          {destinationMarkers.map((m) => (
            <Marker key={m.id} position={m.coords} icon={destinationIcon}>
              <Popup>
                <strong>{m.name}</strong>
                {m.nights != null && <div>{m.nights} nights</div>}
              </Popup>
            </Marker>
          ))}

          {beachMarkers.map((b) => (
            <Marker key={b.id} position={b.coords} icon={beachIcon}>
              <Popup>
                <strong>{b.name}</strong>
                {b.description && <div>{b.description}</div>}
              </Popup>
            </Marker>
          ))}

          <FitBounds points={boundsPoints} />
        </MapContainer>
      </div>
      <div className="map-legend">
        <span className="map-legend-item">
          <span className="map-pin-dot" /> Destination
        </span>
        <span className="map-legend-item">
          <span className="map-wave-dot" /> Beach
        </span>
      </div>
    </div>
  );
}
