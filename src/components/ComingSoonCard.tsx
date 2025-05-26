"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotifyForm from "./NotifyForm";
import Image, { StaticImageData } from "next/image";

interface ComingSoonCardProps {
  title: string;
  image?: string | StaticImageData;
  category: string;
}

const ComingSoonCard = ({ title, image, category }: ComingSoonCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="relative cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-[4/3] w-full bg-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            quality={90}
            unoptimized
          />
        </div>
        <CardContent className="p-4">
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t via-black/30 from-black/60 to-transparent p-4 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Coming Soon in Upcoming Drops
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h3 className="mb-2 text-center text-lg font-semibold">{title}</h3>
            <p className="mb-6 text-center text-gray-600">
              Be the first to know when new {category} become available
            </p>
            <NotifyForm category={category} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComingSoonCard;
