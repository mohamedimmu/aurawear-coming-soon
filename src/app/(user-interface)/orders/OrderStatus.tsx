import React from "react";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck } from "lucide-react";
import { orders } from "@wix/ecom";
import getStatusColor, { getStatusDisplay } from "@/lib/utils";

interface OrderStatusProps {
  order: orders.Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const paymentStatus = order.paymentStatus
    ? getStatusDisplay(order.paymentStatus, "payment")
    : null;

  const fulfillmentStatus = order.fulfillmentStatus
    ? getStatusDisplay(order.fulfillmentStatus, "delivery")
    : null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Payment Status */}
      <div className="flex items-center gap-2">
        <CreditCard className="text-muted-foreground h-4 w-4" />
        <span className="text-sm">Payment:</span>
        <Badge
          className={`${getStatusColor(
            order.paymentStatus || "UNKNOWN",
            "payment",
          )} `}
        >
          {paymentStatus}
        </Badge>
      </div>
      {/* Fulfillment Status */}
      <div className="flex items-center gap-2">
        <Truck className="text-muted-foreground h-4 w-4" />
        <span className="text-sm">Delivery:</span>
        <Badge
          className={`${getStatusColor(
            order.fulfillmentStatus || "UNKNOWN",
            "delivery",
          )}`}
        >
          {fulfillmentStatus}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Total:</span>
        <span className="font-semibold">
          {order.priceSummary?.total?.formattedAmount || "₹0.00"}
        </span>
      </div>
    </div>
  );
}
