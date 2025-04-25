import { GalleryHorizontal } from "lucide-react";
import Image from "next/image";
import Drop1 from "@/assets/1.png";
import Drop3 from "@/assets/3.png";
import Drop2 from "@/assets/2.png";
import Drop4 from "@/assets/4.png";
import Drop5 from "@/assets/5.png";
import Drop6 from "@/assets/6.png";
import Drop7 from "@/assets/7.png";
import Drop8 from "@/assets/8.png";
import Drop9 from "@/assets/9.png";
import Drop10 from "@/assets/10.png";

const DropSection = () => {
  const images = [
    Drop1,
    Drop2,
    Drop3,
    Drop4,
    Drop5,
    Drop6,
    Drop7,
    Drop8,
    Drop9,
    Drop10,
  ];

  return (
    <section className="w-full py-6 md:py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 space-y-2">
          <div className="flex flex-row gap-4 items-center justify-center">
            <GalleryHorizontal className="w-12 h-12 text-card-foreground/80" />
            <h2 className="font-grotesk text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight text-center leading-[1.1] md:leading-[1.2] animate-hero-fade-in space-y-1 uppercase">
              Drop 1: The Origin
            </h2>
          </div>
          <div className="flex flex-row items-center gap-4 text-center">
            <div className="relative w-8 h-8">
              {/* Animated outer ring */}
              <div className="absolute inset-0 bg-primary animate-ping rounded-full"></div>

              {/* Stable inner dot */}
              <div className="absolute inset-0 m-auto w-4 h-4 bg-primary/80 z-10 rounded-full"></div>
            </div>

            <p className="text-sm xs:text-base md:text-lg text-black/80 leading-relaxed font-bold">
              Launching this May
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <div
              key={`drop-image-${index}`}
              className={`group relative ${
                index === images.length - 1 && images.length % 3 === 1
                  ? "md:col-start-2 lg:col-start-2"
                  : ""
              }`}
            >
              <div className="aspect-[1.41/1] relative overflow-hidden bg-peach/20">
                <Image
                  src={src}
                  alt={`Aurawear Collection Preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover object-center transition-all duration-300 group-hover:scale-105"
                  quality={95}
                  // priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropSection;
