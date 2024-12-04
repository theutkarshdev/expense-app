import connectToDatabase from "@/lib/dbConnect";
import { decrypt } from "@/lib/session";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: "Name is required to complete signup" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    const user = await User.findById(session.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found. Please verify OTP again." }, { status: 404 });
    }

    // Update the user's name if not already set
    if (!user.name) {
      user.name = name;
      await user.save();
    } else {
      return NextResponse.json({ message: "User already has a name set" }, { status: 400 });
    }

    return NextResponse.json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error processing signup:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
