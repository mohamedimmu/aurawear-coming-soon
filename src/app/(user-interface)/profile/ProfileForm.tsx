"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfileCard from "./ProfileCard";
import BasicInfoForm from "./BasicInfoForm";
import DateOfBirthForm from "./DateOfBirthForm";
import PhoneNumbersForm from "./PhoneNumbersForm";
import AddressesForm from "./AddressesForm";
import NicknameBioForm from "./NicknameBioForm";
import { User } from "lucide-react";
import { useUpdateMember } from "@/hooks/members";

// Define address schema
const addressSchema = z.object({
  addressLine: z.string().nullable(),
  city: z.string().nullable(),
  subdivision: z.string().nullable(),
  country: z.string().nullable(),
  postalCode: z.string().nullable(),
  _id: z.string().nullable(),
});

// Define form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  loginEmail: z.string().email("Invalid email address"),
  loginEmailVerified: z.boolean(),
  phones: z
    .array(z.string().nullable())
    .max(2, "Maximum 2 phone numbers allowed"),
  addresses: z.array(addressSchema).max(2, "Maximum 2 addresses allowed"),
  nickname: z.string().nullable(),
  bio: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
});

// Define form values type
export type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialValues: ProfileFormValues;
}

export default function ProfileForm({ initialValues }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      phones: initialValues.phones.length > 0 ? initialValues.phones : ["", ""],
      addresses:
        initialValues.addresses.length > 0
          ? initialValues.addresses
          : [
              {
                addressLine: "",
                city: "",
                subdivision: "",
                country: "",
                postalCode: "",
                _id: "",
              },
              {
                addressLine: "",
                city: "",
                subdivision: "",
                country: "",
                postalCode: "",
                _id: "",
              },
            ],
      dateOfBirth: initialValues.dateOfBirth || "",
    },
  });
  const mutation = useUpdateMember();

  // Handle form submission
  const onSubmit = (values: ProfileFormValues) => {
    // Prepare data for mutation, including dateOfBirth in customFields

    // Here you would typically call your mutation
    mutation.mutate(values);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6">
        {/* Profile Card */}
        <div className="w-full lg:col-span-1">
          <ProfileCard form={form} />
        </div>

        {/* Personal Information */}
        <div className="w-full lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <BasicInfoForm form={form} isEditing={isEditing} />
              <DateOfBirthForm form={form} isEditing={isEditing} />
              <PhoneNumbersForm form={form} isEditing={isEditing} />
              <AddressesForm form={form} isEditing={isEditing} />
              <NicknameBioForm form={form} isEditing={isEditing} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
