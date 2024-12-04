import { NextResponse } from "next/server";
import User from "@/models/User";
import { verifySession } from "@/lib/session";
import connectToDatabase from "@/lib/dbConnect";

export async function GET() {
  try {
    // Verify the session
    const session = await verifySession();

    // If the session is invalid or not found, return an unauthorized response
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user based on the session's userId
    const user = await User.findById(session.userId);

    // If the user is not found, return a not found response
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return the user details
    return NextResponse.json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);

    // Return a server error response
    return NextResponse.json(
      { message: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}
