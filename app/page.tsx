"use client"

import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Wealth Building Simulator</h1>
      <DashboardContent />
    </div>
  )
}
