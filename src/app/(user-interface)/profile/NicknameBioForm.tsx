"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ProfileForm";

interface NicknameBioFormProps {
  form: UseFormReturn<FormValues>;
  isEditing: boolean;
}

export default function NicknameBioForm({
  form,
  isEditing,
}: NicknameBioFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          id="nickname"
          {...form.register("nickname")}
          disabled={!isEditing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          {...form.register("bio")}
          disabled={!isEditing}
          rows={4}
          placeholder="Tell us a bit about yourself..."
        />
      </div>
    </div>
  );
}
