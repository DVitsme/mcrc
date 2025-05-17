import { Shield, FileText, Lock, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const dataPolicies = [
  {
    title: "Privacy Policy",
    description: "Learn how we collect, use, and protect your personal information.",
    icon: <Shield className="size-5 shrink-0" />,
    url: "/your-data/privacy-policy",
  },
  {
    title: "Terms of Service",
    description: "Understand the terms and conditions for using our services.",
    icon: <FileText className="size-5 shrink-0" />,
    url: "/your-data/terms-of-service",
  },
  {
    title: "Data Protection",
    description: "How we ensure the security and confidentiality of your data.",
    icon: <Lock className="size-5 shrink-0" />,
    url: "/your-data/data-protection",
  },
  {
    title: "Cookie Policy",
    description: "Information about how we use cookies and similar technologies.",
    icon: <Eye className="size-5 shrink-0" />,
    url: "/your-data/cookie-policy",
  },
]

export default function YourDataPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Your Data & Privacy</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          At MCRC, we take your privacy and data protection seriously. This section provides
          comprehensive information about how we handle your personal information and your rights.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {dataPolicies.map((policy) => (
            <Card key={policy.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {policy.icon}
                  <CardTitle>{policy.title}</CardTitle>
                </div>
                <CardDescription>{policy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={policy.url}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Access your personal data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Request corrections to your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Request deletion of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Object to data processing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Data portability</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/contact">Contact Our Data Protection Officer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 