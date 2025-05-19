import React from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link"

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/blocks/PageHeader";
import Image from "next/image";

const services = [
  {
    title: "Mediation",
    description: "Community, re-entry, family, Schools (Attendance, IEP)",
    url: "/services/mediation",
    image: "/images/services/mediation.jpg",
  },
  {
    title: "Facilitation",
    description: "Group Facilitation - Holding Space for Meaningful Conversations",
    url: "/services/facilitation",
    image: "/images/services/facilitation.jpg",
  },
  {
    title: "Restorative Justice",
    description: "Restorative Reflections, Restorative Dialogues, Circles",
    url: "/services/restorative-justice",
    image: "/images/services/restorative-justice.jpg",
  },
  {
    title: "Training & Education",
    description: "Helpful guides and tips that empower you!",
    url: "/services/training",
    image: "/images/services/training.jpg",
  },
]

export default function ServicesPage() {
  return (
    <section className="py-16">
      <div className="center-container">
        <PageHeader
          title="Our Services"
          description="We offer a range of services to help resolve conflicts and build stronger communities. Each service is designed to meet specific needs and situations."
        />

        <div className="flex flex-col">
          {services.map((service, index) => (
            <Link href={service.url} key={index}>
              <div
                className="flex flex-col mb-8 items-center gap-16 md:flex-row"
              >
                <div className="flex h-[300px] w-[320px] items-center justify-center overflow-hidden rounded-3xl bg-muted">
                  <Image
                    src={service.image}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 "
                    alt={service.title}
                    width={320}
                    height={300}
                  />
                </div>
                <Card className="border-none shadow-none w-full">
                  <CardContent className="p-0">
                    <div
                      className={cn(
                        "mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32",
                        index == 0 && "md:border-t",
                      )}
                    >
                      <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                          {service.title}
                        </h2>
                        <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                          {service.title}
                        </p>
                      </div>
                      <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                        <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                          {service.description}
                        </p>
                        <Button
                          variant="ghost"
                          className="inline-flex items-center justify-center gap-4 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground"
                        >
                          <span
                            className="text-lg font-semibold tracking-tight"
                          >
                            Learn More
                          </span>
                          <ArrowRightIcon />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}



