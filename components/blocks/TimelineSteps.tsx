"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextBlockHeader from "@/components/blocks/TextBlockHeader";

/**
 * Props interface for the TimelineSteps component
 * @property {string} title - The main title of the timeline section
 * @property {string} description - The description text below the title
 * @property {boolean} textBlockCenter - Whether to center-align the title and description
 * @property {Array<Phase>} phases - Array of timeline phases to display
 */
interface TimelineStepsProps {
  title: string;
  description: string;
  textBlockCenter?: boolean;
  phases: {
    id: string;
    phase: string;
    title: string;
    date: string;
    heading: string;
    // Support both plain text and rich text content from CMS
    // When coming from a CMS, description will be an object with __html property
    // containing sanitized HTML content
    description: string | { __html: string };
    imageSrc: string;
    imageAlt: string;
  }[];
}

/**
 * TimelineSteps Component
 * 
 * A responsive timeline component that displays a series of phases in a tabbed interface.
 * Each phase includes a title, date, heading, description (supporting rich text), and an image.
 * 
 * Features:
 * - Tabbed navigation between phases
 * - Responsive grid layout
 * - Animated image transitions
 * - Support for both plain text and rich text content
 */
const TimelineSteps = ({ title, description, phases, textBlockCenter = false }: TimelineStepsProps) => {
  return (
    <section className="bg-background">
      <div className="container flex flex-col items-center justify-center">
        {/* Header section with title and description */}
        <div className="w-full mb-8">
          <TextBlockHeader title={title} description={description} textBlockCenter={textBlockCenter} />
        </div>

        {/* Tabbed interface for phase navigation */}
        <Tabs defaultValue="phase1" className="w-full">
          {/* Tab triggers - horizontal navigation */}
          <TabsList className={`grid w-full grid-cols-${phases.length} bg-transparent p-0`}>
            {phases.map((phase) => (
              <TabsTrigger
                key={phase.id}
                className="text-md cursor-pointer rounded-none border-b-2 pb-6 !shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground hover:border-b-2 transition-all duration-200 hover:border-muted-foreground"
                value={phase.id}
              >
                <span className="hidden font-mono text-foreground/40 md:inline">
                  {phase.phase}
                </span>
                {phase.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content - phase details */}
          {phases.map((phase) => (
            <TabsContent
              key={phase.id}
              value={phase.id}
              className={`mt-12 grid items-start gap-12 ${phase.imageSrc ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}
            >
              {/* Left column: Text content */}
              <div className={`col-span-1 flex flex-col gap-2 lg:gap-4 ${phase.imageSrc ? "lg:max-w-lg" : "lg:max-w-full"}`}>
                {/* <p className="font-mono text-sm font-semibold tracking-tight text-muted-foreground">
                  {phase.date}
                </p> */}
                <h2 className="text-2xl font-medium tracking-tighter text-foreground md:text-3xl">
                  {phase.heading}
                </h2>
                {/* 
                  Description section with rich text support
                  
                  Using dangerouslySetInnerHTML for CMS content:
                  1. The CMS provides sanitized HTML content
                  2. This allows for rich text formatting (bold, italic, lists, etc.)
                  3. The prose classes ensure proper typography styling
                  4. The content is wrapped in a div with proper styling classes
                  
                  Note: dangerouslySetInnerHTML is used here because:
                  - The content comes from a trusted CMS source
                  - The HTML is pre-sanitized by the CMS
                  - We need to support rich text formatting
                */}
                <div className="text-lg font-normal tracking-tighter text-muted-foreground prose prose-lg max-w-none dark:prose-invert">
                  {typeof phase.description === 'string' ? (
                    phase.description
                  ) : (
                    <div dangerouslySetInnerHTML={phase.description} />
                  )}
                </div>
              </div>

              {/* Right column */}
              {phase.imageSrc && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 100, y: 0 }}
                  transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
                  className="relative z-20 col-span-1"
                >
                  <Card className="group h-110 w-full rounded-3xl border border-border bg-background p-2 shadow-none">
                    <CardContent className="size-full rounded-2xl border-2 border-background bg-muted">

                      <Image
                        src={phase.imageSrc}
                        className="size-full transition-all ease-in-out group-hover:scale-95"
                        alt={phase.imageAlt}
                        width={500}
                        height={500}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { TimelineSteps };
