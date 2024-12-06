import React from "react";
import OTPShow from "./otpScreen";
import { getSession } from "@/lib/session";

export default async function OtpPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <OTPShow />;
}
