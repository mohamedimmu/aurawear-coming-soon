import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column - Product Images Skeleton */}
        <div className="space-y-4">
          <div className="flex h-[600px] space-x-4">
            {/* Thumbnails sidebar skeleton */}
            <div className="hidden w-24 flex-col space-y-4 sm:flex">
              {[...Array(7)].map((_, index) => (
                <Skeleton key={index} className="h-24 w-24 " />
              ))}
            </div>

            {/* Main image skeleton */}
            <Skeleton className="relative h-[600px] flex-1 bg-gray-200" />
          </div>
        </div>

        {/* Right column - Product Info Skeleton */}
        <div className="space-y-6">
          <div>
            {/* Sustainable label skeleton */}
            {/* Product title and description skeleton */}
            <Skeleton className="h-6 w-32 bg-gray-200" />
            <Skeleton className="mt-2 h-8 w-3/4 bg-gray-200" />
            <Skeleton className="mt-2 h-6 w-full bg-gray-200" />
          </div>

          {/* Price skeleton */}
          <div>
            <Skeleton className="h-7 w-24 bg-gray-200" />
            <Skeleton className="mt-2 h-4 w-40 bg-gray-200" />
            <Skeleton className="mt-1 h-4 w-48 bg-gray-200" />
          </div>

          {/* Color thumbnails skeleton */}
          <div className="flex space-x-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-16 w-16 border bg-gray-200"
              />
            ))}
          </div>

          {/* Size selection skeleton */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-20 bg-gray-200" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 border bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Add to bag button skeleton */}
          <Skeleton className="h-14 w-full bg-gray-200" />

          {/* Favorite button skeleton */}
          <Skeleton className="h-14 w-full bg-gray-200" />

          {/* Sustainable description skeleton */}
          <Skeleton className="h-24 w-full bg-gray-200" />

          {/* Product description skeleton */}
          <div>
            <Skeleton className="h-6 w-full bg-gray-200" />
            <Skeleton className="mt-2 h-6 w-3/4 bg-gray-200" />
          </div>

          {/* Product details skeleton */}
          <ul className="space-y-1 pl-6">
            {[...Array(3)].map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-5 w-2/3 bg-gray-200" />
              </li>
            ))}
          </ul>

          {/* View product details link skeleton */}
          <Skeleton className="h-6 w-36 bg-gray-200" />

          {/* Accordion sections skeleton */}
          <div className="space-y-4 pt-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-t border-gray-200 pt-4 pb-2"
              >
                <Skeleton className="h-6 w-32 bg-gray-200" />
                <Skeleton className="h-6 w-6 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
