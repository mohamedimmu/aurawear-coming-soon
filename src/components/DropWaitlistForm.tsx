"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberWithError, CountryCode } from "libphonenumber-js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "./ui/phone-input";
import en from "react-phone-number-input/locale/en.json";
import { subscribeNewsletter } from "@/actions/subscribeNewsletter";
import { Loader } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name must be at least 1 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => isValidPhoneNumber(value),
      "Please enter a valid phone number",
    ),
  // countryCode: z.string(),
  productInterestedIn: z
    .string()
    .min(1, "Please select a product")
    .refine(
      (value) =>
        products.map((p) => p.toLowerCase()).includes(value.toLowerCase()),
      "Please select a valid product",
    ),
  subscribed: z.boolean(),
});

const products = ["Board Shorts", "T-shirts & Tanks", "Pants", "All Products"];

export default function DropWaitlistForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      productInterestedIn: "",
      subscribed: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const phoneNumber = parsePhoneNumberWithError(data.phone);

      if (phoneNumber) {
        const countryCode = phoneNumber?.country; // eg., IN
        const countryCallingCode = phoneNumber.countryCallingCode; //eg., "+91"
        const countryName = en[countryCode as CountryCode] || ""; // e.g., "India"

        const formattedData = {
          ...data,
          countryCode,
          countryCallingCode: `+${countryCallingCode}`,
          countryName,
        };
        const response = await subscribeNewsletter(formattedData);
        if (response.success) {
          toast.success(
            response.message ||
              "Thank you, We'll notify you first about the drop! 🎉",
          );
        } else if (response.duplicate && !response.success) {
          toast.info(
            response.message ||
              "Thank you for your interest, but you've already subscribed! 😊",
          );
        } else {
          toast.error(
            response.message || "Something went wrong. Please try again.",
          );
        }
        form.reset();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact-form"
      className="md:px- relative z-30 mx-auto w-full max-w-2xl px-6 py-6 md:py-12"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-peach/90 animate-fade-in flex flex-col gap-8 px-6 py-8 shadow-xl backdrop-blur-sm md:px-12 md:py-12">
            {/* First and Last Name*/}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground font-medium">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="bg-hero-background focus-visible:ring-ring h-12 border-0 px-5 py-2 focus-visible:ring-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground font-medium">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="bg-hero-background focus-visible:ring-ring h-12 border-0 px-5 py-2 focus-visible:ring-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-hero-background focus-visible:ring-ring h-12 border-0 px-5 py-2 focus-visible:ring-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Product Selection */}
            <FormField
              control={form.control}
              name="productInterestedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground font-medium">
                    I&apos;m interested in
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="data-[state=open]:ring-ring bg-hero-background !h-12 w-full border-0 px-5 py-2 data-[state=open]:ring-1">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-hero-background border-border">
                      {products.map((product) => (
                        <SelectItem
                          key={product}
                          value={product.toLowerCase()}
                          className="h-12 cursor-pointer focus:bg-black focus:text-white"
                        >
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-card-foreground font-medium">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Your phone number"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Newsletter Checkbox */}
            <FormField
              control={form.control}
              name="subscribed"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-hero-background h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormLabel className="text-card-foreground font-medium">
                    Send me exclusive previews and member offers.
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary/80 font-inter h-12 w-full px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-500 focus:outline-none active:scale-100"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="h-6 w-6 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Get Early Access"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
