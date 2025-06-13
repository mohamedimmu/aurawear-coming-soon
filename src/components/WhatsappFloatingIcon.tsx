import Image from "next/image";
import { memo } from "react";
import WhatsAppFloatingIcon from "@/assets/social-icons/whatsapp-floating-icon.svg";
import { cn } from "@/lib/utils";
import { WHATSAPP_PHONE } from "@/lib/constants";

interface WhatsappFloatingProps {
  phoneNumber?: string;
  className?: string;
}

const WhatsappFloating = memo(function WhatsappFloating({
  phoneNumber = WHATSAPP_PHONE,
  className,
}: WhatsappFloatingProps) {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        "fixed right-4 bottom-10 z-50 h-14 w-14 transition-transform hover:scale-110",
        "animate-bounce hover:animate-none",
        className,
      )}
      aria-label="Chat with us on WhatsApp"
    >
      <Image
        src={WhatsAppFloatingIcon}
        alt="WhatsApp Support"
        width={56}
        height={56}
        priority={false}
        className="h-full w-full"
        unoptimized
      />
    </a>
  );
});

export default WhatsappFloating;
