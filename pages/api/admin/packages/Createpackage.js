import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import Package from "../../../../Models/PackagesModel";
import cloudinary from "../../../../utils/Cloudinary";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb', 
        },
    },
};

const CreatePackage = async (req, res) => {
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {
        const { packagename, pickup, description, prices, image, packageduration } = await req.body;

        if (!packagename || !pickup || !description || !prices || !image || !packageduration) {
            return errorHandler(res, 400, "All fields are required");
        }

        const upload = await cloudinary.uploader.upload(image, {
            folder: "TheView imageUploads"
        });

        await ConnectDb();
        const destinationimageurl = upload.secure_url;

        const created = await Package.create({
            packagename,
            pickup,
            description,
            prices,
            destinationimageurl,
            packageduration
        });

        if (!created) {
            return errorHandler(res, 400, "Something went wrong, try again");
        }

        return res.status(201).json({ message: "Package created successfully" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log(validationErrors);
            return errorHandler(res, 400, "Validation failed", validationErrors);
        }
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
}

export default CreatePackage;
