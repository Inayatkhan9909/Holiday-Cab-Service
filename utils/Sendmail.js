import nodemailer from 'nodemailer';
import axios from 'axios';

const validateEmail = async (email) => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  const response = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`);
  return response.data.status === 'valid';
};

const sendEmail = async (to, subject, html) => {
  try {
    const isValid = await validateEmail(to);
    if (!isValid) {
      console.error('Invalid email address:', to);
      return false;
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

  const info =   await transporter.sendMail(mailOptions);
  if(info){
    console.log(info)
    console.log('Email sent successfully');
    return true;
  }
    
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
