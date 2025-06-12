import React from "react";
import Link from "next/link";
import NavigationMenu from "@/components/NavigationMenu";
import ActionMenu from "@/components/ActionMenu";
import WordMark from "@/components/WordMark";
import Logo from "@/components/Logo";
import { getLoggedInMember } from "@/wix-api/members";
import { getWixServerClient } from "@/lib/wix-client-server";

const Navbar = async () => {
  const wixClient = await getWixServerClient();
  const member = await getLoggedInMember(wixClient);

  return (
    <nav className="border-border bg-background sticky top-0 z-40 h-20 border-b">
      <div className="container-custom h-full">
        <div className="relative flex items-center justify-between gap-8">
          {/* Left side - Menu */}
          <div>
            <div className="hidden items-center gap-4 sm:flex">
              <NavigationMenu member={member} />
            </div>
            {/* Mobile */}
            <Link
              href="/"
              className="flex cursor-pointer items-center leading-none sm:hidden"
            >
              <Logo width={36} height={43} className="cursor-pointer" />
            </Link>
          </div>

          {/* Center - Logo */}
          <Link
            href="/"
            aria-label="Aurawear Logo"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center leading-none sm:flex"
          >
            <WordMark width={360} height={21} className="cursor-pointer" />
          </Link>

          {/* Right side - Icons */}
          <ActionMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
