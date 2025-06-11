import React from "react";
import { CircleCheck, Info, Percent } from "lucide-react";
import Image from "next/image";
import Stagepose from "@/assets/stageshot.jpg";

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: CircleCheck,
    title: "Crafted with Quality",
    description:
      "We use premium cottons and high-performance fabrics to ensure comfort, durability, and a superior wearing experience.",
  },
  {
    icon: Info,
    title: "Safe and Easy Checkout",
    description:
      "Enjoy multiple payment options, instant confirmation, and a fully secure checkout process every time.",
  },
  {
    icon: CircleCheck,
    title: "Pan-India Shipping",
    description:
      "We deliver across India with real-time tracking from dispatch to delivery — reliable, fast, and transparent.",
  },
  {
    icon: Percent,
    title: "Need Help?",
    description:
      "Have questions or need updates? Our team is ready to assist you quickly with real, human support.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="bg-muted relative mb-16 aspect-[16/9] w-full overflow-hidden">
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
