import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    packagename: { 
        type: String, 
        required: [true, "Package name is required"], 
        trim: true 
    },
    pickup: { 
        type: String, 
        required: [true, "Pickup location is required"], 
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, "description is required"], 
        trim: true 
    },
    prices: { 
        type: Map, 
        of: Number,
        required: [true, "Prices are required"]
    },
    destinationimageurl: { 
        type: String, 
        required: [true, "Image is required"], 
        trim: true 
    },
    packageduration: { 
        type: Number, 
        required: [true, "Package duration is required"], 
        trim: true 
    },
}, { timestamps: true });

const Package = mongoose.models.Package || mongoose.model("Package", PackageSchema);

export default Package;
