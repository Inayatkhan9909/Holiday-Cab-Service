import mongoose from "mongoose";

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
 
});

export default User