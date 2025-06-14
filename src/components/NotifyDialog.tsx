import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell, PlayIcon } from "lucide-react";
import WixImage from "./WixImage";
import NotifyForm from "./NotifyForm";
import { useLoggedInMember } from "@/hooks/members";
import { products } from "@wix/stores";
import { getMediaUrls } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";

interface NotifyDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOptions: Record<string, string>;
  media: products.MediaItem[] | undefined;
  product: products.Product;
}

const NotifyDialog = ({
  isModalOpen,
  setIsModalOpen,
  selectedOptions,
  media,
  product,
}: NotifyDialogProps) => {
  const productName = product?.name || "";
  const productDescription = product?.description || "";
  const selectedMedia = media?.[0];
  const { imageUrl, resolvedThumbnailUrl } = selectedMedia
    ? getMediaUrls(selectedMedia)
    : { imageUrl: undefined, resolvedThumbnailUrl: undefined };
  const altText =
    selectedMedia?.image?.altText ||
    selectedMedia?.video?.files?.[0].altText ||
    "Aurawear Product Image";
  const { data, isPending, error } = useLoggedInMember();
  const loggedInEmail = data?.loginEmail;
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);

  // Set default email: prefill with loggedInEmail if not pending and no error, otherwise empty string
  const defaultEmail =
    !isPending && !error && loggedInEmail ? loggedInEmail : "";

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="notify-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Get notified when back in stock</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter your email address and we&apos;ll let you know when this product
          is back in stock.
        </DialogDescription>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Image */}
            <div className="bg-muted relative h-24 w-24 cursor-pointer">
              {imageUrl && resolvedThumbnailUrl ? (
                <div>
                  <WixImage
                    mediaIdentifier={imageUrl || resolvedThumbnailUrl}
                    alt={altText}
                    className="object-cover"
                    scaleToFill={true}
                    width={96}
                    height={96}
                  />
                  {resolvedThumbnailUrl && (
                    <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40">
                      <PlayIcon className="size-5 text-white/60" />
                    </span>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium">{productName}</h3>
              <p className="text-muted-foreground text-sm">
                {productDescription}
              </p>
              {selectedOptions &&
                Object.entries(selectedOptions).length > 0 &&
                Object.entries(selectedOptions).map(([key, value]) => {
                  return (
                    <p key={key} className="text-muted-foreground text-sm">
                      {key} {value}
                    </p>
                  );
                })}
            </div>
          </div>
          {isPending && (
            <p className="text-muted-foreground text-sm">Loading...</p>
          )}
          {error && (
            <p className="text-sm text-red-500">
              Error loading user data. Please try again.
            </p>
          )}
          <NotifyForm
            type="stockNotification"
            toastSuccessMessage="Thanks for your interest!"
            toastSuccessDescription={`We'll notify you when new ${productName} become available.`}
            setIsModalOpen={setIsModalOpen}
            defaultEmail={defaultEmail}
            buttonName="Notify me"
            Icon={Bell}
            baseUrl={baseURL}
            product={product}
            selectedOptions={selectedOptions}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyDialog;
