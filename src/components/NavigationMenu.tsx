"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Instagram, Mail, Menu, X } from "lucide-react";
import { Label } from "./ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  // {
  //   name: "Shop",
  //   href: "/shop",
  // },
  // {
  //   name: "Collections",
  //   href: "/collections",
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  // },
];

export default function NavigationMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shouldAnimateIcon, setShouldAnimateIcon] = useState(false);
  const [mount, setMount] = useState(false);
  // const { systemTheme, theme, setTheme } = useTheme();
  // const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMount(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      // Trigger icon animation
      setShouldAnimateIcon(true);
      // Reset animation state after it completes (e.g., 500ms)
      setTimeout(() => setShouldAnimateIcon(false), 600);
    }
  };

  if (!mount) return null;
  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:!bg-transparent"
            aria-label="Menu"
          >
            <Menu className="navbar-icon" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="h-screen min-h-[420px] overflow-auto px-8 py-6 md:px-12 [&>button]:hidden"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetHeader>
            <div className="flex w-full items-center justify-between gap-4">
              <SheetClose asChild className="cursor-pointer" aria-label="Close">
                <X
                  className={cn(
                    "text-foreground transition-transform duration-300 ease-in-out hover:rotate-90 h-6 w-6",
                    shouldAnimateIcon && "rotate-180",
                  )}
                />
              </SheetClose>

              <div className="flex items-center gap-4">
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer hover:!bg-transparent"
                  onClick={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                  }
                  aria-label={
                    currentTheme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {currentTheme === "dark" ? (
                    <Sun className="text-foreground-light h-6 w-6" />
                  ) : (
                    <Moon className="text-foreground h-6 w-6" />
                  )}
                </Button> */}
                {/* <Link href="/" className="underline-link">
                  Search
                </Link> */}
                {/* <Link href="/" className="underline-link">
                  Login
                </Link> */}
              </div>
            </div>
          </SheetHeader>

          <div className="flex grow items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
              {navLinks?.map((link, index) => (
                <Label
                  key={index}
                  htmlFor="name"
                  className="text-center text-2xl md:text-4xl"
                >
                  <Link href={link.href} className="underline-link">
                    {" "}
                    {link.name}
                  </Link>
                </Label>
              ))}
            </div>
          </div>
          <SheetFooter className="flex items-center justify-center">
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/aurawear.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary cursor-pointer transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="mailto:info@aurawear.in"
                className="text-foreground hover:text-primary cursor-pointer fill-red-700 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
