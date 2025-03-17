"use client";
import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import { HOUSES, JOBS } from "./data/Data";
import FilterBar, { DataType } from "./FilterBar";

export default function ListView() {
  const [dataType, setDataType] = useState<DataType>("jobs");
  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters((prev) => !prev);
  const data = dataType === "jobs" ? JOBS : HOUSES;

  return (
    <Box height={"100%"} sx={{ display: "flex", flexDirection: "column" }} marginTop={8} >
      <FilterBar
        selectedOption={dataType}
        onOptionChange={setDataType}
        showFilters={showFilters}
        toggleShowFilters={toggleShowFilters}
      />
      <Grid container spacing={2} marginLeft={6} marginRight={6}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                {dataType === "houses" ? (
                  <>
                    {"price" in item && <Typography color="text.secondary">{item.price}</Typography>}
                    <Typography variant="body2">{item.details}</Typography>
                  </>
                ) : (
                  <Typography color="text.secondary">{item.salary}</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}