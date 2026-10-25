//Used to send emails from your backend
import nodemailer from "nodemailer"
//Loads variables from your .env file into process.env, such as your email credentials and JWT secret.
import "dotenv/config"
//Used to read files from your computer or server
import fs from "fs"
import path from "path"
//Converts a file URL into a normal filesystem path
import { fileURLToPath } from "url"
//Creates dynamic email content from a template. For example, it can insert a user's name and verification link into an HTML email.
import Handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyMail = async (token, email, username = "there") => {
  // Reads the email template from the templete.hbs file
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "templete.hbs"),
    "utf-8"
  )
  const template = Handlebars.compile(emailTemplateSource)

  // Link the button points to (must match a route in your frontend/backend)
  //http://localhost:5173/verify/eyJhbGciOiJIUzI1N
  const verificationUrl = `${process.env.CLIENT_URL}/verify/${encodeURIComponent(token)}`
//insert real values into the templete.hbs email template
  const htmlToSend = template({
    username,
    verificationUrl,
    token, // raw token for display only
  })

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Gmail App Password
    },
  })

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification",
      text: `Hello ${username}, verify your email here: ${verificationUrl}\n\nYour verification token is: ${token}`,
      html: htmlToSend,
    })

    console.log("Message sent: %s", info.messageId)
  } catch (err) {
    console.error("Error while sending mail:", err)
  }
}