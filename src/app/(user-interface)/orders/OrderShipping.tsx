import React from "react";
import { Truck, MapPin } from "lucide-react";
import { orders } from "@wix/ecom";

interface OrderShippingProps {
  shippingInfo?: orders.V1ShippingInformation | undefined;
}

export default function OrderShipping({ shippingInfo }: OrderShippingProps) {
  const shippingDestination = shippingInfo?.logistics?.shippingDestination;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      
      <div>
        <h4 className="mb-3 flex items-center gap-2 font-semibold">
          <Truck className="h-4 w-4" />
          Shipping Method
        </h4>
        <p className="text-muted-foreground text-sm">
          {shippingInfo?.title || "N/A"}
        </p>
      </div>

      {shippingDestination && (
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <MapPin className="h-4 w-4" />
            Delivery Address
          </h4>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p>
              {shippingDestination.contactDetails?.firstName || "N/A"}{" "}
              {shippingDestination?.contactDetails?.lastName || "N/A"}
            </p>
            <p>{shippingDestination?.address?.addressLine1 || "N/A"}</p>
            <p>
              {shippingDestination?.address?.postalCode || "N/A"}{" "}
              {shippingDestination?.address?.city || "N/A"}
            </p>
            <p>
              {shippingDestination?.address?.subdivisionFullname || "N/A"},{" "}
              {shippingDestination?.address?.countryFullname || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
