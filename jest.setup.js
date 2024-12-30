import '@testing-library/jest-dom'

// Mock ResizeObserver which is required by charts
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) 