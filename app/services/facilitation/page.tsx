"use client";

import { Facebook, Lightbulb, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ListThreeCol from "@/components/blocks/ListThreeCol";
import { PageHeader } from "@/components/blocks/PageHeader";


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

export default function Mediation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

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
            </section>
          </div>
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
