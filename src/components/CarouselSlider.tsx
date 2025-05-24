import React, { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  id: string;
}

const CarouselSlider = ({ children, id }: CarouselProps) => {
  return (
    <div
      id={id}
      className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none",  }}
    >
      {children}
    </div>
  );
};

export default CarouselSlider;
