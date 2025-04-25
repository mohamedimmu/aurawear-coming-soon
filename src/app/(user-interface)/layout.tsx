import type { Metadata } from "next";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

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
    <div
      style={{
        backgroundImage: "var(--bg-hero-dots)",
        backgroundSize: "30px 30px",
        backgroundPosition: "center center",
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
