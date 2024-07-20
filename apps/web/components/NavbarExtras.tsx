"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function NavbarExtras({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        className="p-1 h-1/2"
      >
        <Moon className="dark:hidden" />
        <Sun className="hidden dark:inline" />
      </Button>
      {children}
    </div>
  );
}
