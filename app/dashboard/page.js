import { verifySession } from "@/lib/session";
import Dashboard from "./dashboardScreen";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    redirect("/auth/login");
  }
  return <Dashboard />;
}
