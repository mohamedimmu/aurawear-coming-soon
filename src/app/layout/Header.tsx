import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";

export default function Header() {
  return (
    <header
      className="h-24 w-full flex items-center justify-center px-8 md:px-12 py-2 pt-4 bg-hero-background/20"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
        <div className="relative w-[64px] h-[64px]">
          <Image src={Logo} alt="Aurawear Logo" fill className="object-cover" />
        </div>
        <h2 className="text-tracking-tight text-2xl xss:text-3xl md:text-5xl font-bold font-inter uppercase">
          Aura wear
        </h2>
      </div>
    </header>
  );
}
