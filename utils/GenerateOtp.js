import otpGenerator from 'otp-generator';

const GenerateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
};

export default GenerateOtp;
