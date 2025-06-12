"use client";

import React from "react";
import { getUserOrders } from "@/wix-api/orders";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { useInfiniteQuery } from "@tanstack/react-query";
import NoOrderHistory from "./NoOrderHistory";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import OrdersListSkeleton from "@/components/loading/OrdersListSkeleton";

export default function MyOrders() {
  // Progressive Update
  const wixClient = wixBrowserClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["orders", wixClient],
      queryFn: async ({ pageParam }) =>
        getUserOrders(wixClient, {
          limit: 2,
          cursor: pageParam,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.metadata?.cursors?.next,
    });

  const orders = data?.pages.flatMap((page) => page.orders) || [];

  return (
    <div>
      {status === "pending" && <OrdersListSkeleton orderLimit={4} />}
      {status === "error" && (
        <p className="text-destructive">Error fetching orders</p>
      )}
      {status === "success" && !orders.length && !hasNextPage && (
        <NoOrderHistory />
      )}
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.number} order={order} />
        ))}
      </div>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? (
            <>
              <Loader2 className="animate-spin" />
              Load more
            </>
          ) : (
            " Load more"
          )}
        </Button>
      )}
    </div>
  );
}
