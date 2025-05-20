"use client";

import React, { useState, FormEvent } from "react";
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

interface NewsletterProps {
  discountPercentage?: number;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  discountPercentage = 20,
  imageSrc = CoverLogo,
  imageAlt = "Aurawear Logo",
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your actual API call
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <ImageSection imageSrc={imageSrc} imageAlt={imageAlt} />
        <FormSection
          discountPercentage={discountPercentage}
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          status={status}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

const ImageSection: React.FC<{ imageSrc: string | StaticImageData; imageAlt: string }> = ({
  imageSrc,
  imageAlt,
}) => (
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
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  status: "idle" | "success" | "error";
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  discountPercentage,
  email,
  setEmail,
  isLoading,
  status,
  onSubmit,
}) => (
  <div className="bg-primary flex min-h-full w-full items-center justify-stretch md:w-1/2">
    <Card className="bg-card h-full w-full justify-center p-8 md:p-12">
      <div className="flex justify-center">
        <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
          <Mail className="text-primary-foreground h-6 w-6" />
        </div>
      </div>

      <CardHeader>
        <CardTitle className="font-lora text-foreground text-center text-2xl font-medium md:text-3xl">
          Unlock {discountPercentage}% Off
        </CardTitle>
        <CardDescription className="text-card-foreground text-center">
          Sign up to our email to get {discountPercentage}% in your next order.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
            disabled={isLoading}
          />
          <Button type="submit" className="h-12 w-full" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
          {status === "success" && (
            <p className="text-center text-green-600">
              Successfully subscribed!
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  </div>
);

// Add this function in your API utilities file
const subscribeToNewsletter = async (email: string): Promise<void> => {
  // Implement your newsletter subscription logic here
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
  console.log(email);
};

export default Newsletter;
