import type { Metadata } from 'next';
import { ResourcesPageClient } from '@/components/clients/ResourcesPageClient';

export const metadata: Metadata = {
  title: 'Resources | Mediation and Conflict Resolution Center',
  description: 'Access our collection of resources, guides, and tools for effective conflict resolution and mediation practices.',
  openGraph: {
    title: 'Resources | Mediation and Conflict Resolution Center',
    description: 'Access our collection of resources, guides, and tools for effective conflict resolution and mediation practices.',
    type: 'website',
  },
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
} 