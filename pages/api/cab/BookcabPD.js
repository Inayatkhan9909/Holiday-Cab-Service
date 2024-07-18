import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import BookcabPD from "../../../Models/BookcabPD";

const Bookcab = async (req, res) => {

    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {

        const { pickup, drop, ridetype, email, traveldate,
            traveltime, tripfair, cabtype, persons, customername, contact, pickupfulladdress } = req.body;

        if (ridetype === "", pickup === "" && drop === "" && cabtype === "" && email === "" && traveldate === "" && traveltime === ""
            && customername === "" && contact === "" && tripfair === "" && persons === "" && pickupfulladdress === "") {
            return errorHandler(res, 400, "All Credentials Required!");
        }

        await ConnectDb();

        const bookcab = BookcabPD.create({
            pickup, drop, ridetype, email, traveldate,
            traveltime, tripfair, cabtype, persons, customername, contact, pickupfulladdress
        })

        if (bookcab) {
            res.status(201).json({ message: "Cab booking Succesfully" });
        }

    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
}