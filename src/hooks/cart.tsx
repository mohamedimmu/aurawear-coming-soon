import {
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
} from "../wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { toast } from "sonner";
import CartNotification from "@/components/CartNotification";
import { AddtoCartNotificationType } from "@/types";

const wixClient = wixBrowserClient();
const queryKey: QueryKey = ["cart", wixClient];

// To get the initial data
export function useCart(initialData?: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixClient),
    initialData,
  });
}

// To add item to cart
export function useAddItemToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: AddtoCartNotificationType) =>
      addToCart(wixClient, {
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

// To uodate the cart item
export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const mutationKey: MutationKey = ["updateCartItemQuantity"];

  return useMutation({
    mutationKey,
    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixClient, values),
    onMutate: async ({ productId, newQuantity }) => {
      // Cancelling the existing query operation
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem,
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.warning("Something went wrong. Please try again.");
    },
    onSettled() {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}

// To remove the cart item
export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => removeCartItem(wixClient, productId),
    onMutate: async (productId) => {
      // Cancelling the existing query operation
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.filter(
          (lineItem) => lineItem._id !== productId,
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.warning("Something went wrong. Please try again.");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
