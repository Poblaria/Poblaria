"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Step1WhatLookingFor from "./HouseFilterComponent1";
import Step2KeepSearching from "./HouseFilterComponent2";

export type HousingWizardFilters = {
  // Step 1
  location: string;
  typeIds: number[];
  purposeMain: "BUY" | "RENT" | "CO_LIVING" | "VOLUNTEER_STAY" | "RESTORATION_PROJECT" | null;
  rentMode: "ANY" | "MONTHLY" | "WEEKLY" | "DAILY";
  restorationMode: "ANY" | "LIGHT" | "FULL";
  budget: [number, number];
  bedrooms: number;

  // Step 2
  lifestyle: string[]; // p.sh. ["Mountain view", "Pet friendly"]
  condition: "MOVE_IN_READY" | "NEEDS_RENOVATION" | null;
  nearbyServices: string[]; // p.sh. ["Schools", "Health Center"]
};

const DEFAULT_FILTERS: HousingWizardFilters = {
  location: "",
  typeIds: [],
  purposeMain: null,
  rentMode: "ANY",
  restorationMode: "ANY",
  budget: [0, 600000],
  bedrooms: 2,

  lifestyle: [],
  condition: null,
  nearbyServices: [],
};

export default function HousingFilterWizard({
  onShowResults,
}: {
  onShowResults: (filters: HousingWizardFilters) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [filters, setFilters] = useState<HousingWizardFilters>(DEFAULT_FILTERS);

  const resetAll = () => setFilters(DEFAULT_FILTERS);

  return (
    <Box>
      {step === 1 ? (
        <Step1WhatLookingFor
          filters={filters}
          setFilters={setFilters}
          onNext={() => setStep(2)} // ✅ shigjeta jeshile
        />
      ) : (
        <Step2KeepSearching
          filters={filters}
          setFilters={setFilters}
          onBack={() => setStep(1)} // ✅ shigjeta mbrapa
          onReset={resetAll}
          onShowResults={() => onShowResults(filters)}
        />
      )}
    </Box>
  );
}
