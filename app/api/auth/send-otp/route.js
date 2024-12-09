import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/dbConnect";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Import a library to generate unique IDs

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" });
  }

  try {
    await connectToDatabase();

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Generate a unique order ID
    const orderId = uuidv4();

    // Set OTP expiration time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP and orderId to the database
    await Otp.create({ email, otp, orderId, expiresAt });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code and Order ID",
      text: `Your OTP code is: ${otp}\nYour Order ID is: ${orderId}`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully", orderId, email });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Failed to send OTP" });
  }
}
