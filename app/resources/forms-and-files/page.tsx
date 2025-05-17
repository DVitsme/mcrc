import { FileText, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const forms = [
  {
    title: "Mediation Request Form",
    description: "Complete this form to request mediation services for your situation.",
    category: "Mediation",
    icon: <FileText className="size-5 shrink-0" />,
    downloadUrl: "#",
  },
  {
    title: "Volunteer Application",
    description: "Interested in volunteering? Fill out this application form.",
    category: "Volunteer",
    icon: <FileText className="size-5 shrink-0" />,
    downloadUrl: "#",
  },
  {
    title: "Donation Form",
    description: "Support our mission by making a donation.",
    category: "Donation",
    icon: <FileText className="size-5 shrink-0" />,
    downloadUrl: "#",
  },
  {
    title: "Conflict Assessment",
    description: "Help us understand your situation better with this assessment form.",
    category: "Assessment",
    icon: <FileText className="size-5 shrink-0" />,
    downloadUrl: "#",
  },
]

export default function FormsAndFilesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Forms and Files</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Access all the forms and documents you need to get started with our services.
          Download, fill out, and submit these forms to begin your journey with MCRC.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {forms.map((form) => (
            <Card key={form.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {form.icon}
                  <CardTitle>{form.title}</CardTitle>
                </div>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{form.category}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={form.downloadUrl} className="flex items-center gap-2">
                      <Download className="size-4" />
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Need Help?</h2>
          <p className="mb-4 text-muted-foreground">
            If you need assistance filling out any of these forms or have questions about our services,
            please do not hesitate to contact us.
          </p>
          <Button asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </div>
  )
} 