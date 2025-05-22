/**
 * Restorative Justice Service Page Component
 * 
 * This is a client-side component that displays information about the restorative justice services
 * offered by the Mediation and Conflict Resolution Center. It includes:
 * - A header section with service description
 * - Interactive content sections with scroll spy functionality
 * - A sticky table of contents
 * - Social sharing options
 * - A timeline of the restorative justice process
 * - Feature sections for different restorative practices
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Facebook, Linkedin, Share2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/blocks/PageHeader";
import { TimelineSteps } from "@/components/blocks/TimelineSteps";

/**
 * Data structure defining the phases of the restorative justice process
 * Each phase includes:
 * - Phase number and title
 * - Date
 * - Heading and description
 * - Associated image
 */
const PHASES__DATA = [
  {
    id: "phase1",
    phase: "1",
    title: "Pre-Reflection",
    date: "02/03/2025",
    heading: "Step 1: A One-on-One Conversation",
    description: {
      __html: `<div className="prose mb-8 lg:prose-lg">
        <p>
          We begin with a private conversation with the youth and their caregiver
          to see if Restorative Reflection is the right fit. During this time, we:
        </p>
        <ul style="list-style: disc;">
          <li style="margin-left: 1rem; margin-top: 1rem;">Talk about what happened and who may have been affected</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">Listen with care and without judgment</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">Share what restorative practices are all about</li>
          <li style="margin-left: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
            Help the young person prepare to reflect and tell their story well
          </li>
        </ul>
        <p>
          This is also a chance for you to ask questions and learn more before
          deciding whether to continue.
        </p>
      </div>`
    },
    imageSrc: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    imageAlt: "Phase 1 illustration",
  },
  {
    id: "phase2",
    phase: "2",
    title: "Scheduling",
    date: "21/03/2025",
    heading: "Step 2: Scheduling and Consent",
    description: {
      __html: `<div className="prose mb-8 lg:prose-lg">
        <p>If everyone feels ready to move forward, we'll:</p>
        <ul style="list-style: disc;">
          <li style="margin-left: 1rem; margin-top: 1rem;">Schedule a time that works for the youth and family</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">Send a short Consent to Participate form</li>
          <li style="margin-left: 1rem; margin-top: 1rem; margin-bottom: 1rem;">Make sure the young person feels supported and prepared for the process</li>
        </ul>
        <p>Restorative Reflections are typically scheduled in two-hour time blocks so there's space for real conversation, without rushing.</p>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Confidentiality & Trust</h3>
        <p>We know that trust matters. That's why we want you to know:</p>
        <ul style="list-style: disc;">
          <li style="margin-left: 1rem; margin-top: 1rem;">This is a private and confidential process.</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">MCRC is a community-based organization. We do not work for the courts, schools, or the justice system. Our role is to support young people and families—not to judge or report back to anyone.</li>
          <li style="margin-left: 1rem; margin-top: 1rem; margin-bottom: 1rem;">What you share with us stays between you, your facilitator, and the circle of support—unless we hear something that falls under mandatory reporting laws (such as a risk of serious harm to someone's safety). If that ever happens, we'll talk with you about it first.</li>
        </ul>
        <p>We want you to feel safe, heard, and respected every step of the way.</p>
      </div>`
    },
    imageSrc: "",
    imageAlt: "Phase 2 illustration",
  },
  {
    id: "phase3",
    phase: "3",
    title: "Reflection Session",
    date: "06/04/2025",
    heading: "Step 3: The Restorative Reflection Session",
    description: {
      __html: `<div className="prose mb-8 lg:prose-lg">
        <p>This is a guided process led by a trained facilitator.</p>
        <p>We'll walk the youth through a six-question reflection that helps them:</p>
        <ul style="list-style: disc;">
          <li style="margin-left: 1rem; margin-top: 1rem;">Understand the situation from all angles</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">Acknowledge the impact of what happened</li>
          <li style="margin-left: 1rem; margin-top: 1rem;">Think about what repair and healing might look like</li>
          <li style="margin-left: 1rem; margin-top: 1rem; margin-bottom: 1rem;">Consider what they might need to move forward</li>
        </ul>
        <p>This isn't about blame—it's about growth, responsibility, and clarity. Some young people leave feeling lighter, more confident, or more connected to what matters to them.</p>
      </div>`
    },
    imageSrc: "https://shadcnblocks.com/images/block/placeholder-3.svg",
    imageAlt: "Phase 3 illustration",
  },
];

/**
 * Restorative Justice Service Page Component
 * 
 * Implements a scroll spy functionality to track the active section in the viewport
 * and update the table of contents accordingly. Also includes social sharing functionality.
 */
export default function RestorativeJustice() {
  // State to track the currently active section in viewport
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Refs to store references to all section elements
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  /**
   * Handles sharing the current page URL to clipboard
   * Shows a success or error toast notification
   */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /**
   * Sets up an Intersection Observer to track which sections are currently in view
   * and updates the active section state accordingly.
   */
  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  /**
   * Helper function to add section references to the refs object
   * @param id - The section ID
   * @param ref - The section element reference
   */
  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <section className="py-16">
      <div className="center-container">
        <PageHeader
          title="Restorative Practices: Working Through Harm, Rebuilding Relationships"
          description="Our youth-centered restorative program supports healing after harm by creating space for accountability, reflection, and meaningful conversation. We work with families, schools, and community partners to help young people repair trust and move forward." />

        <div className="relative mt-12 grid max-w-screen-xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              <Image
                src="/images/services/restorative-justice.jpg"
                alt="placeholder"
                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover"
                width={1000}
                height={1000}
              />


            </div>
            <section
              id="section1"
              ref={(ref) => addSectionRef("section1", ref)}
              className="my-8 prose"
            >
              <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-3xl lg:mb-6">
                Conflict is part of life—but it doesn&apos;t have to be destructive.
              </h2>
              <p className="mb-4 text-muted-foreground lg:text-lg">
                Our restorative justice program offers pathways for healing that honor dignity, accountability, and community. Rooted in practices that have existed for generations—long before formal legal systems—we create spaces for deep listening, honest reflection, and meaningful repair.
              </p>
              <p className="mb-8 text-muted-foreground lg:text-lg">
                Whether the conflict involves friends, family, classmates, or neighbors, our approach is grounded in relationships—not just behavior or rules. Restorative practices give voice to those most impacted and create a way forward that reflects shared values, not imposed solutions.
              </p>

            </section>

            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose mb-8"
            >
              <TimelineSteps title="Our Process" description="Restorative Reflections offer young people a space to pause, think deeply, and be heard. Here's how the process works, step by step:" textBlockCenter={true} phases={PHASES__DATA} />
            </section>

            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose mb-8"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                  <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                    <Image
                      src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                      alt="Feature 1"
                      className="aspect-[16/9] h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                      Restorative Dialogues
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      When harm has occurred, accountability begins with conversation—not isolation. We bring together the person who was harmed and the person who caused harm for a guided, voluntary dialogue. The focus is on listening, understanding impact, and exploring what repair looks like—centered on the needs of the person affected.
                    </p>
                  </div>
                </div>

              </div>

              <div className="grid gap-12">
                {/* Restorative Circles Section */}
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background to-muted/50 p-8 transition-all duration-300 hover:shadow-xl md:p-12">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="relative grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-7">
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight text-primary">
                          Restorative Circles
                        </h3>
                        <div className="space-y-4 text-muted-foreground">
                          <p className="text-lg leading-relaxed">
                            Circles are intentional spaces where people come together to listen, share stories, and strengthen connection.
                          </p>
                          <p className="text-lg leading-relaxed">
                            Whether the goal is to heal from harm, build trust, or prevent future conflict, our circles create space for honest conversation, understanding, and shared problem-solving.
                          </p>
                          <p className="text-lg leading-relaxed">
                            At MCRC, we use circles in schools and communities to support youth, families, and educators in working through challenges and building stronger relationships.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src="https://shadcnblocks.com/images/block/placeholder-2.svg"
                          alt="Restorative Circles"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* What to Expect Section */}
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/50 to-background p-8 transition-all duration-300 hover:shadow-xl md:p-12">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="relative grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src="https://shadcnblocks.com/images/block/placeholder-3.svg"
                          alt="What to Expect"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent" />
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight text-primary">
                          What to Expect from a Restorative Circle
                        </h3>
                        <div className="space-y-4 text-muted-foreground">
                          <p className="text-lg leading-relaxed">
                            In a restorative circle, participants will gather in a safe, respectful space to share experiences, listen deeply, and explore the impact of harm. Guided by skilled facilitators, you&apos;ll engage in honest dialogue, collaborative problem-solving, and mutual accountability—paving the way for genuine understanding, healing, and stronger community connections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Section */}
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background to-muted/50 p-8 transition-all duration-300 hover:shadow-xl md:p-12">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                  <div className="relative">
                    <div className="mx-auto max-w-3xl space-y-6 text-center">
                      <h3 className="text-3xl font-bold tracking-tight text-primary">
                        Why Choose Restorative Practices?
                      </h3>
                      <div className="space-y-4 text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                          The world often tells us that harm can only be met with punishment. At MCRC our work is about transformation, not retribution. We hold space for accountability that restores, rather than punishes. We make room for voices that are too often ignored. And we believe that healing—real healing—is possible when we return to the wisdom of collective care.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Sidebar inpage-navigation */}
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">ON THIS PAGE</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#section1"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section1"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      How Taxes Work and Why They Matter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section2"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section2"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      What to Expect
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section3"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section3"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The King&apos;s Plan
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <Separator className="order-2 mt-8 mb-11 lg:hidden" />
            <Button
              variant="default"
              className="mt-8 mb-4 flex w-fit items-center gap-2 rounded-full border border-border !px-4 md:mb-0"
            >
              <p className="text-md font-medium text-primary-foreground">
                To Get Started Click Here
              </p>
              <ArrowRight className="size-4" />
            </Button>
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-4">
              <p className="font-medium text-muted-foreground">
                Share Our Services:
              </p>
              <ul className="flex gap-2">
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                  >
                    <a href="#">
                      <Facebook className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                  >
                    <a href="#">
                      <Linkedin className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


