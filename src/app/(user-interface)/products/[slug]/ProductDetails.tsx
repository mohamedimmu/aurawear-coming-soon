"use client";

import React, { useState } from "react";
import { products } from "@wix/stores";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from "./ProductMedia";
import RichContentViewer from "@/components/RichContentViewer";
import ProductPrice from "./ProductPrice";
import ProductOptions from "./ProductOptions";
import ProductActionButton from "./ProductActionButton";
import { Package, Timer } from "lucide-react";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  // const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  ); // { Size: "28", color: "red"}

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  // const availableQuantityExceeded =
  //   !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div>
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Left column - Product Images */}
        <div className="w-full lg:w-[60%]">
          <ProductMedia
            media={
              !!selectedOptionsMedia?.length
                ? selectedOptionsMedia
                : product.media?.items
            }
          />
        </div>

        {/* Right column - Product Info */}
        <div className="w-full space-y-9 lg:w-[40%]">
          {/* Product title and description */}
          <div>
            {/* Sustainable label */}
            {product?.ribbon && (
              <div className="font-medium text-red-600">{product.ribbon}</div>
            )}
            <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
            {product.description && (
              <RichContentViewer
                paragraphClassName="text-muted-foreground mt-1 text-lg"
                content={product.description}
              />
            )}
          </div>

          {/* Price */}
          <ProductPrice product={product} selectedVariant={selectedVariant} />

          {/* Stock Details */}
          {availableQuantity && inStock ? (
            availableQuantity < 3 && (
              <div className="flex gap-2">
                <Timer className="size-5 text-red-600" />
                <span className="text-red-600">
                  Just a few left. Order soon.
                </span>
              </div>
            )
          ) : (
            <div className="flex gap-2">
              <Package className="size-5 text-red-600" />
              <span className="text-red-600">Out of stock.</span>
            </div>
          )}

          {/* Options  */}
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />

          {/* Add to Cart / Buy Now */}
          <ProductActionButton
            inStock={inStock}
            product={product}
            selectedOptions={selectedOptions}
            selectedVariant={selectedVariant}
            media={
              !!selectedOptionsMedia?.length
                ? selectedOptionsMedia
                : product.media?.items
            }
            quantity={1}
          />
        </div>
      </div>
    </div>
  );
}
