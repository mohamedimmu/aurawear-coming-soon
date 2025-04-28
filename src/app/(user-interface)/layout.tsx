import Header from "@/layout/Header";
import Footer from "@/layout/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className=""
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
