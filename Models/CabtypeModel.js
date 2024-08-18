import mongoose from "mongoose";

const CabtypeSchema = new mongoose.Schema({
    cabname: { 
        type: String, 
        required: [true, "Cab name is required"], 
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, "Cab description is required"], 
        trim: true 
    },
    maxpersons: { 
        type: Number, 
        required: [true, "Maximum Persons is required"], 
        trim: true 
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"]
    },
    cabimageurl: { 
        type: String, 
        required: [true, "Image is required"], 
        trim: true 
    },

}, { timestamps: true });

const CabtypeModel = mongoose.models.CabtypeModel || mongoose.model("CabtypeModel", CabtypeSchema);

export default CabtypeModel;
