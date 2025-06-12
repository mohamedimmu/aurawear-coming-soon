import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { saveFormData } from "@/wix-api/saveFormData";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

const NotifyForm = ({
  category,
  setIsModalOpen,
  formId,
}: {
  category: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formId: string;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await saveFormData(formId, data);
      if (response.success) {
        toast.success("Thanks for your interest!", {
          description: `We'll notify you when new ${category} become available.`,
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      form.reset();
      setIsModalOpen(false);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="w-full">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Mail className="mr-2 h-5 w-5" />
              <span>Notify me</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NotifyForm;
