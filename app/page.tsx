import { Hero } from '@/components/blocks/Hero';
import { MagicTextBlock } from '@/components/blocks/MagicTextBlock';
import { AboutPreview } from '@/components/blocks/AboutPreview';
import { Services } from '@/components/blocks/Services';
import { Donate } from '@/components/cta/Donate';
import { BlogPreview } from '@/components/blocks/BlogPreview';
import { EventsPreview } from '@/components/blocks/EventsPreview';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Mediation and Conflict Resolution Center',
  description: 'Welcome to MCRC - Building bridges through mediation and conflict resolution. Join us in creating peaceful communities through understanding and dialogue.',
  openGraph: {
    title: 'Home | Mediation and Conflict Resolution Center',
    description: 'Welcome to MCRC - Building bridges through mediation and conflict resolution. Join us in creating peaceful communities through understanding and dialogue.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <MagicTextBlock />
      <div className="px-8">
        <AboutPreview />
        <Services />
        <EventsPreview />
        <Donate />
        <BlogPreview />
      </div>
    </main>
  );
}
