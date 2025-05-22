/**
 * Dashboard Page Component
 * 
 * This is the main dashboard page that displays the overview of the application.
 * It contains the main content components for the dashboard view.
 */

import { ChartAreaInteractive } from "@/components/dashboard-components/chart-area-interactive"
import { DataTable } from "@/components/dashboard-components/data-table"
import { SectionCards } from "@/components/dashboard-components/section-cards"

// Import dashboard data
import data from "./data.json"

export default function Page() {
  return (
    <>
      {/* Overview cards showing key metrics */}
      <SectionCards />

      {/* Interactive chart area with horizontal padding */}
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      {/* Data table showing detailed information */}
      <DataTable data={data} />
    </>
  )
}
