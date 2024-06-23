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
    onewayfair:Number,
    roundtripfair:Number

});

export default BookcabPD