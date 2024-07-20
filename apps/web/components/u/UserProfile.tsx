"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import BlogCardArray from "../BlogCardArray";

async function fetchProfile(username: string) {
  const result = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/u/" + username
  );
  return result.data;
}

export default function UserProfile({ username }: { username: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetchProfile(username),
  });
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  else if (error) router.push("/");

  const userData = data.user;
  return (
    <div className="m-2 mx-8">
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-6xl ">
            {userData.username[0]}
          </AvatarFallback>
        </Avatar>
        <div className="font-semibold text-2xl">
          <h1>{userData.username}</h1>
          <p>First Last</p>
        </div>
      </div>
      <p className="m-2 text-sm text-slate-400">
        Driven and creative software developer with a passion for building
        user-centric applications. With over 5 years of experience in the tech
        industry, I specialize in React and Node.js, crafting scalable and
        maintainable code.
      </p>
      <Button className="rounded-full h-7">Follow</Button>
      <hr className="my-4" />
      <div>
        <BlogCardArray blogs={userData.Blogs} />
      </div>
    </div>
  );
}
