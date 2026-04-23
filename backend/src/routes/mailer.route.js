import sendEmail from "../services/mailer.js";
import express from "express";
const mailerRouter = express.Router();

mailerRouter.post("/send-email", async (req, res) => {
  const { email } = req.body;
    try {   
    await sendEmail(email);
    res.send("Email sent");
  } catch (err) {
    res.status(500).send("Error sending email");
  }
});

export default mailerRouter;
