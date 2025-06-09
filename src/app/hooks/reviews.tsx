import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  createProductReview,
  CreateProductReviewValues,
} from "@/app/wix-api/reviews";
import { useMutation } from "@tanstack/react-query";
import ToastNotification from "@/components/ToastNotification";
import { toast } from "sonner";

export function useCreateProductReview() {
  const wixClient = wixBrowserClient();

  return useMutation({
    mutationFn: (values: CreateProductReviewValues) =>
      createProductReview(wixClient, values),
    onError(error) {
      console.error(error);
      toast.custom((t) => (
        <ToastNotification
          variant="warning"
          modalClose={t}
          title="Failed to create review. Please try again."
        />
      ));
    },
  });
}
