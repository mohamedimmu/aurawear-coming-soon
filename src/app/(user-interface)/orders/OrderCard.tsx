import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { orders } from "@wix/ecom";
import OrderHeader from "./OrderHeader";
import OrderStatus from "./OrderStatus";
import OrderItems from "./OrderItems";
import OrderShipping from "./OrderShipping";
import { Separator } from "@/components/ui/separator";
import OrderSummary from "./OrderSummary";

interface OrderCardProps {
  order: orders.Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card key={order.number} className="w-full">
      <OrderHeader order={order} />
      <CardContent className="space-y-6">
        <OrderStatus order={order} />
        <Separator />
        <OrderItems lineItems={order.lineItems || []} />
        <Separator />
        <OrderSummary additionalFees={order.additionalFees} priceSummary={order.priceSummary} />
        <Separator />
        <OrderShipping shippingInfo={order.shippingInfo} />
      </CardContent>
    </Card>
  );
}
