import mongoose from "mongoose";
import User from "../Models/userModel"

const bookCabPDSchema = new mongoose.Schema({
  pickup: { 
    type: String, 
    required: [true, "Pickup location is required"], 
    trim: true 
  },
  drop: { 
    type: String, 
    required: [true, "Drop location is required"], 
    trim: true 
  },
  ridetype: { 
    type: String, 
    required: [true, "Ride type is required"], 
    enum: ["Oneway", "Roundtrip"], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    trim: true, 
    lowercase: true, 
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
  },
  traveldate: { 
    type: Date, 
    required: [true, "Travel date is required"], 
    min: [new Date(), "Travel date must be in the future"] 
  },
  traveltime: { 
    type: String, 
    required: [true, "Travel time is required"], 
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time in HH:MM format"] 
  },
  tripfair: { 
    type: Number, 
    required: [true, "Trip fare is required"], 
    min: [0, "Trip fare cannot be negative"] 
  },
  cabtype: { 
    type: String, 
    required: [true, "Cab type is required"], 
    enum: ["Swift dzire", "Honda Amaze", "Crysta", "Innova", "Traveler"], 
    trim: true 
  },
  persons: { 
    type: Number, 
    required: [true, "Number of persons is required"], 
    min: [1, "At least one person is required"], 
    max: [15, "Maximum 15 persons allowed"] 
  },
  customername: { 
    type: String, 
    required: [true, "Customer name is required"], 
    trim: true, 
    minlength: [2, "Name must be at least 2 characters long"], 
    maxlength: [50, "Name cannot exceed 50 characters"] 
  },
  contact: { 
    type: String, 
    required: [true, "Contact number is required"], 
    validate: { 
      validator: function(v) { 
        return /^\d{10}$/.test(v); 
      }, 
      message: props => `${props.value} is not a valid 10-digit phone number!` 
    } 
  },
  pickupfulladdress: { 
    type: String, 
    required: [true, "Full pickup address is required"], 
    trim: true, 
    minlength: [5, "Address must be at least 5 characters long"], 
    maxlength: [200, "Address cannot exceed 200 characters"] 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
 { timestamps: true });

const BookcabPD = mongoose.models.BookcabPd || mongoose.model("BookcabPd", bookCabPDSchema);

export default BookcabPD;