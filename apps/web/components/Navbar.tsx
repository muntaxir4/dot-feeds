import NavbarExtras from "./NavbarExtras";

import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-1 h-1/2">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={"/auth/signin"}>
          <DropdownMenuItem>Signin</DropdownMenuItem>
        </Link>

        <Link href={"/auth/signup"}>
          <DropdownMenuItem>Signup</DropdownMenuItem>
        </Link>

        <Link href={"/accountsettings"}>
          <DropdownMenuItem>Account Settings</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-start sm:justify-center m-1 relative items-center">
      <Link href={"/"}>
        <h2 className="text-3xl font-bold  m-1 mx-2 ">Dot Feeds</h2>
      </Link>

      <div className=" absolute right-2 m-1">
        <NavbarExtras>
          <NavMenu />
        </NavbarExtras>
      </div>
    </div>
  );
}
