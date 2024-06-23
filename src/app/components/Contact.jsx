import React from 'react';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-black">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Contact Us</h2>
                <div className="flex flex-col  items-center justify-around mb-6">
                    <div className=" mb-4 md:mb-0">
                        
                        <div className='flex gap-1'>
                        <FaPhoneAlt className="text-green-600 text-2xl mr-2" />
                            <p className="text-lg font-medium">Mobile: +0987654321</p>
                        </div>
                        <div className='flex gap-1'>
                        <FaPhoneAlt className="text-green-600 text-2xl mr-2" />
                            <p className="text-lg font-medium">Mobile: +0987654321</p>
                        </div>
                    </div>
                   <div className='flex justify-center align-middle gap-4 mt-3'>
                   <div className="flex items-center mb-4 md:mb-0">
                        <FaWhatsapp className="text-green-600 text-2xl mr-2" />
                        <a href="https://wa.me/1234567890" className="text-lg font-medium text-blue-600 hover:underline">
                            WhatsApp Us
                        </a>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaEnvelope className="text-red-600 text-2xl mr-2" />
                        <a href="mailto:info@example.com" className="text-lg font-medium text-blue-600 hover:underline">
                            Email Us
                        </a>
                    </div>
                   </div>
                </div>
                <div className="flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-600 text-2xl mr-2" />
                    <p className="text-lg font-medium text-center">
                        Office Address: 123, Main Street, City, Country
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
