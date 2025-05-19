import { cn } from "@/lib/utils"
import DynamicBreadcrumbs from "./DynamicBreadcrumbs"

interface PageHeaderProps {
  title: string
  description: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-16", className)}>
      <div className="mb-8">
        <DynamicBreadcrumbs />
      </div>
      <h1 className="mb-4 text-7xl font-bold tracking-tight">{title}</h1>
      <p className="w-3/4 text-lg text-muted-foreground">{description}</p>
    </div>
  )
} 