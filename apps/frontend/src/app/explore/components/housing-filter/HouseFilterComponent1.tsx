"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, IconButton, Paper, TextField, Typography, Chip, Stack, Slider,Popover, MenuItem, ListItemIcon, Checkbox, Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  // ---- Purpose subsections (multi-select) ----
  const rentOptions = [
    { value: "SHORT_TERM", label: "Short-term" },
    { value: "LONG_TERM", label: "Long-term" },
    { value: "FURNISHED", label: "Furnished" },
    { value: "UNFURNISHED", label: "Unfurnished" },
  ] as const;

  const restorationOptions = [
    { value: "ELIGIBLE_FOR_GRANT", label: "Eligible for grant" },
    { value: "NEEDS_STRUCTURAL_RENOVATION", label: "Needs structural renovation" },
  ] as const;

  const toggleInArray = <T,>(arr: T[] | undefined, item: T) => {
    const safe = arr ?? [];
    return safe.includes(item) ? safe.filter((x) => x !== item) : [...safe, item];
  };

// popover anchors
const [rentAnchor, setRentAnchor] = useState<HTMLElement | null>(null);
const [restAnchor, setRestAnchor] = useState<HTMLElement | null>(null);

const rentOpen = Boolean(rentAnchor);
const restOpen = Boolean(restAnchor);

const openRentPopover = (e: React.MouseEvent<HTMLElement>) => setRentAnchor(e.currentTarget);
const closeRentPopover = () => setRentAnchor(null);

const openRestPopover = (e: React.MouseEvent<HTMLElement>) => setRestAnchor(e.currentTarget);
const closeRestPopover = () => setRestAnchor(null);


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

      <Typography sx={{ fontWeight: 700, mb: 1, mt: 3 }}>Purpose</Typography>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
        {/* BUY */}
        <Chip
          label="Buy"
          clickable
          onClick={() => setFilters((prev) => ({ ...prev, purposeMain: prev.purposeMain === "BUY" ? null : "BUY" }))}
          variant={filters.purposeMain === "BUY" ? "filled" : "outlined"}
          sx={{
            borderRadius: "12px",
            borderColor: "#D8D8D8",
            ...(filters.purposeMain === "BUY" && { backgroundColor: "#E9F2E4", borderColor: "#83A16C", fontWeight: 700 }),
          }}
        />

        {/* RENT (me shigjet + popover) */}
        <Chip
          label="Rent"
          clickable
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              purposeMain: prev.purposeMain === "RENT" ? null : "RENT",
            }))
          }
          onDelete={(e) => openRentPopover(e as any)} 
          deleteIcon={<ExpandMoreIcon />}
          variant={filters.purposeMain === "RENT" ? "filled" : "outlined"}
          sx={{
            borderRadius: "12px",
            borderColor: "#D8D8D8",
            ...(filters.purposeMain === "RENT" && { backgroundColor: "#E9F2E4", borderColor: "#83A16C", fontWeight: 700 }),
            "& .MuiChip-deleteIcon": { marginRight: 0.5 },
          }}
        />

        {/* CO-LIVING */}
        <Chip
          label="Co-living"
          clickable
          onClick={() =>
            setFilters((prev) => ({ ...prev, purposeMain: prev.purposeMain === "CO_LIVING" ? null : "CO_LIVING" }))
          }
          variant={filters.purposeMain === "CO_LIVING" ? "filled" : "outlined"}
          sx={{
            borderRadius: "12px",
            borderColor: "#D8D8D8",
            ...(filters.purposeMain === "CO_LIVING" && {
              backgroundColor: "#E9F2E4",
              borderColor: "#83A16C",
              fontWeight: 700,
            }),
          }}
        />

        {/* VOLUNTEER */}
        <Chip
          label="Volunteer stay"
          clickable
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              purposeMain: prev.purposeMain === "VOLUNTEER_STAY" ? null : "VOLUNTEER_STAY",
            }))
          }
          variant={filters.purposeMain === "VOLUNTEER_STAY" ? "filled" : "outlined"}
          sx={{
            borderRadius: "12px",
            borderColor: "#D8D8D8",
            ...(filters.purposeMain === "VOLUNTEER_STAY" && {
              backgroundColor: "#E9F2E4",
              borderColor: "#83A16C",
              fontWeight: 700,
            }),
          }}
        />
        <Chip
          label="Restoration project"
          clickable
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              purposeMain: prev.purposeMain === "RESTORATION_PROJECT" ? null : "RESTORATION_PROJECT",
            }))
          }
          onDelete={(e) => openRestPopover(e as any)}
          deleteIcon={<ExpandMoreIcon />}
          variant={filters.purposeMain === "RESTORATION_PROJECT" ? "filled" : "outlined"}
          sx={{
            borderRadius: "12px",
            borderColor: "#D8D8D8",
            ...(filters.purposeMain === "RESTORATION_PROJECT" && {
              backgroundColor: "#E9F2E4",
              borderColor: "#83A16C",
              fontWeight: 700,
            }),
            "& .MuiChip-deleteIcon": { marginRight: 0.5 },
          }}
        />
      </Stack>

      {/* RENT popover */}
      <Popover
        open={rentOpen}
        anchorEl={rentAnchor}
        onClose={closeRentPopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1, minWidth: 220 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 13, px: 1, py: 0.5 }}>Rent options</Typography>
          <Divider />
          {rentOptions.map((opt) => {
            const checked = (filters.rentSub ?? []).includes(opt.value);
            return (
              <MenuItem
                key={opt.value}
                onClick={() => setFilters((prev) => ({ ...prev, rentSub: toggleInArray(prev.rentSub, opt.value) }))}
                dense
              >
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple size="small" />
                </ListItemIcon>
                {opt.label}
              </MenuItem>
            );
          })}
        </Box>
      </Popover>

      {/* RESTORATION popover */}
      <Popover
        open={restOpen}
        anchorEl={restAnchor}
        onClose={closeRestPopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1, minWidth: 260 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 13, px: 1, py: 0.5 }}>Renovation options</Typography>
          <Divider />
          {restorationOptions.map((opt) => {
            const checked = (filters.restorationSub ?? []).includes(opt.value);
            return (
              <MenuItem
                key={opt.value}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, restorationSub: toggleInArray(prev.restorationSub, opt.value) }))
                }
                dense
              >
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple size="small" />
                </ListItemIcon>
                {opt.label}
              </MenuItem>
            );
          })}
        </Box>
      </Popover>

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
          <IconButton size="small" onClick={() => setFilters((p) => ({ ...p, bedrooms: Math.max(0, p.bedrooms - 1) }))}>
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ minWidth: 18, textAlign: "center", fontWeight: 800 }}>{filters.bedrooms}</Typography>

          <IconButton size="small" onClick={() => setFilters((p) => ({ ...p, bedrooms: Math.min(20, p.bedrooms + 1) }))}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
