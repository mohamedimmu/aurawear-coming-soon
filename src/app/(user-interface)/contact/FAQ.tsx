import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function FAQ() {
  return (
    <div className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-2">
          Find quick answers to common questions
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Standard shipping typically takes 3-5 business days within the
              continental US. International shipping may take 7-14 business days
              depending on the destination.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 30 days of purchase. Items must be
              unworn, unwashed, and with original tags attached. Please note
              that shipping costs are non-refundable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How can I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you&apos;ll receive a tracking number via
              email. You can use this number on our website under &quot;Order
              Tracking&quot; to monitor the progress of your delivery.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship to most countries worldwide. International shipping
              rates and delivery times vary by location. Import duties and taxes
              may apply and are the responsibility of the customer.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How do I care for my products?</AccordionTrigger>
            <AccordionContent>
              Care instructions are provided on the tag of each product.
              Generally, we recommend washing in cold water and air drying to
              maintain the quality and longevity of your items.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
