import React from 'react';

interface PageHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const PageHero = ({
  title = 'Read our client success stories',
  subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
}: PageHeroProps) => (
  <section className="relative bg-indigo-300">
    <div className="absolute inset-0">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
        className="size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-orange-300 mix-blend-multiply" />
    </div>
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-xl text-indigo-100">
        {subtitle}
      </p>
    </div>
  </section>
); 
