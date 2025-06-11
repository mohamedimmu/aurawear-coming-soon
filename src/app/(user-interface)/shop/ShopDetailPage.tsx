"use client";

import React, { useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
// import ProductCard from "@/components/ProductCard";
import SortingDropdown from "./SortingDropdown";

const allProducts = [
  {
    id: "1",
    title: "Liverpool F.C. Home Jersey",
    subtitle: "Men's Nike Football T-Shirt",
    price: 1795,
    category: "jerseys",
    collection: "home",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Liverpool F.C. Away Jersey",
    subtitle: "Men's Nike Football T-Shirt",
    price: 1795,
    category: "jerseys",
    collection: "away",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Liverpool F.C. Club Third",
    subtitle: "Men's Nike Football French Terry Pullover Hoodie",
    price: 3795,
    category: "hoodies",
    collection: "third",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Liverpool F.C. Training Shorts",
    subtitle: "Men's Nike Football Training Shorts",
    price: 1495,
    category: "shorts",
    collection: "training",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Liverpool F.C. Track Jacket",
    subtitle: "Men's Nike Track Jacket",
    price: 2995,
    category: "jackets",
    collection: "training",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Liverpool F.C. Polo Shirt",
    subtitle: "Men's Nike Polo",
    price: 2295,
    category: "polos",
    collection: "casual",
    image: "/placeholder.svg",
  },
  {
    id: "7",
    title: "Liverpool F.C. Joggers",
    subtitle: "Men's Nike Joggers",
    price: 1895,
    category: "pants",
    collection: "training",
    image: "/placeholder.svg",
  },
  {
    id: "8",
    title: "Liverpool F.C. Cap",
    subtitle: "Unisex Nike Cap",
    price: 895,
    category: "accessories",
    collection: "casual",
    image: "/placeholder.svg",
  },
  {
    id: "9",
    title: "Liverpool F.C. Scarf",
    subtitle: "Official Match Scarf",
    price: 695,
    category: "accessories",
    collection: "match-day",
    image: "/placeholder.svg",
  },
  {
    id: "10",
    title: "Liverpool F.C. Socks",
    subtitle: "Men's Nike Football Socks",
    price: 495,
    category: "accessories",
    collection: "home",
    image: "/placeholder.svg",
  },
  {
    id: "11",
    title: "Liverpool F.C. Goalkeeper Jersey",
    subtitle: "Men's Nike Goalkeeper Kit",
    price: 1995,
    category: "jerseys",
    collection: "goalkeeper",
    image: "/placeholder.svg",
  },
  {
    id: "12",
    title: "Liverpool F.C. Windbreaker",
    subtitle: "Men's Nike Windbreaker",
    price: 2595,
    category: "jackets",
    collection: "training",
    image: "/placeholder.svg",
  },
];

const ITEMS_PER_PAGE = 20;

export default function ShopDetailPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const collectionMatch =
        selectedCollections.length === 0 ||
        selectedCollections.includes(product.collection);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return categoryMatch && collectionMatch && priceMatch;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategories, selectedCollections, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop Filters */}
        {/* <div className="hidden w-80 flex-shrink-0 lg:block">
          <FilterPanel
            selectedCategories={selectedCategories}
            selectedCollections={selectedCollections}
            priceRange={priceRange}
            onCategoriesChange={setSelectedCategories}
            onCollectionsChange={setSelectedCollections}
            onPriceRangeChange={setPriceRange}
          />
        </div> */}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold">Shop All Products</h1>
              <p className="text-muted-foreground">
                Showing {paginatedProducts.length} of{" "}
                {filteredAndSortedProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FilterPanel
                    selectedCategories={selectedCategories}
                    selectedCollections={selectedCollections}
                    priceRange={priceRange}
                    onCategoriesChange={setSelectedCategories}
                    onCollectionsChange={setSelectedCollections}
                    onPriceRangeChange={setPriceRange}
                  />
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sorting */}
              <SortingDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "mb-8 space-y-4"
            }
          >
            {paginatedProducts.map(() => "Product cart")}
          </div>

          {/* No Results */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4 text-lg">
                No products found
              </p>
              <Button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedCollections([]);
                  setPriceRange([0, 5000]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
