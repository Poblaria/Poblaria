"use client";
import { IconButton, Tooltip } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type SplitMapToggleProps = {
    splitMap: boolean;
    onToggle: () => void;
};

export default function SplitMapToggle({
    splitMap,
    onToggle
}: SplitMapToggleProps) {
    return (
        <Tooltip title={splitMap ? "Hide map" : "Show map"} placement="left">
            <IconButton
                aria-label={splitMap ? "Hide map" : "Show map"}
                onClick={onToggle}
                sx={{
                    "position": "absolute",
                    "top": 8,
                    "right": 8,
                    "zIndex": (t) => t.zIndex.tooltip + 1,
                    "bgcolor": "rgba(255,255,255,0.9)",
                    "border": "1px solid #DCDCDC",
                    "boxShadow": "0 4px 10px rgba(0,0,0,0.12)",
                    "&:hover": { bgcolor: "white" },
                    "transition": "transform 0.2s ease",
                    "transform": splitMap ? "rotate(0deg)" : "rotate(180deg)",
                    "display": { xs: "none", sm: "flex" } // Hide on small screens
                }}
            >
                {splitMap ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </Tooltip>
    );
}
