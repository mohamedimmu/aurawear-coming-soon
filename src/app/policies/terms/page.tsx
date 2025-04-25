import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-hero-background py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/policies"
          className="inline-flex items-center gap-2 mb-8 text-primary/80 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to policies</span>
        </Link>

        <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-12 text-primary">
          Terms of Service
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Agreement to Terms
            </h2>
            <p className="text-primary/80 leading-relaxed">
              By accessing or using our services, you agree to be bound by these
              terms of service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using our services.
            </p>
          </section>

          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              User Responsibilities
            </h2>
            <p className="text-primary/80 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Intellectual Property
            </h2>
            <p className="text-primary/80 leading-relaxed">
              All content included on this site is our property or the property
              of our licensors and is protected by copyright and intellectual
              property laws.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
