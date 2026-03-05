"use client";

import {
    Box,
    Typography,
    TextField,
    Autocomplete,
    CircularProgress,
    Paper
} from "@mui/material";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";

type PhotonFeature = {
    properties: {
        name?: string;
        street?: string;
        postcode?: string;
        city?: string;
        country?: string;
    };
    geometry: {
        coordinates: [number, number];
    };
};

type PhotonResponse = {
    features: PhotonFeature[];
};

type AddressOption = {
    displayName: string;
    lat: number;
    lon: number;
};

const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

type Props = {
    location: { lat: number; lng: number } | null;
    onChange: (loc: { lat: number; lng: number }, address?: string) => void;
};

export default function LocationStep({ location, onChange }: Props) {
    const [options, setOptions] = useState<AddressOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    function ChangeView({ center }: { center: [number, number] }) {
        const map = useMap();
        useEffect(() => {
            if (center) map.setView(center, 16);
        }, [center, map]);
        return null;
    }

    function LocationMarker() {
        useMapEvents({
            click(e) {
                onChange(e.latlng);
            }
        });

        return location ? (
            <Marker position={location} icon={defaultIcon} />
        ) : null;
    }

    const searchAddress = useCallback(async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
            );
            const data = (await response.json()) as PhotonResponse;

            const formatted: AddressOption[] = data.features.map((f) => ({
                displayName: [
                    f.properties.name,
                    f.properties.street,
                    f.properties.postcode,
                    f.properties.city,
                    f.properties.country
                ]
                    .filter(Boolean)
                    .join(", "),
                lat: f.geometry.coordinates[1],
                lon: f.geometry.coordinates[0]
            }));

            setOptions(formatted);
        } catch {
            /* empty */
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (inputValue.length < 3) {
            setOptions([]);
            return;
        }

        const fetchDelay = setTimeout(() => {
            void searchAddress(inputValue);
        }, 500);

        return () => clearTimeout(fetchDelay);
    }, [inputValue, searchAddress]);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 1, color: "#2E3A28" }}
            >
                Where is your property located?
            </Typography>

            <Box
                sx={{
                    height: "500px",
                    width: "100%",
                    borderRadius: 6,
                    overflow: "hidden",
                    border: "1px solid #E0E0E0",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                        width: "90%",
                        maxWidth: "450px"
                    }}
                >
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option) =>
                            typeof option === "string"
                                ? option
                                : option.displayName
                        }
                        filterOptions={(x) => x}
                        onInputChange={(_, newInputValue) =>
                            setInputValue(newInputValue)
                        }
                        onChange={(_, newValue) => {
                            if (newValue && typeof newValue !== "string") {
                                const coords = {
                                    lat: newValue.lat,
                                    lng: newValue.lon
                                };
                                onChange(coords, newValue.displayName);
                            }
                        }}
                        PaperComponent={(props) => (
                            <Paper
                                {...props}
                                sx={{ borderRadius: 3, mt: 1, boxShadow: 4 }}
                            />
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search address (e.g. Eiffel Tower...)"
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "bgcolor": "white",
                                        "borderRadius": 8,
                                        "px": 2,
                                        "boxShadow":
                                            "0px 6px 20px rgba(0,0,0,0.15)",
                                        "& fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": {
                                            border: "1px solid #5E7749"
                                        }
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
                        )}
                    />
                </Box>

                <MapContainer
                    center={
                        location
                            ? [location.lat, location.lng]
                            : [40.4168, -3.7038]
                    }
                    zoom={location ? 16 : 6}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%", zIndex: 1 }}
                >
                    <TileLayer
                        attribution="&copy; CARTO"
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
                        subdomains={["a", "b", "c", "d"]}
                    />
                    <TileLayer
                        attribution="&copy; CARTO"
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                        subdomains={["a", "b", "c", "d"]}
                    />
                    {location && (
                        <ChangeView center={[location.lat, location.lng]} />
                    )}
                    <LocationMarker />
                </MapContainer>
            </Box>
        </Box>
    );
}
