import Image from "next/image";
import { memo } from "react";
import WhatsAppFloatingIcon from "@/assets/social-icons/whatsapp-floating-icon.svg";
import { cn } from "@/lib/utils";
import { WHATSAPP_PHONE } from "@/lib/constants";
import Link from "next/link";

interface WhatsappFloatingProps {
  phoneNumber?: string;
  className?: string;
}

const WhatsappFloating = memo(function WhatsappFloating({
  phoneNumber = WHATSAPP_PHONE,
  className,
}: WhatsappFloatingProps) {
  return (
    <Link
      href={`https://wa.me/${phoneNumber}`}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        "fixed right-4 bottom-10 z-50 h-12 w-12 transition-transform hover:scale-110",
        className,
      )}
      aria-label="Chat with us on WhatsApp"
    >
      <Image
        src={WhatsAppFloatingIcon}
        alt="WhatsApp Support"
        width={48}
        height={48}
        className="h-full w-full"
        unoptimized
        priority={false}
      />
    </Link>
  );
});

export default WhatsappFloating;
