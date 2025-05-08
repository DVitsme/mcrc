import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin } from 'lucide-react';
import { MagicText } from "@/components/ui/magic-text"


export function AboutShortStory() {
  return (
    <section className="relative z-30 flex justify-center w-full">
      <div className="-mt-24 w-full max-w-[97vw] bg-white rounded-3xl shadow-xl px-6 md:px-16 py-12 flex flex-col border border-gray-100">
        <div className="relative flex flex-col max-w-4/5 text-left" >
          <h2 className="text-xl font-light pl-4">
            Our Core Belief
          </h2>
          <MagicText
            text={
              "Conflict is part of life—it shapes our relationships, our communities, and our growth. At the Mediation and Conflict Resolution Center, we believe that conflict, when approached with care and intention, can be a pathway to healing, understanding, and transformation."
            }
          />
        </div>
      </div>
    </section>
  );
} 