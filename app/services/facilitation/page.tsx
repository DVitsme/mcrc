import { Trees, Users, MessageSquare, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const facilitationTypes = [
  {
    title: "Group Facilitation",
    description: "Expert facilitation for group discussions, meetings, and collaborative processes.",
    icon: <Users className="size-5 shrink-0" />,
  },
  {
    title: "Community Dialogues",
    description: "Facilitated conversations that bring community members together to address important issues.",
    icon: <MessageSquare className="size-5 shrink-0" />,
  },
  {
    title: "Strategic Planning",
    description: "Guided processes to help organizations and groups develop and implement strategic plans.",
    icon: <Lightbulb className="size-5 shrink-0" />,
  },
  {
    title: "Conflict Resolution",
    description: "Facilitated processes to address and resolve conflicts within groups and organizations.",
    icon: <Trees className="size-5 shrink-0" />,
  },
]

export default function FacilitationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Facilitation Services</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Our facilitation services help groups have meaningful conversations, make decisions, and work together effectively.
          We create safe spaces for dialogue and collaboration, ensuring all voices are heard.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {facilitationTypes.map((type) => (
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
          <h2 className="mb-4 text-2xl font-semibold">Our Facilitation Approach</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Neutral and impartial facilitation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Inclusive and participatory processes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Clear communication and active listening</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Structured yet flexible approach</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Focus on achieving concrete outcomes</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/contact">Request Facilitation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 