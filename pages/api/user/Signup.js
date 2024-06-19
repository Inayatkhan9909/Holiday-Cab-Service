import bcrypt from "bcrypt";
import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import User from "../../../Models/userModel";

const SignupHandler = async (req, res) => {
    

    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed");
    }

    try {
        const { firstname, lastname, email, phone, password } = req.body;

        if (firstname === "" && lastname === "" && phone === "" && email === "" && password === "") {
            return errorHandler(res, 400, "All Credentials Required!");
        }

        await ConnectDb();
        const Alreadyexists = await User.findOne({ email });
        if (Alreadyexists) {
            return errorHandler(res, 400, "User alredy exists");
        }

        const passencrypt = await bcrypt.hash(password, 10);
        const user = User.create({
            firstname,
            lastname,
            email,
            phone,
            password: passencrypt

        });
        
        if (user) {

            res.status(201).json({ message: "User Created Succesfully" });
        }

    }
    catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }

}

export default SignupHandler
