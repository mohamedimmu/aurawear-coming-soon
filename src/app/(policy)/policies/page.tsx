import React from "react";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Policies = () => {
  const policies = [
    {
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
      path: "/policies/privacy",
    },
    {
      title: "Shipping & Return Policy",
      description:
        "Information about our shipping methods, returns, and refunds.",
      path: "/policies/shipping-return",
    },
    {
      title: "Terms of Service",
      description: "The rules and guidelines for using our services.",
      path: "/policies/terms",
    },
  ];

  return (
    <div className="bg-hero-background py-16 px-4 md:px-8 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-card-foreground/80 hover:text-card-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to home</span>
        </Link>

        <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-12 text-card-foreground">
          Policies
        </h1>

        <div className="grid gap-6">
          {policies.map((policy) => (
            <Link
              key={policy.path}
              href={policy.path}
              className="group p-6 md:p-8 bg-peach/20 hover:bg-peach/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-card-foreground/60 group-hover:text-card-foreground transition-colors" />
                <div>
                  <h2 className="font-grotesk text-xl md:text-2xl font-semibold mb-2 text-card-foreground group-hover:text-card-foreground/80 transition-colors">
                    {policy.title}
                  </h2>
                  <p className="text-card-foreground/80 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
