"use client"

import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { SimulationProvider } from "@/components/dashboard/simulation-context"

export default function DashboardPage() {
  return (
    <SimulationProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Wealth Building Dashboard: A Comprehensive Simulation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Track and optimize your wealth-building strategy incorporating the Smith Maneuver. 
                This simulation provides detailed insights into financial growth over time, allowing you to 
                adjust parameters and visualize outcomes through interactive charts and tables.
              </p>
            </div>

            {/* Main Dashboard Content */}
            <DashboardContent />
          </div>
        </div>
      </div>
    </SimulationProvider>
  )
}
