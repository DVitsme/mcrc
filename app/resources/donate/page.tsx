import { Trees, Heart, Gift, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const donationOptions = [
  {
    title: "One-Time Donation",
    description: "Make a single contribution to support our mission.",
    icon: <Heart className="size-5 shrink-0" />,
    amount: "Any amount",
  },
  {
    title: "Monthly Giving",
    description: "Become a sustaining member with monthly contributions.",
    icon: <Trees className="size-5 shrink-0" />,
    amount: "Starting at $25/month",
  },
  {
    title: "Corporate Matching",
    description: "Double your impact through your employer's matching program.",
    icon: <Gift className="size-5 shrink-0" />,
    amount: "Varies by employer",
  },
  {
    title: "Planned Giving",
    description: "Include MCRC in your long-term financial planning.",
    icon: <CreditCard className="size-5 shrink-0" />,
    amount: "Customizable",
  },
]

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Support Our Mission</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your generous contributions help us continue providing essential services to the Howard County community.
          Every donation makes a difference in someone&apos;s life.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {donationOptions.map((option) => (
            <Card key={option.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {option.icon}
                  <CardTitle>{option.title}</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{option.amount}</span>
                  <Button variant="outline" size="sm">
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Impact</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Support community mediation services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Help provide training and education programs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Enable restorative justice initiatives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Fund youth and school programs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Maintain and expand our services</span>
            </li>
          </ul>
          <Button asChild>
            <a href="/resources/forms">Download Donation Form</a>
          </Button>
        </div>
      </div>
    </div>
  )
} 