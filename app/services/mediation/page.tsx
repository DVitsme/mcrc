import { Book, Users, School, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const mediationTypes = [
  {
    title: "Community Mediation",
    description: "Resolve neighborhood disputes, community conflicts, and other local issues through facilitated dialogue.",
    icon: <Users className="size-5 shrink-0" />,
  },
  {
    title: "Re-entry Mediation",
    description: "Support successful reintegration into the community after incarceration through structured mediation.",
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: "Family Mediation",
    description: "Address family conflicts, parenting plans, and other family-related issues in a safe, neutral environment.",
    icon: <Home className="size-5 shrink-0" />,
  },
  {
    title: "School Mediation",
    description: "Resolve attendance issues, IEP disputes, and other school-related conflicts through mediation.",
    icon: <School className="size-5 shrink-0" />,
  },
]

export default function MediationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Mediation Services</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Our mediation services provide a structured, confidential process where a neutral third party helps disputing parties
          reach a mutually acceptable resolution. We offer various types of mediation to meet different needs.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {mediationTypes.map((type) => (
            <Card key={type.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {type.icon}
                  <CardTitle>{type.title}</CardTitle>
                </div>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Why Choose Our Mediation Services?</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Confidential and private process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Neutral, trained mediators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Voluntary participation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Cost-effective alternative to litigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Focus on mutual understanding and agreement</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/contact">Request Mediation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 