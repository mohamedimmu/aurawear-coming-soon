import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { members } from "@wix/members";

interface ActionButtonsProps {
  loggedInMember?: members.Member | null;
}

export default function ActionButtons({ loggedInMember }: ActionButtonsProps) {
  return (
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
  );
}
