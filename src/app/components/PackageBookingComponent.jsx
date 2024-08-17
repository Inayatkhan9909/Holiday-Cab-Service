import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const PackageBookingComponent = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/submitBooking", formData);
      setResponseMessage("Booking confirmed successfully!");
    } catch (error) {
      setResponseMessage("Failed to confirm booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <h1>Confirm Booking</h1>
        <div>
          <p>Are you sure you want to submit the form?</p>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Contact No:</strong> {formData.contactNo}
            </p>
            <p>
              <strong>Pickup Full Address:</strong> {formData.pickupFullAddress}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>
            <p>
              <strong>Cab Type:</strong> {formData.cabType}
            </p>
          </div>
          {responseMessage && (
            <div
              className={`mt-4 p-2 text-center ${
                responseMessage.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {responseMessage}
            </div>
          )}

          <button
            className="md:px-6 md:py-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 m-auto"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PackageBookingComponent;
