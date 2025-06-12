import React from "react";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCart } from "@/wix-api/cart";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";
import CheckoutSummary from "./CheckoutSummary";

export default async function CartPage() {
  const wixClient = await getWixServerClient();
  const cart = await getCart(wixClient);
  if (!cart) {
    return <EmptyCart />;
  }
  return (
    <div className="container mx-auto mt-12 max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items Section */}
        <CartItems initialData={cart} />

        {/* Cart Summary Section */}
        <CheckoutSummary initialData={cart} />
      </div>
    </div>
  );
}
