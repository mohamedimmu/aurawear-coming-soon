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
import { Instagram, Mail, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import WordMark from "./WordMark";
import { members } from "@wix/members";
import useAuth from "@/hooks/auth";

interface NavLink {
  name: string;
  href: string;
}

const shopLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  // { name: "Collections", href: "/collections" },
  { name: "Coming Soon", href: "/coming-soon" },
];

const accountLinks: NavLink[] = [
  { name: "My Profile", href: "/profile" },
  { name: "Order History", href: "/orders" },
  { name: "Shopping Bag", href: "/cart" },
];

const supportLinks: NavLink[] = [
  { name: "Contact Us", href: "/contact" },
  { name: "Policy", href: "/policy" },
];

const NavSection: React.FC<{ title: string; links: NavLink[] }> = ({
  title,
  links,
}) => (
  <div className="space-y-4">
    <h3 className="border-b pb-2 text-lg font-semibold">{title}</h3>
    <div className="space-y-2">
      {links.map((link) => (
        <SheetClose key={link.href} asChild>
          <Link
            href={link.href}
            className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {link.name}
          </Link>
        </SheetClose>
      ))}
    </div>
  </div>
);

interface NavigationMenuProps {
  member?: members.Member | null;
}

export default function NavigationMenu({ member }: NavigationMenuProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shouldAnimateIcon, setShouldAnimateIcon] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const { login } = useAuth();
  const [baseURL, setBaseURL] = useState("");

  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");
  const handleOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      // Trigger icon animation
      setShouldAnimateIcon(true);
      // Reset animation state after it completes (e.g., 500ms)
      setTimeout(() => setShouldAnimateIcon(false), 600);
    }
  };

  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="navbar-icon" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="h-screen min-h-[420px] overflow-auto [&>button]:hidden"
      >
        <div className="space-y-10 p-6">
          <SheetTitle className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
            {/* Center - Logo */}
            <Link
              href="/"
              aria-label="Aurawear Logo"
              className="flex items-center leading-none"
            >
              <WordMark width={360} height={21} />
            </Link>
            {/* <p className="mb-1 text-2xl font-bold">Aura wear</p> */}
            <p className="text-muted-foreground font-medium">Own your vibe</p>
          </SheetTitle>
          <SheetHeader>
            <div className="flex items-center justify-end gap-4">
              <SheetClose asChild>
                <X
                  className={cn(
                    "h-6 w-6 transition-transform duration-300 ease-in-out hover:rotate-90",
                    shouldAnimateIcon ? "rotate-180" : "rotate-0",
                  )}
                />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-4">
            <NavSection title="Shop" links={shopLinks} />
            {member ? (
              <NavSection title="Account" links={accountLinks} />
            ) : (
              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-semibold">Account</h3>
                <div className="space-y-2">
                  <SheetClose asChild>
                    <Button
                      onClick={() => login(baseURL)}
                      variant="ghost"
                      className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Login
                    </Button>
                  </SheetClose>
                </div>
              </div>
            )}
            <NavSection title="Support" links={supportLinks} />
            <div className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">Settings</h3>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                  <span>Dark Mode</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="flex items-center justify-center">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/aurawear.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="mailto:info@aurawear.in"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
