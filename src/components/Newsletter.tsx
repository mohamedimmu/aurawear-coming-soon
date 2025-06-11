"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image, { StaticImageData } from "next/image";
import CoverLogo from "@/assets/cover-logo.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { saveFormData } from "@/app/wix-api/saveFormData";

interface NewsletterProps {
  discountPercentage?: number;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
}

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Newsletter: React.FC<NewsletterProps> = ({
  discountPercentage = 20,
  imageSrc = CoverLogo,
  imageAlt = "Aurawear Logo",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterForm) => {
    try {
      const response = await saveFormData("SubscriberList", data);
      if (response.success) {
        toast.success("You're in!", {
          description:
            "We'll keep you posted on new drops, deals, and exclusive gear.",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      reset();
    }
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <ImageSection imageSrc={imageSrc} imageAlt={imageAlt} />
        <FormSection
          discountPercentage={discountPercentage}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

const ImageSection: React.FC<{
  imageSrc: string | StaticImageData;
  imageAlt: string;
}> = ({ imageSrc, imageAlt }) => (
  <div className="bg-muted aspect-square w-full md:w-1/2">
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  </div>
);

interface FormSectionProps {
  discountPercentage: number;
  register: ReturnType<typeof useForm<NewsletterForm>>["register"];
  errors: ReturnType<typeof useForm<NewsletterForm>>["formState"]["errors"];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  // discountPercentage,
  register,
  errors,
  isSubmitting,
  onSubmit,
}) => (
  <div className="flex min-h-full w-full items-center justify-stretch md:w-1/2">
    <Card className="bg-card h-full w-full justify-center p-8 md:p-12">
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full">
          <Mail className="text-primary-foreground h-6 w-6" />
        </div>
      </div>

      <CardHeader>
        <CardTitle className="font-inter text-foreground text-center text-2xl font-medium md:text-3xl">
          Stay Ready. Stay Ahead.
        </CardTitle>
        <CardDescription className="text-card-foreground text-center">
          Get updates on new drops, gear launches, and exclusive perks.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="h-12"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-2 text-center text-red-600">
                {errors.email.message}
              </p>
            )}
            {errors.root && (
              <p className="mt-2 text-center text-red-600">
                {errors.root.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="h-12 w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
);

// Add this function in your API utilities file
// const subscribeToNewsletter = async (): Promise<void> => {
//   // Implement your newsletter subscription logic here
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
// };

export default Newsletter;
