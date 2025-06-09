import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Grid, List } from "lucide-react";

interface ViewModeToggleProps {
  view?: "grid" | "list";
  searchParams: {
    q?: string;
    page?: string;
    collection?: string[];
    price_min?: string;
    price_max?: string;
    sort?: string;
    view?: "grid" | "list";
  };
}

export default function ViewModeToggle({
  view,
  searchParams,
}: ViewModeToggleProps) {
  // Create a clean query object with only the properties we need
  const query = {
    q: searchParams.q,
    page: searchParams.page,
    collection: searchParams.collection,
    price_min: searchParams.price_min,
    price_max: searchParams.price_max,
    sort: searchParams.sort,
  };

  return (
    <div className="hidden items-center gap-2 md:flex">
      <Link
        href={{
          pathname: "/shop",
          query: { ...query, view: "grid" },
        }}
      >
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer"
        >
          <Grid className="h-4 w-4" />
        </Button>
      </Link>
      <Link
        href={{
          pathname: "/shop",
          query: { ...query, view: "list" },
        }}
      >
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer"
        >
          <List className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
