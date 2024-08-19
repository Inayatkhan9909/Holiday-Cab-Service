import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import CabtypeModel from "../../../../Models/CabtypeModel";

const GetcabtypebyId = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET Method is allowed");
  }


  try {
    const {cabtypeId} = await req.query;
    if(!cabtypeId){
        return errorHandler(res, 400, "Package not found");
    }
    await ConnectDb();
        
    const cabtypebyId = await CabtypeModel.findById(cabtypeId);
    if(!cabtypebyId){
        return errorHandler(res, 400, "Package not found");
    }

    res.status(200).json(cabtypebyId);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default GetcabtypebyId;