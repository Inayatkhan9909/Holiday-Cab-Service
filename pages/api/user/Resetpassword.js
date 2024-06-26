import User from '../../../Models/userModel';
import connectDB from '../../../utils/DbConnect';
import sendEmail from "../../../utils/Sendmail";
import bcrypt from "bcrypt";

const Resetpassword = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { email, password, forgotpasswordToken } = await req.body;

    try {
        if (!email || !forgotpasswordToken || !password) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
  
        if (new Date() > new Date(user.forgotpasswordTokenExpiry)) {
            return res.status(400).send({ message: 'Password reset token has expired' });
        }


        if (forgotpasswordToken !== user.forgotpasswordToken) {
            return res.status(404).send({ message: 'Password reset failed' });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const sendtoken = await User.findByIdAndUpdate({ _id: user.id }, {
            forgotpasswordToken: "",
            forgotpasswordTokenExpiry: null,
            password: hashedpassword
        }, { new: true });
        if (!sendtoken) {
            return res.status(404).send({ message: 'Password reset failed. Try again' });
        }

        const loginurl = `http://localhost:3000/user/login`;
        const html = `<p>Your OTP code is: <b>Your password  is successfully changed</b></p> <br/> <p>Click here to login</p> <br/> <p>${loginurl}</p>`;
        const sent = await sendEmail(email, 'Password Successfull', html);

        res.status(200).send({ message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error reseting password. Please try again.' });
    }
};

export default Resetpassword;
