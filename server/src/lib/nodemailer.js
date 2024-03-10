import nodemailer from "nodemailer";
import { envs } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: envs.MAIL_USER,
    pass: envs.MAIL_PASS,
  },
});

transporter.verify((err, success) => {
  console.log(err);

  if (success) {
    console.log("Ready to send emails...");
  }
});

export const sendEmail = async ({ email, subject, text, html }) => {
  await transporter.sendMail({
    from: "team652024@gmail.com",
    to: email,
    subject: subject,
    text: text,
    html: html,
  });

  return "success";
};
