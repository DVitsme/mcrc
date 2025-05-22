"use client";

import { ClipboardCheck, Facebook, Heart, Lightbulb, Linkedin, MessageSquare, NotebookPen, Twitter, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ListThreeCol from "@/components/blocks/ListThreeCol";
import { PageHeader } from "@/components/blocks/PageHeader";

/**
 * Data structure for the three-column list component
 * Defines the supported areas for group facilitation services
 */
const listData = {
  title: "Group facilitation can support",
  description: "Section description",
  items: [
    {
      title: "Workplaces & Organizations",
      description: "Organizational development, strengthening team collaboration and decision-making",
      link: "/link1"
    },
    {
      title: "Community Groups",
      description: "Addressing challenges in a structured and inclusive way",
      link: "/link2"
    },
    {
      title: "Difficult Conversations",
      description: "Providing neutral, skilled facilitation for sensitive topics",
      link: "/link2"
    },
    {
      title: "Coalition Building & Planning",
      description: "Supporting community-led efforts with guided dialogue",
      link: "/link3"
    }
  ]
};

/**
 * Facilitation Service Page Component
 * 
 * Implements a scroll spy functionality to track the active section in the viewport
 * and update the table of contents accordingly.
 */
export default function Mediation() {
  // State to track the currently active section in viewport
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Refs to store references to all section elements
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

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
          title="Facilitation"
          description="Holding Space for Meaningful Conversations"
        />

        <div className="relative mt-12 grid max-w-screen-xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              <Image
                src="/images/services/facilitation-v2.jpg"
                alt="placeholder"
                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover object-top"
                width={400}
                height={400}
              />
              <p className="text-sm text-muted-foreground">
                In a kingdom far away, there lived a ruler who faced a peculiar
                challenge. After much contemplation, he devised an unusual
                solution that would change everything.
              </p>
            </div>
            <section
              id="section1"
              ref={(ref) => addSectionRef("section1", ref)}
              className="my-8 prose"
            >
              <h2>At MCRC, we believe that stronger communities are built through open, honest, and structured conversations.</h2>
              <p className="mt-4">
                Our group facilitation services create space for teams, organizations, and communities to work through challenges, strengthen relationships, and develop shared solutions. Whether you need support navigating internal conflicts, planning discussions, or community decision-making, our trained facilitators help guide the conversation with care, neutrality, and respect for all voices.
              </p>

              <Alert className="mt-8">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>We also offer Listening Sessions!</AlertTitle>
                <AlertDescription>
                  Intentional spaces designed for communities, workplaces, and organizations to share perspectives, process difficult topics, and build understanding. These sessions create opportunities for groups to be heard, reflect on concerns, and explore ways forward together.
                </AlertDescription>
              </Alert>
            </section>

            {/* Group Facilitation Services */}
            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose mb-8"
            >
              <ListThreeCol listData={listData} lightBackground />
            </section>

            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose mb-8"
            >
              <p>
                Our facilitators create brave spaces for dialogue, ensuring that conversations are productive, inclusive, and move toward shared understanding.
              </p>

              <div className="mt-4 lg:max-w-lg">
                <h2 className="my-12 text-xl font-semibold md:text-4xl">
                  Our goal is always the same: <span className="text-primary underline">to hold space where people can show up, speak honestly, and move forward—together.</span>
                </h2>

              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                  <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                    <Image
                      src="/images/photos/vertical/community-mediation.jpg"
                      alt="Feature 1"
                      className="aspect-[16/9] h-full w-full object-cover object-center"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                      Who We Work With
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      We support neighborhood groups, nonprofits, schools, families, community colleges, and coalitions who are doing the work of building stronger communities. If your group is facing a big question, a shift in direction, or a time of tension or change, we’re here to help guide the conversation.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              id="section4"
              ref={(ref) => addSectionRef("section4", ref)}
              className="prose mb-8"
            >
              <div>
                <div className="mx-auto mt-12 grid max-w-screen-xl gap-y-6 lg:grid-cols-1">

                  <div className="dark rounded-md border bg-background p-6 text-primary md:p-10 lg:rounded-l-none lg:rounded-r-md">
                    <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
                      How Our Facilitation Services Can Help
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                      We design and lead conversations that help your group move forward with clarity and care.
                      <br /> Here are a few ways facilitation might support you:
                    </p>

                    <div className="mt-10">
                      <div className="flex items-center gap-7 py-6">
                        <ClipboardCheck className="h-auto w-8 shrink-0" />
                        <p>
                          Shaping the goals of a new advisory board
                        </p>
                      </div>
                      <div className="flex items-center gap-7 border-y border-dashed border-primary py-6">
                        <NotebookPen className="h-auto w-8 shrink-0" />
                        <p>
                          Working through a strategic plan or organizational priorities
                        </p>
                      </div>
                      <div className="flex items-center gap-7 border-y border-dashed border-primary py-6">
                        <Heart className="h-auto w-8 shrink-0" />
                        <p>
                          Building trust after a conflict or loss
                        </p>
                      </div>
                      <div className="flex items-center gap-7 border-y border-dashed border-primary py-6">
                        <MessageSquare className="h-auto w-8 shrink-0" />
                        <p>
                          Supporting equity-focused conversations or hard decision-making
                        </p>
                      </div>
                      <div className="flex items-center gap-7 py-6">
                        <Users className="h-auto w-8 shrink-0" />
                        <p>
                          Creating space for everyone to be heard and valued
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
                      Our Beliefs
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
                      Listening Sessions
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
                      Group Facilitation Services
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            ?
            <Separator className="order-2 mt-8 mb-11 lg:hidden" />
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
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
                  >
                    <a href="#">
                      <Twitter className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
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
