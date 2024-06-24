import User from '../../../Models/userModel';
import connectDB from '../../../utils/DbConnect'; 

const Verifyuser = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  const { email, otp } = req.body;
console.log(email);
  try {
   await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).send({ message: 'Invalid OTP' });
    }

    user.verified = true;
    user.otp = undefined; 
    await user.save();

    res.status(200).send({ message: 'Account verified successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error verifying account. Please try again.' });
  }
};

export default Verifyuser
