import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import React from "react";

interface FilterPanelProps {
  selectedCategories: string[];
  selectedCollections: string[];
  priceRange: [number, number];
  onCategoriesChange: (categories: string[]) => void;
  onCollectionsChange: (collections: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

const categories = [
  { id: "jerseys", label: "Jerseys" },
  { id: "hoodies", label: "Hoodies" },
  { id: "shorts", label: "Shorts" },
  { id: "jackets", label: "Jackets" },
  { id: "polos", label: "Polo Shirts" },
  { id: "pants", label: "Pants & Joggers" },
  { id: "accessories", label: "Accessories" },
];

const collections = [
  { id: "home", label: "Home Kit" },
  { id: "away", label: "Away Kit" },
  { id: "third", label: "Third Kit" },
  { id: "training", label: "Training" },
  { id: "casual", label: "Casual" },
  { id: "match-day", label: "Match Day" },
  { id: "goalkeeper", label: "Goalkeeper" },
];

export default function FilterPanel({
  selectedCategories,
  selectedCollections,
  priceRange,
  onCategoriesChange,
  onCollectionsChange,
  onPriceRangeChange,
}: FilterPanelProps) {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, categoryId]);
    } else {
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const handleCollectionChange = (collectionId: string, checked: boolean) => {
    if (checked) {
      onCollectionsChange([...selectedCollections, collectionId]);
    } else {
      onCollectionsChange(
        selectedCollections.filter((id) => id !== collectionId),
      );
    }
  };

  const clearAllFilters = () => {
    onCategoriesChange([]);
    onCollectionsChange([]);
    onPriceRangeChange([0, 5000]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories Filter */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Categories
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category.id}
                    className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Collections Filter */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Collections
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={collection.id}
                    checked={selectedCollections.includes(collection.id)}
                    onCheckedChange={(checked) =>
                      handleCollectionChange(collection.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={collection.id}
                    className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {collection.label}
                  </label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Price Range
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  onPriceRangeChange(value as [number, number])
                }
                max={5000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
