"use client";
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

const Pickdrop = () => {
  const router = useRouter();
  const [cabFares, setCabFares] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    ridecode: '',
    pickup: '',
    drop: '',
    onewayfair: '',
    roundtripfair: '',
    cabtype: '',
  });


  useEffect(() => {
    const fetchCabFares = async () => {
      try {
        const response = await fetch('/api/admin/pickdropfare/Getpickdropfare');
        const data = await response.json();
        setCabFares(data);
      } catch (error) {
        console.error('Error fetching cab fares:', error);
      }
    };

    fetchCabFares();
  }, []);

  const handleAdd = () => {
    router.push('/admin/pickdrop/addpickdropfare');
  };

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setFormData(trip);
    setEditDialogOpen(true);
  };

  const handleDelete = (trip) => {
    setSelectedTrip(trip);
    setDeleteDialogOpen(true);
  };


  const handleEditSubmit = async () => {
    try {
      const response = await fetch('/api/admin/pickdropfare/Editpickdropfare', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setCabFares((prevFares) =>
          prevFares.map((fare) => (fare._id === formData._id ? formData : fare))
        );
        setEditDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch('/api/admin/pickdropfare/Deletepickdropfare', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedTrip._id }),
      });
      const result = await response.json();
      if (response.ok) {
        setCabFares((prevFares) => prevFares.filter((fare) => fare._id !== selectedTrip._id));
        setDeleteDialogOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pick & Drop Cab Fares
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Pick & Drop
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '95vw' }} aria-label="cab fares table">
          <TableHead>
            <TableRow>
              <TableCell>Ride Code</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Drop</TableCell>
              <TableCell>One Way Fare</TableCell>
              <TableCell>Round Trip Fare</TableCell>
              <TableCell>Cab Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabFares.map((fare) => (
              <TableRow key={fare._id}>
                <TableCell>{fare.ridecode}</TableCell>
                <TableCell>{fare.pickup}</TableCell>
                <TableCell>{fare.drop}</TableCell>
                <TableCell>{fare.onewayfair}</TableCell>
                <TableCell>{fare.roundtripfair}</TableCell>
                <TableCell>{fare.cabtype}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(fare)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(fare)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the trip below.</DialogContentText>
          <TextField
            margin="dense"
            label="Ride Code"
            type="text"
            name="ridecode"
            fullWidth
            value={formData.ridecode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Pickup"
            type="text"
            name="pickup"
            fullWidth
            value={formData.pickup}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Drop"
            type="text"
            name="drop"
            fullWidth
            value={formData.drop}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="One Way Fare"
            type="number"
            name="onewayfair"
            fullWidth
            value={formData.onewayfair}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Round Trip Fare"
            type="number"
            name="roundtripfair"
            fullWidth
            value={formData.roundtripfair}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Cab Type"
            type="text"
            name="cabtype"
            fullWidth
            value={formData.cabtype}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this trip?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pickdrop;
