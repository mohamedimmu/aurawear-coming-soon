import React from "react";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCart } from "@/wix-api/cart";

import Cart from "./Cart";

export default async function CartPage() {
  const wixClient = await getWixServerClient();
  const cart = await getCart(wixClient);

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 py-8">
      <Cart initialData={cart} />
    </div>
  );
}
