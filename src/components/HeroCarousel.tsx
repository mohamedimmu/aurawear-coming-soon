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
import Image4 from "@/assets/hero-carousel/4.gif";
import Image, { StaticImageData } from "next/image";

interface CarouselProps {
  id: number;
  image: StaticImageData;
}

const carousel: CarouselProps[] = [
  {
    id: 1,
    image: Image1,
  },
  {
    id: 2,
    image: Image2,
  },
  {
    id: 3,
    image: Image3,
  },
  {
    id: 4,
    image: Image4,
  },
];

export default function HeroCarousel() {
  return (
    <Carousel
      className="relative h-full w-full"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="">
        {carousel.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-screen min-h-[720px] w-full">
              <Image
                alt={`Slider Image ${item.id}`}
                src={item.image}
                fill
                priority={item.id === 1}
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
