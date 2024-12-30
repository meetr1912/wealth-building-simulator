"use client"

import { createContext, useContext, useState, useEffect } from 'react'

interface YearData {
  year: number
  homeEquity: number
  homeValue: number
  mortgageBalance: number
  investmentValue: number
  investmentReturns: number
  totalInvestments: number
  investmentLoan: number
  netWorth: number
  mortgagePayment: number
  investmentLoanPayment: number
  taxRefunds: number
  totalTaxDeductions: number
  contributions: {
    rrsp: number
    fhsa: number
    taxRefunds: number
  }
}

interface SimulationParams {
  rrspContribution: number
  fhsaContribution: number
  taxRate: number
  investmentReturnRate: number
  homeValue: number
  mortgageBalance: number
  mortgageRate: number
  mortgageTerm: number
  homeAppreciationRate: number
  investmentLoanRate: number
  maxLoanToEquityRatio: number
  monthlyContribution: number
  investmentLoan: number
}

const defaultParams: SimulationParams = {
  rrspContribution: 27000,
  fhsaContribution: 16000,
  taxRate: 35,
  investmentReturnRate: 10,
  homeValue: 500000,
  mortgageBalance: 212230,
  mortgageRate: 5,
  mortgageTerm: 25,
  homeAppreciationRate: 3,
  investmentLoanRate: 5,
  maxLoanToEquityRatio: 80,
  monthlyContribution: 3583,
  investmentLoan: 287770
}

const SimulationContext = createContext<{
  params: SimulationParams
  updateParam: (key: keyof SimulationParams, value: number) => void
  simulationData: YearData[]
}>({
  params: defaultParams,
  updateParam: () => {},
  simulationData: []
})

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<SimulationParams>(defaultParams)
  const [simulationData, setSimulationData] = useState<YearData[]>([])

  const calculateMonthlyMortgage = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / (12 * 100)
    const numPayments = years * 12
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1)
  }

  const calculateSimulation = () => {
    const data: YearData[] = []
    let currentYear = new Date().getFullYear()
    
    // Phase 1: Accumulation (Years 1-5)
    let investmentValue = 0
    let totalInvestments = 0
    let totalReturns = 0

    for (let year = 1; year <= 5; year++) {
      const yearlyContribution = params.monthlyContribution * 12
      const rrspRefund = params.rrspContribution * (params.taxRate / 100)
      
      totalInvestments += yearlyContribution + rrspRefund
      const yearReturn = (investmentValue + yearlyContribution + rrspRefund) * (params.investmentReturnRate / 100)
      totalReturns += yearReturn
      investmentValue += yearlyContribution + rrspRefund + yearReturn

      data.push({
        year: currentYear + year - 1,
        homeEquity: 0,
        homeValue: 0,
        mortgageBalance: 0,
        investmentValue,
        investmentReturns: totalReturns,
        totalInvestments,
        investmentLoan: 0,
        netWorth: investmentValue,
        mortgagePayment: 0,
        investmentLoanPayment: 0,
        taxRefunds: rrspRefund,
        totalTaxDeductions: rrspRefund,
        contributions: {
          rrsp: params.rrspContribution,
          fhsa: params.fhsaContribution,
          taxRefunds: rrspRefund
        }
      })
    }

    // Phase 2: Home Purchase and Smith Maneuver (Years 6-30)
    let homeValue = params.homeValue
    let mortgageBalance = params.mortgageBalance
    let investmentLoan = params.investmentLoan
    const monthlyMortgage = calculateMonthlyMortgage(mortgageBalance, params.mortgageRate, params.mortgageTerm)
    
    for (let year = 6; year <= 30; year++) {
      // Update home value
      homeValue *= (1 + params.homeAppreciationRate / 100)
      
      // Update mortgage
      const yearlyMortgagePayment = monthlyMortgage * 12
      const mortgageInterest = mortgageBalance * (params.mortgageRate / 100)
      const principalPayment = yearlyMortgagePayment - mortgageInterest
      mortgageBalance -= principalPayment
      
      // Calculate investment loan interest and tax savings
      const loanInterest = investmentLoan * (params.investmentLoanRate / 100)
      const taxSavings = loanInterest * (params.taxRate / 100)
      
      // Update investments
      const yearReturn = investmentValue * (params.investmentReturnRate / 100)
      investmentValue += yearReturn + taxSavings
      totalReturns += yearReturn
      
      const homeEquity = homeValue - mortgageBalance
      
      data.push({
        year: currentYear + year - 1,
        homeEquity,
        homeValue,
        mortgageBalance,
        investmentValue,
        investmentReturns: yearReturn,
        totalInvestments,
        investmentLoan,
        netWorth: homeEquity + investmentValue - investmentLoan,
        mortgagePayment: yearlyMortgagePayment,
        investmentLoanPayment: loanInterest,
        taxRefunds: taxSavings,
        totalTaxDeductions: loanInterest,
        contributions: {
          rrsp: 0,
          fhsa: 0,
          taxRefunds: taxSavings
        }
      })
    }

    setSimulationData(data)
  }

  const updateParam = (key: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  // Run simulation when component mounts and when params change
  useEffect(() => {
    calculateSimulation()
  }, [])

  useEffect(() => {
    calculateSimulation()
  }, [params])

  return (
    <SimulationContext.Provider value={{
      params,
      updateParam,
      simulationData
    }}>
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