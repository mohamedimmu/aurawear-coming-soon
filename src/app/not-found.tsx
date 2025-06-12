import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-md space-y-8 text-center">
          <div className="space-y-4 flex items-center justify-center flex-col">
            <AlertTriangle className="text-primary h-16 w-16 mb-6" />
            <h1 className="text-foreground text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>

              <Button
                variant="default"
                asChild
                className="flex items-center gap-2"
              >
                <Link href="/shop">
                  <ShoppingBag className="h-4 w-4" />
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
