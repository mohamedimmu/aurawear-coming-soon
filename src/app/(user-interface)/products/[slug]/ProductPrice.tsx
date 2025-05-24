import { products } from "@wix/stores";
import React from "react";

interface ProductPriceProps {
  product: products.Product;
  selectedVariant: products.Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;
  if (!priceData) return null;
  const hasDiscount = priceData.discountedPrice !== priceData.price;
  return (
    <div className="">
      {hasDiscount ? (
        <div className="flex flex-row gap-4 flex-wrap">
          <p className="text-xl font-bold">
            {priceData.formatted?.discountedPrice}
          </p>
          <p className="text-muted-foreground text-lg font-normal">
            MRP: {priceData.formatted?.price}
          </p>
        </div>
      ) : (
        <p className="text-xl font-bold">MRP : {priceData.formatted?.price}</p>
      )}

      <p className="text-muted-foreground text-sm">Inclusive of all taxes</p>
      <p className="text-muted-foreground text-sm">
        (Also includes all applicable duties)
      </p>
    </div>
  );
}
