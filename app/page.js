import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  const userId = session?.userId;

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full bg-white flex flex-col justify-center px-3">
      <h1 className="text-5xl font-bold text-center mb-4">Home</h1>
      <Link href={"/dashboard"}>
        <Button className="w-full" size="lg">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
