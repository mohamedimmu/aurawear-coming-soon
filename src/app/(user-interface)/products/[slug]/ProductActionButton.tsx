"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { products } from "@wix/stores";
import { useAddItemToCart } from "@/app/hooks/cart";

interface ProductActionButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  inStock: boolean | undefined;
  media: products.MediaItem[] | undefined;
  selectedVariant: products.Variant | null;
}

export default function ProductActionButton({
  inStock,
  product,
  selectedOptions,
  quantity,
  media,
  selectedVariant,
  ...props
}: ProductActionButtonProps) {
  const mediaItem = media?.[0];
  const priceData = selectedVariant?.variant?.priceData || product.priceData;
  const { mutate, isPending } = useAddItemToCart();

  const handleCart = () => {
    mutate({
      product,
      selectedOptions,
      quantity,
      mediaItem,
      priceData,
    });
  };
  return (
    <>
      {/* <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm" /> */}
      <div>
        <Button
          onClick={handleCart}
          {...props}
          variant="default"
          size={"lg"}
          disabled={!inStock || isPending}
          className="bg-primary text-primary-foreground w-full cursor-pointer py-6 hover:opacity-95"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Add to cart
            </>
          ) : (
            "Add to cart"
          )}
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
    </>
  );
}
