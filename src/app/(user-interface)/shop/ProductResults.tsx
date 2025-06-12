import { ProductsSort, queryProducts } from "@/wix-api/products";
import ProductCard from "@/components/ProductCard";
import { getWixServerClient } from "@/lib/wix-client-server";
import { notFound } from "next/navigation";

interface ProductResultsProps {
  q?: string;
  page: number;
  collectionIds?: string[];
  priceMin?: number;
  priceMax?: number;
  sort?: ProductsSort;
  view?: "grid" | "list";
  pageSize?: number;
}

export default async function ProductResults({
  q,
  page,
  collectionIds,
  priceMin,
  priceMax,
  sort,
  view,
  pageSize = 8
}: ProductResultsProps) {

  const wixClient = await getWixServerClient();
  const products = await queryProducts(wixClient, {
    q,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    collectionIds,
    priceMin,
    priceMax,
    sort,
  });

  if (page > (products.totalPages || 1)) notFound();
  const total = products?.totalCount;
  const current = products?.items?.length;
  return (
    <div>
      <div className="mb-8">
        <p className="text-muted-foreground">
          {total === 1
            ? `Showing 1 product`
            : `Showing ${current} of ${total} products`}
        </p>
      </div>
      <div
        className={
          view === "grid"
            ? "mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mb-8 space-y-4"
        }
      >
        {products.items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {/* <PaginationBar currentPage={page} totalPages={products.totalPages || 1} /> */}
    </div>
  );
}
