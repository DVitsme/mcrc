import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { Navbar1 } from "@/components/blocks/shadcnblocks-com-navbar1";
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
      </body>
    </html>
  );
}
