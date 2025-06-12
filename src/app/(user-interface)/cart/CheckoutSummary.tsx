"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { currentCart } from "@wix/ecom";
import { useCart } from "@/hooks/cart";
import Link from "next/link";
import { Info, Loader2, Wallet } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCartCheckout } from "@/hooks/checkout";

interface OrderSummaryProps {
  initialData: currentCart.Cart | null;
}

export default function CheckoutSummary({ initialData }: OrderSummaryProps) {
  const cartQuery = useCart(initialData);
  const { startCheckoutFlow, pending: isCheckoutPending } = useCartCheckout();

  const cartQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 border p-6">
        <h2 className="mb-6 text-2xl font-medium">Summary</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span> Total number of items</span>
            <span>{cartQuantity}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <span>Subtotal</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto cursor-pointer !p-0"
                  >
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-secondary text-secondary-foreground custom-tooltip-arrow-color">
                  <p>Total before shipping</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {/* @ts-expect-error: subtotal may not have formattedConvertedAmount */}
            <span>{cartQuery.data?.subtotal?.formattedConvertedAmount}</span>
          </div>

          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>Shipping calculated at checkout</span>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              {/* @ts-expect-error: subtotal may not have formattedConvertedAmount */}
              <span>{cartQuery.data?.subtotal?.formattedConvertedAmount}</span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button
              variant="default"
              className="bg-primary text-primary-foreground h-auto w-full py-4"
              disabled={!cartQuantity || cartQuery.isFetching}
              onClick={startCheckoutFlow}
            >
              {isCheckoutPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Checkout <Wallet className="ml-2" />
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full py-4"
              asChild
              // onClick={() => navigate("/login?checkout=true")}
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
