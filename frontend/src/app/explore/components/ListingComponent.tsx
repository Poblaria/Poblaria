"use client";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Typography,
  Grid,
  Box
} from "@mui/material";
import { HOUSES, JOBS } from "../data/Data";
import type { DataType } from "./FilterBar";
import type { HousingDataWithImage, JobData } from "@/api/data";

type ListViewProps = {
  dataType: DataType;
  showFilters: boolean;
  housings: HousingDataWithImage[] | null;
  jobs: JobData[] | null;
  error: string | null;
  splitView?: boolean;
};

export default function ListView({
  dataType,
  showFilters,
  housings,
  jobs,
  error,
  splitView = false
}: ListViewProps) {
  if (error) return <div>Error: {error}</div>;
  if (dataType === "houses" && !housings && !HOUSES.length)
    return <div>Loading houses...</div>;
  if (dataType === "jobs" && !jobs && !JOBS.length)
    return <div>Loading jobs...</div>;

  return (
    <Box height="100%" sx={{ display: "flex", flexDirection: "column" }}>
      {/* ---------------- JOBS VIEW ---------------- */}
      {dataType === "jobs" && (
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
                    backgroundColor: "#F5F5F5"
                  }}
                >
                  <Box sx={{ overflowY: "auto", maxHeight: 250 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", mb: 1 }}
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
                      sx={{
                        height: "40px",
                        backgroundColor: showFilters ? "#83A16C" : "#5E7749",
                        color: "white",
                        borderColor: showFilters ? "#83A16C" : "#DCDCDC",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                          backgroundColor: "#83A16C",
                          borderColor: "#83A16C"
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
      )}

      {/* ---------------- HOUSES VIEW ---------------- */}
      {dataType === "houses" && (
        <Box sx={{ p: 0 }}>
          <Grid container sx={{ width: "100%" }} spacing={3}>
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
                    display: { xs: "block", md: splitView ? "flex" : "block" },
                    flexDirection: { md: "row" },
                    alignItems: "stretch",
                    borderRadius: 2,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                    height: { md: splitView ? 220 : "auto" }
                  }}
                >
                  {/* ---------- SPLIT VIEW MODE ---------- */}
                  {splitView ? (
                    <CardActionArea
                      component={Link}
                      href={`/houses/${house.id}`}
                      sx={{
                        display: { xs: "block", md: "flex" },
                        flexDirection: { md: "row" },
                        alignItems: "stretch",
                        textAlign: "left",
                        height: "100%"
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={house.image}
                        alt={house.title}
                        sx={{
                          objectFit: "cover",
                          width: { xs: "100%", md: 320 },
                          height: { xs: 220, md: "100%" },
                          flexShrink: 0,
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8
                        }}
                      />

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
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
                            sx={{ fontWeight: "bold", mb: 0.5 }}
                          >
                            {house.price} €
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {house.rooms} rooms · {house.bathrooms} bathrooms ·{" "}
                            {house.area}m²
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  ) : (
                    // ---------- NORMAL MODE ----------
                    <>
                      {house.image && (
                        <CardMedia
                          component="img"
                          image={house.image}
                          alt={house.title}
                          sx={{
                            height: 140,
                            objectFit: "cover"
                          }}
                        />
                      )}

                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {house.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1,
                            fontWeight: "bold"
                          }}
                        >
                          {house.address}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ mb: 3 }}
                        >
                          {house.description}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {house.price} €
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {house.rooms} rooms · {house.bathrooms} bathrooms ·{" "}
                          {house.area}m²
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 1 }}>
                        <Button
                          variant="outlined"
                          sx={{
                            height: "40px",
                            backgroundColor: showFilters
                              ? "#83A16C"
                              : "#5E7749",
                            color: "white",
                            borderColor: showFilters
                              ? "#83A16C"
                              : "#DCDCDC",
                            boxShadow:
                              "0px 4px 10px rgba(0, 0, 0, 0.05)",
                            "&:hover": {
                              backgroundColor: "#83A16C",
                              borderColor: "#83A16C"
                            }
                          }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}