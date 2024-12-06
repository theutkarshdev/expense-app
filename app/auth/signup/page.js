import { getSession } from "@/lib/session";
import SignupScreen from "./signUpScreen";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();
  const userId = session?.userId;
  const isNewUser = session?.isNewUser;

  if (!isNewUser && userId) {
    redirect("/dashboard");
  }

  if (!isNewUser && !userId) {
    redirect("/auth/login");
  }

  return <SignupScreen />;
}
