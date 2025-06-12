import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WhatsNext() {
  return (
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
              You&apos;ll receive an email confirmation shortly with your order
              details.
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
  );
}
