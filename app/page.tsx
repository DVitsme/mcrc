import { Hero } from '@/components/blocks/Hero';
import { MagicTextBlock } from '@/components/blocks/MagicTextBlock';
import { AboutPreview } from '@/components/blocks/AboutPreview';
import { Services } from '@/components/blocks/Services';
import { Donate } from '@/components/cta/Donate';
import { BlogPreview } from '@/components/blocks/BlogPreview';
import { EventsPreview } from '@/components/blocks/EventsPreview';

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
