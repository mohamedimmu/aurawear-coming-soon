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
  formId: string;
}

const ComingSoonCard = ({
  title,
  image,
  category,
  formId,
}: ComingSoonCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="relative cursor-pointer overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-140 w-full">
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

        <CardContent className="absolute right-0 bottom-0 left-0 px-0">
          <div className="bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Coming Soon in Upcoming Drops
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h3 className="mb-2 text-center text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mb-6 text-center">
              Be the first to know when new {category} become available
            </p>
            <NotifyForm
              category={category}
              setIsModalOpen={setIsModalOpen}
              formId={formId}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComingSoonCard;
