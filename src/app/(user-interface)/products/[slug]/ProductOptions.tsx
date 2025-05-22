import { Button } from "@/components/ui/button";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";
import React from "react";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div>
      {product.productOptions?.map((option) => (
        <div key={option.name}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium">Select {option.name}</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <Button
                  variant="outline"
                  className={cn(
                    "!h-auto cursor-pointer w-full border-2 px-4 py-3 transition-all duration-300 ease-in-out hover:bg-transparent",
                    selectedOptions[option.name || ""] === choice.description
                      ? "border-primary"
                      : "border-border hover:border-primary",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    }) && "opacity-50",
                  )}
                  onClick={() => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    });
                  }}
                >
                  {option.optionType === products.OptionType.color && (
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: choice.value }}
                    />
                  )}
                  <span className="text-base">{choice.description}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
