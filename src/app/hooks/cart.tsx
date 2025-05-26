import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { addToCart, getCart } from "../wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { toast } from "sonner";
import CartNotification from "@/components/CartNotification";
import { AddtoCartNotificationType } from "@/types";

const wixClient = wixBrowserClient();
const queryKey: QueryKey = ["cart", wixClient];

export function useCart(initialData?: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixClient),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: AddtoCartNotificationType) =>
      addToCart(wixBrowserClient(), {
        product: values.product,
        selectedOptions: values.selectedOptions,
        quantity: values.quantity,
      }),
    onSuccess(data, variables) {
      const totalQuantity =
        data?.cart?.lineItems?.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0,
        ) || 0;

      const { product, selectedOptions, mediaItem, priceData } = variables;
      toast.custom(
        (addToCartModalClose) => {
          return (
            <CartNotification
              product={product}
              selectedOptions={selectedOptions}
              addToCartModalClose={addToCartModalClose}
              mediaItem={mediaItem}
              priceData={priceData}
              cartQuantity={totalQuantity}
            />
          );
        },
        {
          position: "top-right",
          duration: 5000,
          dismissible: true,
        },
      );
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add item to cart. Please try again.");
    },
  });
}
