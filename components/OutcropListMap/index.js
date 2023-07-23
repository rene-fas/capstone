import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const OutcropListMap = ({ outcropLatLngs }) => {
  // Check if there are any valid coordinates in the outcropLatLngs array
  const validLatLngs = outcropLatLngs.filter(
    (latLng) =>
      typeof latLng.latitude === "number" &&
      typeof latLng.longitude === "number"
  );

  // If there are no valid coordinates, you can choose to display a message or just return null
  if (validLatLngs.length === 0) {
    return <p>No valid coordinates available.</p>;
  }

  // Calculate the bounds based on the outcropLatLngs array
  const bounds = validLatLngs.reduce((acc, latLng) => {
    return acc.extend([latLng.latitude, latLng.longitude]);
  }, L.latLngBounds(validLatLngs[0].latitude, validLatLngs[0].longitude));

  return (
    <MapContainer
      center={[bounds.getCenter().lat, bounds.getCenter().lng]} // Center the map based on the calculated bounds
      zoom={12} // Set the default zoom level, adjust as needed
      style={{ height: "400px", width: "100%" }} // Set the map container's style
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      />

      {/* Loop through the outcropLatLngs array and add markers */}
      {validLatLngs.map((latLng, index) => (
        <Marker
          key={index} // Use a unique key for each marker
          position={[latLng.latitude, latLng.longitude]}
          icon={customMarkerIcon}
        />
      ))}
    </MapContainer>
  );
};

export default OutcropListMap;
