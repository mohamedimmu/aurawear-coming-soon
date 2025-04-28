import type { Metadata } from "next";
import { Inter, Space_Grotesk, Lora } from "next/font/google";
import "@/app/styles/globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";
// import { envServer } from "@/env/server";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    template: "Aurawear - %s",
    absolute: "Aurawear",
  },
  description: "Aurawear is more than just apparel — it's a movement. Created by athletes, for athletes, we fuse high-performance athletic wear with the bold aesthetics of streetwear and the comfort of casual wear. Every piece is built to move, perform, and inspire — whether you're pushing limits in the gym, out on the streets, or just living your everyday hustle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${grotesk.variable} antialiased bg-hero-background`}
      >
        <GoogleAnalytics gaId={env.MEASUREMENT_ID!} />
        <div className="">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
