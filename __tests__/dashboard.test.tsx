import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { DashboardInputs } from '@/components/dashboard/inputs'
import { SimulationProvider } from '@/components/dashboard/simulation-context'

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock chart dimensions
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
beforeAll(() => {
  Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(() => ({
    width: 500,
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  }))
})

afterAll(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
})

const renderDashboard = () => {
  render(
    <SimulationProvider>
      <DashboardContent />
    </SimulationProvider>
  )
}

describe('Dashboard', () => {
  it('renders all tabs', () => {
    renderDashboard()
    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /accumulation phase/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /home purchase/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /smith maneuver/i })).toBeInTheDocument()
  })

  it('renders key metric cards', () => {
    renderDashboard()
    expect(screen.getByRole('heading', { name: 'Home Value', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Home Equity', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Investment Value', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Net Worth', level: 3 })).toBeInTheDocument()
  })

  it('renders parameter inputs', () => {
    render(
      <SimulationProvider>
        <DashboardInputs />
      </SimulationProvider>
    )
    expect(screen.getByRole('heading', { name: 'Adjust Parameters' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Interest Rates & Returns' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Contributions & Taxes' })).toBeInTheDocument()
    expect(screen.getByText('Home Appreciation Rate')).toBeInTheDocument()
    expect(screen.getByText('Mortgage Interest Rate')).toBeInTheDocument()
    expect(screen.getByText('Investment Return Rate')).toBeInTheDocument()
  })

  it('switches between parameter tabs', () => {
    render(
      <SimulationProvider>
        <DashboardInputs />
      </SimulationProvider>
    )

    // Click on Contributions & Taxes tab
    const contributionsTab = screen.getByRole('tab', { name: /contributions & taxes/i })
    fireEvent.click(contributionsTab)

    // Verify content changes
    expect(screen.getByText('Marginal Tax Rate')).toBeInTheDocument()
    expect(screen.getByText('Monthly Investment Contribution')).toBeInTheDocument()
  })

  it('switches between dashboard tabs', () => {
    renderDashboard()

    // Click each tab and verify content changes
    const accumulationTab = screen.getByRole('tab', { name: /accumulation phase/i })
    fireEvent.click(accumulationTab)
    expect(screen.getByText('Monthly Investment Plan')).toBeInTheDocument()
    expect(screen.getByText('Tax Optimization')).toBeInTheDocument()

    const purchaseTab = screen.getByRole('tab', { name: /home purchase/i })
    fireEvent.click(purchaseTab)
    expect(screen.getByText('Property Details')).toBeInTheDocument()
    expect(screen.getByText('Mortgage Details')).toBeInTheDocument()
    expect(screen.getByText('Appreciation Forecast')).toBeInTheDocument()

    const smithTab = screen.getByRole('tab', { name: /smith maneuver/i })
    fireEvent.click(smithTab)
    expect(screen.getByText('Investment Loan Strategy')).toBeInTheDocument()
    expect(screen.getByText('Tax Benefits')).toBeInTheDocument()
  })
}) 