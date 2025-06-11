import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Calendar, CreditCard, Truck, MapPin } from "lucide-react"; // Lucide icons
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { orders } from "@wix/ecom";
import WixImage from "@/components/WixImage";

// TypeScript interfaces based on API data

interface OrderCardProps {
  order: orders.Order;
}

// Utility function to determine badge color based on status
const getStatusColor = (
  status: string,
  type: "payment" | "delivery",
): string => {
  if (type === "payment") {
    return status === "NOT_PAID" ? "bg-red-500" : "bg-green-500";
  }
  if (type === "delivery") {
    return status === "NOT_FULFILLED" ? "bg-yellow-500" : "bg-green-500";
  }
  return "bg-gray-500";
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card key={order.number} className="w-full">
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
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status and Payment Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <CreditCard className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">Payment:</span>
            <Badge
              className={`${getStatusColor(order?.paymentStatus || "UNKNOWN", "payment")} text-white`}
            >
              {order.paymentStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">Delivery:</span>
            <Badge
              className={`${getStatusColor(order?.fulfillmentStatus || "UNKNOWN", "delivery")} text-white`}
            >
              {order.fulfillmentStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Subtotal:</span>
            <span className="font-semibold">
              ₹
              {order.priceSummary?.subtotal?.amount
                ? Number(order.priceSummary.subtotal.amount).toFixed(2)
                : "0.00"}
            </span>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div>
          <h4 className="mb-3 font-semibold">Items Ordered</h4>
          <div className="space-y-3">
            {(order.lineItems || []).map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <WixImage
                    width={64}
                    height={64}
                    mediaIdentifier={item?.image}
                    alt={item?.productName?.translated}
                    className="bg-muted"
                  />
                  <div className="flex-1">
                    {/* <h4 className="font-medium">
                      {product?.slug ? (
                        <Link
                          href={`/products/${product.slug}`}
                          className="cursor-pointer hover:underline"
                        >
                          {item?.productName?.translated}
                        </Link>
                      ) : (
                        item?.productName?.translated
                      )}
                    </h4> */}
                    <h4 className="font-medium">
                      {item?.productName?.translated}
                    </h4>
                    <div>
                      {item?.descriptionLines && (
                        <p className="text-muted-foreground text-sm">
                          {item?.descriptionLines
                            .map((line) => {
                              if (line?.plainText) {
                                return `${line?.name?.translated}: ${line?.plainText?.translated || "N/A"}`;
                              }
                              if (line?.colorInfo) {
                                return `${line?.name?.translated}: ${line?.colorInfo?.translated || "N/A"}`;
                              }
                              return "";
                            })
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                      )}
                    </div>
                    <p className="text-sm">
                      <span className="text-muted-foreground mr-4">
                        Quantity:
                        {item.quantity} x {item?.price?.amount}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">
                      ₹{item?.totalPriceAfterTax?.formattedAmount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Shipping and Delivery Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <Truck className="h-4 w-4" />
              Shipping Method
            </h4>
            <p className="text-muted-foreground text-sm">
              {order.shippingInfo?.title || "N/A"}
            </p>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <MapPin className="h-4 w-4" />
              Delivery Address
            </h4>
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>
                {order?.shippingInfo?.logistics?.shippingDestination
                  ?.contactDetails?.firstName || "N/A"}{" "}
                {order?.shippingInfo?.logistics?.shippingDestination
                  ?.contactDetails?.lastName || ""}
              </p>
              <p>
                {order?.shippingInfo?.logistics?.shippingDestination?.address
                  ?.addressLine1 || "N/A"}
              </p>
              <p>
                {order?.shippingInfo?.logistics?.shippingDestination?.address
                  ?.postalCode || "N/A"}{" "}
                {order?.shippingInfo?.logistics?.shippingDestination?.address
                  ?.city || "N/A"}
              </p>
              <p>
                {order?.shippingInfo?.logistics?.shippingDestination?.address
                  ?.subdivisionFullname || "N/A"}
                ,{" "}
                {order?.shippingInfo?.logistics?.shippingDestination?.address
                  ?.countryFullname || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
