import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { products } from "@wix/stores";
import { addToCart } from "@/app/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";

interface ProductActionButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  inStock: boolean | undefined;
}

export default function ProductActionButton({
  inStock,
  product,
  selectedOptions,
  quantity,
  ...props
}: ProductActionButtonProps) {
  return (
    <div>
      <Button
        onClick={() =>
          addToCart(wixBrowserClient(), {
            product,
            selectedOptions,
            quantity,
          })
        }
        {...props}
        variant="default"
        size={"lg"}
        disabled={!inStock}
        className="bg-primary text-primary-foreground w-full cursor-pointer py-6 hover:opacity-95"
      >
        Add to Bag
      </Button>

      {/* Favorite button */}
      <Button
        disabled={!inStock}
        variant="outline"
        size={"lg"}
        className="border-border mt-4 w-full cursor-pointer"
      >
        Buy Now <CreditCard className="ml-2" />
      </Button>
    </div>
  );
}
