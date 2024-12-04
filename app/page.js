import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh w-full bg-white flex flex-col justify-center px-3">
      <h1 className="text-5xl font-bold text-center mb-4">Home</h1>
      <Link href={"/dashboard"}>
        <Button className="w-full" size="lg">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
