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
  const { simulationData } = useSimulation()
  const currentYear = simulationData[0]
  const nextYear = simulationData[1]
  const finalYear = simulationData[simulationData.length - 1]

  if (!currentYear || !nextYear || !finalYear) {
    return <div>Loading simulation data...</div>
  }

  const homeValueChange = currentYear.homeValue > 0 ? 
    ((nextYear.homeValue - currentYear.homeValue) / currentYear.homeValue) * 100 : 0
  
  const mortgageChange = currentYear.mortgageBalance > 0 ?
    ((nextYear.mortgageBalance - currentYear.mortgageBalance) / currentYear.mortgageBalance) * 100 : 0
  
  const investmentChange = currentYear.investmentValue > 0 ?
    ((nextYear.investmentValue - currentYear.investmentValue) / currentYear.investmentValue) * 100 : 0
  
  const netWorthChange = currentYear.netWorth > 0 ?
    ((nextYear.netWorth - currentYear.netWorth) / currentYear.netWorth) * 100 : 0

  const totalGrowth = currentYear.netWorth > 0 ?
    ((finalYear.netWorth - currentYear.netWorth) / currentYear.netWorth) * 100 : 0

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
                    {currentYear.homeValue > 0 ? 
                      formatPercentage((currentYear.homeEquity / currentYear.homeValue) * 100) + ' of home value' :
                      'No home purchased yet'
                    }
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
                  <h3 className="font-semibold mb-2">Investment Plan</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      RRSP Contribution: {formatCurrency(currentYear.contributions.rrsp)} / year
                    </p>
                    <p className="text-sm text-muted-foreground">
                      FHSA Contribution: {formatCurrency(currentYear.contributions.fhsa)} / year
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tax Refunds: {formatCurrency(currentYear.contributions.taxRefunds)} / year
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Growth Projections</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Total Investments: {formatCurrency(currentYear.totalInvestments)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Investment Returns: {formatCurrency(currentYear.investmentReturns)}
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
                      Purchase Price: {formatCurrency(currentYear.homeValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Down Payment: {formatCurrency(currentYear.homeEquity)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Down Payment Ratio: {currentYear.homeValue > 0 ?
                        formatPercentage((currentYear.homeEquity / currentYear.homeValue) * 100) :
                        'N/A'
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Mortgage Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Mortgage Amount: {formatCurrency(currentYear.mortgageBalance)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Payment: {formatCurrency(currentYear.mortgagePayment / 12)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Remaining Balance: {formatCurrency(currentYear.mortgageBalance)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smith Maneuver</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Investment Loan: {formatCurrency(currentYear.investmentLoan)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Interest: {formatCurrency(currentYear.investmentLoanPayment / 12)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tax Savings: {formatCurrency(currentYear.taxRefunds)}
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
                      Loan Amount: {formatCurrency(currentYear.investmentLoan)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Interest: {formatCurrency(currentYear.investmentLoanPayment / 12)}
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
                      Annual Tax Savings: {formatCurrency(currentYear.taxRefunds)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Tax Savings: {formatCurrency(currentYear.taxRefunds / 12)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Tax Savings: {formatCurrency(finalYear.taxRefunds)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Investment Growth</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Investment Value: {formatCurrency(currentYear.investmentValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Returns: {formatCurrency(currentYear.investmentReturns)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Net Investment: {formatCurrency(currentYear.investmentValue - currentYear.investmentLoan)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Parameters Control */}
      <DashboardInputs />
    </div>
  )
} 