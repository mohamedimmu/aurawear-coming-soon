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
    <div className="min-h-screen bg-hero-background py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-primary/80 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to home</span>
        </Link>

        <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-12 text-primary">
          Policies
        </h1>

        <div className="grid gap-6">
          {policies.map((policy) => (
            <Link
              key={policy.path}
              href={policy.path}
              className="group p-6 md:p-8 rounded-2xl bg-peach/20 hover:bg-peach/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
                <div>
                  <h2 className="font-grotesk text-xl md:text-2xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
                    {policy.title}
                  </h2>
                  <p className="text-primary/80 leading-relaxed">
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
