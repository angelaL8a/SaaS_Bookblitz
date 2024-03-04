import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
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
    from: "",
    to: email,
    subject: subject,
    text: text,
    html: html,
  });

  return "success";
};
