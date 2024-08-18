import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import CabtypeModel from "../../../../Models/CabtypeModel";

const GetCabtypes = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET Method is allowed");
  }

  try {
    await ConnectDb();
    const cabtypes = await CabtypeModel.find({});
    res.status(200).json(cabtypes);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default GetCabtypes;