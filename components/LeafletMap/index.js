import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const LeafletMap = ({
  currentOutcrop,
  uploadedImagesCount,
  outcropLatLngs,
}) => {
  const [mapKey, setMapKey] = useState(0); // Add a state variable for map key

  useEffect(() => {
    // Trigger map rendering when the currentOutcrop prop changes
    if (currentOutcrop) {
      const { latitude, longitude } = currentOutcrop;
      if (typeof latitude === "number" && typeof longitude === "number") {
        setMapKey((prevKey) => prevKey + 1); // Increment map key to force re-render
      }
    }
  }, [currentOutcrop, uploadedImagesCount]);

  if (
    !currentOutcrop ||
    typeof currentOutcrop.latitude !== "number" ||
    typeof currentOutcrop.longitude !== "number"
  ) {
    return null;
  }

  const { latitude, longitude } = currentOutcrop;

  return (
    <MapContainer
      key={mapKey} // Use the mapKey as a key to force the re-render of the map
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      />
      <Marker position={[latitude, longitude]} icon={customMarkerIcon} />
    </MapContainer>
  );
};

export default LeafletMap;
