import { ProductsSort, queryProducts } from "@/app/wix-api/products";
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
}

export default async function ProductResults({
  q,
  page,
  collectionIds,
  priceMin,
  priceMax,
  sort,
  view,
}: ProductResultsProps) {
  const pageSize = 20;

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

  return (
    <div>
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

// function LoadingSkeleton() {
//   return (
//     <div className="space-y-10">
//       <Skeleton className="mx-auto h-9 w-52" />
//       <div className="flex grid-cols-2 flex-col gap-5 sm:grid xl:grid-cols-3 2xl:grid-cols-4">
//         {Array.from({ length: 8 }).map((_, i) => (
//           <Skeleton key={i} className="h-[26rem]" />
//         ))}
//       </div>
//     </div>
//   );
// }
