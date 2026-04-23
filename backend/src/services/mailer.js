import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { welcomeTemplate}  from '../emails/welcome.js';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, fullname) => {

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome!",
      html: welcomeTemplate(email, fullname),
    });

    return "Email sent";
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Error sending email");
  }
};
export default sendEmail;