import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="py-16 text-center">
        <ShoppingBag className="text-muted-foreground mx-auto mb-6 h-24 w-24" />
        <h1 className="mb-4 text-3xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your bag yet. Start
          shopping to fill it up!
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
    </div>
  );
}
