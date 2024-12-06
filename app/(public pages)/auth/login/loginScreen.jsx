"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common";
import Image from "next/image";
import Illustration from "@/assets/imgs/Illustration.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }
      const { orderId } = await response.json();
      router.push(`/auth/otp?email=${encodeURIComponent(data.email)}&orderId=${orderId}`);
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
          <InputField
            label="Enter your email"
            type="email"
            name="email"
            control={form.control}
            className="w-full"
            placeholder="Ex: abc@example.com"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Get OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginScreen;
