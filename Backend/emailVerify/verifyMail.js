import nodemailer from "nodemailer"
import 'dotenv/config'

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Handlebars from "handlebars"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)




export const verifyMail=async(token,email)=>{
    //In simple words: fs reads the email design, Handlebars prepares the design for dynamic data, and templete() inserts the actual token. Nodemailer then sends the completed email.
    const emailTempleteSource=fs.readFileSync(
        path.join(__dirname,"templete.hbs"),
        "utf-8"
    )
    const templete=Handlebars.compile(emailTempleteSource)
    const htmlToSend=templete({token:encodeURIComponent(token)})

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
    to:email, // list of recipients
    subject: "Email Veification", // subject line
    text:  `Your verification token is: ${token}`, // plain text body
    html: htmlToSend, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}

}