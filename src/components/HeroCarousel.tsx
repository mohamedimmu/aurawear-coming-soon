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
import Image1 from "@/assets/hero-carousel/1.jpg";
import Image2 from "@/assets/hero-carousel/2.jpg";
import Image3 from "@/assets/hero-carousel/3.jpg";
import Image, { StaticImageData } from "next/image";

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
          </div>
        </CarouselItem>
      )),
    [],
  );

  return (
    <Carousel
      className="relative w-full bg-[#e9e9e9]"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>{carouselItems}</CarouselContent>
      <CarouselPrevious className="left-2 cursor-pointer !bg-white !text-black sm:left-4" />
      <CarouselNext className="right-2 cursor-pointer !bg-white !text-black sm:right-4" />
    </Carousel>
  );
}
