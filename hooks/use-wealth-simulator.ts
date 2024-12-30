"use client"

import { useState, useMemo } from 'react'

interface SimulationParams {
  homeValue: number
  mortgageBalance: number
  investmentLoan: number
  homeAppreciationRate: number
  mortgageRate: number
  investmentReturnRate: number
  taxRate: number
  monthlyContribution: number
}

interface YearlyData {
  year: number
  homeValue: number
  mortgageBalance: number
  investmentLoan: number
  netWorth: number
  contributions: number
  taxRefunds: number
  investmentValue: number
  homeEquity: number
  mortgagePayment: number
  investmentLoanPayment: number
  totalTaxDeductions: number
}

const DEFAULT_PARAMS: SimulationParams = {
  homeValue: 500000,
  mortgageBalance: 212230,
  investmentLoan: 287770, // Matches down payment
  homeAppreciationRate: 3,
  mortgageRate: 5,
  investmentReturnRate: 10,
  taxRate: 35,
  monthlyContribution: 2500,
}

function calculateMortgagePayment(principal: number, annualRate: number, years: number = 25): number {
  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
}

export function useWealthSimulator(initialParams = DEFAULT_PARAMS) {
  const [params, setParams] = useState<SimulationParams>(initialParams)

  const simulationData = useMemo(() => {
    const years: YearlyData[] = []
    let currentYear = new Date().getFullYear()
    
    // Calculate monthly payments
    const monthlyMortgagePayment = calculateMortgagePayment(params.mortgageBalance, params.mortgageRate)
    const monthlyInvestmentLoanInterest = (params.investmentLoan * params.mortgageRate / 100) / 12
    
    // Initial year
    const yearlyContribution = params.monthlyContribution * 12
    const initialInvestmentValue = params.investmentLoan
    const initialHomeEquity = params.homeValue - params.mortgageBalance
    const yearlyMortgagePayment = monthlyMortgagePayment * 12
    const yearlyInvestmentLoanPayment = monthlyInvestmentLoanInterest * 12
    const totalInterestPaid = yearlyInvestmentLoanPayment
    const taxRefund = totalInterestPaid * (params.taxRate / 100)

    years.push({
      year: currentYear,
      homeValue: params.homeValue,
      mortgageBalance: params.mortgageBalance,
      investmentLoan: params.investmentLoan,
      investmentValue: initialInvestmentValue,
      homeEquity: initialHomeEquity,
      netWorth: initialHomeEquity + initialInvestmentValue - params.investmentLoan,
      contributions: yearlyContribution,
      taxRefunds: taxRefund,
      mortgagePayment: yearlyMortgagePayment,
      investmentLoanPayment: yearlyInvestmentLoanPayment,
      totalTaxDeductions: totalInterestPaid
    })

    // Project for next 5 years
    for (let i = 1; i <= 5; i++) {
      const prevYear = years[i - 1]
      
      // Calculate new values
      const homeValue = prevYear.homeValue * (1 + params.homeAppreciationRate / 100)
      
      // Calculate mortgage balance reduction (principal portion of payment)
      const yearlyInterest = prevYear.mortgageBalance * (params.mortgageRate / 100)
      const principalPayment = yearlyMortgagePayment - yearlyInterest
      const mortgageBalance = Math.max(0, prevYear.mortgageBalance - principalPayment)
      
      // Investment loan stays constant (interest-only payments)
      const investmentLoan = prevYear.investmentLoan
      
      // Calculate investment growth
      const investmentReturns = prevYear.investmentValue * (params.investmentReturnRate / 100)
      const investmentValue = prevYear.investmentValue + yearlyContribution + 
                            prevYear.taxRefunds + investmentReturns
      
      const homeEquity = homeValue - mortgageBalance
      const totalInterestPaid = yearlyInvestmentLoanPayment
      const taxRefunds = totalInterestPaid * (params.taxRate / 100)
      
      years.push({
        year: currentYear + i,
        homeValue,
        mortgageBalance,
        investmentLoan,
        investmentValue,
        homeEquity,
        netWorth: homeEquity + investmentValue - investmentLoan,
        contributions: yearlyContribution,
        taxRefunds,
        mortgagePayment: yearlyMortgagePayment,
        investmentLoanPayment: yearlyInvestmentLoanPayment,
        totalTaxDeductions: totalInterestPaid
      })
    }

    return years
  }, [params])

  const updateParam = (key: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return {
    params,
    updateParam,
    simulationData
  }
} 