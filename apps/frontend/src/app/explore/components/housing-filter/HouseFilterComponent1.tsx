"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, IconButton, Paper, TextField, Typography, Chip, Stack, Slider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import getHousingTypes, { type HousingTypesResponse } from "@actions/housings/properties/getHousingTypes";
import type { HousingWizardFilters } from "./HousingFilterWizard";

export default function Step1WhatLookingFor({
  filters,
  setFilters,
  onNext,
}: {
  filters: HousingWizardFilters;
  setFilters: Dispatch<SetStateAction<HousingWizardFilters>>;
  onNext: () => void;
}) {
  const [types, setTypes] = useState<HousingTypesResponse>([]);

  useEffect(() => {
    void (async () => {
      const { data } = await getHousingTypes();
      if (data) setTypes(data);
    })();
  }, []);

  const toggleType = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      typeIds: prev.typeIds.includes(id) ? prev.typeIds.filter((x) => x !== id) : [...prev.typeIds, id],
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 760,
        borderRadius: "16px",
        border: "1px solid #E5E5E5",
        p: 3,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 26 }}>What are you looking for?</Typography>

        <IconButton
          onClick={onNext}
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            backgroundColor: "#E9F2E4",
            "&:hover": { backgroundColor: "#DDECD5" },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "#5E7749" }} />
        </IconButton>
      </Box>

      <Typography sx={{ fontWeight: 700, mb: 1 }}>Location</Typography>
      <TextField
        fullWidth
        placeholder="Search by village, region or keyword"
        value={filters.location}
        onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
        sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "#F6F6F6" } }}
      />

      <Typography sx={{ fontWeight: 700, mb: 1 }}>Property type</Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
        {types.map((t) => {
          const selected = filters.typeIds.includes(t.id);
          return (
            <Chip
              key={t.id}
              label={t.name}
              clickable
              onClick={() => toggleType(t.id)}
              variant={selected ? "filled" : "outlined"}
              sx={{
                borderRadius: "12px",
                borderColor: "#D8D8D8",
                ...(selected && { backgroundColor: "#E9F2E4", borderColor: "#83A16C", fontWeight: 700 }),
              }}
            />
          );
        })}
      </Stack>

      <Typography sx={{ fontWeight: 700, mb: 1 }}>Budget</Typography>
      <Slider
        value={filters.budget}
        onChange={(_, v) => setFilters((p) => ({ ...p, budget: v as [number, number] }))}
        min={0}
        max={600000}
        step={1000}
      />

      {/* Purpose */}
<Typography sx={{ fontWeight: 700, mb: 1, mt: 3 }}>Purpose</Typography>

<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
  {(["BUY", "RENT", "CO_LIVING", "VOLUNTEER_STAY", "RESTORATION_PROJECT"] as const).map((p) => {
    const selected = filters.purposeMain === p;
    const labelMap: Record<typeof p, string> = {
      BUY: "Buy",
      RENT: "Rent",
      CO_LIVING: "Co-living",
      VOLUNTEER_STAY: "Volunteer stay",
      RESTORATION_PROJECT: "Restoration project",
    };

    return (
      <Chip
        key={p}
        label={labelMap[p]}
        clickable
        onClick={() => setFilters((prev) => ({ ...prev, purposeMain: prev.purposeMain === p ? null : p }))}
        variant={selected ? "filled" : "outlined"}
        sx={{
          borderRadius: "12px",
          borderColor: "#D8D8D8",
          ...(selected && { backgroundColor: "#E9F2E4", borderColor: "#83A16C", fontWeight: 700 }),
        }}
      />
    );
  })}
</Stack>

{/* Bedrooms */}
<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
  <Typography sx={{ fontWeight: 700 }}>Bedrooms</Typography>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      border: "1px solid #E0E0E0",
      borderRadius: "12px",
      px: 1,
      py: 0.5,
      backgroundColor: "#FFF",
    }}
  >
    <IconButton
      size="small"
      onClick={() => setFilters((p) => ({ ...p, bedrooms: Math.max(0, p.bedrooms - 1) }))}
    >
      <RemoveIcon fontSize="small" />
    </IconButton>

    <Typography sx={{ minWidth: 18, textAlign: "center", fontWeight: 800 }}>
      {filters.bedrooms}
    </Typography>

    <IconButton
      size="small"
      onClick={() => setFilters((p) => ({ ...p, bedrooms: Math.min(20, p.bedrooms + 1) }))}
    >
      <AddIcon fontSize="small" />
    </IconButton>
  </Box>
</Box>

    </Paper>
  );
}
