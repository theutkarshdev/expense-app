"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { OtpField } from "@/components/common";
import Image from "next/image";
import Illustration from "@/assets/imgs/Illustration.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be at least 6 characters.",
  }),
});

const OTPScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get email and orderId from URL
  const email = searchParams.get("email");
  const orderId = searchParams.get("orderId");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, email, orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP. Please try again.");
      }

      const { isNewUser } = await response.json();
      if (isNewUser) {
        router.push("/auth/signup");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-dvh bg-white px-3 flex flex-col justify-center">
      <Image width={300} height={300} className="mx-auto" src={Illustration} priority alt="Onboarding Illustration" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <OtpField
            label="Enter your OTP"
            name="otp"
            control={form.control}
            className="w-full"
            placeholder="Enter your OTP"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button size="lg" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const OTPShow = () => {
  return (
    <Suspense>
      <OTPScreen />
    </Suspense>
  );
};
export default OTPShow;
