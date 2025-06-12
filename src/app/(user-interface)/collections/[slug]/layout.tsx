import { Skeleton } from "@/components/ui/skeleton";
import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { notFound } from "next/navigation";
import { JSX, Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CollectionsLayout params={params}>{children}</CollectionsLayout>
    </Suspense>
  );
}

async function CollectionsLayout({
  children,
  params,
}: LayoutProps): Promise<JSX.Element> {
  const { slug } = await params;
  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, slug);

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10">
        {banner?.url && (
          <div className="relative hidden sm:block">
            <WixImage
              mediaIdentifier={banner.url}
              width={1280}
              height={400}
              alt={banner.altText || collection.name}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl font-bold text-white lg:text-5xl">
              {collection.name}
            </h1>
          </div>
        )}
        <h1
          className={cn(
            "mx-auto text-3xl font-bold md:text-4xl",
            banner?.url && "sm:hidden",
          )}
        >
          {collection.name}
        </h1>
      </div>
      {children}
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <Skeleton className="mx-auto h-10 w-48 sm:aspect-[1280/400] sm:h-full sm:w-full" />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[26rem] w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
