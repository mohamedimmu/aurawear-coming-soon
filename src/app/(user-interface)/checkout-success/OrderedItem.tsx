import React from "react";
import { orders } from "@wix/ecom";
import WixImage from "@/components/WixImage";
import Link from "next/link";
import { getProductById } from "@/wix-api/products";
import { WixClient } from "@/lib/wix-client-base";

interface OrderedItemProps {
  item: orders.OrderLineItem;
  wixClient: WixClient;
}

export default async function OrderedItem({
  item,
  wixClient,
}: OrderedItemProps) {
  const productId = item?.catalogReference?.catalogItemId;
  const product = productId && (await getProductById(wixClient, productId));

  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16">
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
        </div>
        <div>
          <h4 className="font-medium">
            {product && product?.slug ? (
              <Link
                href={`products/${product.slug}`}
                className="!cursor-pointer underline"
              >
                {item?.productName?.translated}
              </Link>
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
          <p className="text-muted-foreground text-sm">
            Quantity: {item.quantity}
          </p>
        </div>
      </div>
      <span className="font-medium">
        {item?.price?.amount && item?.quantity && (
          <>
            <span className="text-muted-foreground mr-4">
              {item.quantity} x {item?.price?.amount}
            </span>
            {item?.totalPriceAfterTax?.formattedAmount}
          </>
        )}
      </span>
    </div>
  );
}
