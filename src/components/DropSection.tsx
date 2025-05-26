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
    <section className="w-full px-6 py-6 md:px-12 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center space-y-2 text-center">
          <div className="flex flex-row items-center justify-center gap-4">
            <GalleryHorizontal className="text-card-foreground/80 h-12 w-12" />
            <h2 className="font-lora xxs:text-3xl xs:text-4xl animate-hero-fade-in space-y-1 text-center text-2xl leading-[1.1] font-black tracking-tight text-black uppercase sm:text-5xl md:text-6xl md:leading-[1.2]">
              Drop 1: The Origin
            </h2>
          </div>
          <div className="flex flex-row items-center gap-4 text-center">
            <div className="relative h-8 w-8">
              {/* Animated outer ring */}
              <div className="bg-primary absolute inset-0 animate-ping rounded-full"></div>

              {/* Stable inner dot */}
              <div className="bg-primary/80 absolute inset-0 z-10 m-auto h-4 w-4 rounded-full"></div>
            </div>

            <p className="xs:text-base text-sm leading-relaxed font-bold text-black/80 md:text-lg">
              Launching this May
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={`drop-image-${index}`}
              className={`group relative ${
                index === images.length - 1 && images.length % 3 === 1
                  ? "md:col-start-2 lg:col-start-2"
                  : ""
              }`}
            >
              <div className="bg-peach/20 relative aspect-[1.41/1] overflow-hidden">
                <Image
                  src={src}
                  alt={`Aurawear Collection Preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover object-center transition-all duration-300 group-hover:scale-105"
                  quality={95}
                  // priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropSection;
