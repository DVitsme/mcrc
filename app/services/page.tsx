import type { Metadata } from 'next';
import { ServicesPageClient } from '@/components/clients/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Our Services | Mediation and Conflict Resolution Center',
  description: 'Discover our comprehensive mediation and conflict resolution services, including community mediation, workplace conflict resolution, and educational programs.',
  openGraph: {
    title: 'Our Services | Mediation and Conflict Resolution Center',
    description: 'Discover our comprehensive mediation and conflict resolution services, including community mediation, workplace conflict resolution, and educational programs.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}



