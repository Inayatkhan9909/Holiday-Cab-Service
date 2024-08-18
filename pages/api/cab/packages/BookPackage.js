import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import BookPackage from "../../../../Models/BookPackageModel";

const BookPackage = async (req, res) => {
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only GET Method is allowed");
    }



    const { packagename, pickup, customername, email, pickupfulladdress, contact, price, persons, packageduration, pickuptime, pickupdate } = req.body;

    if (!packagename || !pickup || !customername || !email || !pickupfulladdress || !contact || !price || !persons || !packageduration || !pickuptime || !pickupdate) {
        return errorHandler(res, 400, "All fields are required");
    }
    try {
        await ConnectDb();
        const newPackage = new BookPackage({
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
            pickupdate
        });
        const booked = await newPackage.save();
        if (!booked) {
            errorHandler(res, 400, "Package Booking failed");
        }

        res.status(201).json({ success: true, data: newPackage });
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }

}

export default BookPackage;