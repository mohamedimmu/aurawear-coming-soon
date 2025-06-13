import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SUPPORT_EMAIL, WHATSAPP_PHONE } from "@/lib/constants";

export default function HelpandSupport() {
  return (
    <div className="bg-muted/50 mb-16 rounded-lg p-8">
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
          <Button
            asChild
            variant="default"
            className="cursor-pointer text-base"
            size="lg"
          >
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us via email"
            >
              <Mail className="!h-4 !w-4" />
              Email Support
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="cursor-pointer text-base"
            size="lg"
          >
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              aria-label="Chat with us on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="!h-4 !w-4 text-[#25D366]" />
              WhatsApp Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
