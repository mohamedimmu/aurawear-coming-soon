"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ProfileForm";

interface AddressesFormProps {
  form: UseFormReturn<FormValues>;
  isEditing: boolean;
}

export default function AddressesForm({ form, isEditing }: AddressesFormProps) {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-2 font-semibold">
        <MapPin className="h-4 w-4" />
        Address Information
      </h4>
      {[0, 1].map((index) => (
        <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
          <Label className="text-sm font-semibold">
            {index === 0 ? "Home" : "Work"}
          </Label>
          <div className="space-y-2">
            <Label htmlFor={`addresses.${index}.addressLine`}>
              Street Address
            </Label>
            <Input
              id={`addresses.${index}.addressLine`}
              {...form.register(`addresses.${index}.addressLine`)}
              disabled={!isEditing}
              defaultValue={
                form.getValues(`addresses.${index}.addressLine`) || ""
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`addresses.${index}.city`}>City</Label>
              <Input
                id={`addresses.${index}.city`}
                {...form.register(`addresses.${index}.city`)}
                disabled={!isEditing}
                defaultValue={form.getValues(`addresses.${index}.city`) || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`addresses.${index}.postalCode`}>
                Postal Code
              </Label>
              <Input
                id={`addresses.${index}.postalCode`}
                {...form.register(`addresses.${index}.postalCode`)}
                disabled={!isEditing}
                defaultValue={
                  form.getValues(`addresses.${index}.postalCode`) || ""
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`addresses.${index}.subdivision`}>
                State/Region
              </Label>
              <Input
                id={`addresses.${index}.subdivision`}
                {...form.register(`addresses.${index}.subdivision`)}
                disabled={!isEditing}
                defaultValue={
                  form.getValues(`addresses.${index}.subdivision`) || ""
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`addresses.${index}.country`}>Country</Label>
            <Input
              id={`addresses.${index}.country`}
              {...form.register(`addresses.${index}.country`)}
              disabled={!isEditing}
              defaultValue={form.getValues(`addresses.${index}.country`) || ""}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
