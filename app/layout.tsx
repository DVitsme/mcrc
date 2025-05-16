import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

// UI Components
import { Navbar1 } from "@/components/blocks/Navbar1";
import { Footer } from "@/components/blocks/Footer";

// Import the Auth Provider
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCRC ",
  description: "Mediation and Conflict Resolution Center",
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
        <AuthProvider>
          <Navbar1 />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
