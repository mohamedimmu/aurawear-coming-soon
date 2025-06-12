import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, HelpCircle } from "lucide-react";
import { orders } from "@wix/ecom";
import { Button } from "@/components/ui/button";
import { SUPPORT_EMAIL } from "@/lib/constants";

interface OrderHeaderProps {
  order: orders.Order;
}

const handleNeedHelp = (orderNumber?: string) => {
  const subject = `Help with Order #${orderNumber || "Unknown"}`;
  const body = `I need assistance with my order #${orderNumber || "Unknown"}. Please provide support. Thank you!`;

  const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink, "_blank");
};

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <CardHeader>
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order {order.number}
        </CardTitle>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          {order?.purchasedDate
            ? new Date(order.purchasedDate).toLocaleDateString()
            : "N/A"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleNeedHelp(order?.number)}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Need Help
        </Button>
      </div>
    </CardHeader>
  );
}
