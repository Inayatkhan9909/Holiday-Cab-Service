import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import BookcabPD from "../../../Models/ConfirmBookcabPD"


const Getbooking = async (req,res) =>{
    if (req.method !== "GET") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }
    try {

        const email =await req.body;
 
        
    } 
    catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
}

