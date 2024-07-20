"use client";
import { toast as typeToast } from "@/components/ui/use-toast";

import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleSignin(
  event: React.FormEvent<HTMLFormElement>,
  toast: typeof typeToast,
  router: AppRouterInstance
) {
  event.preventDefault();
  toast({
    title: "Logging in",
    duration: 3000,
  });
  const form = event.currentTarget;
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  try {
    const result = await axios.post(
      API_URL + "/auth/signin",
      {
        email: form.email.value,
        password: form.password.value,
      },
      {
        withCredentials: true,
      }
    );
    toast({
      title: "Logged in",
      duration: 2000,
    });

    router.push("/accountsettings");
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      toast({
        title: "Error",
        description: error.response?.data.message,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Error",
      description: JSON.stringify(error).substring(0, 20),
      variant: "destructive",
      duration: 3000,
    });
  }
}

export async function handleSignup(
  event: React.FormEvent<HTMLFormElement>,
  toast: typeof typeToast,
  router: AppRouterInstance
) {
  event.preventDefault();
  toast({
    title: "Logging in",
    duration: 3000,
  });
  const form = event.currentTarget;
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  try {
    const result = await axios.post(
      API_URL + "/auth/signup",
      {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      },
      {
        withCredentials: true,
      }
    );
    toast({
      title: "Logged in",
      duration: 2000,
    });
    router.push("/accountsettings");
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      toast({
        title: "Error",
        description: error.response?.data.message,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Error",
      description: JSON.stringify(error).substring(0, 20),
      variant: "destructive",
      duration: 3000,
    });
  }
}
