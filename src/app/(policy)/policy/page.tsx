import React from "react";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Policies",
};

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
    <div className="bg-background min-h-[80vh] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-card-foreground/80 hover:text-card-foreground group mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to home</span>
        </Link>

        <h1 className="font-inter text-card-foreground mb-12 text-4xl font-bold md:text-5xl">
          Policies
        </h1>

        <div className="grid gap-6">
          {policies.map((policy) => (
            <Card
              key={policy.path}
              className="bg-card hover:bg-accent group shadow-sm duration-300 transition-all ease-in-out"
            >
              <Link href={policy.path} className="p-4">
                <CardContent className="flex items-start gap-4">
                  <FileText className="text-card-foreground group-hover:text-accent-foreground h-6 w-6 transition-colors" />
                  <div>
                    <h2 className="font-inter text-card-foreground group-hover:text-accent-foreground mb-2 text-xl font-semibold transition-colors md:text-2xl">
                      {policy.title}
                    </h2>
                    <p className="text-card-foreground leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
