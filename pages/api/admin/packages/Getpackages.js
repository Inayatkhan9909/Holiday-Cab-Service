import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import Package from "../../../../Models/PackagesModel";

const Getpackages = async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 400, "Only GET Method is allowed");
  }

  try {
    await ConnectDb();

    const packages = await Package.find({});
    res.status(200).json(packages);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Server Error");
  }
}

export default Getpackages;