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

    packageprice: { 
      type: Number, 
      required: [true, "Package price is required"], 
      min: [0, "Package price cannot be negative"] 
    },
    cabtype: { 
      type: String, 
      required: [true, "Cab type is required"], 
      enum: ["Swift dzire", "Honda Amaze", "Crysta", "Innova", "Traveler"], 
      trim: true 
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

  },
   { timestamps: true });
  
  const Package = mongoose.models.Package || mongoose.model("Package", PackageSchema);
  
  export default Package;