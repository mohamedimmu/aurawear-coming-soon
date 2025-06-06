import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { termsData } from "@/app/(policy)/policies/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

const TermsOfService = () => {
  return (
    <div className="bg-background min-h-screen px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/policies"
          className="text-card-foreground/80 hover:text-card-foreground group mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to policies</span>
        </Link>

        <h1 className="font-lora text-card-foreground mb-12 text-4xl font-bold md:text-5xl">
          Terms of Service
        </h1>

        <div className="space-y-12">
          {termsData.sections.map((section, index) => (
            <section key={index}>
              <h2 className="font-lora text-card-foreground mb-6 text-2xl font-semibold md:text-3xl">
                {section.title}
              </h2>
              <p className="text-card-foreground/80 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
