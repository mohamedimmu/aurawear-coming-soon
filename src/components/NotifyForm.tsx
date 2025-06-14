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
import { LucideIcon } from "lucide-react";
import { useCreateBackInStockNotificationRequest } from "@/hooks/backinStock";
import { products } from "@wix/stores";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type NotifyFormValues = z.infer<typeof formSchema>;

type NotifyFormBase = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonName?: string;
  defaultEmail?: string;
  Icon?: LucideIcon;
  toastSuccessMessage?: string;
  toastSuccessDescription?: string;
};

type FormSubmissionProps = NotifyFormBase & {
  type: "formSubmission";
  product?: never;
  selectedOptions?: never;
  baseUrl?: never;
  wixFormId: string;
};

type StockNotificationProps = NotifyFormBase & {
  type: "stockNotification";
  product: products.Product;
  selectedOptions: Record<string, string>;
  baseUrl: string;
  wixFormId?: never;
};

export type NotifyFormProps = FormSubmissionProps | StockNotificationProps;

const NotifyForm = ({
  setIsModalOpen,
  wixFormId,
  buttonName = "Notify me",
  defaultEmail = "",
  Icon = Mail,
  type,
  toastSuccessMessage = "Thanks for your interest!",
  toastSuccessDescription = "You'll receive updates soon.",
  product,
  selectedOptions,
  baseUrl,
}: NotifyFormProps) => {
  const form = useForm<NotifyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const { isPending, mutate } = useCreateBackInStockNotificationRequest();

  async function onSubmit(data: NotifyFormValues) {
    if (wixFormId && type === "formSubmission") {
      try {
        const response = await saveFormData(wixFormId, data);
        if (response.success) {
          toast.success(toastSuccessMessage, {
            description: toastSuccessDescription,
          });
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        form.reset();
        setIsModalOpen(false);
      }
    }

    if (type === "stockNotification") {
      mutate({
        email: data.email,
        itemUrl: baseUrl + "/products/" + product.slug,
        product,
        selectedOptions,
        form,
        setIsModalOpen,
      });
    }
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
        <Button
          type="submit"
          variant="default"
          className="w-full cursor-pointer"
          disabled={isPending || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting || isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              {Icon ? (
                <Icon className="mr-2 h-5 w-5" />
              ) : (
                <Mail className="mr-2 h-5 w-5" />
              )}
              <span>{buttonName}</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NotifyForm;
