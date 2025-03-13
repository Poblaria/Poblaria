"use client";
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

export default function Map() {
  const [showHouses, setShowHouses] = useState(true);
  const [showJobs, setShowJobs] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {/* Filter Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <img
            src="/images/filter-icon.png"
            alt="Filter options"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="housesFilter"
              checked={showHouses}
              onChange={(e) => setShowHouses(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="housesFilter" className="text-sm font-medium">
              Houses ({HOUSES.length})
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="jobsFilter"
              checked={showJobs}
              onChange={(e) => setShowJobs(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="jobsFilter" className="text-sm font-medium">
              Jobs ({JOBS.length})
            </label>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="h-[600px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[42.4436, 1.1344]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {showHouses && HOUSES.map((house) => (
            <Marker
              key={`house-${house.id}`}
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

          {showJobs && JOBS.map((job) => (
            <Marker
              key={`job-${job.id}`}
              position={job.coordinates}
              icon={JobIcon}
            >
              <Popup className="custom-popup">
                <div className="min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                  <p className="text-blue-600 font-semibold">{job.salary}</p>
                  <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}