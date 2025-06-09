import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/app/wix-api/backInStock";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ToastNotification from "@/components/ToastNotification";

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
        toast.custom((t) => (
          <ToastNotification
            modalClose={t}
            variant="info"
            title="You are already subscribed to this product."
          />
        ));
      } else {
        toast.custom((t) => (
          <ToastNotification
            modalClose={t}
            variant="warning"
            title="Something went wrong. Please try again."
          />
        ));
      }
    },
  });
}
