import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

// UI Components
import { NavigationWrapper } from "./components/NavigationWrapper";
import { FooterWrapper } from "./components/FooterWrapper";

// Import the Auth Provider
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner"
import { ToastHandler } from "@/components/ToastHandler"

/**
 * Configure the Inter font with Latin subset
 * This font will be applied to the entire application
 */
const inter = Inter({
  subsets: ["latin"],
});

/**
 * Metadata configuration for the application
 * This information is used for SEO and browser tab display
 */
export const metadata: Metadata = {
  title: "MCRC ",
  description: "Mediation and Conflict Resolution Center",
};

/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps all pages in the application.
 * It provides:
 * - Global font configuration (Inter)
 * - Authentication context
 * - Navigation wrapper
 * - Toast notifications system
 * - Footer wrapper
 * 
 * The layout is structured as:
 * 1. AuthProvider: Provides authentication context to all child components
 * 2. NavigationWrapper: Handles the main navigation of the application
 * 3. Main content area: Renders the page-specific content
 * 4. Toaster: Provides the toast notification UI container
 * 5. ToastHandler: Processes URL-based toast notifications
 * 6. FooterWrapper: Displays the application footer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <NavigationWrapper>
            <main>{children}</main>
          </NavigationWrapper>
          <Toaster />
          <ToastHandler />
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
