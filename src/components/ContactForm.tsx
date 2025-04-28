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
      "Please enter a valid phone number"
    ),
  // countryCode: z.string(),
  productInterestedIn: z
    .string()
    .min(1, "Please select a product")
    .refine(
      (value) =>
        products.map((p) => p.toLowerCase()).includes(value.toLowerCase()),
      "Please select a valid product"
    ),
  subscribed: z.boolean(),
});

const products = ["Board Shorts", "T-shirts & Tanks", "Pants", "All Products"];

export default function ContactForm() {
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
              "Thank you, We'll notify you first about the drop! 🎉"
          );
        } else if (response.duplicate && !response.success) {
          toast.info(
            response.message ||
              "Thank you for your interest, but you've already subscribed! 😊"
          );
        } else {
          toast.error(
            response.message || "Something went wrong. Please try again."
          );
        }
        form.reset();
      }
    } catch{
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact-form"
      className="relative mx-auto w-full max-w-2xl z-30 px-6 md:px- py-6 md:py-12"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-peach/90 backdrop-blur-sm px-6 md:px-12 py-8 md:py-12 shadow-xl flex flex-col gap-8 animate-fade-in">
            {/* First and Last Name*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        autoFocus
                        className=" h-12 bg-hero-background border-0 focus-visible:ring-1 focus-visible:ring-ring px-5 py-2"
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
                        autoFocus
                        className="h-12 bg-hero-background border-0 focus-visible:ring-1 focus-visible:ring-ring px-5 py-2"
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
                      className="h-12 bg-hero-background border-0 focus-visible:ring-1 focus-visible:ring-ring px-5 py-2"
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
                      <SelectTrigger className="data-[state=open]:ring-1 data-[state=open]:ring-ring !h-12 w-full bg-hero-background border-0 px-5 py-2">
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
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-hero-background"
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
                className="bg-primary hover:bg-primary/80 text-white px-8 py-3  w-full font-grotesk font-bold text-lg shadow-lg transition-all focus:outline-none  active:scale-100 h-12 duration-500"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin w-6 h-6" />
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
