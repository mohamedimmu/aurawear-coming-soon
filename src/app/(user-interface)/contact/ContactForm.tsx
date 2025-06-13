"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import ToastNotification from "@/components/ToastNotification";
import { Loader, Send } from "lucide-react";
import { saveFormData } from "@/wix-api/saveFormData";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await saveFormData("EnquiryMessage", data);
      if (response.success) {
        toast.custom((t) => (
          <ToastNotification
            modalClose={t}
            variant="success"
            title="Message Sent"
            description="We'll get back to you as soon as possible."
          />
        ));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="bg-card h-full border p-6">
      <h2 className="mb-6 text-2xl font-semibold">Send Us a Message</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="What is this regarding?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            size="lg"
            type="submit"
            className="w-full cursor-pointer text-base"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="!h-4 !w-4 animate-spin" />
                <span>Submitting...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="!h-4 !w-4" />
                Send Message
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
