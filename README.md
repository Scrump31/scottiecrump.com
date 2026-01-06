# ScottieCrump.com

A personal website and blog for Scottie Crump, Lead Software Engineer in Test specializing in modern testing methodologies.

## Overview

This website is built with Next.js 16 using the App Router architecture and React 19, featuring a blog with articles about software testing and development, as well as interactive tools for test automation professionals.

## Features

- **Blog**: Articles about software testing, automation, and development
- **Interactive Tools**:
  - Test Automation ROI Calculator (`/tools/test-automation-roi-calculator`): Calculate the return on investment for test automation efforts
  - Test Automation Calculator (`/tools/test-automation-calculator`): Analyze test automation metrics
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.10
- **Content**: MDX for blog posts (via mdx-bundler 10.0.3)
- **Charts**: Chart.js 4.4.1 with chartjs-plugin-annotation for data visualization
- **Testing**:
  - Vitest 4.0.15 for unit and component testing
  - Playwright 1.56.1 for end-to-end testing
  - Allure for test reporting (allure-playwright, allure-vitest)
  - @testing-library/react 16.0.1 for component testing
- **Analytics**: Datadog RUM (@datadog/browser-rum 5.27.0), InfluxDB for metrics
- **Development**: TypeScript 5, ESLint 9, Prettier 2.2.1

## Project Structure

This project uses the Next.js App Router architecture:

- **app/**: App Router pages and layouts
  - **layout.tsx**: Root layout with navigation and theming
  - **page.tsx**: Home page
  - **blog/**: Blog listing and individual post pages
  - **about/**: About page
  - **products/**: Products page
  - **tags/**: Tag-based blog filtering
  - **tools/**: Interactive tools and calculators
  - **providers.tsx**: Client-side providers (Theme, Datadog RUM)
  - **not-found.tsx**: Custom 404 page
- **components/**: Reusable React components
- **layouts/**: Page layout templates (AuthorLayout, PostLayout, ListLayout, PostSimpleLayout)
- **data/**: Content and configuration data
  - **blog/**: MDX blog post files
  - **authors/**: Author information
  - **siteMetadata.ts**: Site configuration
  - **headerNavLinks.ts**: Navigation links
- **public/**: Static assets (images, favicons, RSS feed)
- **css/**: Global CSS and Tailwind configuration
- **lib/**: Utility functions and shared code
  - **mdx.ts**: MDX content processing
  - **utils/**: Helper functions (formatDate, tags)
- **scripts/**: Build and automation scripts (send-metrics.mjs)
- **types/**: TypeScript type definitions
- **tests/**: Unit and component tests
- **e2e/**: Playwright end-to-end tests

## Development

### Prerequisites

- Node.js >= 18.17.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Scrump31/scottiecrump.com.git
cd scottiecrump

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

### Unit and Component Tests (Vitest)

```bash
# Run unit tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests in interactive UI mode
npm run test:interactive

# Run tests with coverage
npm run test:coverage

# View coverage report (after running coverage)
npm run cov-report
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
npm run playwright

# Run Playwright tests in interactive mode
npm run playwright:interactive

# Run Playwright tests locally (with local config)
npm run playwright:interactive:local

# Update Playwright browsers
npm run playwright:update-browsers

# View Playwright report
npm run playwright:report
```

### Test Reporting (Allure)

```bash
# Generate and serve Allure report
npm run allure-report
```

### Metrics

Test results are saved to `metrics_results/` and can be sent to InfluxDB:

```bash
npm run send-metrics
```

## Additional Commands

```bash
# Analyze bundle size
npm run analyze

# Run linter
npm run lint

# Prepare husky git hooks
npm run prepare
```

## Architecture

For detailed information about the page architecture and component flow, see [PAGE_ARCHITECTURE.md](PAGE_ARCHITECTURE.md).

## License

See the [LICENSE](LICENSE) file for details.

## Author

Scottie Crump - [LinkedIn](https://www.linkedin.com/in/scottiecrump/) | [GitHub](https://github.com/Scrump31/)
