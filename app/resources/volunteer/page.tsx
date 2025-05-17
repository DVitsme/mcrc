import { Sunset, Users, Heart, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const volunteerRoles = [
  {
    title: "Mediator",
    description: "Help facilitate conversations and resolve conflicts in our community.",
    requirements: [
      "Complete our mediation training program",
      "Commit to at least 2 cases per month",
      "Strong communication skills",
    ],
    icon: <Users className="size-5 shrink-0" />,
  },
  {
    title: "Facilitator",
    description: "Lead group discussions and community dialogues.",
    requirements: [
      "Experience in group facilitation",
      "Excellent listening skills",
      "Cultural sensitivity",
    ],
    icon: <Heart className="size-5 shrink-0" />,
  },
  {
    title: "Community Outreach",
    description: "Help spread awareness about our services in the community.",
    requirements: [
      "Strong interpersonal skills",
      "Knowledge of local community",
      "Public speaking ability",
    ],
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Administrative Support",
    description: "Assist with office tasks and program coordination.",
    requirements: [
      "Organizational skills",
      "Basic computer proficiency",
      "Attention to detail",
    ],
    icon: <Award className="size-5 shrink-0" />,
  },
]

export default function VolunteerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Volunteer With Us</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Join our team of dedicated volunteers and make a difference in our community.
          We offer various opportunities to contribute your skills and time.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {volunteerRoles.map((role) => (
            <Card key={role.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {role.icon}
                  <CardTitle>{role.title}</CardTitle>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-sm font-semibold">Requirements:</h3>
                <ul className="space-y-1">
                  {role.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 text-primary">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Benefits of Volunteering</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Make a positive impact in your community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Develop new skills and gain experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Join a supportive and dedicated team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Receive training and professional development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Build meaningful connections</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/resources/forms">Apply to Volunteer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 