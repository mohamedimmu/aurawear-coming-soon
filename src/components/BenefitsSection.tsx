import React from "react";
import { Ban, MessageCircle, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Stagepose from "@/assets/stageshot.jpg";

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: Truck,
    title: "48-Hour Dispatch",
    description:
      "Orders are packed and shipped within 48 hours so you get your items quickly and reliably.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Crafted using handpicked fabrics and modern tailoring for an elevated everyday look and lasting comfort.",
  },
  {
    icon: MessageCircle,
    title: "Need Help?",
    description:
      "Have questions or need updates? Our team is ready to assist you quickly with real, human support.",
  },
  {
    icon: Ban,
    title: "No Returns or Exchange",
    description:
      "We follow a no return or exchange policy. Please read the product details before purchasing.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="bg-muted relative mb-10 aspect-[16/9] w-full overflow-hidden">
        <Image
          unoptimized
          quality={80}
          src={Stagepose}
          alt="Aurawear in motion"
          fill
          className="object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="group text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-accent border-border flex h-12 w-12 items-center justify-center rounded-full border">
                  <Icon className="text-foreground h-6 w-6" />
                </div>
              </div>
              <h3 className="font-inter mb-3 text-lg font-medium">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-normal">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
