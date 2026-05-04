import type { Request, Response } from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import config from "../config/config.js";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    let { name, email, message, recaptcha } = req.body.payload;

    if (!email || !message || !recaptcha) {
      res.status(422).json({ message: "All fields are required to send an email" });
      return;
    }

    if (name && name.length > 64) {
      res.status(422).json({ message: "Name must be equal or less than 64 characters" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+$/.test(email)) {
      res.status(422).json({ message: "Invalid email format" });
      return;
    }

    if (message.length > 512) {
      res.status(422).json({ message: "Message must be equal or less than 512 characters" });
      return;
    }

    const secretKey = config.RECAPTCHA_SECRET_KEY;
    const verificationUrl = config.RECAPTCHA_VERIFICATION_URL;

    if (!secretKey || !verificationUrl) {
      throw new Error("Missing required environment variables: RECAPTCHA_SECRET_KEY or RECAPTCHA_VERIFICATION_URL");
    }

    const verificationResponse = await axios.post(verificationUrl, null, {
      params: {
        secret: secretKey,
        response: recaptcha,
      },
    });

    if (!verificationResponse.data.success) {
      res.status(422).json({ message: "reCAPTCHA verification failed" });
      return;
    }

    //sanitation
    name = name?.trim() || name;
    message = message.trim();

    // Mailer logic here
    const emailUser = config.EMAIL_USER;
    const emailPass = config.EMAIL_PASSWORD;
    const emailRecipient = config.EMAIL_RECIPIENT;

    if (!emailUser || !emailPass || !emailRecipient) {
      throw new Error("Missing required environment variables: EMAIL_USER, EMAIL_PASS, or EMAIL_RECIPIENT");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: emailRecipient,
      subject: "Portfolio Notification",
      text: `Name: ${name || "Not provided"}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!", payload: req.body });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};
