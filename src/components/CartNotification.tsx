import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { products } from "@wix/stores";
import WixImage from "./WixImage";
import { getMediaUrls } from "@/lib/utils";
import RichContentViewer from "./RichContentViewer";
import { CircleCheck, Loader2, Wallet, X } from "lucide-react";
import { useCartCheckout } from "@/hooks/checkout";

interface CartNotificationProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  addToCartModalClose?: string | number;
  mediaItem: products.MediaItem | undefined;
  priceData: products.PriceData | undefined;
  cartQuantity: number;
}

export default function CartNotification({
  product,
  selectedOptions,
  addToCartModalClose,
  mediaItem,
  priceData,
  cartQuantity,
}: CartNotificationProps) {
  const { imageUrl, resolvedThumbnailUrl } = mediaItem
    ? getMediaUrls(mediaItem)
    : { imageUrl: undefined, resolvedThumbnailUrl: undefined };
  const hasDiscount = priceData?.discountedPrice !== priceData?.price;
  const { startCheckoutFlow, pending: isCheckoutPending } = useCartCheckout();

  if (!cartQuantity) return null;

  return (
    <>
      <div className="bg-background max-w-md p-4 shadow-md">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CircleCheck className="h-6 w-6 text-green-500" />
            <p className="font-medium">Added to cart</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toast.dismiss(addToCartModalClose);
            }}
            className="cursor-pointer"
          >
            <X
              className="text-muted-foreground !h-6 !w-6"
              onClick={() => {
                toast.dismiss(addToCartModalClose);
              }}
            />
          </Button>
        </div>
        <div className="mb-8 flex gap-4">
          <div className="bg-muted h-32 w-32">
            <WixImage
              mediaIdentifier={imageUrl || resolvedThumbnailUrl}
              scaleToFill={true}
              width={128}
              height={128}
              alt={
                mediaItem?.image?.altText ||
                mediaItem?.video?.files?.[0].altText ||
                product.name
              }
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-start justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="font-medium">{product.name}</h3>
                <RichContentViewer
                  content={product.description}
                  paragraphClassName="text-muted-foreground text-sm"
                />
                <div>
                  {Object.entries(selectedOptions).map(
                    ([key, value], index, array) => {
                      return (
                        <span
                          key={key}
                          className="text-muted-foreground text-sm"
                        >
                          {key}: {value}
                          {index < array.length - 1 && ", "}
                        </span>
                      );
                    },
                  )}
                </div>
              </div>
              <div>
                {priceData &&
                  (hasDiscount ? (
                    <div className="flex flex-row flex-wrap gap-4">
                      <p className="text-secondary-foreground text-base font-medium">
                        {priceData.formatted?.discountedPrice}
                      </p>
                      <p className="text-muted-foreground text-base font-normal">
                        MRP: {priceData.formatted?.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-bold">
                      MRP : {priceData.formatted?.price}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            asChild
            className="border-border h-12 w-full cursor-pointer border px-4 py-3 text-center"
            onClick={() => toast.dismiss(addToCartModalClose)}
          >
            <Link href="/cart"> View Cart ({cartQuantity})</Link>
          </Button>
          <Button
            variant="default"
            onClick={startCheckoutFlow}
            className="bg-primary text-primary-foreground !h-12 w-full cursor-pointer px-4 py-3 text-center"
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
        </div>
      </div>
    </>
  );
}
