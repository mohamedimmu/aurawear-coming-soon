"use client";

import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Variant = "success" | "error" | "warning" | "info";

interface ToastNotificationProps {
  modalClose: string | number;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  variant: Variant;
}

// Icon per variant
const defaultIcons: Record<Variant, React.ReactNode> = {
  success: <CheckCircle className="text-green-500" />,
  error: <XCircle className="text-red-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  info: <Info className="text-blue-500" />,
};

// Style per variant
const variantStyleMap: Record<Variant, string> = {
  success: "border-green-500 text-green-900",
  error: "border-red-500 text-red-900",
  warning: "border-yellow-500 text-yellow-900",
  info: "border-blue-500 text-blue-900",
};

export default function ToastNotification({
  modalClose,
  icon,
  title,
  description,
  variant = "info",
}: ToastNotificationProps) {
  return (
    <div
      className={`bg-background relative flex max-w-md items-center justify-center gap-4 p-4 shadow-md ${variantStyleMap[variant]}`}
    >
      <div className="text-xl">{icon ?? defaultIcons[variant]}</div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toast.dismiss(modalClose)}
        className="cursor-pointer"
      >
        <X className="text-muted-foreground !h-6 !w-6" />
      </Button>
    </div>
  );
}
