import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import BookcabPD from "../../../Models/ConfirmBookcabPD"

const GetPDbookingbyID = async (req,res) =>{
    if (req.method !== "GET") {
        return errorHandler(res, 405, "Method Not Allowed");
    }
    try {
       
        const {userId}= req.query; 
    
        if(!userId){
            return errorHandler(res, 400, "Couldn't find any bookings");
        }

        await ConnectDb();
        
        const PDbooking = await BookcabPD.find({user:userId})
        if(!PDbooking){
            return errorHandler(res, 400, "No booking found");
        }
        res.status(200).json(PDbooking);
         
    }
     catch (error) {
        console.log(error);
        return errorHandler(res, 500, "Server Error");
    }
}

export default GetPDbookingbyID;