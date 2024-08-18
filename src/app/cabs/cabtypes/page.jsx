"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchgetcabtypes,
  selectgetCabtypes,
} from "../../features/cabtypes/getCabtypesSlice";
import Link from "next/link";

const AllPackages = () => {
  const dispatch = useDispatch();
  const { items: cabs, loading, error } = useSelector(selectgetCabtypes);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(fetchgetcabtypes());
  }, [dispatch]);

  const handleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error loading packages</Typography>;
  }

  return (
    <>
      <Typography
        variant="h4"
        className="mt-20 mb-6 w-screen text-3xl text-center"
      >
        Popular destinations
      </Typography>

      <Grid
        container
        spacing={6}
        sx={{
          width: "90vw",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {cabs.map((cab) => (
          <Grid item key={cab._id} lg={3} md={4} sm={6} xs={12}>
            <Card
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={cab.cabimageurl}
                alt={cab.cabname}
                sx={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cab.cabname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expanded[cab._id]
                    ? cab.description
                    : `${cab.description.substring(0, 100)}...`}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleReadMore(cab._id)}
                  >
                    {expanded[cab._id] ? "Read Less" : "Read More"}
                  </Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Max Persons: {cab.maxpersons}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${cab.price}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <Link href={`/cabs/cabtypes/cabtypeid=${cab._id}`}>
                    <Button
                      variant="contained"
                      size="small"
                      className="py-2 mt-4"
                    >
                      Book
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllPackages;
