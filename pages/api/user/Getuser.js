import errorHandler from "../../../utils/Features";
import ConnectDb from "../../../utils/DbConnect";
import User from "../../../Models/userModel";
const secretkey = process.env.SECRET_KEY;


const Getuser = async(req,res) =>{
    try {

const token = req.body;
        if(!token){
            errorHandler(res,400,"User not logged in");
        }
        await ConnectDb();
        const decoded = jwt.verify(token, secretkey);
      const  userId = decoded.id;

        const user = await User.findById(userId);
        if(!user){
            return errorHandler(res, 400, "No user Found");
        }
        const response =  res.status(200).json({user});
        return response;
        
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Server Error");
    }
}

export default Getuser;