"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import bgImage from "@/assets/imgs/Rectangle 9.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BellDotIcon } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  async function getUserApi() {
    try {
      const response = await fetch("/api/user/get-user", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const data = await response.json();
      setUserData(data); // Set the fetched user data to state
    } catch (error) {
      console.error("Error during fetching user data:", error);
      setErrorMessage("An unexpected error occurred while fetching user data.");
    } finally {
      setLoading(false); // Reset loading state after fetch completes
    }
  }

  useEffect(() => {
    setErrorMessage(null); // Reset any previous errors
    getUserApi();
  }, []);

  return (
    <div className="w-full h-full relative">
      <Image className="w-full h-[40dvh] absolute top-0" width={500} height={500} src={bgImage} alt="background" />
      {loading && !userData?.user?.name ? (
        <div className="px-4 absolute top-0 z-[1] w-full">
          {errorMessage && (
            <div className="text-red-500 text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-between items-center mt-12">
            <div>
              <Skeleton className="h-4 w-10 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Button size="icon">
              <BellDotIcon />
            </Button>
          </div>

          <div className="bg-primary p-5 rounded-xl mt-10 text-white shadow-md">
            <p className="text-sm">Total Balance</p>
            <Skeleton className="h-4 w-20" />

            <div className="flex justify-between mt-7">
              <div>
                <p className="text-sm">Income</p>
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="text-right">
                <p className="text-sm">Expenses</p>
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 absolute top-0 z-[1] w-full">
          {errorMessage && (
            <div className="text-red-500 text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-between items-center mt-12">
            {userData && (
              <div className="text-white">
                <p className="text-xs">Good Afternoon,</p>
                <h2 className="text-lg font-medium">Mr, {userData.user.name}</h2>
              </div>
            )}

            <Button size="icon">
              <BellDotIcon />
            </Button>
          </div>

          <div className="bg-primary p-5 rounded-xl mt-10 text-white shadow-md">
            <p className="text-sm">Total Balance</p>
            <h2 className="text-xl font-medium">$ 2,548.00</h2>

            <div className="flex justify-between mt-7">
              <div>
                <p className="text-sm">Income</p>
                <h2 className="text-xl font-medium">$ 1,840.00</h2>
              </div>
              <div className="text-right">
                <p className="text-sm">Expenses</p>
                <h2 className="text-xl font-medium">$ 284.00</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
