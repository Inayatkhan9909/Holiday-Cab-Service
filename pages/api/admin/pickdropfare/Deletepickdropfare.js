import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/Features";
import PickDrop from "../../../../Models/pickdropfareModel";

const Deletepickdropfare = async (req, res) => {
  if (req.method !== "DELETE") {
    return errorHandler(res, 400, "Only DELETE Method is allowed");
  }

  try {
    
    const { id } = req.body;

    if (!id) {
      return errorHandler(res, 400, "Trip ID is required");
    }

    await ConnectDb();
    const trip = await PickDrop.findByIdAndDelete(id);

    if (!trip) {
      return errorHandler(res, 404, "Trip not found");
    }

   
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default Deletepickdropfare;
