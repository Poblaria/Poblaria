"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import {
  Map as MapIcon,
  List as ListIcon,
} from '@mui/icons-material';

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

const ListView = dynamic(() => import("./Listing"), {
  ssr: false,
  loading: () => <div className="h-full animate-pulse bg-gray-200 rounded-lg" />,
});


export default function MapWrapper() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const handleViewMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: "map" | "list" | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <div className="w-full h-full relative">
      {viewMode === "map" ? <MapComponent /> : <ListView />}

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white" >
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewMode}
        aria-label="map or list"
      >
        <ToggleButton
          value="map"
          aria-label="map view"
          sx={{
            "&.Mui-selected": {
            backgroundColor: "#83A16C",
            color: "white",
            "&hover": {
              backgroundColor: "#83A16C",
            },
          },
            color: "black",
          }}
          >
          <MapIcon fontSize="small"/>
          &nbsp;Map
        </ToggleButton>
        <ToggleButton
          value="list"
          aria-label="list view"
          sx={{
            "&.Mui-selected": {
            backgroundColor: "#83A16C",
            color: "white",
            "&hover": {
              backgroundColor: "#83A16C",
            },
          },
            color: "black",
          }}
          >
          <ListIcon fontSize="small"/>
              &nbsp;List
        </ToggleButton>
      </ToggleButtonGroup>

      </div>
    </div>

  );
}
