import { QueryKey, useQuery } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { getCart } from "../wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";

const wixClient = wixBrowserClient();  
const queryKey: QueryKey = ["cart", wixClient];

export function useCart(initialData?: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixClient),
    initialData,
  });
}
