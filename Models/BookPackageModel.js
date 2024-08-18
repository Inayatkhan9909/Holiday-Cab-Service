import mongoose from "mongoose";

const BookPackageSchema = new mongoose.Schema({
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
    customername: { 
        type: String, 
        required: [true, "Name is required"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        trim: true 
    },
    pickupfulladdress: { 
        type: String, 
        required: [true, "Pickup address is required"], 
        trim: true 
    },
 
    contact: { 
        type: Number, 
        required: [true, "contact are required"]
    },
    price: { 
        type: Number, 
        required: [true, "Prices are required"]
    },
    persons: { 
        type: Number, 
        required: [true, "Persons are required"]
    },

    packageduration: { 
        type: Number, 
        required: [true, "Package duration is required"], 
        trim: true 
    },
    pickuptime: { 
        type: Number, 
        required: [true, "Pickup time is required"], 
        trim: true 
    },
    pickupdate: { 
        type: Number, 
        required: [true, "Pickup date is required"], 
        trim: true 
    },
}, { timestamps: true });

const BookPackage = mongoose.models.BookPackage || mongoose.model("BookPackage", BookPackageSchema);

export default BookPackage;
