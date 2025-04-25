import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ShippingReturn = () => {
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
          Shipping & Return Policy
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Shipping Information
            </h2>
            <p className="text-primary/80 leading-relaxed">
              We process and ship orders within 1-2 business days. Delivery
              times vary depending on your location and chosen shipping method.
              You will receive a tracking number once your order ships.
            </p>
          </section>

          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Returns & Exchanges
            </h2>
            <p className="text-primary/80 leading-relaxed">
              We accept returns within 30 days of delivery. Items must be unused
              and in their original packaging. Please contact our customer
              service team to initiate a return.
            </p>
          </section>

          <section>
            <h2 className="font-grotesk text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Refund Process
            </h2>
            <p className="text-primary/80 leading-relaxed">
              Refunds will be processed within 5-7 business days after we
              receive your return. The refund will be issued to the original
              payment method used for the purchase.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturn;
