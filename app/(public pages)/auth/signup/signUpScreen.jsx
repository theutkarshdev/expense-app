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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const SignupScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Signup failed");
      } else {
        router.push("/dashboard");
        // Optionally redirect or display a success message
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-dvh bg-white px-3 flex flex-col justify-center">
      <Image width={300} height={300} className="mx-auto" src={Illustration} priority alt="Onboarding Illustration" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <InputField
            label={"Enter your name"}
            type="text"
            name="username"
            control={form.control}
            className="w-full"
            placeholder={"Ex: John Doe"}
            aria-invalid={!!form.formState.errors.username}
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
          )}

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <Button size="lg" className="w-full" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupScreen;
