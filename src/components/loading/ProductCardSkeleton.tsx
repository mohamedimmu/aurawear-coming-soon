import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse cursor-pointer flex-col">
      <div className="bg-muted mb-4 flex aspect-square max-w-96 items-center justify-center overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-2 text-left">
        <Skeleton className="h-4 w-3/4" /> {/* Product name */}
        <Skeleton className="h-3 w-full" /> {/* Description line 1 */}
        <Skeleton className="h-3 w-5/6" /> {/* Description line 2 */}
        <div className="mt-2 flex flex-row flex-wrap gap-4">
          <Skeleton className="h-4 w-20" /> {/* Discounted price */}
          <Skeleton className="h-4 w-20" /> {/* Original price */}
        </div>
      </div>
    </div>
  );
}
