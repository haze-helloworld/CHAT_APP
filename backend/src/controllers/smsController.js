import sendSMS from "../services/sms";
import express from "express";
const smsRouter = express.Router();

smsRouter.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    await sendSMS(phone, `Your OTP is ${otp}`);
    res.send("OTP sent");
  } catch (err) {
    res.status(500).send("Failed to send OTP");
  }
});

export default smsRouter;
