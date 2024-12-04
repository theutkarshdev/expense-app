import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function GET() {
  try {
    await deleteSession();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error Logged out:", error);
    return NextResponse.json({ message: "Failed to Logged out" }, { status: 500 });
  }
}
