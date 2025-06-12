import React from "react";
import { Separator } from "@/components/ui/separator";
import { orders } from "@wix/ecom";

interface OrderSummaryProps {
  // existing properties
  priceSummary?: orders.PriceSummary;
  additionalFees?: orders.AdditionalFee[];
}

const OrderSummary = ({ priceSummary, additionalFees }: OrderSummaryProps) => {
  const subtotal = priceSummary?.subtotal?.formattedAmount || 0;
  const tax = priceSummary?.tax?.formattedAmount || 0;
  const discount = priceSummary?.discount?.formattedAmount || 0;
  const total = priceSummary?.total?.formattedAmount || 0;

  const isValidDiscount = Number(priceSummary?.discount?.amount) > 0;

  return (
    <div>
      <h4 className="mb-3 font-semibold">Order Summary</h4>
      <div className="bg-muted/50 space-y-2 rounded-lg p-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax:</span>
          <span>{tax}</span>
        </div>
        {isValidDiscount && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount:</span>
            <span>{discount}</span>
          </div>
        )}
        {additionalFees &&
          additionalFees.length > 0 &&
          additionalFees.map((fee) => (
            <div className="flex justify-between text-sm" key={fee?._id}>
              <span>{fee?.name}</span>
              <span>{fee?.price?.formattedAmount}</span>
            </div>
          ))}
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
