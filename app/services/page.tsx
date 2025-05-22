/**
 * Services Page Component
 * 
 * This is the main services page that serves as the entry point for all service-related content.
 * It uses a client component (ServicesPageClient) to render the actual content while maintaining
 * server-side metadata configuration.
 */

import type { Metadata } from 'next';
import { ServicesPageClient } from '@/components/clients/ServicesPageClient';

/**
 * Page Metadata Configuration
 * 
 * Defines the SEO metadata for the services page, including:
 * - Page title
 * - Meta description
 * - OpenGraph properties for social media sharing
 */
export const metadata: Metadata = {
  title: 'Our Services | Mediation and Conflict Resolution Center',
  description: 'Discover our comprehensive mediation and conflict resolution services, including community mediation, workplace conflict resolution, and educational programs.',
  openGraph: {
    title: 'Our Services | Mediation and Conflict Resolution Center',
    description: 'Discover our comprehensive mediation and conflict resolution services, including community mediation, workplace conflict resolution, and educational programs.',
    type: 'website',
  },
};

/**
 * Services Page Component
 * 
 * A server component that renders the ServicesPageClient component.
 * This separation allows for server-side metadata configuration while
 * maintaining client-side interactivity where needed.
 */
export default function ServicesPage() {
  return <ServicesPageClient />;
}



