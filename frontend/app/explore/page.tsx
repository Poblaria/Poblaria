// poblaria/next/app/explore/page.tsx

"use client";
import MapWrapper from "./components/MapWrapper";

export default function Explore() {
  return (
    <main className="w-full h-full">
      {/* <FilterBar></FilterBar> */}
      <MapWrapper />
    </main>
  );
}

/*'use client';

import { useState } from 'react';
import MapWrapper from './MapWrapper';
import FormComponent from './FormComponent';

export default function Explore() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Rialp, Lleida</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Close Form' : 'Open Form'}
        </button>
      </div>
      
      {showForm && <FormComponent />}
      <MapWrapper />
    </main>
  );
}*/

