import React, { useState } from "react";
import { products } from "@wix/stores";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import NotifyDialog from "@/components/NotifyDialog";


type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;
interface BackInStockNotificationProps extends ButtonProps {
  media: products.MediaItem[] | undefined;
  inStock: boolean | undefined;
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotification({
  media,
  inStock,
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        {...props}
        variant="default"
        size={"lg"}
        disabled={inStock}
        onClick={() => setIsModalOpen(true)}
        className="bg-primary text-primary-foreground h-14 w-full cursor-pointer py-6 hover:opacity-95"
      >
        Notify me
        <Bell className="ml-2" />
      </Button>
      <NotifyDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedOptions={selectedOptions}
        media={media}
        product={product}
      />
    </div>
  );
}
