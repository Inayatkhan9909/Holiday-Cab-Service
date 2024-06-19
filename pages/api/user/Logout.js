import cookie from "cookie";
import errorHandler from "../../../utils/Features";



async function Logout(req, res) {

    try {
        if (req.method !== "GET") {
            return errorHandler(res, 400, "Only POST Method is allowed");
        }
          
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24, 
                sameSite: "strict",
                path:'/'
               
            })
        );
        
        const response = res.status(200).json({
            message: 'Logout Successfully',
            success: true
        });
        return response;

    }
    catch (error) {
        return errorHandler(res, 500, "Server Error");

    }
}

export default Logout