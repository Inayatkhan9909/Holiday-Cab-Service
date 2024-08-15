import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import Package from "../../../../Models/PackagesModel";

const GetpackagebyId = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET Method is allowed");
  }


  try {
    const {packageId} = await req.query;
    if(!packageId){
        return errorHandler(res, 400, "Package not found");
    }
    await ConnectDb();
        
    const packagebyId = await Package.findById(packageId);
    if(!packagebyId){
        return errorHandler(res, 400, "Package not found");
    }

    res.status(200).json(packagebyId);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default GetpackagebyId;