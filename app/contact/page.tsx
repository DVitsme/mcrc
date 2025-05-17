import { ContactPageClient } from "@/components/blocks/ContactPageClient";

/**
 * Contact Page Component
 * 
 * This is a Server Component that serves as the container for the contact page.
 * The actual form and interactivity are handled by the ContactPageClient component
 * to maintain a clean separation between server and client-side functionality.
 */
export default function ContactPage() {
  return <ContactPageClient />;
} 