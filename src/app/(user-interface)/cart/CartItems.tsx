"use client";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { Button } from "@/components/ui/button";
import WixImage from "@/components/WixImage";
import { formatINRCurrency } from "@/lib/utils";
import { currentCart } from "@wix/ecom";
import { Minus, Package, Plus, Timer, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CartItemsProps {
  initialData: currentCart.Cart | null;
}

export default function CartItems({ initialData }: CartItemsProps) {
  const cartQuery = useCart(initialData);

  const cartQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <div className="lg:col-span-2">
      <h1 className="mb-6 text-2xl font-medium">Cart ({cartQuantity})</h1>

      <div className="space-y-8">
        {cartQuery.data?.lineItems?.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

interface ExtendedLineItem extends currentCart.LineItem {
  lineItemPrice?: currentCart.MultiCurrencyPrice;
}

interface CartItemProps {
  item: ExtendedLineItem;
}

function CartItem({ item }: CartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();
  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  const lineItemPrice =
    item?.lineItemPrice?.formattedConvertedAmount ||
    formatINRCurrency(
      (Number(item?.price?.amount) ?? 0) * (item?.quantity ?? 0),
    );

  const isProductLessInQuantity =
    (item?.availability?.status &&
      item?.availability?.quantityAvailable &&
      item?.availability?.quantityAvailable <= 3) ||
    false;

  const handleRemoveItem = (productId: string) => {
    removeItemMutation.mutate(productId);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantityMutation.mutate({
      productId,
      newQuantity: quantity,
    });
  };

  return (
    <div className="border-b pb-8">
      <div className="flex gap-4 sm:flex-row">
        {/* Product Image */}
        <div className="bg-muted relative h-32 w-32 flex-shrink-0">
          <Link href={`/products/${slug}`}>
            <WixImage
              mediaIdentifier={item.image}
              width={208}
              height={208}
              alt={item.productName?.translated || "Product image"}
              className="bg-secondary aspect-square flex-none"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <div className="flex flex-col items-start justify-between sm:flex-row gap-2">
              <div className="space-y-1.5">
                <Link
                  href={`/products/${slug}`}
                  className="hover:text-muted-foreground flex cursor-pointer"
                >
                  <h3 className="text-base font-medium">
                    {item.productName?.translated || "Item"}
                  </h3>
                </Link>
                {!!item.descriptionLines?.length && (
                  <p className="text-muted-foreground text-base">
                    {item.descriptionLines?.map((line, index, array) => {
                      const optionName = line.name?.translated;
                      const optionValue =
                        line.colorInfo?.translated ||
                        line.plainText?.translated;
                      return (
                        <span key={line?.name?.translated}>
                          {optionName}:{" "}
                          <span className="underline">{optionValue}</span>
                          {index < array.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </p>
                )}
                {/* Rate per Item */}
                <div className="text-muted-foreground flex items-center gap-2 text-base">
                  {item?.quantity} x {item.price?.formattedConvertedAmount}
                  {item.fullPrice &&
                    item.fullPrice.amount !== item.price?.amount && (
                      <span className="text-muted-foreground line-through">
                        {item.fullPrice.formattedConvertedAmount}
                      </span>
                    )}
                </div>
              </div>

              {/* Full Price */}
              <div className="font-medium">MRP: {lineItemPrice}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border">
              <Button
                variant="ghost"
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    !item.quantity ? 0 : item.quantity - 1,
                  )
                }
                className="cursor-pointer p-2"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4">{item.quantity}</span>
              <Button
                variant="ghost"
                onClick={() =>
                  handleQuantityChange(
                    productId,
                    !item.quantity ? 1 : item.quantity + 1,
                  )
                }
                className="cursor-pointer p-2"
                aria-label="Increase quantity"
                disabled={quantityLimitReached}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Remove and Favorite buttons */}
            <Button
              variant="ghost"
              size={"icon"}
              onClick={() => handleRemoveItem(productId)}
              className="flex h-8 w-8 items-center justify-center border"
              aria-label="Remove item"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {item?.availability?.status ? (
        isProductLessInQuantity &&
        !quantityLimitReached && (
          <div className="mt-4 flex items-center gap-2">
            <Timer className="size-5 text-orange-500" />
            <span className="text-orange-500">
              Just a few left. Order soon.
            </span>
          </div>
        )
      ) : (
        <div className="flex gap-2">
          <Package className="size-5 items-center text-red-500" />
          <span className="text-red-500">Out of stock.</span>
        </div>
      )}
      {item?.availability?.status && quantityLimitReached && (
        <div className="mt-4 flex items-center gap-2">
          <Package className="size-5 text-red-500" />
          <span className="text-red-500">Quantity limit reached.</span>
        </div>
      )}
    </div>
  );
}
