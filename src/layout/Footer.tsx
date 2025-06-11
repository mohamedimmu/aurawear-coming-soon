import { Copyright, Instagram, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background mt-8 flex h-24 w-full flex-col items-center gap-6 px-8 py-2 pb-8 md:mt-16 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/aurawear.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-foreground hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="mailto:info@aurawear.in"
            className="text-secondary-foreground hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        <div className="text-secondary-foreground hidden items-center gap-2 text-sm sm:flex">
          <Copyright className="h-4 w-4" />
          <span>{new Date().getFullYear()} Aurawear. All rights reserved.</span>
        </div>

        <Link
          href="/policies"
          className="text-secondary-foreground hover:text-muted-foreground cursor-pointer text-sm transition-colors"
        >
          Policies
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
