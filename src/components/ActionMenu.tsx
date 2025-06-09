import React, { Suspense } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { CartBadge } from "./CartBadge";
import { getCart } from "@/app/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import UserProfile from "./UserProfile";
import { getLoggedInMember } from "@/app/wix-api/members";

export default async function ActionMenu() {
  const wixClient = await getWixServerClient();
  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <div className="flex items-center space-x-4">
      {/* <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="hidden cursor-pointer hover:!bg-transparent md:block"
      >
        <Search className="navbar-icon" />
      </Button> */}

      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping Cart"
        className="relative cursor-pointer hover:!bg-transparent"
      >
        <Suspense fallback={null}>
          <CartBadge initialData={cart} />
        </Suspense>
        <ShoppingBag className="navbar-icon" />
      </Button>
      <UserProfile loggedInMember={loggedInMember} />
    </div>
  );
}
