"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { HOUSES, JOBS } from "../data/Data";
import { DataType } from "./FilterBar";
import { fetchHousings, fetchJobs } from "../../../api/api";

interface ListViewProps {
  dataType: DataType;
  showFilters: boolean;
}

export default function ListView(props: ListViewProps) {
  const { dataType, showFilters } = props;
  const [dataHouse, setDataHouses] = useState<any[]>([]);
  const [dataJob, setDataJob] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (dataType === "houses") {
          const housings = await fetchHousings();
          console.log("Fetched Houses:", housings);
          setDataHouses(housings);
        } else {
          const jobs = await fetchJobs();
          console.log("Fetched Jobs:", jobs);
          setDataJob(jobs);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadData();
  }, [dataType]);

  if (error) return <div>Error: {error}</div>;
  if (dataType === "houses" && !dataHouse.length && !HOUSES.length)
    return <div>Loading houses...</div>;
  if (dataType === "jobs" && !dataJob.length && !JOBS.length)
    return <div>Loading jobs...</div>;

  return (
    <Box height={"100%"} sx={{ display: "flex", flexDirection: "column" }}>
      {dataType === "jobs" && (
        <Box sx={{ p: 2 }} marginLeft={6} marginRight={6}>
          <Grid container spacing={2}>
            {[...JOBS, ...dataJob].map((job) => (
              <Grid item xs={12} sm={6} md={6} key={job.id}>
                <Card sx={{ mb: 2, backgroundColor: "#F5F5F5" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold"}}>
                      {job.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold",  marginBottom: 1}}>
                      {job.company} - {job.address}
                    </Typography>

                    <Typography variant="body2" sx={{ marginBottom: 3 }}>
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
                          borderColor: "#83A16C",
                        },
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

      {dataType === "houses" && (
        <Box sx={{ p: 2 }} marginLeft={6} marginRight={6}>
          <Grid container spacing={2}>
            {[...HOUSES, ...dataHouse].map((house) => (
              <Grid item xs={12} sm={6} md={6} key={house.id}>
                <Card sx={{ mb: 2, backgroundColor: "#F5F5F5" }}>
                  {house.image && (
                    <CardMedia
                      component="img"
                      image={house.image}
                      alt={house.title}
                      sx={{ height: 140, objectFit: "cover" }}
                    />
                  )}
                  {console.log("House Image:", house.image)}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold"}}>{house.title}</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "bold"}}>{house.address} </Typography>

                    <Typography variant="body2" sx={{ marginBottom: 3 }}>
                      {house.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {house.price} €
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {house.rooms} rooms · {house.bathrooms} bathrooms ·{" "}
                      {house.area}m²
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {house.details}
                    </Typography>
                  </CardContent>
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
                          borderColor: "#83A16C",
                        },
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
    </Box>
  );
}
