import { Button } from "@/components/ui/button";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AccountPage = () => {
  async function handleLogout() {
    "use server";
    await deleteSession();
    redirect("/auth/login");
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-3">Account Page</h1>
      <form action={handleLogout}>
        <Button type="submit" className="w-full" size="lg">
          Log Out
        </Button>
      </form>
    </div>
  );
};

export default AccountPage;
