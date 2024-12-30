# Wealth Building Simulator

A comprehensive financial planning tool that simulates the Smith Maneuver wealth-building strategy, built with Next.js and modern web technologies.

## Features

- **Multi-Phase Simulation**
  - First 5 years of investment accumulation
  - Home purchase simulation
  - Smith Maneuver implementation
  - 25-year mortgage amortization

- **Interactive Dashboard**
  - Real-time parameter adjustments
  - Dynamic charts and visualizations
  - Detailed financial metrics
  - Phase-specific analysis

- **Key Metrics Tracking**
  - Net worth progression
  - Investment returns
  - Home equity growth
  - Tax savings calculations

## Technology Stack

- **Frontend Framework**: Next.js 13.5
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: Next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wealth-building-simulator.git
   cd wealth-building-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Usage

1. **Accumulation Phase**
   - Set your RRSP and FHSA contributions
   - Adjust investment return rates
   - View projected growth

2. **Home Purchase**
   - Set home value and down payment
   - Adjust mortgage rates and terms
   - View amortization schedule

3. **Smith Maneuver**
   - Configure investment loan parameters
   - Track tax deductions
   - Monitor investment growth

## Configuration

Key parameters can be adjusted through the UI:

- Investment return rates (0-15%)
- Home appreciation rate (0-10%)
- Mortgage rates (0-10%)
- RRSP/FHSA contributions
- Tax rates
- Investment loan parameters

## Development

### Project Structure

```
wealth-building-simulator/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── charts.tsx
│   │   ├── dashboard-content.tsx
│   │   ├── inputs.tsx
│   │   └── simulation-context.tsx
│   └── ui/
├── public/
└── styles/
```

### Key Components

- `simulation-context.tsx`: Core simulation logic
- `dashboard-content.tsx`: Main dashboard layout
- `charts.tsx`: Data visualizations
- `inputs.tsx`: Parameter controls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For support, please open an issue in the GitHub repository. 