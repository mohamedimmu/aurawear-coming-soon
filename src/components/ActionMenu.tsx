import React, { Suspense } from "react";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { CartBadge } from "./CartBadge";
import { getCart } from "@/app/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";

export default async function ActionMenu() {

  const wixClient = await getWixServerClient();
  const [cart] = await Promise.all([
    getCart(wixClient),
  ]);

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="hidden cursor-pointer hover:!bg-transparent md:block"
      >
        <Search className="navbar-icon" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping Cart"
        className="relative cursor-pointer hover:!bg-transparent"
      >
        <Suspense fallback={null}>
          <CartBadge initialData={cart} />
        </Suspense>
        <ShoppingCart className="navbar-icon" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Account"
        className="hidden cursor-pointer hover:!bg-transparent md:block"
      >
        <User className="navbar-icon" />
      </Button>
    </div>
  );
}