import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderCardSkeleton() {
  return (
    <Card className="w-full animate-pulse">
      <CardHeader>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-6 w-32 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status and Payment Info Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>

        <Separator />

        {/* Order Items Skeleton */}
        <div>
          <div className="mb-3 h-6 w-32 rounded bg-gray-200" />
          <div className="space-y-3">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="h-16 w-16 rounded bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-64 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
                <div className="h-5 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-3 h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="bg-muted/50 space-y-2 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex justify-between text-sm">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex justify-between text-sm">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
            {[...Array(1)].map((_, index) => (
              <div className="flex justify-between text-sm" key={index}>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold">
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Shipping and Delivery Info Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-200" />
              <div className="h-6 w-32 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-200" />
              <div className="h-6 w-32 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="h-4 w-44 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
