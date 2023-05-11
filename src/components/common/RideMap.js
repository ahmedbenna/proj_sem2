import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";

export default function RideMap(props) {
  const position = [36.900791, 10.178942];

  return (
    <MapContainer center={position} zoom={7} style={{ height: "200px", width:'100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing />
    </MapContainer>
  );
}
