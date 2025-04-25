"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-background">
      <div className="w-full max-w-md p-8 mx-4 bg-peach/10 hover:bg-peach/20 transition-colors duration-300 ease-in-out  shadow-xl animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 blur opacity-25 animate-pulse rounded-full" />
            <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full">
              <AlertTriangle className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-card-foreground">
              Page not found
            </h2>
            <p className="text-card-foreground">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          <Button
            asChild
            variant="default"
            className="transition-all duration-200 hover:scale-105"
          >
            <Link href="/">Return Home</Link>
          </Button>

          <p className="text-sm text-muted-foreground">
            Path: <code className="ml-1 px-2 py-1 bg-card">{pathname}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
