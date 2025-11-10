"use client";
import { IconButton, Tooltip } from "@mui/material";
import { Map as MapIcon, List as ListItemIcon } from "@mui/icons-material";

type Props = {
    viewMode: "map" | "list";
    onToogle: () => void;
};

export default function FloatingViewToggle({ viewMode, onToogle }: Props) {
    const isMap = viewMode === "map";

    return (
        <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[9999]">
            <Tooltip title={isMap ? "Show list" : "Show map"} placement="right">
                <IconButton
                    aria-label={isMap ? "show list" : "show map"}
                    onClick={onToogle}
                    sx={{
                        "width": 56,
                        "height": 56,
                        "bgcolor": "white",
                        "border": "2px solid #83A16C",
                        "boxShadow": "0 6px 18px rgba(0,0,0,0.18)",
                        "&:hover": { bgcolor: "#f7f7f7" }
                    }}
                >
                    {isMap ? (
                        <ListItemIcon sx={{ color: "#83A16C" }} />
                    ) : (
                        <MapIcon sx={{ color: "#83A16C" }} />
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
}
