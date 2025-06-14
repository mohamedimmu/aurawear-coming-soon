"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import WordMark from "./WordMark";
import { members } from "@wix/members";
import useAuth from "@/hooks/auth";
import { INSTAGRAM_LINK, SUPPORT_EMAIL, WHATSAPP_PHONE } from "@/lib/constants";

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
  member: members.Member | null;
}

export default function NavigationMenu({ member }: NavigationMenuProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shouldAnimateIcon, setShouldAnimateIcon] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const { login } = useAuth();
  const [baseURL, setBaseURL] = useState("");
  const [memberId, setMemberId] = useState<string | null>(member?._id || null);

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
    if (member) {
      setMemberId(member?.contactId || null);
    }
  }, [member]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="navbar-icon" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="h-screen min-h-[420px] overflow-auto [&>button]:hidden"
        aria-describedby="Navigation menu"
      >
        <div className="space-y-10 p-6">
          <SheetHeader>
            <SheetTitle className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
              {/* Center - Logo */}
              <Link
                href="/"
                aria-label="Aurawear Logo"
                className="flex items-center leading-none"
              >
                <WordMark width={360} height={21} />
              </Link>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground mt-2.5 text-center text-base font-medium">
              Own your vibe
            </SheetDescription>
            <div className="flex items-center justify-end gap-4">
              <SheetClose asChild className="cursor-pointer">
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
            {member && memberId ? (
              <NavSection title="Account" links={accountLinks} />
            ) : (
              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-semibold">Account</h3>
                <div className="space-y-2">
                  <SheetClose asChild>
                    <Button
                      onClick={() => login(baseURL)}
                      variant="ghost"
                      className="block w-full justify-start rounded px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
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
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Connect with us on Insatgram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              aria-label="Contact us via email"
              rel="noopener noreferrer"
              target="_blank"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Chat with us on WhatsApp"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
