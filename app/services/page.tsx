import { Book, Trees, Sunset, Zap } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Mediation",
    description: "Community, re-entry, family, Schools (Attendance, IEP)",
    icon: <Book className="size-5 shrink-0" />,
    url: "/services/mediation",
  },
  {
    title: "Facilitation",
    description: "Group Facilitation - Holding Space for Meaningful Conversations",
    icon: <Trees className="size-5 shrink-0" />,
    url: "/services/facilitation",
  },
  {
    title: "Restorative Justice",
    description: "Restorative Reflections, Restorative Dialogues, Circles",
    icon: <Sunset className="size-5 shrink-0" />,
    url: "/services/restorative-justice",
  },
  {
    title: "Training & Education",
    description: "Helpful guides and tips that empower you!",
    icon: <Zap className="size-5 shrink-0" />,
    url: "/services/training",
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          We offer a range of services to help resolve conflicts and build stronger communities.
          Each service is designed to meet specific needs and situations.
        </p>
      </div>

      <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <Link key={service.title} href={service.url}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {service.icon}
                  <CardTitle>{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn more about our {service.title.toLowerCase()} services and how they can help you.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 