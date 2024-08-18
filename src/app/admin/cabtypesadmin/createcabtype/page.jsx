"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";

const CreatePackages = () => {
    const [image, setImage] = useState(null);


    const [formData, setFormData] = useState({
        cabname: '',
        maxpersons: '',
        description: '',
        price: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.cabname) newErrors.cabname = 'Cab name is required';
        if (!formData.maxpersons) newErrors.maxpersons = 'Maximum persons is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price) newErrors.price = 'Price/day is required';
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const finalFormData = {
                ...formData,
                image
            };

            const res = await fetch('/api/admin/cabtypes/CreateCabtype', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalFormData)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                router.push('/admin/cabtypesadmin');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={true}
                pauseOnHover={true}
                draggable={true}
                theme="colored"
            />
            {loading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: '1px solid black', width: '50vw', margin: '5vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>Create Package</Typography>

                <TextField
                    label="Cab Name"
                    type="text"
                    name="cabname"
                    value={formData.cabname}
                    onChange={handleChange}
                    error={!!errors.cabname}
                    helperText={errors.cabname}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                <TextField
                    label="Max persons allowed"
                    type="number"
                    name="maxpersons"
                    value={formData.maxpersons}
                    onChange={handleChange}
                    error={!!errors.maxpersons}
                    helperText={errors.maxpersons}
                    sx={{ m: 1, minWidth: "80%" }}
                />



                <TextField
                    label="Price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                <TextField
                    label="Description"
                    type="text"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                <TextField
                    label="Image"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                <Button type="submit" variant="contained" sx={{ m: 2, p: 1, px: 4 }} disabled={loading}>
                     Add
                </Button>
            </Box>
        </>
    );
};

export default CreatePackages;
