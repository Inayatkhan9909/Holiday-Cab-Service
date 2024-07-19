import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import BookcabPD from "../../../Models/ConfirmBookcabPD"

const Bookcab = async (req,res) =>{

    if (req.method !== "POST") {
        return errorHandler(res, 405, "Method Not Allowed");
    }

      try {
        const { pickup, drop, triptype, email, traveldate,
            traveltime,  cabtype, persons, customername, contact, pickupfulladdress } = req.body;
            const tripfair = req.body.price;
            console.log(req.body)

            if (!pickup || !drop || !triptype || !email || !traveldate || !traveltime ||
                !tripfair || !cabtype || !persons || !customername || !contact || !pickupfulladdress) {
                return errorHandler(res, 400, "All fields are required");
            }
           await ConnectDb();

           const bookcab =  await  BookcabPD.create({
            pickup, drop, ridetype:triptype, email, traveldate,
            traveltime, tripfair, cabtype, persons, customername, contact, pickupfulladdress
        });

        if (!bookcab) {
            return errorHandler(res, 400, "something went wrong try again");
        }
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