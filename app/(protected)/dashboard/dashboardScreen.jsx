"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  async function getUserApi() {
    setLoading(true); // Set loading to true when the fetch starts
    setErrorMessage(null); // Reset any previous errors

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

  // Call getUserApi when component is mounted
  useEffect(() => {
    getUserApi();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="w-full flex flex-col justify-center px-3 h-full">
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold text-center">Dashboard</h1>

          {errorMessage && (
            <div className="text-red-500 text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          {userData && (
            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold">Welcome, {userData.user.name}</h2>
              {/* Display other user info if available */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
