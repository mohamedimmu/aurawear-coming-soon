"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface CarouselButtonsProps {
  carouselId: string;
}

const CarouselButtons = ({ carouselId }: CarouselButtonsProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const checkScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    // Initial check
    checkScrollButtons();

    // Add event listeners
    carousel.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      carousel.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [carouselId]);

  const scroll = (direction: "left" | "right") => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth * 0.8;
    const newPosition =
      direction === "left"
        ? carousel.scrollLeft - scrollAmount
        : carousel.scrollLeft + scrollAmount;

    carousel.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        size="icon"
        variant="outline"
        className={cn("bg-muted rounded-full p-2", "cursor-pointer")}
        aria-label="Scroll left"
      >
        <ArrowLeft className="text-muted-foreground h-5 w-5" />
      </Button>
      <Button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        size="icon"
        variant="outline"
        className={cn("bg-muted rounded-full p-2", "cursor-pointer")}
        aria-label="Scroll right"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CarouselButtons;
