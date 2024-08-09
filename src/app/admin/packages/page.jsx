"use client"
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const Packages = () => {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    packagename: '',
    pickup: '',
    description: '',
    prices: {},
    destinationimageurl: '',
    packageduration: 0,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/admin/packages/Getpackages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleAdd = () => {
    router.push('/admin/packages/createpackages');
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
      const response = await fetch('/api/admin/packages/Editpackage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setPackages((prevPackages) =>
          prevPackages.map((pack) => (pack._id === formData._id ? formData : pack))
        );
        setEditDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch('/api/admin/packages/Deletepackage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedPackage._id }),
      });
      const result = await response.json();
      if (response.ok) {
        setPackages((prevPackages) => prevPackages.filter((pack) => pack._id !== selectedPackage._id));
        setDeleteDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
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
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, max(300px, 1fr))', gap: 2 }}>
        {packages.map((packageData) => (
          <Card key={packageData._id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              {/* Display prices in a table or list format */}
              <Typography variant="body2" color="text.secondary">
                Duration: {packageData.packageduration} days
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
              <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(packageData)}>
                Edit
              </Button>
              <Button variant="contained" color="error" size="small" onClick={() => handleDelete(packageData)}>
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
      {/* ... rest of the code for edit and delete dialogs */}
    </Box>
  );
};

export default Packages;
