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
    title: "Our Mission",
    description:
      "We're not just fashion — we're driven by passion. Made for every shape, built to uplift with action.",
  },
  {
    icon: Info,
    title: "Transparency",
    description:
      "What you see is what you get — no fine print, no regret. Clear from day one, and clearer yet.",
  },
  {
    icon: CircleCheck,
    title: "Quality",
    description:
      "No tears, no fears — our gear goes the distance, year after year. Made to last, through sweat and cheers.",
  },
  {
    icon: Percent,
    title: "Heritage",
    description:
      "From roots that run deep to dreams we now keep — we blend the past with every leap.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="relative mb-16 aspect-[16/9] w-full overflow-hidden bg-muted">
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
