import mongoose from "mongoose";
import BookcabPD from "../Models/ConfirmBookcabPD"

const User =  mongoose.models.User ||

mongoose.model("User", {
  firstname: String,
  lastname: String,
  phone:Number,
  email: String,
  password: String,
  otp:String, 
  otpExpiry:Date,
  forgotpasswordToken:String,
  forgotpasswordTokenExpiry:Date,
  verified:{type:Boolean,default:false},
  isAdmin:{type:Boolean,default:false},
  PDbookings:[{type:mongoose.Schema.Types.ObjectId,ref :'BookcabPD'}]
 
});

export default User