import errorHandler from "../../../../utils/Features";
import ConnectDb from "../../../../utils/DbConnect";
import CabtypeModel from "../../../../Models/CabtypeModel";
import cloudinary from "../../../../utils/Cloudinary";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "20mb",
        },
    },
};

const Createcabtype = async (req, res) => {
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {
        const { cabname, maxpersons, description, price, image, } =
            await req.body;

        if (
            !cabname ||
            !maxpersons ||
            !description ||
            !price ||
            !image
        ) {
            return errorHandler(res, 400, "All fields are required");
        }

        const upload = await cloudinary.uploader.upload(image, {
            folder: "Holiday cab images",
        });

        await ConnectDb();
        const cabimageurl = upload.secure_url;

        const created = await CabtypeModel.create({
            cabname, maxpersons, description, price, cabimageurl
        });

        if (!created) {
            return errorHandler(res, 400, "Something went wrong, try again");
        }

        return res.status(201).json({ message: "Package created successfully" });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            console.log(validationErrors);
            return errorHandler(res, 400, "Validation failed", validationErrors);
        }
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
};

export default Createcabtype;
