import mongoose from "mongoose";

const User =  mongoose.models.User ||

mongoose.model("User", {
  firstName: String,
  lastName: String,
  phone:Number,
  email: String,
  password: String,
  verified:Boolean,
  otp:String
});

export default User