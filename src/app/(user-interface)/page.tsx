import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
import { envServer } from "@/env/server";
import { envClient } from "@/env/client";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function RootLayout() {
  console.log(
    // "1", envServer.VERCEL_URL,
    "2", envServer.ACCOUNT_ID,
    "3", envServer.API_KEY,
    "4", envServer.MEASUREMENT_ID,
    "5", envServer.SITE_ID,
    "6", envClient.NEXT_PUBLIC_CLIENT_ID
  );
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
