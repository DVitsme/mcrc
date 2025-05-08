import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TRUST_LOGOS = [
  '/images/logos/forbes.png',
  '/images/logos/forbes.png',
  '/images/logos/forbes.png',
  '/images/logos/forbes.png',
];

const BADGES = [
  'Anxiety',
  'Depression',
  'Therapy',
];

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex flex-col">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Centered Content */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center px-4">
        {/* Badges */}
        <div className="flex gap-3 mb-6 justify-center">
          {BADGES.map((badge) => (
            <Badge key={badge} variant="secondary" className="bg-white/20 text-white border-none">
              {badge}
            </Badge>
          ))}
        </div>
        {/* Headline */}
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Reclaim Your Peace, Empower Your Mind</h1>
        {/* Subheadline */}
        <p className="text-white text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow">Discover personalized mental health support tailored to your unique needs.</p>
        {/* CTA Button */}
        <Button size="lg" className="px-8 py-3 rounded-full bg-green-500 text-white font-semibold text-lg shadow-lg hover:bg-green-600 transition border-none">
          Consult Now
        </Button>
        {/* Trust Statement */}
        <p className="text-white/80 text-sm mt-8 mb-2">We Have Helped Over 10,000+ People and Featured In</p>
        {/* Trust Logos Row */}
        <div className="flex gap-8 items-center justify-center mt-4">
          {TRUST_LOGOS.map((src, i) => (
            <Image key={i} src={src} alt="Trust Logo" className="h-8 w-auto grayscale opacity-80" width={32} height={32} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 