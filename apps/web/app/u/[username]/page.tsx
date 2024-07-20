"use client";
import { useParams } from "next/navigation";
import UserProfile from "@/components/u/UserProfile";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  return <UserProfile username={username} />;
}
