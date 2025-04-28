import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { privacyData } from "@/app/(policy)/policies/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-hero-background py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/policies"
          className="inline-flex items-center gap-2 mb-8 text-card-foreground/80 hover:text-card-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to policies</span>
        </Link>

        <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-12 text-card-foreground">
          Privacy Policy
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-card-foreground">
              {privacyData.contactInfo.title}
            </h2>
            <p className="text-card-foreground/80 leading-relaxed whitespace-pre-line">
              {privacyData.contactInfo.content}
            </p>
          </section>

          {privacyData.sections.map((section, index) => (
            <section key={index}>
              <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-card-foreground">
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

export default PrivacyPolicy;
