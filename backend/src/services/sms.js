import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const sendSMS = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to, // include country code e.g. +91XXXXXXXXXX
    });

    console.log("SMS sent:", res.sid);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default sendSMS;