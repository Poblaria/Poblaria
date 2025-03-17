"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

export default function MapWrapper() {
  return <MapComponent />;
}
