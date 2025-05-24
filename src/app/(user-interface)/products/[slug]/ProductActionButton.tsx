import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { products } from "@wix/stores";
import { addToCart } from "@/app/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { toast } from "sonner";
import CartNotification from "@/components/CartNotification";

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
  const handleCart = () => {
    addToCart(wixBrowserClient(), {
      product,
      selectedOptions,
      quantity,
    });
    toast.custom(
      (addToCartModalClose) => (
        <CartNotification
          product={product}
          selectedOptions={selectedOptions}
          addToCartModalClose={addToCartModalClose}
          mediaItem={mediaItem}
          priceData={priceData}
        />
      ),
      {
        position: "top-right",
        duration: 5000,
        dismissible: true,
      },
    );
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
    </>
  );
}
