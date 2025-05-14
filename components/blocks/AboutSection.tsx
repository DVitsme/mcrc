import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export function AboutSection({
  title,
  subtitle,
  ctaText = "Learn More",
  ctaLink = "/about"
}: AboutSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Content Container */}
          <div className="text-center space-y-8">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg rounded-full"
                asChild
              >
                <a href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                number: "500+",
                label: "Mediations Completed",
                description: "Successfully resolved conflicts across diverse communities"
              },
              {
                number: "95%",
                label: "Success Rate",
                description: "Of participants report improved relationships"
              },
              {
                number: "50+",
                label: "Communities Served",
                description: "Building bridges across neighborhoods and organizations"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 