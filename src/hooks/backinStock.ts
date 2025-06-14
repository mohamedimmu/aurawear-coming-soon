import { NotifyFormValues } from "@/components/NotifyForm";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/wix-api/backInStock";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export interface ExtendedMutationVariables
  extends BackInStockNotificationRequestValues {
  form: UseFormReturn<NotifyFormValues>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useCreateBackInStockNotificationRequest() {
  const wixClient = wixBrowserClient();
  return useMutation({
    mutationFn: (values: ExtendedMutationVariables) =>
      createBackInStockNotificationRequest(wixClient, values),
    onSuccess: (data, variables) => {
      const { form, setIsModalOpen, product } = variables;
      form.reset();
      setIsModalOpen(false);
      toast.success("Thanks for your interest!", {
        description: `We'll notify you when new ${product?.name} become available.`,
      });
    },
    onError(error, variables) {
      const { form, setIsModalOpen } = variables;
      const appError = error as unknown as {
        details?: { applicationError?: { code?: string } };
      };
      const errorCode = appError.details?.applicationError?.code;
      if (
        errorCode === "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS" ||
        errorCode === "OWNED_CART_NOT_FOUND"
      ) {
        toast.info("You are already subscribed to this product.");
      } else {
        console.error(error);
        toast.warning("Something went wrong. Please try again.");
      }
      form.reset();
      setIsModalOpen(false);
    },
  });
}
