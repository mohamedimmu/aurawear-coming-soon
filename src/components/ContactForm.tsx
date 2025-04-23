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
import { subscribeNewsletter } from "@/app/actions/subscribeNewsletter";

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

const products = ["Board Shorts", "Hoodies", "Gym Accessories"];

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
        console.log("Form data:", formattedData);
        const response = await subscribeNewsletter(formattedData);
        console.log("Data:", status);
        if (response.success) {
          toast.success(
            response.message ||
              "Thank you, We'll notify you first about the drop! 🎉"
          );
        } else if (response.duplicate && !response.success) {
          toast.info(
            response.message ||
              "Thank you for your interest, but you’ve already subscribed! 😊"
          );
        } else {
          toast.error(
            response.message || "Something went wrong. Please try again."
          );
        }
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative mx-auto w-full max-w-2xl z-30 px-6 md:px-12"
      >
        <div className="rounded-2xl bg-peach/90 backdrop-blur-sm px-6 md:px-12 py-8 md:py-12 shadow-xl flex flex-col gap-8 animate-fade-in">
          {/* First and Last Name*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      autoFocus
                      className="rounded-2xl h-12 bg-hero-background border-0 focus-visible:ring-2 focus-visible:ring-border px-5 py-2"
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
                  <FormLabel className="text-primary font-medium">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      autoFocus
                      className="rounded-2xl h-12 bg-hero-background border-0 focus-visible:ring-2 focus-visible:ring-border px-5 py-2"
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
                <FormLabel className="text-primary font-medium">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-2xl h-12 bg-hero-background border-0 focus-visible:ring-2 focus-visible:ring-border px-5 py-2"
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
                <FormLabel className="text-primary font-medium">
                  I&apos;m interested in
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="data-[state=open]:ring-2 data-[state=open]:ring-border rounded-2xl !h-12 w-full bg-hero-background border-0 px-5 py-2 focus-select-option active:ring-red-400">
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-hero-background border-gray-200 rounded-2xl">
                    {products.map((product) => (
                      <SelectItem
                        key={product}
                        value={product.toLowerCase()}
                        className="h-12 cursor-pointer focus:bg-black focus:text-white rounded-2xl"
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

          {/* Phone Number */}
          {/* <div className="space-y-2">
            <FormLabel className="text-primary font-medium">
              Phone number
            </FormLabel>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[140px] bg-hero-background border-0 focus:ring-2 focus:ring-primary rounded-2xl !h-12 focus-visible:ring-2 focus-visible:ring-primary px-5 py-2">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-hero-background border-gray-200 rounded-2xl">
                      {countryCodes.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          className="h-12 cursor-pointer focus:bg-black focus:text-white rounded-2xl"
                        >
                          {country.country} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        className="rounded-2xl h-12 bg-hero-background border-0 focus-visible:ring-2 focus-visible:ring-primary px-5 py-2"
                        {...field}
                      />
                      <PhoneInput
                        placeholder="Your phone number"
                        className="rounded-2xl h-12 bg-hero-background border-0 focus-visible:ring-2 focus-visible:ring-primary px-5 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-primary font-medium">
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
                    className="bg-hero-background text-peach data-[state=checked]:bg-hero-background data-[state=checked]:text-black w-5 h-5"
                  />
                </FormControl>
                <FormLabel className="text-primary font-medium">
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
              // className="bg-primary w-full h-12 rounded-2xl text-white text-lg font-medium"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl w-full font-grotesk font-bold text-lg shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-100 h-12 duration-500"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Get Early Access"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
