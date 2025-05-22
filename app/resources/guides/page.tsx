import { Book, FileText, Users, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const guides = [
  {
    title: "Mediation Process Guide",
    description: "Learn about our mediation process and what to expect.",
    steps: [
      "Initial consultation",
      "Conflict assessment",
      "Mediation session",
      "Agreement and follow-up",
    ],
    icon: <MessageSquare className="size-5 shrink-0" />,
    category: "Mediation",
  },
  {
    title: "Volunteer Onboarding",
    description: "Everything you need to know about becoming a volunteer.",
    steps: [
      "Application submission",
      "Interview process",
      "Training requirements",
      "Orientation and placement",
    ],
    icon: <Users className="size-5 shrink-0" />,
    category: "Volunteer",
  },
  {
    title: "Restorative Justice Process",
    description: "Understanding our restorative justice approach.",
    steps: [
      "Initial assessment",
      "Pre-conference preparation",
      "Restorative conference",
      "Follow-up and support",
    ],
    icon: <Book className="size-5 shrink-0" />,
    category: "Restorative Justice",
  },
  {
    title: "Documentation Guide",
    description: "How to prepare and submit required documentation.",
    steps: [
      "Required forms",
      "Supporting documents",
      "Submission process",
      "Confidentiality guidelines",
    ],
    icon: <FileText className="size-5 shrink-0" />,
    category: "Documentation",
  },
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Process Guides</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Step-by-step guides to help you navigate our services and processes.
          These resources are designed to make your experience with MCRC as smooth as possible.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {guide.icon}
                  <CardTitle>{guide.title}</CardTitle>
                </div>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold">Process Steps:</h3>
                  <ol className="space-y-2">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 font-medium text-primary">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{guide.category}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/resources/guides/${guide.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Read Guide
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Need Additional Help?</h2>
          <p className="mb-4 text-muted-foreground">
            If you need clarification on any of our processes or have specific questions,
            our team is here to help. Don&apos;t hesitate to reach out.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 