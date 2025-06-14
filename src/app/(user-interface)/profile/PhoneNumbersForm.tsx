"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./ProfileForm";
import { Phone } from "lucide-react";

interface PhoneNumbersFormProps {
  form: UseFormReturn<ProfileFormValues>;
  isEditing: boolean;
}

export default function PhoneNumbersForm({
  form,
  isEditing,
}: PhoneNumbersFormProps) {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-2 font-semibold">
        <Phone className="h-4 w-4" />
        Phone Numbers
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[0, 1].map((index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`phones.${index}`}>Phone {index + 1}</Label>
            <Input
              id={`phones.${index}`}
              {...form.register(`phones.${index}`)}
              disabled={!isEditing}
              defaultValue={form.getValues(`phones.${index}`) || ""}
            />
            {form.formState.errors.phones?.[index] && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phones[index]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
