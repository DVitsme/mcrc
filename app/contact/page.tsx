import type { Metadata } from 'next';
import { ContactPageClient } from "@/components/clients/ContactPageClient";

/**
 * Contact Page Component
 * 
 * This is a Server Component that serves as the container for the contact page.
 * The actual form and interactivity are handled by the ContactPageClient component
 * to maintain a clean separation between server and client-side functionality.
 */
export const metadata: Metadata = {
  title: 'Contact Us | Mediation and Conflict Resolution Center',
  description: 'Get in touch with MCRC. We\'re here to help you resolve conflicts and build stronger relationships through mediation and dialogue.',
  openGraph: {
    title: 'Contact Us | Mediation and Conflict Resolution Center',
    description: 'Get in touch with MCRC. We\'re here to help you resolve conflicts and build stronger relationships through mediation and dialogue.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
} 