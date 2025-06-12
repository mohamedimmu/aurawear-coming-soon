import { ProductCardSkeleton } from "@/components/loading/ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
  view?: "grid" | "list";
  heading?: boolean;
}

export function ProductGridSkeleton({
  count = 8,
  view = "grid",
  heading = false,
}: ProductGridSkeletonProps) {
  return (
    <div>
      {heading && (
        <div className="bg-muted mb-8 h-5 w-50 animate-pulse rounded" />
      )}
      <div
        className={
          view === "grid"
            ? "mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mb-8 space-y-4"
        }
      >
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
