import { transporter, mailOptions } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, subject, message } = data;

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `👋 New request from timDev 🚀: ${subject}`,
      html: `<div>
      <h1>Message from: ${email}</h1></br>
      <p>${message}</p>
      </div>`,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(data);
}
