"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSimulation } from "./simulation-context"

export function DashboardInputs() {
  const { params, updateParam } = useSimulation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adjust Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rates">Interest Rates & Returns</TabsTrigger>
            <TabsTrigger value="contributions">Contributions & Taxes</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="home-appreciation">Home Appreciation Rate</Label>
                  <span className="text-sm text-muted-foreground">{params.homeAppreciationRate}%</span>
                </div>
                <Slider
                  id="home-appreciation"
                  value={[params.homeAppreciationRate]}
                  onValueChange={([value]) => updateParam('homeAppreciationRate', value)}
                  max={10}
                  step={0.1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <p className="text-xs text-muted-foreground">
                  Expected annual increase in home value. Historical average is 3-5%.
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mortgage-rate">Mortgage Interest Rate</Label>
                  <span className="text-sm text-muted-foreground">{params.mortgageRate}%</span>
                </div>
                <Slider
                  id="mortgage-rate"
                  value={[params.mortgageRate]}
                  onValueChange={([value]) => updateParam('mortgageRate', value)}
                  max={10}
                  step={0.1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <p className="text-xs text-muted-foreground">
                  Current mortgage and investment loan interest rate.
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="investment-return">Investment Return Rate</Label>
                  <span className="text-sm text-muted-foreground">{params.investmentReturnRate}%</span>
                </div>
                <Slider
                  id="investment-return"
                  value={[params.investmentReturnRate]}
                  onValueChange={([value]) => updateParam('investmentReturnRate', value)}
                  max={15}
                  step={0.1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <p className="text-xs text-muted-foreground">
                  Expected annual return on investments. Historical stock market average is 7-10%.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tax-rate">Marginal Tax Rate</Label>
                  <span className="text-sm text-muted-foreground">{params.taxRate}%</span>
                </div>
                <Slider
                  id="tax-rate"
                  value={[params.taxRate]}
                  onValueChange={([value]) => updateParam('taxRate', value)}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <p className="text-xs text-muted-foreground">
                  Your marginal tax rate affects the tax deductions from investment loan interest.
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="monthly-contribution">Monthly Investment Contribution</Label>
                  <span className="text-sm text-muted-foreground">
                    ${params.monthlyContribution.toLocaleString()}
                  </span>
                </div>
                <Slider
                  id="monthly-contribution"
                  value={[params.monthlyContribution]}
                  onValueChange={([value]) => updateParam('monthlyContribution', value)}
                  max={10000}
                  step={100}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <p className="text-xs text-muted-foreground">
                  Regular monthly contributions to your investment portfolio.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 