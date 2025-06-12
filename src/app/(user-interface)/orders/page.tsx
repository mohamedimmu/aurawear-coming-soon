import React from "react";
import MyOrders from "./MyOrders";

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Order History</h1>
        <p className="text-muted-foreground">
          View and track all your previous orders
        </p>
      </div>
      <MyOrders />
    </div>
  );
}
