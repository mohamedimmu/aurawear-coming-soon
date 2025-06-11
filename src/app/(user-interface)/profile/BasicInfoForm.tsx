"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ProfileForm";

interface BasicInfoFormProps {
  form: UseFormReturn<FormValues>;
  isEditing: boolean;
}

export default function BasicInfoForm({ form, isEditing }: BasicInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...form.register("firstName")}
            disabled={!isEditing}
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...form.register("lastName")}
            disabled={!isEditing}
          />
          {form.formState.errors.lastName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="loginEmail">Email Address</Label>
        <Input
          id="loginEmail"
          {...form.register("loginEmail")}
          disabled={true}
          className="bg-muted"
        />
        <p className="text-muted-foreground text-xs">
          Email cannot be changed. Contact support if you need to update your
          email.
        </p>
      </div>
    </div>
  );
}
