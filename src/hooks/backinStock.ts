import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/wix-api/backInStock";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBackInStockNotificationRequest() {
  const wixClient = wixBrowserClient();
  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixClient, values),
    onError(error) {
      console.error(error);
      if (
        (
          error as unknown as {
            details?: { applicationError?: { code?: string } };
          }
        ).details?.applicationError?.code === "OWNED_CART_NOT_FOUND"
      ) {
        toast.info("You are already subscribed to this product.");
      } else {
        toast.warning("Something went wrong. Please try again.");
      }
    },
  });
}
