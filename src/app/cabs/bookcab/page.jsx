"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import ConfirmBooking from '@/app/components/ConfirmBooking';
import Contact from '@/app/components/Contact';

const BookCab = () => {
    const router = useRouter();
    const [confirmbookDialoge, setconfirmbookDialoge] = useState(false);
    const [contactDialoge, setcontactDialoge] = useState(false);
    const [searchParams, setSearchParams] = useState({ pickup: '', drop: '', tripType: '' });
    const [formData, setFormData] = useState({
        cabType: '',
        persons: '',
        mobile: '',
        date: '',
        time: '',
        fullAddress: '',
        price: '',
        pickup: '',
        drop: '',
        tripType: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pickup = params.get('pickup') || '';
        const drop = params.get('drop') || '';
        const tripType = params.get('tripType') || '';

        setSearchParams({ pickup, drop, tripType });
        setFormData((prevData) => ({ ...prevData, pickup, drop, tripType }));

        const fetchPrice = async () => {
            try {
                const response = await fetch(`/api/cabfare?pickup=${pickup}&drop=${drop}`);
                const data = await response.json();
                setFormData((prevData) => ({ ...prevData, price: data.price }));
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== 'price') {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('Form Data:', formData);
            setErrors({});
            setconfirmbookDialoge(true);
        }

    };
  
    const handleContact = () =>{
        setcontactDialoge(true);
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md border border-black">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Book a Cab</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control">
                            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">Pickup</label>
                            <select
                                id="pickup"
                                name="pickup"
                                value={formData.pickup}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1 border-gray-300
                                                    shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Pickup Location</option>
                                <option value="Srinagar">Srinagar</option>
                                <option value="Jammu">Jammu</option>
                                <option value="Pahlagam">Pahlagam</option>
                                <option value="Gulmarg">Gulmarg</option>
                                <option value="Sonamarg">Sonamarg</option>
                                <option value="Doodhpathri">Doodhpathri</option>
                                <option value="Kargil">Kargil</option>
                            </select>
                            {errors.pickup && <p className="mt-2 text-sm text-red-600">{errors.pickup}</p>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="drop" className="block text-sm font-medium text-gray-700">Drop</label>
                            <select
                                id="drop"
                                name="drop"
                                value={formData.drop}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Drop Location</option>
                                <option value="Srinagar">Srinagar</option>
                                <option value="Jammu">Jammu</option>
                                <option value="Pahlagam">Pahlagam</option>
                                <option value="Gulmarg">Gulmarg</option>
                                <option value="Sonamarg">Sonamarg</option>
                                <option value="Doodhpathri">Doodhpathri</option>
                                <option value="Kargil">Kargil</option>
                            </select>
                            {errors.drop && <p className="mt-2 text-sm text-red-600">{errors.drop}</p>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="tripType" className="block text-sm font-medium text-gray-700">Trip Type</label>
                            <select
                                id="tripType"
                                name="tripType"
                                value={formData.tripType}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Trip Type</option>
                                <option value="One way">One way</option>
                                <option value="Round trip">Round trip</option>
                            </select>
                            {errors.tripType && <p className="mt-2 text-sm text-red-600">{errors.tripType}</p>}
                        </div>
                    </div>
                    {searchParams.tripType === 'Round trip' && (
                        <div className="mb-6 text-center">
                            <p className="text-gray-600">Note: This round trip will include popular tourist points at the destination.</p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control">
                            <label htmlFor="cabType" className="block text-sm font-medium text-gray-700">Cab Type</label>
                            <select
                                id="cabType"
                                name="cabType"
                                value={formData.cabType}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Cab Type</option>
                                <option value="Swift dzire">Swift dzire</option>
                                <option value="Honda Amaze">Honda Amaze</option>
                                <option value="Crysta">Crysta</option>
                                <option value="Innova">Innova</option>
                                <option value="Traveler">Traveler</option>
                            </select>
                            {errors.cabType && <p className="mt-2 text-sm text-red-600">{errors.cabType}</p>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="persons" className="block text-sm font-medium text-gray-700">Persons</label>
                            <select
                                id="persons"
                                name="persons"
                                value={formData.persons}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Number of Persons</option>
                                {Array.from({ length: 15 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            {errors.persons && <p className="mt-2 text-sm text-red-600">{errors.persons}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                id="mobile"
                                name="mobile"
                                type="text"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                id="time"
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time}</p>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Full Address</label>
                            <input
                                id="fullAddress"
                                name="fullAddress"
                                type="text"
                                value={formData.fullAddress}
                                onChange={handleChange}
                                className="mt-1 block w-3/5 rounded-md border-2  p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.fullAddress && <p className="mt-2 text-sm text-red-600">{errors.fullAddress}</p>}
                        </div>
                    </div>
                    <div className="mb-6 text-center">
                        <p className="text-xl font-semibold">Price: Rs {formData.price}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button type="submit" className="px-6 py-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Book Cab</button>
                        <button onClick={handleContact} className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700">Contact Us</button>
                    </div>
                </form>

                <Dialog open={confirmbookDialoge} onClose={() => setconfirmbookDialoge(false)}>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogContent>
                        <ConfirmBooking formData={formData} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setconfirmbookDialoge(false)} color="primary">
                            Cancel
                        </Button>
                       
                    </DialogActions>
                </Dialog>

                <Dialog open={contactDialoge} onClose={() => setcontactDialoge(false)}>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogContent>
                       <Contact/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setcontactDialoge(false)} color="primary">
                            Cancel
                        </Button>
                       
                    </DialogActions>
                </Dialog>

            </div>
        </>
    );
};

export default BookCab;
