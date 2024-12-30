"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Home, LineChart, Wallet, PiggyBank, Building, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { DashboardCharts } from "@/components/dashboard/charts"
import { DashboardInputs } from "@/components/dashboard/inputs"
import { useSimulation } from "./simulation-context"

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

function formatPercentage(value: number) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function DashboardContent() {
  const { simulationData, params } = useSimulation()
  const currentYear = simulationData[0]
  const nextYear = simulationData[1]
  const finalYear = simulationData[simulationData.length - 1]

  const homeValueChange = ((nextYear.homeValue - currentYear.homeValue) / currentYear.homeValue) * 100
  const mortgageChange = ((nextYear.mortgageBalance - currentYear.mortgageBalance) / currentYear.mortgageBalance) * 100
  const investmentChange = ((nextYear.investmentValue - currentYear.investmentValue) / currentYear.investmentValue) * 100
  const netWorthChange = ((nextYear.netWorth - currentYear.netWorth) / currentYear.netWorth) * 100

  const totalGrowth = ((finalYear.netWorth - currentYear.netWorth) / currentYear.netWorth) * 100
  const monthlyMortgagePayment = currentYear.mortgagePayment / 12
  const monthlyInvestmentInterest = currentYear.investmentLoanPayment / 12
  const monthlyTaxSavings = currentYear.taxRefunds / 12

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accumulation">Accumulation Phase</TabsTrigger>
          <TabsTrigger value="purchase">Home Purchase</TabsTrigger>
          <TabsTrigger value="smith">Smith Maneuver</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Home Value</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(currentYear.homeValue)}</div>
                <div className="flex items-center space-x-2">
                  <p className={`text-xs ${homeValueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(homeValueChange)}
                  </p>
                  {homeValueChange >= 0 ? 
                    <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Home Equity</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(currentYear.homeEquity)}</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">
                    {formatPercentage((currentYear.homeEquity / currentYear.homeValue) * 100)} of home value
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investment Value</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(currentYear.investmentValue)}</div>
                <div className="flex items-center space-x-2">
                  <p className={`text-xs ${investmentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(investmentChange)}
                  </p>
                  {investmentChange >= 0 ? 
                    <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(currentYear.netWorth)}</div>
                <div className="flex items-center space-x-2">
                  <p className={`text-xs ${netWorthChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(netWorthChange)}
                  </p>
                  {netWorthChange >= 0 ? 
                    <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <DashboardCharts />
        </TabsContent>

        <TabsContent value="accumulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accumulation Phase Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Monthly Investment Plan</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Monthly Contribution: {formatCurrency(params.monthlyContribution)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected Return: {formatPercentage(params.investmentReturnRate)} annually
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5-Year Investment Value: {formatCurrency(finalYear.investmentValue)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tax Optimization</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Tax Rate: {formatPercentage(params.taxRate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Tax Savings: {formatCurrency(monthlyTaxSavings)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Growth: {formatPercentage(totalGrowth)} over 5 years
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Home Purchase Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold mb-2">Property Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Purchase Price: {formatCurrency(params.homeValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Down Payment: {formatCurrency(params.homeValue - params.mortgageBalance)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Down Payment Ratio: {formatPercentage(((params.homeValue - params.mortgageBalance) / params.homeValue) * 100)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Mortgage Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Mortgage Amount: {formatCurrency(params.mortgageBalance)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Interest Rate: {formatPercentage(params.mortgageRate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Payment: {formatCurrency(monthlyMortgagePayment)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Appreciation Forecast</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Annual Appreciation: {formatPercentage(params.homeAppreciationRate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5-Year Value: {formatCurrency(finalYear.homeValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Equity: {formatCurrency(finalYear.homeEquity)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smith" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smith Maneuver Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold mb-2">Investment Loan Strategy</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Loan Amount: {formatCurrency(params.investmentLoan)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Interest: {formatCurrency(monthlyInvestmentInterest)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tax Deductible Interest: {formatCurrency(currentYear.totalTaxDeductions)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tax Benefits</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Tax Rate: {formatPercentage(params.taxRate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Tax Refund: {formatCurrency(monthlyTaxSavings)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Annual Tax Savings: {formatCurrency(currentYear.taxRefunds)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Investment Performance</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Expected Return: {formatPercentage(params.investmentReturnRate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Current Value: {formatCurrency(currentYear.investmentValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5-Year Projection: {formatCurrency(finalYear.investmentValue)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Parameter Controls */}
      <DashboardInputs />
    </div>
  )
} 