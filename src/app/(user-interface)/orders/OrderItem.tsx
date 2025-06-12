"use client";

import React, { useState, useEffect } from "react";
import { orders } from "@wix/ecom";
import WixImage from "@/components/WixImage";
import { getProductById } from "@/wix-api/products";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { products } from "@wix/stores";
import Link from "next/link";

interface OrderItemProps {
  item: orders.OrderLineItem;
}

function OrderItemSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-lg border p-3">
      <div className="h-16 w-16 rounded bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-48 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-200" />
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>
      <div className="text-right">
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function OrderItem({ item }: OrderItemProps) {
  const [product, setProduct] = useState<(products.Product | undefined) | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productId = item?.catalogReference?.catalogItemId;
        if (productId) {
          const fetchedProduct = await getProductById(
            wixBrowserClient(),
            productId,
          );
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [item]);

  const priceData = product?.priceData;
  const hasDiscount =
    priceData && priceData.discountedPrice !== priceData.price;

  if (loading) {
    return <OrderItemSkeleton />;
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      {product && product?.slug ? (
        <Link href={`/products/${product.slug}`}>
          <WixImage
            width={64}
            height={64}
            mediaIdentifier={item?.image}
            alt={item?.productName?.translated}
            className="bg-muted cursor-pointer"
          />
        </Link>
      ) : (
        <WixImage
          width={64}
          height={64}
          mediaIdentifier={item?.image}
          alt={item?.productName?.translated}
          className="bg-muted"
        />
      )}
      <div className="flex-1">
        <h4 className="font-medium">
          {product && product?.slug ? (
            <a
              href={`/products/${product.slug}`}
              className="cursor-pointer hover:underline"
            >
              {item?.productName?.translated}
            </a>
          ) : (
            item?.productName?.translated
          )}
        </h4>
        <div>
          {item?.descriptionLines && (
            <p className="text-muted-foreground text-sm">
              {item?.descriptionLines
                .map((line) => {
                  if (line?.plainText) {
                    return `${line?.name?.translated}: ${line?.plainText?.translated || "N/A"}`;
                  }
                  if (line?.colorInfo) {
                    return `${line?.name?.translated}: ${line?.colorInfo?.translated || "N/A"}`;
                  }
                  return "";
                })
                .filter(Boolean)
                .join(" | ")}
            </p>
          )}
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground mr-4 flex items-center">
            <p>Quantity: {item.quantity} x{" "}</p>
            {hasDiscount ? (
              <div className="flex flex-row flex-wrap gap-4">
                <span className="text-sm font-medium">
                  {priceData.formatted?.discountedPrice}
                </span>
                <span className="text-muted-foreground text-sm font-normal line-through">
                  {priceData?.formatted?.price}
                </span>
              </div>
            ) : (
              <p className="text-sm font-medium">
                {product?.priceData?.formatted?.price}
              </p>
            )}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="font-semibold">
          {item?.totalPriceAfterTax?.formattedAmount}
        </span>
      </div>
    </div>
  );
}
