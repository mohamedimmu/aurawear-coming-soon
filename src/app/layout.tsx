import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import { Toaster } from "sonner";

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

export const metadata: Metadata = {
  title: "Aurawear - Coming Soon",
  description:
    "Aurawear is more than just apparel — it's a movement. Created by athletes, for athletes, we fuse high-performance athletic wear with the bold aesthetics of streetwear and the comfort of casual wear. Every piece is built to move, perform, and inspire — whether you're pushing limits in the gym, out on the streets, or just living your everyday hustle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${grotesk.variable} antialiased bg-hero-background min-w-80`}
        style={{
          backgroundImage: "var(--bg-hero-dots)",
          backgroundSize: "30px 30px",
          backgroundPosition: "center center",
        }}
      >
        <Header />
        <main className="">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
