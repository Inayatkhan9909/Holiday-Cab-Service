import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import PickDrop from "../../../Models/pickdropfareModel";

const Getpickdropfare = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET Method is allowed");
  }

  try {
    await ConnectDb();

    const pickdropFares = await PickDrop.find({});
    res.status(200).json(pickdropFares);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default Getpickdropfare;
