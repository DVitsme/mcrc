import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/clients/AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Mediation and Conflict Resolution Center',
  description: 'Learn about MCRC\'s mission to promote peaceful conflict resolution and build stronger communities through mediation and dialogue.',
  openGraph: {
    title: 'About Us | Mediation and Conflict Resolution Center',
    description: 'Learn about MCRC\'s mission to promote peaceful conflict resolution and build stronger communities through mediation and dialogue.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}