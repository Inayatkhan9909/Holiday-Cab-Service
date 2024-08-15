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
    const [prices, setPrices] = useState({
        "Swift Dzire": "",
        "Honda Amaze": "",
        "Crysta": "",
        "Innova": "",
        "Traveler": ""
    });

    const [formData, setFormData] = useState({
        packagename: '',
        pickup: '',
        description: '',
        packageduration: ''
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

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPrices({
            ...prices,
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
        if (!formData.packagename) newErrors.packagename = 'Package name is required';
        if (!formData.pickup) newErrors.pickup = 'Pickup location is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (Object.values(prices).some(price => !price)) newErrors.prices = 'All prices are required';
        if (!formData.packageduration) newErrors.packageduration = 'Package duration is required';

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
                prices,
                image
            };

            const res = await fetch('/api/admin/packages/Createpackage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalFormData)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                router.push('/admin/packages');
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
                    label="Package Name"
                    type="text"
                    name="packagename"
                    value={formData.packagename}
                    onChange={handleChange}
                    error={!!errors.packagename}
                    helperText={errors.packagename}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                <TextField
                    label="Pickup"
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    error={!!errors.pickup}
                    helperText={errors.pickup}
                    sx={{ m: 1, minWidth: "80%" }}
                />

                {Object.keys(prices).map(cab => (
                    <TextField
                        key={cab}
                        label={`${cab} Price`}
                        type="number"
                        name={cab}
                        value={prices[cab]}
                        onChange={handlePriceChange}
                        error={!!errors.prices}
                        helperText={errors.prices}
                        sx={{ m: 1, minWidth: "80%" }}
                    />
                ))}

                <TextField
                    label="Duration in days"
                    type="number"
                    name="packageduration"
                    value={formData.packageduration}
                    onChange={handleChange}
                    error={!!errors.packageduration}
                    helperText={errors.packageduration}
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
