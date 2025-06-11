"use client";

import React from "react";

import { getUserOrders } from "@/app/wix-api/orders";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { useInfiniteQuery } from "@tanstack/react-query";
import NoOrderHistory from "./NoOrderHistory";
import OrderCard from "./OrderCard";

export default function OrderPage() {
  // Processive Update
  const wixClient = wixBrowserClient();
  const { data } = useInfiniteQuery({
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Order History</h1>
        <p className="text-muted-foreground">
          View and track all your previous orders
        </p>
      </div>

      {orders?.length === 0 ? (
        <NoOrderHistory />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.number} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
