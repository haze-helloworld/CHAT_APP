import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email) => {

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome!",
      html: `<h1>Hello, ${email}!</h1>
      <p>How you doin??</p>`,
    });

    return "Email sent";
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Error sending email");
  }
};
export default sendEmail;