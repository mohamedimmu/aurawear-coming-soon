"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
      setCanScrollRight(scrollLeft + clientWidth  < scrollWidth);
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
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={cn(
          "rounded-full bg-gray-100 p-2 hover:bg-gray-200",
          !canScrollLeft && "cursor-not-allowed opacity-50",
        )}
        aria-label="Scroll left"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={cn(
          "rounded-full bg-gray-100 p-2 hover:bg-gray-200",
          !canScrollRight && "cursor-not-allowed opacity-50",
        )}
        aria-label="Scroll right"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CarouselButtons;
