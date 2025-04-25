"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 mx-4 bg-white shadow-xl animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-25 animate-pulse" />
            <div className="relative flex items-center justify-center w-24 h-24 bg-white">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Page not found
            </h2>
            <p className="text-gray-600">
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

          <p className="text-sm text-gray-500">
            Path:{" "}
            <code className="px-2 py-1 bg-gray-100">{pathname}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
