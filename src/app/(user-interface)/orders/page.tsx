import React from "react";
import MyOrders from "./MyOrders";
import { getLoggedInMember } from "@/wix-api/members";
import { notFound } from "next/navigation";
import { getWixServerClient } from "@/lib/wix-client-server";

export default async function OrderPage() {
  const wixClient = await getWixServerClient();
  const member = await getLoggedInMember(wixClient);

  if (!member) notFound();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Order History</h1>
        <p className="text-muted-foreground">
          View and track all your previous orders
        </p>
      </div>
      <MyOrders />
    </div>
  );
}
