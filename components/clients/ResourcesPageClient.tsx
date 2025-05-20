"use client";

import { Zap, Sunset, Trees, Book } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const resources = [
  {
    title: "Forms and Files",
    description: "All the things you need to fill out before you get started.",
    icon: <Zap className="size-5 shrink-0" />,
    url: "/resources/forms",
  },
  {
    title: "Volunteer",
    description: "We are always looking for talented people. Join our team!",
    icon: <Sunset className="size-5 shrink-0" />,
    url: "/resources/volunteer",
  },
  {
    title: "Donate",
    description: "Join our Giving Circle and help us service Howard County :)",
    icon: <Trees className="size-5 shrink-0" />,
    url: "/resources/donate",
  },
  {
    title: "Guides",
    description: "Step by step guides to help you through the process.",
    icon: <Book className="size-5 shrink-0" />,
    url: "/resources/guides",
  },
]

export function ResourcesPageClient() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Resources</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Access our collection of resources designed to support your journey with MCRC.
          From forms to guides, we have got everything you need to get started.
        </p>
      </div>

      <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {resources.map((resource) => (
          <Link key={resource.title} href={resource.url}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {resource.icon}
                  <CardTitle>{resource.title}</CardTitle>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to access our {resource.title.toLowerCase()} resources.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 