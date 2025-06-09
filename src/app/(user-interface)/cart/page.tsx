import React from "react";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCart } from "@/app/wix-api/cart";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

export default async function CartPage() {
  const wixClient = await getWixServerClient();
  const cart = await getCart(wixClient);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 mt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items Section */}
       <CartItems initialData={cart} />

        {/* Order Summary Section */}
        <OrderSummary initialData={cart} />
      </div>
    </div>
  );
}
