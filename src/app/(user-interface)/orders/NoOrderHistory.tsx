import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NoOrderHistory() {
  return (
    <div className="py-16 text-center">
      <ShoppingBag className="text-muted-foreground mx-auto mb-6 h-24 w-24" />
      <h3 className="mb-4 text-2xl font-bold">No orders yet</h3>
      <p className="text-muted-foreground mx-auto mb-8 max-w-md">
        You haven&apos;t placed any orders yet. Start shopping to see your order
        history here.
      </p>
      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-4">
        <Button asChild className="w-full">
          <Link href="/shop">Start Shopping</Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/cart">View Cart</Link>
        </Button>
      </div>
    </div>
  );
}
