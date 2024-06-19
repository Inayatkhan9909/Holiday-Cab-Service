import mongoose from "mongoose";

const CabsFair =  mongoose.models.CabsFair ||

mongoose.model("CabsFair", {

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

export default CabsFair