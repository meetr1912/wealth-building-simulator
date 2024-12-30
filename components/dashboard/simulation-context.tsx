"use client"

import { createContext, useContext } from 'react'
import { useWealthSimulator } from '@/hooks/use-wealth-simulator'

const SimulationContext = createContext<ReturnType<typeof useWealthSimulator> | null>(null)

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const simulation = useWealthSimulator()

  return (
    <SimulationContext.Provider value={simulation}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  const context = useContext(SimulationContext)
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider')
  }
  return context
} 