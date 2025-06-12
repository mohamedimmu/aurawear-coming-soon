import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  createProductReview,
  CreateProductReviewValues,
} from "@/wix-api/reviews";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProductReview() {
  const wixClient = wixBrowserClient();

  return useMutation({
    mutationFn: (values: CreateProductReviewValues) =>
      createProductReview(wixClient, values),
    onError(error) {
      console.error(error);
      toast.warning("Failed to create review. Please try again.");
    },
  });
}
