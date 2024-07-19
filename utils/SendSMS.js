const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const SendSMS = async(contact,smsBody) =>{

try {

    const result = await client.messages.create({
        body:smsBody,
        from: process.env.TWILIO_PHONENO,
        to: `+91 ${contact}`
    })

    if(!result)
    {
        console.log('message not sent', result.sid);
        return true;
    }
    console.log('Message sent successfully:', result.sid);
    return true;

} catch (error) {
    console.log(error);
    console.error('Error sending email:', error);
}

}

export default SendSMS;

    