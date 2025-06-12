"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOut, Package, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { members } from "@wix/members";
import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

interface UserProfileProps {
  loggedInMember: members.Member | null;
  className?: string;
}

const UserProfile = ({ loggedInMember }: UserProfileProps) => {
  const { login, logout } = useAuth();
  const [baseURL, setBaseURL] = useState("");

  const user = {
    name:
      `${loggedInMember?.contact?.firstName}, ${loggedInMember?.contact?.lastName}` ||
      "",
    email: loggedInMember?.loginEmail || "",
    avatar: "",
  };

  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);

  if (!loggedInMember) {
    return (
      <>
        <Button
          onClick={() => login(baseURL)}
          variant="outline"
          size="default"
          className="cursor-pointer"
        >
          Log In
        </Button>
      </>
    );
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 cursor-pointer rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64"
          align="end"
          sideOffset={8} // Added offset to prevent overlap with trigger
          collisionPadding={8} // Added padding to handle screen edge
        >
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground w-[240px] truncate text-sm">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/orders" className="flex items-center gap-2">
              <Package className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout(baseURL)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
