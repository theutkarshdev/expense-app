import { NextResponse } from "next/server";

export default async function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
