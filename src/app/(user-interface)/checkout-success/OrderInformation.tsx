import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { orders } from "@wix/ecom";
import getStatusColor, { getStatusDisplay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderInformationProps {
  orderNumber?: string | null | undefined;
  orderCreatedDate: string | null | undefined;
  priceSummary?: orders.PriceSummary | undefined;
  paymentStatus?: orders.PaymentStatus;
  additionalFees?: orders.AdditionalFee[];
}

export default function OrderInformation({
  orderNumber,
  orderCreatedDate,
  priceSummary,
  paymentStatus,
  additionalFees,
}: OrderInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Order ID:</span>
          <span>{orderNumber || "N/A"}</span>
        </div>
        {orderCreatedDate && (
          <div className="flex justify-between">
            <span className="font-medium">Order Date:</span>
            <span>{orderCreatedDate}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold">
            {priceSummary?.subtotal?.formattedAmount || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Tax:</span>
          <span className="font-bold">
            {priceSummary?.tax?.formattedAmount || "N/A"}
          </span>
        </div>
        {priceSummary?.shipping?.amount !== "0.00" && (
          <div className="flex justify-between">
            <span className="font-medium">Shipping & Handling:</span>
            <span className="font-bold">
              {priceSummary?.shipping?.formattedAmount || "N/A"}
            </span>
          </div>
        )}
        {priceSummary?.discount?.amount !== "0.00" && (
          <div className="flex justify-between">
            <span className="font-medium">Discount:</span>
            <span className="font-bold">
              {priceSummary?.discount?.formattedAmount || "N/A"}
            </span>
          </div>
        )}
        {additionalFees &&
          additionalFees.length > 0 &&
          additionalFees.map((fee) => (
            <div className="flex justify-between text-sm" key={fee?._id}>
              <span className="font-medium">{fee?.name}</span>
              <span className="font-bold">{fee?.price?.formattedAmount}</span>
            </div>
          ))}
        <Separator />
        <div className="flex justify-between">
          <span className="font-medium">Total Amount:</span>
          <span className="font-bold">
            {priceSummary?.total?.formattedAmount || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment Status:</span>
          <Badge
            className={`${getStatusColor(
              paymentStatus || "UNKNOWN",
              "payment",
            )} font-medium`}
          >
            {getStatusDisplay(paymentStatus, "payment")}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
