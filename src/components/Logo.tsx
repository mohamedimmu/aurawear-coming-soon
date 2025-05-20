import React from "react";
import Wordmark from "@/assets/wordmark.svg";
import Image from "next/image";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div>
      <Image
        alt="Aurawear Wordmark"
        src={Wordmark}
        width={width}
        height={height}
      />
    </div>
  );
}
