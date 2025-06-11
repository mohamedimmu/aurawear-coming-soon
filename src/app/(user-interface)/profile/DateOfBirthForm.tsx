"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ProfileForm";

interface DateOfBirthFormProps {
  form: UseFormReturn<FormValues>;
  isEditing: boolean;
}

export default function DateOfBirthForm({
  form,
  isEditing,
}: DateOfBirthFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dateOfBirth">Date of Birth</Label>
      <Input
        id="dateOfBirth"
        type="date"
        {...form.register("dateOfBirth")}
        disabled={!isEditing}
        onChange={(e) => form.setValue("dateOfBirth", e.target.value)}
      />
      {form.formState.errors.dateOfBirth && (
        <p className="text-sm text-red-500">
          {form.formState.errors.dateOfBirth.message}
        </p>
      )}
    </div>
  );
}
