/**
 * Training Service Page Component
 * 
 * This is a server component that displays information about the training and education programs
 * offered by the Mediation and Conflict Resolution Center. It includes:
 * - A header section with service description
 * - A grid of training program cards
 * - A benefits section with a call-to-action button
 */

import { Zap, Book, Users, Award } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Data structure defining the available training programs
 * Each program includes:
 * - Title
 * - Description
 * - Icon component
 */
const trainingPrograms = [
  {
    title: "Mediation Training",
    description: "Comprehensive training programs for aspiring mediators, covering theory, skills, and practical experience.",
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: "Facilitation Skills",
    description: "Learn essential skills for effective group facilitation and conflict resolution.",
    icon: <Users className="size-5 shrink-0" />,
  },
  {
    title: "Restorative Practices",
    description: "Training in restorative justice principles and practices for community members and professionals.",
    icon: <Award className="size-5 shrink-0" />,
  },
  {
    title: "Conflict Resolution",
    description: "Practical workshops on managing and resolving conflicts in various settings.",
    icon: <Zap className="size-5 shrink-0" />,
  },
]

/**
 * Training Service Page Component
 * 
 * Renders a page showcasing the center's training and education programs,
 * including program cards and benefits section.
 */
export default function TrainingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header Section */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Training & Education</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Our training and education programs empower individuals and organizations with the skills and knowledge
          needed to effectively manage conflict and build stronger communities.
        </p>

        {/* Training Programs Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {trainingPrograms.map((program) => (
            <Card key={program.title}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {program.icon}
                  <CardTitle>{program.title}</CardTitle>
                </div>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-semibold">Training Benefits</h2>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Expert-led instruction and guidance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Hands-on practice and role-playing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Certification opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Ongoing support and resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Customized training for organizations</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/contact">Request Training Information</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 