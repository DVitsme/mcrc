"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  {
    id: "Feature 1",
    title: "Community Mediation",
    description:
      "We help individuals, families and organizations navigate conflict with respect and understanding, creating space for open dialogue and mutual solutions.",
    href: "#",
    image: "/images/photos/vertical/community-mediation-2.jpg",
  },
  {
    id: "Feature 2",
    title: "Restorative Programs",
    description:
      "Through restorative practices, we bring together those who have caused harm and those who have been harmed to rebuild trust and repair relationships",
    href: "#",
    image: "/images/photos/vertical/restorative-programs.jpg",
  },
  {
    id: "Re-entry Mediation",
    title: "Re-entry Mediation",
    description:
      "We support individuals transitioning back into the community after incarceration by facilitating conversations that ease re-entry, rebuild relationships, and reduce recidivism.",
    href: "#",
    image: "/images/photos/vertical/re-entry-mediation.jpg",
  },
  {
    id: "Group Facilitation",
    title: "Group Facilitation",
    description:
      "We guide groups through meaningful discussions, helping them find common ground, collaborate effectively, and make decisions that work for everyone involved.",
    href: "#",
    image: "/images/photos/vertical/group-facilitation.jpg",
  },
  {
    id: "Training for Organizations",
    title: "Training for Organizations",
    description:
      "We offer conflict resolution and basic mediation training for organizations seeking to enhance their ability to manage conflict, foster understanding, and build healthier, more collaborative work environments.",
    href: "#",
    image: "/images/photos/vertical/training-for-organizations.jpg",
  },
  {
    id: "Community Education",
    title: "Community Education",
    description:
      "We provide accessible workshops, skill-building sessions, and practical tips that empower community members with the tools they need to resolve everyday conflicts and strengthen relationships.",
    href: "#",
    image: "/images/photos/vertical/community-education.jpg",
  },
];

const Services = () => {
  const [selection, setSelection] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    carouselApi.scrollTo(selection);
  }, [carouselApi, selection]);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setSelection(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row-reverse">
          <div className="aspect-[5/6] overflow-clip rounded-3xl bg-accent">
            <Carousel
              setApi={setCarouselApi}
              className="h-full w-full [&>div]:h-full"
            >
              <CarouselContent className="mx-0 h-full w-full">
                {features.map((feature) => (
                  <CarouselItem key={feature.id} className="px-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex shrink-0 flex-col md:w-1/2 md:pr-8 lg:pr-24 lg:text-left 2xl:pr-32">
            <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-5xl">
              Our Services
            </h2>
            <p className="mb-16 text-muted-foreground lg:text-xl">
              Explore our range of services designed to help individuals, families, and communities navigate conflict, build understanding, and foster healing.
            </p>
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <li
                  key={feature.id}
                  className="group relative w-full cursor-pointer px-6 py-3 transition data-[open]:bg-accent"
                  data-open={selection === i ? "true" : undefined}
                  onClick={() => setSelection(i)}
                >
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="text-sm font-semibold text-accent-foreground">
                      {feature.title}
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-data-[open]:bg-primary group-data-[open]:text-primary-foreground">
                      <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[open]:rotate-180" />
                    </div>
                  </div>
                  <div className="hidden text-sm font-medium group-data-[open]:block">
                    <p className="my-4 text-muted-foreground lg:my-6">
                      {feature.description}
                    </p>
                    <a
                      href="#"
                      className="group/link flex items-center pb-3 text-sm text-accent-foreground"
                    >
                      Learn more{" "}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services };
