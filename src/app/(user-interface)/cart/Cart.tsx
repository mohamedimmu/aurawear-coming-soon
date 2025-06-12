"use client";

import React from "react";
import CartItems from "./CartItems";
import CheckoutSummary from "./CheckoutSummary";
import { currentCart } from "@wix/ecom";
import { useCart } from "@/hooks/cart";
import EmptyCart from "./EmptyCart";

interface CartProps {
  initialData: currentCart.Cart | null;
}

export default function Cart({ initialData }: CartProps) {
  const cartQuery = useCart(initialData);

  const cartQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <div>
      {cartQuantity > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CartItems cartQuery={cartQuery} cartQuantity={cartQuantity} />
          <CheckoutSummary cartQuery={cartQuery} cartQuantity={cartQuantity} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
