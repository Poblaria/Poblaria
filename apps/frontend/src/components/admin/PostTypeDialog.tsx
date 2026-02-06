"use client";

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

type PostType = "property" | "job" | null;

export default function PostTypeDialog({
  open,
  onClose,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  onNext: (type: Exclude<PostType, null>) => void;
}) {
  const [selected, setSelected] = React.useState<PostType>(null);

  React.useEffect(() => {
    if (!open) setSelected(null);
  }, [open]);

  const OptionCard = ({
    value,
    title,
    icon,
  }: {
    value: Exclude<PostType, null>;
    title: string;
    icon: React.ReactNode;
  }) => {
    const active = selected === value;

    return (
      <Paper
        onClick={() => setSelected(value)}
        elevation={0}
        sx={{
          cursor: "pointer",
          width: { xs: "100%", sm: 340 },
          height: 220,
          borderRadius: 6,
          border: "2px solid",
          borderColor: active ? "#B58CFF" : "rgba(0,0,0,0.12)",
          boxShadow: active ? "0 10px 25px rgba(181,140,255,0.35)" : "none",
          transition: "0.2s ease",
          display: "grid",
          placeItems: "center",
          "&:hover": {
            borderColor: active ? "#B58CFF" : "rgba(0,0,0,0.22)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 84,
              height: 84,
              borderRadius: 4,
              display: "grid",
              placeItems: "center",
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(90,106,207,0.12)",
            }}
          >
            {icon}
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
            {title}
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 6,
          px: { xs: 2, sm: 5 },
          py: { xs: 2, sm: 4 },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", pb: 2 }}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: 900 }}
        >
          What would you like to post?
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: -6, top: -6 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Options */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          py: 3,
        }}
      >
        <OptionCard
          value="property"
          title="Property"
          icon={<HomeWorkRoundedIcon sx={{ fontSize: 44, color: "#6B6BD6" }} />}
        />
        <OptionCard
          value="job"
          title="Job offer"
          icon={<WorkRoundedIcon sx={{ fontSize: 44, color: "#6B6BD6" }} />}
        />
      </Box>

      {/* Next button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
        <Button
          variant="contained"
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
          sx={{
            width: 140,
            height: 52,
            borderRadius: 3,
            bgcolor: "#7C9367",
            fontWeight: 900,
            "&:hover": { bgcolor: "#6E845C" },
          }}
        >
          Next
        </Button>
      </Box>
    </Dialog>
  );
}