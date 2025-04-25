import { Copyright, Instagram, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-24 w-full px-8 flex flex-col gap-6 items-center md:px-12 py-2 pb-8 bg-hero-background/20 mt-8 md:mt-16">
      <div className="max-w-7xl mx-auto w-full flex flex-row flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/aurawear.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="mailto:info@aurawear.in"
            className="text-gray-600 hover:text-black transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <div className="items-center gap-2 text-sm text-gray-600 hidden sm:flex">
          <Copyright className="w-4 h-4" />
          <span>{new Date().getFullYear()} Aurawear. All rights reserved.</span>
        </div>

        <Link
          href="/policies"
          className="text-sm text-gray-600 hover:text-black transition-colors"
        >
          Policies
        </Link>
      </div>
      <div className="items-center gap-2 text-sm text-gray-600 flex sm:hidden">
        <Copyright className="w-4 h-4" />
        <span>{new Date().getFullYear()} Offshore. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
