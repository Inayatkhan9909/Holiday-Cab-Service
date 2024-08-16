"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PackageBookingComponent from "@/app/components/PackageBookingComponent";

const PackageDetails = ({ params }) => {
  const [packageDetails, setPackageDetails] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    pickupFullAddress: "",
    date: "",
    time: "",
    cabType: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPackageDetails();
  }, [params.packageid]);

  const fetchPackageDetails = async () => {
    try {
      console.log(params.packageid);
      const queryString = decodeURIComponent(params.packageid);
      const packageId = queryString.split("=")[1];
      console.log(packageId);
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
      console.log(data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      onOpen();
    }
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
          pickupFullAddress: address || "",
        }));
        if (!address) {
          alert("Unable to fetch address");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-lg mx-auto p-6 my-10 bg-white rounded-lg shadow-md border border-black">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Package Details
          </h2>
        </div>
        <div className="mb-6 border p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            {packageDetails.packagename}
          </h3>
          <p className="mb-4">{packageDetails.description}</p>
          <img
            src={packageDetails.destinationimageurl}
            alt={packageDetails.packagename}
            className="w-full h-auto mb-4"
          />
          <p className="text-lg font-semibold">
            Price: ${packageDetails.price}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="form-control">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
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
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="contactNo"
                className="block text-sm font-medium text-gray-700"
              >
                Contact No
              </label>
              <input
                id="contactNo"
                name="contactNo"
                type="text"
                value={formData.contactNo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.contactNo && (
                <p className="mt-2 text-sm text-red-600">{errors.contactNo}</p>
              )}
            </div>
            <div className="form-control relative">
              <label
                htmlFor="pickupFullAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Pickup Full Address
              </label>
              <div className="flex items-center">
                <input
                  id="pickupFullAddress"
                  name="pickupFullAddress"
                  type="text"
                  value={formData.pickupFullAddress}
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
              {errors.pickupFullAddress && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.pickupFullAddress}
                </p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.time && (
                <p className="mt-2 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="cabType"
                className="block text-sm font-medium text-gray-700"
              >
                Cab Type
              </label>
              <input
                id="cabType"
                name="cabType"
                type="text"
                value={formData.cabType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.cabType && (
                <p className="mt-2 text-sm text-red-600">{errors.cabType}</p>
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
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Booking
              </ModalHeader>
              <ModalBody>
                <PackageBookingComponent formData={formData} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PackageDetails;
