import React, { Suspense } from "react";
import ProductResults from "./ProductResults";
import { ProductsSort } from "@/app/wix-api/products";
import { Metadata } from "next";
import ViewModeToggle from "./ViewModeToggle";

interface SearchParams {
  q?: string;
  page?: string;
  collection?: string[];
  price_min?: string;
  price_max?: string;
  sort?: string;
  view?: "grid" | "list";
}

type ShopPageProps = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: ShopPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const { q } = resolvedSearchParams;

  return {
    title: q ? `Results for "${q}"` : "All Products",
    description: "Browse our collection of premium products",
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;

  const {
    q,
    page = "1",
    collection: collectionIds,
    price_min,
    price_max,
    sort,
    view = "grid",
  } = resolvedSearchParams;

  const title = q ? `Results for "${q}"` : "Shop All Products";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">
                {/* Showing {paginatedProducts.length} of{" "}
                {filteredAndSortedProducts.length} products */}
              </p>
            </div>

            {/* View Mode Toggle */}
            <ViewModeToggle view={view} searchParams={resolvedSearchParams} />
          </div>

          {/* Products Grid/List */}
          <Suspense fallback={"Loading.."} key={`${q}-${page}`}>
            <ProductResults
              q={q}
              page={parseInt(page)}
              collectionIds={collectionIds}
              priceMin={price_min ? parseInt(price_min) : undefined}
              priceMax={price_max ? parseInt(price_max) : undefined}
              sort={sort as ProductsSort}
              view={view}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
