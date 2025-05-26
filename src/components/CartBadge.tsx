"use client";

import { useCart } from "@/app/hooks/cart";
import { Badge } from "./ui/badge";
import { currentCart } from "@wix/ecom";

export function CartBadge({
  initialData,
}: {
  initialData: currentCart.Cart | null;
}) {
  const { data } = useCart(initialData);
  const totalQuantity =
    data?.lineItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  if (totalQuantity === 0) return null;

  return (
    <Badge className="absolute top-0.5 -right-0.5 h-4 w-4 rounded-full px-1">
      {totalQuantity < 10 ? totalQuantity : "9+"}
    </Badge>
  );
}
