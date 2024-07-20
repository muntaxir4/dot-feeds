"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface User {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

async function checkUser() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const result = await axios.get(API_URL + "/u/check", {
    withCredentials: true,
  });

  return result.data;
}

export default function AccountSettings() {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => checkUser(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) router.push("/auth/signin");

  const userData: User = data?.user ?? {};
  console.log("ss", data);

  return (
    <div className="m-2">
      <h1 className="text-2xl md:text-3xl text-center sm:ml-5 sm:text-left">
        Account Settings
      </h1>
      <hr className="m-2" />
      <div className="mx-4 sm:mx-36">
        <div className="grid grid-cols-5 items-center gap-8 m-4">
          <Label className="col-span-2">Email:</Label>
          <Input className=" col-span-3" defaultValue={userData.email} />
        </div>
        <div className="grid grid-cols-5 items-center gap-8 m-4">
          <Label className="col-span-2">Username:</Label>
          <Input className=" col-span-3" defaultValue={userData.username} />
        </div>
        <div className="grid sm:grid-cols-2">
          <div className="grid grid-cols-5 items-center gap-8 m-4">
            <Label className="col-span-2">First Name:</Label>
            <Input className=" col-span-3" defaultValue={userData.firstName} />
          </div>
          <div className="grid grid-cols-5 items-center gap-8 m-4">
            <Label className="col-span-2">Last Name:</Label>
            <Input className=" col-span-3" defaultValue={userData.lastName} />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5 items-center gap-8 m-4">
            <Label className="col-span-2">Change Password:</Label>
            <div className="col-span-3 grid gap-2">
              <Input className=" col-span-3" placeholder="Current password" />
              <Input className=" col-span-3" placeholder="New password" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-16">
          <Button disabled> Save Changes</Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}
