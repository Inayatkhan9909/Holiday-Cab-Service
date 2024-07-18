import nodemailer from 'nodemailer';


const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

  const info =   await transporter.sendMail(mailOptions);
  if(info){
    console.log('Email sent successfully');
    return true;
  }
    
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
