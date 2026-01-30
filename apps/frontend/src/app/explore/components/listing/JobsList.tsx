import Link from "next/link";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Grid,
    Box
} from "@mui/material";
import { JOBS } from "../../data/Data";
import type { JobsListProps } from "./utils/types";

export default function JobsList({ jobs, showFilters }: JobsListProps) {
    return (
        <Box sx={{ p: 0 }}>
            <Grid container sx={{ width: "100%" }} spacing={3}>
                {[...JOBS, ...(jobs || [])].map((job) => (
                    <Grid key={job.id} size={{ xs: 12, sm: 6, md: 6 }}>
                        <Card
                            sx={{
                                height: 320,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: "#F5F5F5",
                                position: "relative"
                            }}
                        >
                            <Box
                                sx={{
                                    overflowY: "auto",
                                    maxHeight: 250,
                                    pb: 6
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {job.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1
                                        }}
                                    >
                                        {job.company} - {job.address}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 3 }}>
                                        {job.description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {job.salary} €
                                    </Typography>
                                </CardContent>
                            </Box>

                            <CardActions>
                                <Button
                                    variant="outlined"
                                    LinkComponent={Link}
                                    href={`/jobs/${job.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        "position": "absolute",
                                        "bottom": 12,
                                        "right": 12,
                                        "height": "40px",
                                        "px": 2.5,
                                        "backgroundColor": showFilters
                                            ? "#83A16C"
                                            : "#5E7749",
                                        "color": "white",
                                        "borderColor": showFilters
                                            ? "#83A16C"
                                            : "#DCDCDC",
                                        "boxShadow":
                                            "0px 4px 10px rgba(0, 0, 0, 0.15)",
                                        "borderRadius": "12px",
                                        "textTransform": "none",
                                        "&:hover": {
                                            backgroundColor: "#83A16C",
                                            borderColor: "#83A16C",
                                            boxShadow:
                                                "0px 5px 12px rgba(0, 0, 0, 0.18)"
                                        }
                                    }}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
