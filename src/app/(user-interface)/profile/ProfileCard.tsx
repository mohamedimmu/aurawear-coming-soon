"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ProfileForm";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, XCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  form: UseFormReturn<FormValues>;
}

export default function ProfileCard({ form }: ProfileCardProps) {
  const username =
    form.getValues("firstName") + " " + form.getValues("lastName")[0];
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-4 flex h-24 w-24 items-center justify-center text-2xl font-semibold">
            <AvatarImage src="" alt={form.getValues("firstName")} />
            <AvatarFallback>
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="mb-1 text-lg font-semibold">
            {form.getValues("firstName")} {form.getValues("lastName")}
          </h3>

          <div className="mb-4 flex flex-col items-center gap-4 text-sm">
            <p className="text-muted-foreground">
              {form.getValues("loginEmail")}
            </p>
            {form.getValues("loginEmailVerified") ? (
              <Badge
                variant="secondary"
                className="rounded-full bg-green-600 px-2 text-sm text-white dark:bg-green-600"
              >
                <BadgeCheckIcon className="mr-1 !h-4 !w-4" />
                Verified
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white dark:bg-red-600"
              >
                <XCircleIcon className="mr-1 h-4 w-4" />
                Not Verified
              </Badge>
            )}
          </div>
          {/* <Button variant="outline" size="sm">
            Change Photo
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
