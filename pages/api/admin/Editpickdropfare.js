import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import PickDrop from "../../../Models/pickdropfareModel";

const EditTrip = async (req, res) => {
  if (req.method !== "PUT") {
    return errorHandler(res, 400, "Only PUT Method is allowed");
  }

  try {
    const { _id, ridecode, pickup, drop,  onewayfair, roundtripfair, cabtype } = req.body;
      console.log(req.body);
    if (!_id || !ridecode || !pickup || !drop  || !onewayfair || !roundtripfair || !cabtype) {
        
      return errorHandler(res, 400, "All fields are required");
    }
    ridecode

    await ConnectDb();
    const trip = await PickDrop.findOneAndUpdate({_id},{
        ridecode : ridecode,
        pickup : pickup,
        drop : drop,
        onewayfair : onewayfair,
        roundtripfair : roundtripfair,
        cabtype : cabtype
    });
         console.log("trip"+trip)
    if (!trip) {
      return errorHandler(res, 404, "Trip not found");
    }

    res.status(200).json({ message: "Trip updated successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default EditTrip;
