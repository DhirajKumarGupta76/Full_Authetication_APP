import nodemailer from "nodemailer"
import "dotenv/config"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyMail = async (token, email, username = "there") => {
  // Read the email design, compile it with Handlebars, then fill in the real data
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "templete.hbs"),
    "utf-8"
  )
  const template = Handlebars.compile(emailTemplateSource)

  // Link the button points to (must match a route in your frontend/backend)
  const verificationUrl = `${process.env.CLIENT_URL}/verify/${encodeURIComponent(token)}`

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