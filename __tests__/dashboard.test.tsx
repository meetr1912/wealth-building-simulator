import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
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

describe('Dashboard', () => {
  const renderDashboard = () => {
    return render(
      <SimulationProvider>
        <DashboardContent />
      </SimulationProvider>
    )
  }

  it('renders the dashboard header', () => {
    renderDashboard()
    expect(screen.getByText('Wealth Building Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Track and optimize your Smith Maneuver/)).toBeInTheDocument()
  })

  it('renders all key metric cards', () => {
    renderDashboard()
    expect(screen.getByText('Home Value')).toBeInTheDocument()
    expect(screen.getByText('Mortgage Balance')).toBeInTheDocument()
    expect(screen.getByText('Investment Loan')).toBeInTheDocument()
    expect(screen.getByText('Net Worth')).toBeInTheDocument()
  })

  it('renders all charts', () => {
    renderDashboard()
    expect(screen.getByText('Home Value vs Mortgage Balance')).toBeInTheDocument()
    expect(screen.getByText('Investment Loan and Net Worth')).toBeInTheDocument()
    expect(screen.getByText('Annual Contributions and Tax Refunds')).toBeInTheDocument()
  })

  it('renders parameter inputs', () => {
    renderDashboard()
    expect(screen.getByText('Home Appreciation Rate')).toBeInTheDocument()
    expect(screen.getByText('Mortgage Interest Rate')).toBeInTheDocument()
    expect(screen.getByText('Investment Return Rate')).toBeInTheDocument()
    expect(screen.getByText('Tax Rate')).toBeInTheDocument()
    expect(screen.getByText('Monthly Investment Contribution')).toBeInTheDocument()
  })

  it('displays initial values correctly', () => {
    renderDashboard()
    expect(screen.getByText('$500,000')).toBeInTheDocument() // Initial home value
    expect(screen.getByText('$212,230')).toBeInTheDocument() // Initial mortgage balance
    expect(screen.getByText('$230,216')).toBeInTheDocument() // Initial investment loan
  })
}) 