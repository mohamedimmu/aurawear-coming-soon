import React, { Suspense } from "react";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { getCart } from "@/app/wix-api/cart";
import { Badge } from "./ui/badge";
import { getWixServerClient } from "@/lib/wix-client-server";

export async function CartBadge() {
  const wixClient = await getWixServerClient();
  const cart = await getCart(wixClient);
  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  if (totalQuantity === 0) return null;

  return (
    <Badge className="absolute top-0.5 -right-0.5 h-4 w-4 rounded-full px-1">
      {totalQuantity}
    </Badge>
  );
}

function ActionMenu() {
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
          <CartBadge />
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

export default ActionMenu;
