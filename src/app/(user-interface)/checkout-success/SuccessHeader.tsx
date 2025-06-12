import React from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessHeader() {
  return (
    <div className="mb-12 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="mb-2 text-3xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>
      <p className="text-muted-foreground">
        Thank you for your purchase. Your order has been confirmed.
      </p>
    </div>
  );
}
