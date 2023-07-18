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

const LeafletMap = ({ currentOutcrop }) => {
  // Check if the currentOutcrop object exists and contains the latitude and longitude properties
  if (
    !currentOutcrop ||
    typeof currentOutcrop.latitude !== "number" ||
    typeof currentOutcrop.longitude !== "number"
  ) {
    // If latitude or longitude is missing or invalid, you can choose to display a default map or a message.
    // For now, we'll return null to render nothing.
    return null;
  }

  // Get latitude and longitude from the currentOutcrop
  const { latitude, longitude } = currentOutcrop;

  return (
    <MapContainer
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
