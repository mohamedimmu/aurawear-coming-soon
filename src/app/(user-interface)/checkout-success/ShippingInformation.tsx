import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Truck } from "lucide-react";
import { orders } from "@wix/ecom";

interface ShippingInformationProps {
  billingInfo?: orders.AddressWithContact | undefined;
  shippingInfo?: orders.V1ShippingInformation | undefined;
}

export default function ShippingInformation({
  billingInfo,
  shippingInfo,
}: ShippingInformationProps) {
  const contactDetails = billingInfo?.contactDetails;
  const addressInfo = billingInfo?.address;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-medium">
          {contactDetails?.firstName || ""} {contactDetails?.lastName || ""}
        </p>
        <p>{addressInfo?.addressLine1 || "N/A"}</p>
        <p>
          {addressInfo?.city || "N/A"},{" "}
          {addressInfo?.subdivisionFullname || "N/A"},{" "}
          {addressInfo?.postalCode || "N/A"}
        </p>
        <p>{addressInfo?.country || "N/A"}</p>
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="text-sm">
              {shippingInfo?.title === "Express Shipping"
                ? "Express Shipping (2-3 days)"
                : "Standard Shipping (5-7 days)"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
