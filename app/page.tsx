import { Hero } from '@/components/blocks/Hero';
import { MagicTextBlock } from '@/components/blocks/MagicTextBlock';
import { About } from '@/components/blocks/About';
import { Services } from '@/components/blocks/Services';
import { Donate } from '@/components/cta/Donate';
import { BlogPreview } from '@/components/blocks/BlogPreview';
import { Events } from '@/components/blocks/Events';

export default function Home() {
  return (
    <main>
      <Hero />
      <MagicTextBlock />
      <div className="px-8">
        <About />
        <Services />
        <Events />
        <Donate />
        <BlogPreview />
      </div>
    </main>
  );
}
