import React from "react";
import { products } from "@wix/stores";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RichContentViewer from "@/components/RichContentViewer";

export default function AdditionalInfo({
  product,
}: {
  product: products.Product;
}) {
  return (
    <div className="border-border border-b">
      {product?.additionalInfoSections &&
        product.additionalInfoSections?.map((info, index) => (
          <Accordion
            type="single"
            className="w-full"
            collapsible
            key={info.title}
            defaultValue="item-0"
          >
            <AccordionItem
              value={`item-${index}`}
              className="border-border h-full border-t"
            >
              <AccordionTrigger className="flex items-center justify-between py-6 hover:no-underline">
                <h3 className="text-lg font-medium"> {info.title}</h3>
              </AccordionTrigger>
              <AccordionContent>
                <RichContentViewer
                  content={info.description}
                  className="prose text-foreground"
                  paragraphClassName="text-base text-foreground space-y-1 mb-4"
                  listClassName="space-y-3 text-base text-foreground list-disc pl-12"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}
