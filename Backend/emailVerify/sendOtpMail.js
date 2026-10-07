import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

export const sendOtpMail = async (email, otp) => {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //Send a message
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: email, // list of recipients
      subject: "  Password Reset Otp", // subject line
      text: `Your Otp for password reset is: ${otp}`, // plain text body
      html: `
    <h2>Password Reset</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP is valid for 10 minutes.</p>
`                                              // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

}