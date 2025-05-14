import React from 'react';
import { MagicText } from "@/components/ui/magic-text"


export function MagicTextBlock() {
  return (
    <section className="relative z-30 flex justify-center w-full py-32">
      <div className="relative flex flex-col text-left mx-auto max-w-7xl" >
        <MagicText
          text={
            "Conflict is part of life—it shapes our relationships, our communities, and our growth. At the Mediation and Conflict Resolution Center, we believe that conflict, when approached with care and intention, can be a pathway to healing, understanding, and transformation."
          }
        />
      </div>
    </section>
  );
} 