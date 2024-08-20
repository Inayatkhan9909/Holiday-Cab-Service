import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import BookPackageModel from "../../../../Models/BookPackageModel";
import sendEmail from "../../../../utils/Sendmail";
import SendSMS from "../../../../utils/SendSMS";
import User from "../../../../Models/userModel";

const BookPackage = async (req, res) => {
    if (req.method !== "POST") {
        return errorHandler(res, 405, "Method Not Allowed");
    }

    const { packagename, pickup, customername, email, pickupfulladdress, contact, price, persons, packageduration, pickuptime, pickupdate } = req.body;
    if (!packagename || !pickup || !customername || !email || !pickupfulladdress || !contact || !price || !persons || !packageduration || !pickuptime || !pickupdate) {
        return errorHandler(res, 400, "All fields are required");
    }

    try {
        await ConnectDb();

        const user = await User.findOne({ email });

        const newPackage = new BookPackageModel({
            packagename,
            pickup,
            customername,
            email,
            pickupfulladdress,
            contact,
            price,
            persons,
            packageduration,
            pickuptime,
            pickupdate,
            user: user._id
        });

        const booked = await newPackage.save();
        if (!booked) {
            return errorHandler(res, 400, "Package Booking failed");
        }

        const bookingId = booked.id;
        await User.findByIdAndUpdate(user._id, { $push: { packageBookings: bookingId } });

        const pageUrl = process.env.PAGE_URL;
        const cancelBookingUrl = `${pageUrl}/cancelpackagebooking/${bookingId}`;

        const html = `
            <h1>Package Booking Successful</h1>
            <p>Dear ${customername},</p>
            <p>Your package booking was successful! Here are the details of your booking:</p>
            <ul>
                <li><strong>Package Name:</strong> ${packagename}</li>
                <li><strong>Pickup:</strong> ${pickup}</li>
                <li><strong>Date:</strong> ${pickupdate}</li>
                <li><strong>Time:</strong> ${pickuptime}</li>
                <li><strong>Price:</strong> ${price}</li>
                <li><strong>Number of Persons:</strong> ${persons}</li>
                <li><strong>Duration:</strong> ${packageduration}</li>
            </ul>
            <p>Please note that this is a preliminary confirmation. We will send you a final confirmation email after verifying the booking details.</p>
            <p>If you need to cancel your booking, please click the link below:</p>
            <p><a href="${cancelBookingUrl}">Cancel Booking</a></p>
            <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
            <p>Thank you for choosing our service!</p>
        `;

        const sentEmail = await sendEmail(email, 'Package Booking Successful', html);
        if (!sentEmail) {
            return res.status(404).send({ message: 'Failed to send confirmation email. Please contact support.' });
        }

        // const smsBody = `
        //     Package Booking Confirmation:
        //     Dear ${customername},
        //     Your booking is confirmed!
        //     Package: ${packagename}
        //     Pickup: ${pickup}
        //     Date: ${pickupdate}
        //     Time: ${pickuptime}
        //     Price: ${price}
        //     Persons: ${persons}
        //     Duration: ${packageduration}
        //     To cancel, visit:
        //     ${cancelBookingUrl}
            
        //     Thank you for choosing our service!
        // `.trim();

        // const sentSMS = await SendSMS(contact, smsBody);
        // if (!sentSMS) {
        //     return res.status(404).send({ message: 'Failed to send confirmation SMS. Please check mobile.' });
        // }

        res.status(201).json({ success: true, data: newPackage });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log(validationErrors);
            return errorHandler(res, 400, "Validation failed", validationErrors);
        }
        console.log(error);
        return errorHandler(res, 500, "Server Error");
    }
}

export default BookPackage;
