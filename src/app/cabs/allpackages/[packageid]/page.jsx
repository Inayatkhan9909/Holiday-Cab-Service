"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  selectUser,
  selectLoading as selectUserLoading,
  selectError as selectUserError,
} from "../../../features/user/userSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PackageBookingComponent from "@/app/components/PackageBookingComponent";

const PackageDetails = ({ params }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);

  const [packageDetails, setPackageDetails] = useState({});
  const [confirmbookDialoge, setconfirmbookDialoge] = useState(false);
  const [formData, setFormData] = useState({
    packagename: "",
    pickup: "",
    customername: "",
    email: "",
    pickupfulladdress: "",
    contact: "",
    price: "",
    persons: "",
    pickuptime: "",
    pickupdate: "",
    cabtype: "", 
    packageduration:"",
  });
  const [errors, setErrors] = useState({});

  const cabPrices = {
    "Swift dzire": 5000,
    "Honda Amaze": 6000,
    "Crysta": 8999,
    "Innova": 8000,
    "Traveler": 10999,
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    fetchPackageDetails();
  }, [params.packageid]);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        customername: `${user.firstname} ${user.lastname}`,
        email: user.email,
        contact: user.contact,
      }));
    }
  }, [user]);

  const fetchPackageDetails = async () => {
    try {
      const queryString = decodeURIComponent(params.packageid);
      const packageId = queryString.split("=")[1];
      const response = await fetch(
        `/api/cab/packages/GetPackagebyId?packageId=${packageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPackageDetails(data);
      setFormData((prevData) => ({
        ...prevData,
        packagename: data.packagename || "",
        price: data.price || "",
        packageduration: data.packageduration || "",
      }));
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cabtype") {
      setFormData((prevData) => ({
        ...prevData,
        price: cabPrices[value] || 0,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDateTime = new Date();
    const pickupDateTime = new Date(`${formData.pickupdate}T${formData.pickuptime}`);

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    // Validate contact number
    if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits";
    }

    // Validate pickup date and time
    if (pickupDateTime < currentDateTime) {
      newErrors.pickupdate = "Pickup date and time cannot be in the past";
    } else if ((pickupDateTime - currentDateTime) / (1000 * 60 * 60) < 10) {
      newErrors.pickupdate = "Pickup date and time must be at least 10 hours from now";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      setconfirmbookDialoge(true);
    }
  };

  const handledialogClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || "escapeKeyDown") {
      console.log("backdropClicked. Not closing dialog.");
      return;
    }
    console.log("reason empty");
    setconfirmbookDialoge(false);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
        );
        const data = await response.json();
        const address = data.results[0]?.formatted_address;
        setFormData((prevData) => ({
          ...prevData,
          pickupfulladdress: address || "",
        }));
        if (!address) {
          alert("Unable to fetch address");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography color="error">Error: {userError}</Typography>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md border border-black">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Package Details
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row mb-6 border p-4 rounded-lg">
            <div className="p-5 flex justify-center md:justify-start">
              <img
                src={packageDetails.destinationimageurl}
                alt={packageDetails.packagename}
                className="max-w-full md:max-w-sm mb-4 object-contain"
              />
            </div>

            <div className="md:ml-6">
              <h3 className="text-xl font-semibold mb-2">
                {packageDetails.packagename}
              </h3>
              <p className="mb-4">{packageDetails.description}</p>
              <p className="mb-4">Duration: {packageDetails.packageduration}</p>
              <p className="text-lg font-semibold">
                Price: Rs {formData.price}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-9/12 m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label
                  htmlFor="pickup"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup
                </label>
                <input
                  id="pickup"
                  name="pickup"
                  type="text"
                  value={formData.pickup || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.pickup && (
                  <p className="mt-2 text-sm text-red-600">{errors.pickup}</p>
                )}
              </div>
             
              <div className="form-control">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  disabled
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="form-control relative">
                <label
                  htmlFor="pickupfulladdress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup Full Address
                </label>
                <div className="flex items-center">
                  <input
                    id="pickupfulladdress"
                    name="pickupfulladdress"
                    type="text"
                    value={formData.pickupfulladdress || ""}
                    onChange={handleChange}
                    className="flex-grow mt-1 rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <IconButton
                    aria-label="fetch location"
                    className="ml-2"
                    onClick={fetchCurrentLocation}
                  >
                    <MyLocationIcon />
                  </IconButton>
                </div>
                {errors.pickupfulladdress && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.pickupfulladdress}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.contact && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.contact}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="persons"
                  className="block text-sm font-medium text-gray-700"
                >
                  Persons
                </label>
                <select
                  id="persons"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  className="mt-1 block w-4/5 rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select Number of Persons</option>
                  {Array.from({ length: 15 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                {errors.persons && (
                  <p className="mt-2 text-sm text-red-600">{errors.persons}</p>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="pickuptime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup Time
                </label>
                <input
                  id="pickuptime"
                  name="pickuptime"
                  type="time"
                  value={formData.pickuptime || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.pickuptime && (
                  <p className="mt-2 text-sm text-red-600">{errors.pickuptime}</p>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="pickupdate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup Date
                </label>
                <input
                  id="pickupdate"
                  name="pickupdate"
                  type="date"
                  value={formData.pickupdate || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.pickupdate && (
                  <p className="mt-2 text-sm text-red-600">{errors.pickupdate}</p>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="cabtype"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cab Type
                </label>
                <select
                  id="cabtype"
                  name="cabtype"
                  value={formData.cabtype || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select Cab Type</option>
                  {Object.keys(cabPrices).map((cab) => (
                    <option key={cab} value={cab}>
                      {cab}
                    </option>
                  ))}
                </select>
                {errors.cabtype && (
                  <p className="mt-2 text-sm text-red-600">{errors.cabtype}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="px-6 py-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book
              </button>
            </div>
          </form>

          <Dialog open={confirmbookDialoge} onClose={handledialogClose}>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogContent>
              <PackageBookingComponent formData={formData} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setconfirmbookDialoge(false)}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default PackageDetails;
