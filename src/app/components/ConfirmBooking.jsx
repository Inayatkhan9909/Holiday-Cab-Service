import React from 'react';

const ConfirmBooking = ({ formData }) => {
    const handlePayNow = async () => {
        try {
          
            const response = await fetch('/api/cab/BookcabPD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                
                alert('Booking confirmed and payment successful!');
               
            } else {
              
                alert('Error in booking or payment. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error in booking or payment. Please try again.');
        }
    };

    const handleContactToConfirm = async () => {
        try {
         
            const response = await fetch('/api/cab/BookcabPD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Booking confirmation message sent successfully!');
            } else {
                alert('Error in sending booking confirmation. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error in sending booking confirmation. Please try again.');
        }
    };

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Confirm Your Booking</h2>
                <div className="mb-4">
                    <p><strong>Pickup:</strong> {formData.pickup}</p>
                    <p><strong>Drop:</strong> {formData.drop}</p>
                    <p><strong>Trip Type:</strong> {formData.tripType}</p>
                    <p><strong>Cab Type:</strong> {formData.cabType}</p>
                    <p><strong>Persons:</strong> {formData.persons}</p>
                    <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                    <p><strong>Date:</strong> {formData.date}</p>
                    <p><strong>Time:</strong> {formData.time}</p>
                    <p><strong>Full Address:</strong> {formData.fullAddress}</p>
                    <p><strong>Price:</strong> Rs {formData.price}</p>
                </div>
                <p className="mb-6 text-gray-600">Note: Your booking will be confirmed within 5 minutes.</p>
                <div className="flex justify-between">
                    <button
                        onClick={handlePayNow}
                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Pay Now
                    </button>
                    <button
                        onClick={handleContactToConfirm}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Contact to Confirm
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmBooking;
