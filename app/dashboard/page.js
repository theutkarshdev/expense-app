"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logout process begins

    try {
      const response = await fetch("/api/auth/log-out", {
        method: "GET", // Assuming GET is the correct method for logging out
      });

      if (!response.ok) {
        throw new Error("Failed to log out. Please try again.");
      }

      // Clear any user data from the state
      setUserData(null); // Assuming you have setUserData as a state setter

      // Optionally, you may want to redirect the user after successful logout
      router.push("/auth/login"); // Redirect to login page or home page after logout
    } catch (error) {
      console.error("Error during logout:", error);
      setErrorMessage("An unexpected error occurred while logging out.");
    } finally {
      setLoading(false); // Reset loading state after logout process finishes
    }
  };

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

  if (loading) {
    return (
      <div className="h-dvh w-full grid place-content-center bg-primary">
        <h1 className="text-5xl font-bold text-white">X-Pense</h1>
        {/* Optionally, you could display a spinner here */}
      </div>
    );
  }

  return (
    <div className="h-dvh w-full bg-white flex flex-col justify-center px-3">
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

      <Button className="w-full" size="lg" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
}
