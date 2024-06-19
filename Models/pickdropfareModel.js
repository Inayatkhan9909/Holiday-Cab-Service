import mongoose from "mongoose";

const PickDrop =  mongoose.models.PickDrop  ||

mongoose.model("PickDrop", {
    ridecode:String,
    pickup: String,
    drop: String,
    onewayfair:Number,
    roundtripfair:Number,
    cabtype:String

});

export default PickDrop