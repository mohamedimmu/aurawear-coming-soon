import React from "react";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getOrder } from "@/wix-api/orders";
import { getLoggedInMember } from "@/wix-api/members";
import { notFound } from "next/navigation";
import SuccessHeader from "./SuccessHeader";
import OrderInformation from "./OrderInformation";
import ShippingInformation from "./ShippingInformation";
import OrderedItems from "./OrderedItems";
import WhatsNext from "./WhatsNext";
import ActionButtons from "./ActionButtons";

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

  if (!order) {
    notFound();
  }

  const orderCreatedDate = order._createdDate
    ? order.purchasedDate && new Date(order.purchasedDate).toLocaleDateString()
    : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SuccessHeader />
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderInformation
          additionalFees={order.additionalFees}
          orderNumber={order.number}
          orderCreatedDate={orderCreatedDate}
          priceSummary={order.priceSummary}
          paymentStatus={order.paymentStatus}
        />
        <ShippingInformation
          billingInfo={order.billingInfo}
          shippingInfo={order.shippingInfo}
        />
      </div>
      <OrderedItems lineItems={order.lineItems || []} wixClient={wixClient} />
      <WhatsNext />
      <ActionButtons loggedInMember={loggedInMember} />
    </div>
  );
}
