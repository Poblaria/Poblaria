"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const RIALP_COORDINATES: [number, number] = [42.4436, 1.1344]; 

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={RIALP_COORDINATES}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={RIALP_COORDINATES}>
          <Popup>
            <b>Rialp</b>, Lleida <br /> Catalonia
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}