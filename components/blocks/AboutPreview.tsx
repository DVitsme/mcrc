import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const AboutPreview = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
            <div className="pr-6">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl">
                Our Story
              </h1>
              <p className="mb-9 lg:text-xl">
                We believe in the power of conversation and community. Together we can bridge divides, restore trust, and create lasting change. Join us in building stronger, more connected communities - one conversation at a time.
              </p>
              <p className="text-muted-foreground">
                Originally connected to Howard Community College, we have since grown into an independent, community-rooted organization. Our work is grounded in the belief that people hold the wisdom and capacity to navigate their own challenges when given the right support. We walk alongside individuals, families, and groups to facilitate conversations that restore trust, mend relationships, and build stronger communities.
              </p>
              <Link href="/about">
                <Button className="mt-8">
                  Learn More About Us <ArrowRight className="ml-1 size-4 transition-transform group-hover/link:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <Image
                src="/images/photos/vertical/1.jpg"
                alt="about 1"
                className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
                width={500}
                height={500}
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <Image
                  src="/images/photos/vertical/2.jpg"
                  alt="about 2"
                  className="aspect-[1.1] rounded-lg object-cover"
                  width={500}
                  height={500}
                />
                <Image
                  src="/images/photos/vertical/3.jpg"
                  alt="about 3"
                  className="aspect-[0.7] rounded-lg object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <Image
                src="/images/photos/vertical/community-mediation.jpg"
                alt="about 4"
                className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
                width={500}
                height={500}
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <Image
                  src="/images/photos/vertical/5.jpg"
                  alt="about 5"
                  className="aspect-[0.8] rounded-lg object-cover"
                  width={500}
                  height={500}
                />
                <Image
                  src="/images/photos/vertical/6.jpg"
                  alt="about 6"
                  className="aspect-[0.9] rounded-lg object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="px-8">
              <h1 className="mb-8 text-2xl font-semibold lg:mb-6">
                Our Mission
              </h1>
              <p className="mb-9 lg:text-xl">
                Our mission is to provide widely accessible and affordable conflict resolution services and education that help all community members manage conflict and have difficult conversations in a meaningful, proactive way.
              </p>
              <p className="text-muted-foreground">
                We envision a strong, vibrant, peaceful community where all members have the strategies, skills, and support to resolve conflict.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutPreview };
