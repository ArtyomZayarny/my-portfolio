import * as nodemailer from "nodemailer";

const email = process.env.EMAIL_TO;
const password = process.env.APP_PASS;

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
