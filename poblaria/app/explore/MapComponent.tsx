"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// const DefaultIcon = L.icon({
//   iconUrl: '/images/marker-icon.png',
//   iconRetinaUrl: '/images/marker-icon-2x.png',
//   shadowUrl: '/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

const HomeIcon = L.icon({
    iconUrl: '/images/home-icon1.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35], 
});

const JobIcon = L.icon({
    iconUrl: '/images/job-icon.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

const HOUSES = [
    {
      id: 1,
      coordinates: [42.4436, 1.1344] as [number, number],
      title: "Traditional Stone House",
      price: "€350,000",
      details: "3 beds · 2 baths · 180m²"
    },
    {
      id: 2,
      coordinates: [42.4440, 1.1350] as [number, number],
      title: "Mountain View Villa",
      price: "€550,000",
      details: "4 beds · 3 baths · 250m²"
    },
];

const JOBS = [
    {
      id: 1,
      coordinates: [42.4437, 1.1345] as [number, number],
      title: "Baker at La Fornal",
      salary: "€650,000",
    },
    {
      id: 2,
      coordinates: [42.4441, 1.1347] as [number, number],
      title: "Bartender at La Taverna",
      salary: "€550,000",
    },
];

//L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
    return (
      <div className="h-[600px] w-full">
        <MapContainer
          center={[42.4436, 1.1344]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
  
          {HOUSES.map((house) => (
            <Marker
              key={house.id}
              position={house.coordinates}
              icon={HomeIcon}
            >
              <Popup className="custom-popup">
                <div className="min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">{house.title}</h3>
                  <p className="text-red-600 font-semibold">{house.price}</p>
                  <p className="text-gray-600">{house.details}</p>
                  <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

        {JOBS.map((job) => (
            <Marker
              key={job.id}
              position={job.coordinates}
              icon={JobIcon}
            >
              <Popup className="custom-popup">
                <div className="min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                  <p className="text-red-600 font-semibold">{job.salary}</p>
                  <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }