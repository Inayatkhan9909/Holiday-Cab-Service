import User from '../../../Models/userModel';
import connectDB from '../../../utils/DbConnect';
import sendEmail from "../../../utils/Sendmail";
import bcrypt from "bcrypt";

const Verifyuser = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { email } = req.body;

    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const forgotpasswordToken = await bcrypt.hash(email, 10);
        const expiryTime = new Date(Date.now() + 3 * 60 * 1000);
        const sendtoken = await User.findByIdAndUpdate({ _id: user.id }, {
            forgotpasswordToken: forgotpasswordToken,
            forgotpasswordTokenExpiry: expiryTime
        }, { new: true });
        if (!sendtoken) {
            return res.status(404).send({ message: 'Password reset failed. Try again' });
        }

        const verificationUrl = `http://localhost:3000/user/resetpassword?email=${encodeURIComponent(email)}&forgotpasswordtoken=${encodeURIComponent(forgotpasswordToken)}`;
        const html = `<p>Your OTP code is: <b>Password reset link</b></p> <br/> <p>${verificationUrl}</p>`;
        const sent = await sendEmail(email, 'Password Reset', html);
        if (!sent) {
            return res.status(404).send({ message: 'Password reset failed. Try again' });
        }

        res.status(200).send({ message: 'Password reset link sent to your email successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error verifying account. Please try again.' });
    }
};

export default Verifyuser;
