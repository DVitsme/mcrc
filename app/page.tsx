import Hero from "@/components/blocks/Hero";
import { AboutShortStory } from "@/components/blocks/AboutShortStory";

export default function Home() {
  return (
    <main>
      <Hero
        title="Welcome to Our Platform"
        subtitle="Discover amazing possibilities"
        videoSrc="/videos/hero-background.mp4"
      />
      <AboutShortStory />
    </main>
  );
}
