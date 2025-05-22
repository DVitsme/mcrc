/**
 * Dashboard Layout Component
 * 
 * This layout component provides the consistent structure for all dashboard pages,
 * including the sidebar, header, and main content area. It manages the sidebar state
 * and responsive layout behavior.
 */

import { AppSidebar } from "@/components/dashboard-components/app-sidebar"
import { SiteHeader } from "@/components/dashboard-components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          // Define custom CSS variables for sidebar and header dimensions
          "--sidebar-width": "calc(var(--spacing) * 72)", // 18rem (72 * 0.25rem)
          "--header-height": "calc(var(--spacing) * 12)", // 3rem (12 * 0.25rem)
        } as React.CSSProperties
      }
    >
      {/* Main sidebar navigation component */}
      <AppSidebar variant="inset" />

      {/* SidebarInset wraps the main content area */}
      <SidebarInset>
        {/* Site header with user info and navigation */}
        <SiteHeader />

        {/* Main content container */}
        <div className="flex flex-1 flex-col">
          {/* Container query wrapper for responsive layout */}
          <div className="@container/main flex flex-1 flex-col gap-2">
            {/* Content sections with responsive padding and spacing */}
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 