"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchgetPackage,
  selectGetPackage,
} from "../features/packages/getPackageSlice";

const Packages = () => {
  const dispatch = useDispatch();
  const { items: packages, loading, error } = useSelector(selectGetPackage);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(fetchgetPackage());
  }, [dispatch]);

  const handleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  if (loading) {
    return <CircularProgress />;
  }
  const displayedPackages = packages.slice(0, 3);

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {displayedPackages.map((pkg) => (
          <Grid item key={pkg.id} lg={3} md={4} sm={6} xs={12}>
            <Card
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                image={pkg.destinationimageurl}
                alt={pkg.title}
                sx={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pkg.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expanded[pkg._id]
                    ? pkg.description
                    : `${pkg.description.substring(0, 100)}...`}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleReadMore(pkg._id)}
                  >
                    {expanded[pkg._id] ? "Read Less" : "Read More"}
                  </Button>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <Link href={`/cabs/allpackages/packageid=${pkg._id}`}>
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
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Explore all the famous and beautyfull destinations with us and
                book your trip now
              </Typography>
              <Link href="/cabs/allpackages" passHref>
                <Button variant="outlined" size="large" className="mt-10">
                  All Packages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Packages;
