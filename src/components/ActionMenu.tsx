import React, { Suspense } from "react";
import { Button } from "./ui/button";
import { Search, ShoppingBag } from "lucide-react";
import { CartBadge } from "./CartBadge";
import { getCart } from "@/app/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import UserProfile from "./UserProfile";
import { getLoggedInMember } from "@/app/wix-api/members";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SearchPanel from "./SearchPanel";
import NavigationMenu from "./NavigationMenu";
import Link from "next/link";

export default async function ActionMenu() {
  const wixClient = await getWixServerClient();
  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <div>
              {/* Input search - large screen */}
              <Button
                className="bg-muted text-muted-foreground hidden min-w-[180px] cursor-pointer items-center justify-start gap-2 rounded-2xl px-4 py-2 lg:flex"
                variant="ghost"
                size="icon"
                aria-label="Search"
              >
                <Search className="navbar-icon" />
                <span>Search</span>
              </Button>
              {/* Icon Search - Smaller Screen */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                className="flex cursor-pointer hover:!bg-transparent lg:hidden"
              >
                <Search className="navbar-icon" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen w-full p-0">
            <SearchPanel />
          </SheetContent>
        </Sheet>
      </div>
      <Button
        variant="ghost"
        size="icon"
        asChild
        aria-label="Shopping Cart"
        className="relative cursor-pointer hover:!bg-transparent"
      >
        <Link href="/cart">
          <Suspense fallback={null}>
            <CartBadge initialData={cart} />
          </Suspense>
          <ShoppingBag className="navbar-icon" />
        </Link>
      </Button>
      <UserProfile loggedInMember={loggedInMember} />
      <div className="flex items-center gap-4 sm:hidden">
        <NavigationMenu />
      </div>
    </div>
  );
}
