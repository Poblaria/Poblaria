import Link from "next/link";
import {
    Card,
    CardMedia,
    CardContent,
    Button,
    Typography,
    Grid,
    Box,
    Tooltip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { HOUSES } from "../../data/Data";
import type { HousesListProps } from "./utils/types";

export default function HousesList({
    housings,
    splitView = false
}: HousesListProps) {
    return (
        <Box sx={{ p: 0 }}>
            <Grid container sx={{ width: "100%" }} spacing={2}>
            {/* <div className="w-full"> */}
                {[...HOUSES, ...(housings || [])].map((house) => (
                    <Grid
                        key={house.id}
                        size={
                            splitView
                                ? { xs: 12, sm: 12, md: 12 }
                                : { xs: 12, sm: 6, md: 6 }
                        }
                    >
                        <Card
                            sx={{
                                backgroundColor: "#F5F5F5",
                                overflow: "hidden",
                                position: "relative",
                                display: {
                                    xs: "block",
                                    md: "flex"
                                },
                                flexDirection: { md: "row" },
                                alignItems: "stretch",
                                borderRadius: 2,
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                                height: {
                                    md: 220
                                },
                                cursor: "default"
                            }}
                        >
                            {/* Info icon to see the information */}
                            <Tooltip title="View details" arrow>
                                <Button
                                    component={Link}
                                    href={`/houses/${house.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label="view house details"
                                    disableRipple
                                    sx={{
                                        "position": "absolute",
                                        "right": 12,
                                        "bottom": 12,
                                        "minWidth": "auto",
                                        "p": 0,
                                        "borderRadius": "50%",
                                        "backgroundColor": "white",
                                        "zIndex": 5,
                                        "boxShadow":
                                            "0 4px 14px rgba(0,0,0,0.18)",
                                        "&:hover": {
                                            backgroundColor: "#f7f7f7"
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: "50%",
                                            display: "grid",
                                            placeItems: "center",
                                            backgroundColor: "#5E7749"
                                        }}
                                    >
                                        <InfoIcon
                                            sx={{
                                                fontSize: 20,
                                                color: "white"
                                            }}
                                        />
                                    </Box>
                                </Button>
                            </Tooltip>

                            {house.image && (
                                <CardMedia
                                    component="img"
                                    image={house.image}
                                    alt={house.title}
                                    sx={{
                                        objectFit: "cover",
                                        width: {
                                            xs: "100%",
                                            md: 320
                                        },
                                        height: {
                                            xs: 220,
                                            md: "100%"
                                        },
                                        flexShrink: 0,
                                        borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: {
                                            md: 8
                                        }
                                    }}
                                />
                            )}

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    flex: 1,
                                    p: 2
                                }}
                            >
                                <CardContent sx={{ p: 0 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {house.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 1,
                                            fontWeight: "bold",
                                            color: "#333"
                                        }}
                                    >
                                        {house.address}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 2,
                                            color: "#555",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {house.description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 0.5
                                        }}
                                    >
                                        {house.price} €
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {house.rooms} rooms · {house.bathrooms}{" "}
                                        bathrooms · {house.area}m²
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            {/* </div> */}
            </Grid>
        </Box>
    );
}
