import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import User from "../../../Models/userModel";
import cookie from "cookie";
require("dotenv").config();
const secretkey = process.env.SECRET_KEY;

const LoginHandler = async (req,res) => {
   
    //    const url = req.netxUrl.pathname;
       
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {
        const { email, password } = req.body;
        if (email === "" && password === "") {
            return errorHandler(res, 400, "All Credentials required");
        }

        await ConnectDb();
        const user = await User.findOne({ email });
        if (!user) {
            return errorHandler(res, 400, "No user Found");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return errorHandler(res, 401, "Incorrect password");
        }

        const token = jwt.sign({ id: user._id }, secretkey,{expiresIn:"1d"});
        if (token) {
           
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60 * 24, 
                    sameSite: "strict",
                    path: '/', 
                })
            );
           
          const response =  res.status(200).json({ message: "Logged in succesfully", user, token});
        return response;
        }

    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }

}

    export default LoginHandler