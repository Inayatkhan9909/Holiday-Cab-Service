import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import BookcabPD from "../../../Models/ConfirmBookcabPD"
import sendEmail from "../../../utils/Sendmail";
import SendSMS from "../../../utils/SendSMS";
import User from "../../../Models/userModel"

const Bookcab = async (req, res) => {

    if (req.method !== "POST") {
        return errorHandler(res, 405, "Method Not Allowed");
    }

    try {
        const { pickup, drop, triptype, email, traveldate,
            traveltime, cabtype, persons, customername, contact, pickupfulladdress } = req.body;
        const tripfair = req.body.price;

        if (!pickup || !drop || !triptype || !email || !traveldate || !traveltime ||
            !tripfair || !cabtype || !persons || !customername || !contact || !pickupfulladdress) {
            return errorHandler(res, 400, "All fields are required");
        }
        await ConnectDb();

        const user = await User.findOne({ email });
       

        const bookcab = await BookcabPD.create({
            pickup, drop, ridetype: triptype, email, traveldate,
            traveltime, tripfair, cabtype, persons, customername, contact, pickupfulladdress, user: user._id
        });

        if (!bookcab) {
            return errorHandler(res, 400, "something went wrong try again");
        }
        const bookingId = bookcab.id;
      
       await User.findByIdAndUpdate(user._id, { $push: { PDbookings: bookingId } });
       const pageUrl = process.env.PAGE_URL;

        const cancelBookingUrl = `${pageUrl}`;

        const html = `
            <h1>Cab Booking Successfull</h1>
            <p>Dear ${customername},</p>
            <p>Your cab booking was successful! Here are the details of your booking:</p>
            <ul>
                <li><strong>Pickup:</strong> ${pickup}</li>
                <li><strong>Drop:</strong> ${drop}</li>
                <li><strong>Date:</strong> ${traveldate}</li>
                <li><strong>Time:</strong> ${traveltime}</li>
                <li><strong>Cab Type:</strong> ${cabtype}</li>
                <li><strong>Number of Persons:</strong> ${persons}</li>
            </ul>
            <p>Please note that this is a preliminary confirmation. We will send you a final confirmation email after verifying the booking details.</p>
            <p>If you need to cancel your booking, please click the link below:</p>
            <p><a href="${cancelBookingUrl}">Cancel Booking</a></p>
            <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
            <p>Thank you for choosing our service!</p>
        `;

        const sentemail = await sendEmail(email, 'Cab Booking Successfull', html);
        if (!sentemail) {
            return res.status(404).send({ message: 'Failed to send confirmation email. Please contact support.' });
        }

        // const smsBody = `
        // Cab Booking Confirmation:
        // Dear ${customername},
        // Your booking is confirmed!
        // Pickup: ${pickup}
        // Drop: ${drop}
        // Date: ${traveldate}
        // Time: ${traveltime}
        // Cab: ${cabtype}
        // Persons: ${persons}
        // To cancel, visit:
        // ${cancelBookingUrl}
        
        // Thank you for choosing our service!
        //         `.trim();
        // const sentSMS = await SendSMS(contact, smsBody);
        // if (!sentSMS) {
        //     return res.status(404).send({ message: 'Failed to send confirmation SMS. Please check mobile .' });
        // }

        return res.status(201).json({ message: "Cab booking successful", booking: bookcab });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log(validationErrors)
            return errorHandler(res, 400, "Validation failed", validationErrors);
        }
        console.log(error);
        return errorHandler(res, 500, "Server Error");
    }
}

export default Bookcab;