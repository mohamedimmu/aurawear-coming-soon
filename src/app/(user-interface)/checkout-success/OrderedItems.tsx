import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { orders } from "@wix/ecom";

import OrderedItem from "./OrderedItem";
import { WixClient } from "@/lib/wix-client-base";

interface OrderedItemsProps {
  lineItems: orders.OrderLineItem[] | [];
  wixClient: WixClient;
}

export default async function OrderedItems({
  lineItems,
  wixClient,
}: OrderedItemsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Ordered Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lineItems.map((item) => (
            <OrderedItem key={item._id} item={item} wixClient={wixClient} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
