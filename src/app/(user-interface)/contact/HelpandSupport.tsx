import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Mail } from "lucide-react";

export default function HelpandSupport() {
  return (
    <div className="bg-muted mb-16 rounded-lg p-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="bg-secondary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Info className="h-7 w-7" />
        </div>
        <h2 className="mb-4 text-2xl font-semibold">Need More Help?</h2>
        <p className="text-muted-foreground mb-6">
          Our customer support team is available to assist you with any
          questions or concerns not addressed in our FAQs section.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email Support
          </Button>
          <Button variant="outline">Visit Help Center</Button>
        </div>
      </div>
    </div>
  );
}
