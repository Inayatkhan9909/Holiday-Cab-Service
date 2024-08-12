"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const Packages = () => {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    packagename: "",
    pickup: "",
    description: "",
    prices: {},
    destinationimageurl: "",
    packageduration: 0,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/admin/packages/Getpackages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleAdd = () => {
    router.push("/admin/packages/createpackages");
  };

  const handleEdit = (packageData) => {
    setSelectedPackage(packageData);
    setFormData(packageData);
    setEditDialogOpen(true);
  };

  const handleDelete = (packageData) => {
    setSelectedPackage(packageData);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch("/api/admin/packages/Editpackage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setPackages((prevPackages) =>
          prevPackages.map((pack) =>
            pack._id === formData._id ? formData : pack
          )
        );
        setEditDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/admin/packages/Deletepackage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedPackage._id }),
      });
      const result = await response.json();
      if (response.ok) {
        setPackages((prevPackages) =>
          prevPackages.filter((pack) => pack._id !== selectedPackage._id)
        );
        setDeleteDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Packages
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Package
      </Button>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 2,
        }}
      >
        {packages.map((packageData) => (
          <Card
            key={packageData._id}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={packageData.destinationimageurl}
              alt={packageData.packagename}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {packageData.packagename}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {packageData.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {packageData.packageduration} days
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                color="primary"
                onClick={() => handleEdit(packageData)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(packageData)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>
      {/* Dialogs for editing and deleting */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details of the package.
          </DialogContentText>
          {/* Form fields for editing */}
          <TextField
            margin="dense"
            name="packagename"
            label="Package Name"
            value={formData.packagename}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="pickup"
            label="Pickup Location"
            value={formData.pickup}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            name="destinationimageurl"
            label="Destination Image URL"
            value={formData.destinationimageurl}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="packageduration"
            label="Package Duration"
            type="number"
            value={formData.packageduration}
            onChange={handleChange}
            fullWidth
          />
          <Button onClick={handleEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this package?
          </DialogContentText>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Packages;
