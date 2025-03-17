"use client";
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import { HOUSES, JOBS } from "../data/Data";
import FilterBar, { DataType } from "./FilterBar";

export default function ListView() {
  const [dataType, setDataType] = useState<DataType>("jobs");
  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters((prev) => !prev);

  return (
    <Box
      height={"100%"}
      sx={{ display: "flex", flexDirection: "column" }}
      marginTop={8}
    >
      <FilterBar
        selectedOption={dataType}
        onOptionChange={setDataType}
        showFilters={showFilters}
        toggleShowFilters={toggleShowFilters}
        setShowFilters={setShowFilters}
      />
      {dataType === "jobs" && (
        <Box sx={{ p: 2 }} marginLeft={6} marginRight={6}>
          <Grid container spacing={2}>
            {JOBS.map((job) => (
              <Grid item xs={12} sm={6} md={6} key={job.id}>
                <Card sx={{ mb: 2, backgroundColor: "#F5F5F5" }}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.salary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      sx={{
                        height: "40px",
                        backgroundColor: showFilters ? "#83A16C" : "#5E7749",
                        color: showFilters ? "white" : "white",
                        borderColor: showFilters ? "#83A16C" : "#DCDCDC",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                          backgroundColor: showFilters ? "#83A16C" : "#83A16C",
                          borderColor: showFilters ? "#83A16C" : "#DCDCDC",
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
            {HOUSES.map((house) => (
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
                  <CardContent>
                    <Typography variant="h6">{house.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {house.price}
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
