import mongoose from "mongoose";

const BookcabPD =  mongoose.models.BookcabPD ||

mongoose.model("BookcabPD", {

    pickup: String,
    drop: String,
    ridetype:String,
    phone:Number,
    email: String,
    traveldate:Date,
    traveltime: String,
    tripfair:Number,
    cabtype:String,
    persons:Number,
    customername:String,
    contact:Number,
    pickupfulladdress:String
    

});

export default BookcabPD