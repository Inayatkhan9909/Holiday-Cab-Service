import errorHandler from "../../../../../utils/Features";
import ConnectDb from "../../../../../utils/DbConnect";
import BookcabPD from "../../../../../Models/ConfirmBookcabPD"


const GetAllPDbookings = async (req,res) =>{
    if (req.method !== "GET") {
        return errorHandler(res, 400, "Only GET Method is allowed");
      }
    try {
        await ConnectDb();
        const PDbookings = await BookcabPD.find({});
        if(!PDbookings){
             res.status(200).json({ message:"No booking found" });
        }
        res.status(200).json(PDbookings);
     
    } 
    catch (error) {
        console.log(error)
        errorHandler(res, 500, "Server Error");
    }
}

export default GetAllPDbookings;