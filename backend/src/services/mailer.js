import nodemailer from 'nodemailer';
import {ENV} from '../libs/env.js';
import { welcomeTemplate}  from '../emails/welcome.js';




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, fullname) => {

  try {
    await transporter.sendMail({
      from: ENV.EMAIL_USER,
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