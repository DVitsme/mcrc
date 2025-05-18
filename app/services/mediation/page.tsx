"use client";

import { Facebook, Lightbulb, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumbs from "@/components/blocks/DynamicBreadcrumbs";
import Image from "next/image";

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
    <section className="py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <DynamicBreadcrumbs />
        <h1 className="mt-9 mb-4 max-w-3xl text-4xl font-bold md:mb-6 md:text-7xl capitalize">
          Mediation
        </h1>
        <p className="mb-4 max-w-xl text-lg">
          Conflict is part of life—it shapes our relationships, our communities, and our growth. At the Mediation and Conflict Resolution Center, we believe that conflict, when approached with care and intention, can be a pathway to healing, understanding, and transformation.
        </p>
        <p className="mb-6 max-w-xl text-lg">
          Trained, neutral mediators guide the conversation—not to take sides or make decisions for you, but to help you:
        </p>
        <ul className="mb-8 ml-6 max-w-xl list-disc text-lg">
          <li>
            Share your perspective
          </li>
          <li>
            Clarify what matters most to you
          </li>
          <li>
            Understand the other person&apos;s point of view
          </li>
          <li>
            Explore possible ways forward—together
          </li>

        </ul>
        <div className="relative mt-12 grid max-w-screen-xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              <Image
                src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                alt="placeholder"
                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover"
                width={1000}
                height={1000}
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
              <h2>How Taxes Work and Why They Matter</h2>
              <p>
                The king thought long and hard, and finally came up with{" "}
                <a href="#">a brilliant plan</a>: he would tax the jokes in the
                kingdom.
              </p>
              <blockquote>
                &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
                joke, so it&apos;s only fair that they should pay for the
                privilege.&rdquo;
              </blockquote>
              <p>
                The king&apos;s subjects were not amused. They grumbled and
                complained, but the king was firm
              </p>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Royal Decree!</AlertTitle>
                <AlertDescription>
                  Remember, all jokes must be registered at the Royal Jest
                  Office before telling them
                </AlertDescription>
              </Alert>
            </section>

            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose mb-8"
            >
              <h2>The Great People&apos;s Rebellion</h2>
              <p>
                The people of the kingdom, feeling uplifted by the laughter,
                started to tell jokes and puns again, and soon the entire
                kingdom was in on the joke.
              </p>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>King&apos;s Treasury</th>
                      <th>People&apos;s happiness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Empty</td>
                      <td>Overflowing</td>
                    </tr>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                      <td>Modest</td>
                      <td>Satisfied</td>
                    </tr>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                      <td>Full</td>
                      <td>Ecstatic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax. Jokester was
                declared a hero, and the kingdom lived happily ever after.
              </p>
            </section>

            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose mb-8"
            >
              <h2>The King&apos;s Plan</h2>
              <p>
                The king thought long and hard, and finally came up with{" "}
                <a href="#">a brilliant plan</a>: he would tax the jokes in the
                kingdom.
              </p>
              <blockquote>
                &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
                joke, so it&apos;s only fair that they should pay for the
                privilege.&rdquo;
              </blockquote>
              <p>
                The king&apos;s subjects were not amused. They grumbled and
                complained, but the king was firm:
              </p>
              <ul>
                <li>1st level of puns: 5 gold coins</li>
                <li>2nd level of jokes: 10 gold coins</li>
                <li>3rd level of one-liners : 20 gold coins</li>
              </ul>
              <p>
                As a result, people stopped telling jokes, and the kingdom fell
                into a gloom. But there was one person who refused to let the
                king&apos;s foolishness get him down: a court jester named
                Jokester.
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
                      The Great People&apos;s Rebellion
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
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="font-medium text-muted-foreground">
                Share this article:
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
