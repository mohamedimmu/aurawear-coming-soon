import { Copyright, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { INSTAGRAM_LINK, SUPPORT_EMAIL, WHATSAPP_PHONE } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-background mt-8 flex h-24 w-full flex-col items-center gap-6 px-8 py-2 pb-8 md:mt-16 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_LINK}
            aria-label="Connect with us on Insatgram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-foreground hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            aria-label="Contact us via email"
            rel="noopener noreferrer"
            target="_blank"
            className="text-secondary-foreground hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Chat with us on WhatsApp"
            className="text-secondary-foreground hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <FaWhatsapp className="h-6 w-6" />
          </a>
        </div>

        <div className="text-secondary-foreground hidden items-center gap-2 text-sm sm:flex">
          <Copyright className="h-4 w-4" />
          <span>{new Date().getFullYear()} Aurawear. All rights reserved.</span>
        </div>

        <Link
          href="/policy"
          className="text-secondary-foreground hover:text-muted-foreground cursor-pointer text-sm transition-colors"
        >
          Policy
        </Link>
      </div>

      {/* Mobile */}
      <div className="text-secondary-foreground flex items-center gap-2 text-sm sm:hidden">
        <Copyright className="h-4 w-4" />
        <span>{new Date().getFullYear()} Aurawear. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
