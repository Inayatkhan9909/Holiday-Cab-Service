import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import Package from "../../../../Models/PackagesModel";


const CreatePakcage = async(req,res) =>{
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {
        const {packagename,pickup,description,packageprice,cabtype,
            destinationimageurl,packageduration} = await req.body;

      if(!packagename || !pickup || !description || !packageprice || !cabtype || !
        destinationimageurl || !packageduration){
            return errorHandler(res, 400, "All fields are required");
        }
        await ConnectDb();

        const created = await Package.create({packagename,pickup,description,packageprice,cabtype,
            destinationimageurl,packageduration})

        if (!created) {
            return errorHandler(res, 400, "something went wrong try again");
        }
        return res.status(201).json({ message: "Cab booking successful"});
        
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log(validationErrors)
            return errorHandler(res, 400, "Validation failed", validationErrors);
        }
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
}

   