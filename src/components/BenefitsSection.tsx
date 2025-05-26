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
      "From premium cottons to high-performance stretch fabrics, we choose only what elevates the experience of wearing it.",
  },
  {
    icon: Info,
    title: "Safe and Easy Checkout",
    description:
      "Multiple payment options. Instant confirmation. 100% secure checkout.",
  },
  {
    icon: CircleCheck,
    title: "Pan-India Shipping",
    description:
      "We ship across India with tracking on every order. You'll receive updates from the moment it's packed to the time it reaches you.",
  },
  {
    icon: Percent,
    title: "Need Help?",
    description:
      "From product queries to post-order updates, we'll get back to you fast with real support.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-muted relative mb-16 aspect-[16/9] w-full overflow-hidden">
        <Image
          unoptimized
          quality={80}
          src={Stagepose}
          alt="Aurawear in motion"
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
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
                <div className="bg-primary/80 flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="text-primary-foreground h-7 w-7" />
                </div>
              </div>
              <h3 className="font-lora mb-3 text-lg font-medium">
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
