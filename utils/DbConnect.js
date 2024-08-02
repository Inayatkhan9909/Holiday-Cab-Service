import mongoose from "mongoose";
require("dotenv").config();
const url = process.env.DB_URL;

 const ConnectDb = async () =>{
   if (mongoose.connections[0].readyState) {
    console.log("Using existing connection");
    return;
  }
    try {
        await mongoose.connect(url);
        console.log("Database Connected ")
    } catch (error) {
        console.error(error);
    }

}

export default ConnectDb;