import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { Navbar1 } from "@/components/blocks/Navbar1";
import { Footer } from "@/components/blocks/Footer";
const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MCRC ",
  description: "mediation and conflict resolution center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Navbar1 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
