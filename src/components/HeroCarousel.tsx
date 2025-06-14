"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image1 from "@/assets/banner/1.png";
import Image2 from "@/assets/banner/2.png";
import Image3 from "@/assets/banner/3.jpg";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface CarouselProps {
  id: number;
  image: StaticImageData;
  alt: string; // Added alt for accessibility
}

const carousel: CarouselProps[] = [
  { id: 1, image: Image1, alt: "Hero image 1" },
  { id: 2, image: Image2, alt: "Hero image 2" },
  { id: 3, image: Image3, alt: "Hero image 3" },
];

export default function HeroCarousel() {
  // Memoize carousel items to prevent unnecessary re-renders
  const carouselItems = React.useMemo(
    () =>
      carousel.map((item) => (
        <CarouselItem key={item.id}>
          <div className="relative h-[calc(100vh-80px)] min-h-[400px] w-full sm:min-h-[500px] md:min-h-[620px]">
            <Image
              alt={item.alt}
              src={item.image}
              fill
              priority={item.id === 1} // Only prioritize first image
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
              quality={85} // Reduced from 90 for better performance
              unoptimized
            />
            {/* Add overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 mb-24 flex items-end justify-center">
              <Button
                asChild
                variant="default"
                size="lg"
                className="transition-transform duration-300 hover:scale-105"
              >
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        </CarouselItem>
      )),
    [],
  );

  return (
    <Carousel
      className="relative w-full bg-[#e9e9e9]"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent>{carouselItems}</CarouselContent>
      <CarouselPrevious className="left-2 cursor-pointer !bg-white !text-black sm:left-4" />
      <CarouselNext className="right-2 cursor-pointer !bg-white !text-black sm:right-4" />
    </Carousel>
  );
}
