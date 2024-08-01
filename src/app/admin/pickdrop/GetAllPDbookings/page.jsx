"use client";
import React, { useEffect, useState } from 'react';
import {
    Box, Button,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

const GetAllPDbookings = () => {

    const router = useRouter();
    const [PDbookings, setPDbookings] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        const fetchAllbookings = async () => {
            try {
                const response = await fetch('/api/admin/bookings/pickdropbookings/GetAllPDbookings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });;
                const data = await response.json();
                console.log("data " + data)
                setPDbookings(data);

            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchAllbookings();
    }, []);

    const handleAdd = () => {
        //   router.push('/admin/pickdrop/addpickdropfare');
        alert("option closed");
    };

    const handleEdit = (trip) => {
        alert("option closed");
        setEditDialogOpen(true);
    };

    const handleDelete = (trip) => {
        setSelectedTrip(trip);
        setDeleteDialogOpen(true);
    };


    const handleEditSubmit = async () => {
        try {
            alert("option closed");
        } catch (error) {
            console.error('Error updating trip:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            // const response = await fetch('/api/admin/pickdropfare/Deletepickdropfare', {
            //   method: 'DELETE',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ id: selectedTrip._id }),
            // });
            // const result = await response.json();
            // if (response.ok) {
            //   setCabFares((prevFares) => prevFares.filter((fare) => fare._id !== selectedTrip._id));
            //   setDeleteDialogOpen(false);
            // } else {
            //   console.error(result.message);
            // }
            alert("option closed");
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    const handleChange = (e) => {
        //   const { name, value } = e.target;
        //   setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Pick & Drop Cab Bookings
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ mb: 2 }}
                onClick={handleAdd}
            >
                Add Booking
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '95vw' }} aria-label="cab fares table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Pickup</TableCell>
                            <TableCell>Drop</TableCell>
                            <TableCell>Trip Type</TableCell>
                            <TableCell>Cab Type</TableCell>
                            <TableCell>Persons</TableCell>
                            <TableCell>Pickup Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Travel Date</TableCell>
                            <TableCell>Travel Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {PDbookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.customername}</TableCell>
                                <TableCell>{booking.pickup}</TableCell>
                                <TableCell>{booking.drop}</TableCell>
                                <TableCell>{booking.ridetype}</TableCell>
                                <TableCell>{booking.cabtype}</TableCell>
                                <TableCell>{booking.persons}</TableCell>
                                <TableCell>{booking.pickupfulladdress}</TableCell>
                                <TableCell>{booking.email}</TableCell>
                                <TableCell>{booking.contact}</TableCell>
                                <TableCell>{booking.tripfair}</TableCell>
                                <TableCell>{formatDate(booking.traveldate)}</TableCell>
                                <TableCell>{booking.traveltime}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(booking)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(booking)}>
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
                        //   value={formData.ridecode}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Pickup"
                        type="text"
                        name="pickup"
                        fullWidth
                        //   value={formData.pickup}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Drop"
                        type="text"
                        name="drop"
                        fullWidth
                        //   value={formData.drop}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="One Way Fare"
                        type="number"
                        name="onewayfair"
                        fullWidth
                        //   value={formData.onewayfair}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Round Trip Fare"
                        type="number"
                        name="roundtripfair"
                        fullWidth
                        //   value={formData.roundtripfair}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Cab Type"
                        type="text"
                        name="cabtype"
                        fullWidth
                        //   value={formData.cabtype}
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
    )
}

export default GetAllPDbookings