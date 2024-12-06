import { getSession } from "@/lib/session";
import LoginScreen from "./loginScreen";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginScreen />;
}
