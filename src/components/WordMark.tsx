import React from "react";
import Wordmark from "@/assets/wordmark.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WordMarkProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const WordMark = React.memo(function WordMark({
  width = 140,
  height = 100,
  className,
  priority = false,
}: WordMarkProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <Image
        alt="Aurawear Wordmark"
        src={Wordmark}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "object-contain transition-colors duration-200",
          "dark:brightness-200 dark:contrast-200 dark:invert",
        )}
        quality={100}
        unoptimized
      />
    </div>
  );
});

Wordmark.displayName = "WordMark";

export default WordMark;
