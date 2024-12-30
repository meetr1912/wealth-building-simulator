"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'
import { useSimulation } from "./simulation-context"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

const COLORS = ['#22c55e', '#3b82f6', '#ef4444', '#f97316']

export function DashboardCharts() {
  const { simulationData } = useSimulation();
  const currentYear = simulationData.length > 0 ? simulationData[simulationData.length - 1] : null;

  if (!currentYear) {
    return <div>Loading simulation data...</div>;
  }

  // Calculate net worth distribution for the current year
  const netWorthDistribution = currentYear ? [
    {
      name: 'Home Equity',
      value: currentYear.homeEquity,
      description: 'Current home value minus mortgage balance'
    },
    {
      name: 'Investment Growth',
      value: currentYear.investmentReturns,
      description: 'Returns earned on investments'
    },
    {
      name: 'Investment Principal',
      value: currentYear.totalInvestments,
      description: 'Total invested amount (loan + contributions)'
    },
    {
      name: 'Investment Loan',
      value: -currentYear.investmentLoan,
      description: 'Outstanding investment loan balance'
    }
  ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value)) : [];

  // Transform data for the wealth growth chart
  const wealthComponents = simulationData.map(year => ({
    year: year.year,
    'Home Equity': year.homeEquity,
    'Investment Value': year.investmentValue,
    'Total Net Worth': year.netWorth,
    'Investment Returns': year.investmentReturns,
    'Total Investments': year.totalInvestments
  }));

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wealth Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wealthComponents} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Home Equity" stroke={COLORS[0]} name="Home Equity" strokeWidth={2} />
                  <Line type="monotone" dataKey="Investment Value" stroke={COLORS[1]} name="Investment Value" strokeWidth={2} />
                  <Line type="monotone" dataKey="Total Net Worth" stroke={COLORS[3]} name="Total Net Worth" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Worth Distribution (Year {currentYear?.year})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={netWorthDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value, percent }) =>
                      `${name}: ${formatCurrency(value)} (${(percent * 100).toFixed(1)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {netWorthDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name, props) => [
                      formatCurrency(value),
                      props.payload.description
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wealthComponents} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Investment Returns" stroke={COLORS[0]} name="Investment Returns" strokeWidth={2} />
                  <Line type="monotone" dataKey="Total Investments" stroke={COLORS[1]} name="Total Investments" strokeWidth={2} />
                  <Line type="monotone" dataKey="Investment Value" stroke={COLORS[3]} name="Total Value" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Worth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wealthComponents} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Total Net Worth" stroke={COLORS[3]} name="Total Net Worth" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 