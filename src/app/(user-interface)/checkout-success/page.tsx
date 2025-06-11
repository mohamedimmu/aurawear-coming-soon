import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { getLoggedInMember } from "@/app/wix-api/members";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getOrder } from "@/app/wix-api/orders";
import Link from "next/link";
import { getProductById } from "@/app/wix-api/products";
import WixImage from "@/components/WixImage";
import { notFound } from "next/navigation";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: "Checkout success",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { orderId } = await searchParams;
  // const id = "e2a8afc6-ef95-44c9-8cda-264403bd7560";
  const wixClient = await getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  const orderNumber = order?.number;
  const paymentStatus = order?.paymentStatus;
  const billingInfo = order?.billingInfo;
  const contactDetails = billingInfo?.contactDetails;
  const purchasedDate = order?.purchasedDate;
  const priceSummary = order?.priceSummary;
  const addressInfo = billingInfo?.address;
  const shippingInfo = order?.shippingInfo;
  const lineItems = order?.lineItems;

  if (!order) {
    notFound();
  }

  const orderCreatedDate = order._createdDate
    ? purchasedDate && new Date(purchasedDate).toLocaleDateString()
    : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Success Header */}
      <div className="mb-12 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed.
        </p>
      </div>

      {/* Order Details */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Information */}
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
              <span className="">{orderNumber}</span>
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
                {priceSummary?.subtotal?.formattedAmount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tax:</span>
              <span className="font-bold">
                {priceSummary?.tax?.formattedAmount}
              </span>
            </div>
            {priceSummary?.shipping?.amount !== "0.00" && (
              <div className="flex justify-between">
                <span className="font-medium">Shipping:</span>
                <span className="font-bold">
                  {priceSummary?.shipping?.formattedAmount}
                </span>
              </div>
            )}
            {priceSummary?.discount?.amount !== "0.00" && (
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">
                  {priceSummary?.shipping?.formattedAmount}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">
                {priceSummary?.total?.formattedAmount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span
                className={`font-medium ${
                  paymentStatus === "PAID"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {paymentStatus === "PAID" ? "Paid" : "Cash on Delivery"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
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
            <p>{addressInfo?.addressLine1}</p>
            <p>
              {addressInfo?.city}, {addressInfo?.subdivisionFullname},{" "}
              {addressInfo?.postalCode}
            </p>
            <p>{addressInfo?.country}</p>
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
      </div>

      {/* Ordered Items */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ordered Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lineItems?.map(async (item) => {
              const productId = item?.catalogReference?.catalogItemId;
              const product =
                productId && (await getProductById(wixClient, productId));
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b py-3 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16">
                      <WixImage
                        mediaIdentifier={item?.image}
                        width={64}
                        height={64}
                        className="bg-muted"
                        alt={item?.productName?.translated}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium">
                        {product && product?.slug ? (
                          <Link
                            href={`products/${product.slug}`}
                            className="!cursor-pointer underline"
                          >
                            {item?.productName?.translated}
                          </Link>
                        ) : (
                          item?.productName?.translated
                        )}
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
                      <p className="text-muted-foreground text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {item?.price?.amount && item?.quantity && (
                      <>
                        <span className="text-muted-foreground mr-4">
                          {item.quantity} x {item?.price?.amount}
                        </span>
                        {item?.totalPriceAfterTax?.formattedAmount}
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-50">
              1
            </div>
            <div>
              <h4 className="font-medium">Order Confirmation</h4>
              <p className="text-muted-foreground text-sm">
                You&apos;ll receive an email confirmation shortly with your
                order details.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-50">
              2
            </div>
            <div>
              <h4 className="font-medium">Processing</h4>
              <p className="text-muted-foreground text-sm">
                Your order will be processed and prepared for shipping.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-50">
              3
            </div>
            <div>
              <h4 className="font-medium">Shipping</h4>
              <p className="text-muted-foreground text-sm">
                You&apos;ll receive tracking information once your order ships.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        {loggedInMember && (
          <Button asChild variant="outline" className="px-8">
            <Link href="/orders">My Orders</Link>
          </Button>
        )}
        <Button asChild variant="default" className="px-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
