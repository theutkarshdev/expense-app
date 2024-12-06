import connectToDatabase from "@/lib/dbConnect";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request) {
  const { email, otp, orderId } = await request.json();

  if (!email || !otp || !orderId) {
    return NextResponse.json({ message: "Email, OTP, and Order ID are required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the OTP in the database
    const storedOtp = await Otp.findOne({ email, otp, orderId });
    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 401 });
    }

    // OTP and orderId are valid, proceed to check user details
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (user && !user.name) {
      // User exists but `name` is not set
      isNewUser = true;
    } else if (!user) {
      // No user exists for the email
      user = await User.create({ email });
      isNewUser = true;
    }

    await createSession(user._id, isNewUser);
    // Remove the OTP from the database
    await Otp.deleteOne({ email, otp, orderId });

    return NextResponse.json({ message: "OTP verified", isNewUser }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Failed to verify OTP" }, { status: 500 });
  }
}
