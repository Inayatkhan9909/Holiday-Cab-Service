"use client";
import React from 'react';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

const Pickdrop = () => {
  const router = useRouter();
  
  
  const cabFares = [
    { id: 1, ridecode: 'R001', pickup: 'Srinagar', drop: 'Gulmarg', ridetype: 'One way', onewayfair: 1200, roundtripfair: 2000, cabtype: 'Swift Dzire' },
    { id: 2, ridecode: 'R002', pickup: 'Jammu', drop: 'Pahlagam', ridetype: 'Round trip', onewayfair: 1500, roundtripfair: 2500, cabtype: 'Innova' },

  ];

  const handleAdd = () => {
    router.push('/admin/pickdrop/addpickdropfare');
  };

  const handleEdit = (id) => {
   
    console.log('Edit cab fare with id:', id);
  };

  const handleDelete = (id) => {
  
    console.log('Delete cab fare with id:', id);
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
        <Table sx={{ minWidth: "90vw" }} aria-label="cab fares table">
          <TableHead>
            <TableRow>
              <TableCell>Ride Code</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Drop</TableCell>
              <TableCell>Ride Type</TableCell>
              <TableCell>One Way Fare</TableCell>
              <TableCell>Round Trip Fare</TableCell>
              <TableCell>Cab Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabFares.map((fare) => (
              <TableRow key={fare.id}>
                <TableCell>{fare.ridecode}</TableCell>
                <TableCell>{fare.pickup}</TableCell>
                <TableCell>{fare.drop}</TableCell>
                <TableCell>{fare.ridetype}</TableCell>
                <TableCell>{fare.onewayfair}</TableCell>
                <TableCell>{fare.roundtripfair}</TableCell>
                <TableCell>{fare.cabtype}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(fare.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(fare.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Pickdrop;
