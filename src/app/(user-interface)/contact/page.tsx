import ContactForm from "@/app/(user-interface)/contact/ContactForm";

import React from "react";
import FAQ from "./FAQ";
import HelpandSupport from "./HelpandSupport";
import ContactInformation from "./ContactInformation";
import InteractiveMap from "./InteractiveMap";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We&apos;re here to help with any questions about our products, orders,
          or services. Reach out to us and we&apos;ll respond as soon as we can.
        </p>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
      </div>
      <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ContactInformation />
        <div className="col-span-1 lg:col-span-2">
          <ContactForm />
        </div>
      </div>

      <FAQ />

      {/* Help & Support Section */}
      <HelpandSupport />

      {/* Map Section */}
      <InteractiveMap />
    </div>
  );
}
