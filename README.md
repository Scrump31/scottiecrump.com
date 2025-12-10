# ScottieCrump.com

A personal website and blog for Scottie Crump, Lead Software Engineer in Test specializing in modern testing methodologies.

## Overview

This website is built with Next.js and React, featuring a blog with articles about software testing and development, as well as interactive tools for test automation professionals.

## Features

- **Blog**: Articles about software testing, automation, and development
- **Interactive Tools**:
  - Test Automation ROI Calculator (`/tools/test-automation-roi-calculator`): Calculate the return on investment for test automation efforts
  - Test Automation Calculator (`/tools/test-automation-calculator`): Analyze test automation metrics
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes

## Technology Stack

- **Framework**: Next.js 16.0.7
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.10
- **Content**: MDX for blog posts (via mdx-bundler)
- **Charts**: Chart.js 4.4.1 for data visualization
- **Testing**:
  - Vitest 4.0.15 for unit and component testing
  - Playwright 1.56.1 for end-to-end testing
  - Allure for test reporting
- **Analytics**: Datadog RUM, InfluxDB for metrics

## Project Structure

- **pages/**: Next.js pages that define routes
  - **blog/**: Blog post pages with dynamic routing
  - **tools/**: Interactive tools and calculators
  - **api/**: API endpoints
- **components/**: Reusable React components
- **layouts/**: Page layout templates
- **data/**: Content and configuration data
  - **blog/**: MDX blog post files
  - **authors/**: Author information
- **public/**: Static assets (images, fonts, etc.)
- **styles/**: Global CSS and Tailwind configuration
- **lib/**: Utility functions and shared code
- **scripts/**: Build and automation scripts

## Development

### Prerequisites

- Node.js >= 18.17.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Scrump31/scottiecrump.com.git
cd scottiecrump.com

# Install dependencies
npm install
```

### Environment Setup

Copy the example environment file and update as needed:

```bash
cp .env.example .env.local
```

### Running Locally

```bash
# Development mode with hot reloading
npm run dev

# Start with file watching (for content changes)
npm start
```

### Building for Production

```bash
# Build the application
npm run build

# Serve the built application
npm run serve
```

## Testing

```bash
# Run unit tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests with Playwright
npm run playwright

# Run Playwright tests in interactive mode
npm run playwright:interactive
```

## License

See the [LICENSE](LICENSE) file for details.

## Author

Scottie Crump - [LinkedIn](https://www.linkedin.com/in/scottiecrump/) | [GitHub](https://github.com/Scrump31/)
