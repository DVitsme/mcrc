import { Sunset, Users, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const restorativePractices = [
  {
    title: "Restorative Reflections",
    description: "Guided reflection processes that help individuals understand the impact of their actions and make amends.",
    icon: <Heart className="size-5 shrink-0" />,
  },
  {
    title: "Restorative Dialogues",
    description: "Facilitated conversations between harmed and responsible parties to address harm and repair relationships.",
    icon: <MessageCircle className="size-5 shrink-0" />,
  },
  {
    title: "Restorative Circles",
    description: "Community-based processes that bring together affected parties to address harm and build understanding.",
    icon: <Users className="size-5 shrink-0" />,
  },
  {
    title: "Community Healing",
    description: "Processes designed to address community-wide harm and promote collective healing and restoration.",
    icon: <Sunset className="size-5 shrink-0" />,
  },
]

export default function RestorativeJusticePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Restorative Justice Services</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Our restorative justice services focus on healing harm, repairing relationships, and building stronger communities.
          We use various restorative practices to address conflict and promote understanding.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {restorativePractices.map((practice) => (
            <Card key={practice.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {practice.icon}
                  <CardTitle>{practice.title}</CardTitle>
                </div>
                <CardDescription>{practice.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Principles of Restorative Justice</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Focus on repairing harm rather than punishment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Involve all affected parties in the process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Address needs and obligations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Promote healing and reconciliation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Build stronger, more connected communities</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/contact">Request Restorative Process</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 