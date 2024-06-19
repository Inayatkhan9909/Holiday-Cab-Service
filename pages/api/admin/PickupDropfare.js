
import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import PickDrop from "../../../Models/pickdropfareModel";

const CreateTrip = async(req,res) =>{

    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }
   try {
    const {ridecode, pickup, drop, cabtype,  onewayfair,roundtripfair } = req.body;

    if (ridecode==="",pickup === "" && drop === "" && cabtype === ""  && onewayfair === "" && roundtripfair=== "") {
        return errorHandler(res, 400, "All Credentials Required!");
    }

    await ConnectDb();
    const Alreadyexists = await PickDrop.findOne({ ridecode });
    if (Alreadyexists) {
        return errorHandler(res, 400, "Trip alredy exists");
    }

    const trip = PickDrop.create({
        ridecode,
        pickup,
        drop,
        cabtype,
        
        onewayfair,
        roundtripfair

    });
    
    if (trip) {

        res.status(201).json({ message: "Trip Created Succesfully" });
    }

   } 
   catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
   }
}


export default CreateTrip;