import React from "react";
import { orders } from "@wix/ecom";
import OrderItem from "./OrderItem";

interface OrderItemsProps {
  lineItems: orders.OrderLineItem[] | undefined;
}

export default function OrderItems({ lineItems }: OrderItemsProps) {
  return (
    <div>
      <h4 className="mb-3 font-semibold">Items Ordered</h4>
      <div className="space-y-3">
        {lineItems?.map((item) => <OrderItem key={item._id} item={item} />)}
      </div>
    </div>
  );
}
