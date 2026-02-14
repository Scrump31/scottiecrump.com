# CLAUDE.md - ScottieCrump.com

This is a personal website and blog for Scottie Crump, Lead Software Engineer in Test. Built with Next.js 16 (App Router), React 19, and Tailwind CSS.

## Project Overview

Personal website featuring:

- Blog articles about software testing, automation, and development
- Interactive tools (Test Automation ROI Calculator, Test Automation Calculator)
- Responsive design with dark mode support
- MDX-based content management

## Technology Stack

- **Framework**: Next.js 16.1.6 (App Router architecture)
- **UI**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.10
- **Content**: MDX via mdx-bundler 10.0.3
- **Charts**: Chart.js 4.4.1
- **Testing**: Vitest 4.0.15 (unit/component), Playwright 1.56.1 (E2E)
- **Analytics**: Datadog RUM, InfluxDB
- **Language**: TypeScript 5

## Project Structure

```
app/                  # Next.js App Router pages and layouts
├── layout.tsx       # Root layout with navigation and theming
├── page.tsx         # Home page
├── blog/            # Blog listing and post pages
├── about/           # About page
├── products/        # Products page
├── tags/            # Tag-based filtering
├── tools/           # Interactive calculators
├── providers.tsx    # Client-side providers (Theme, Datadog)
└── not-found.tsx    # Custom 404 page

components/          # Reusable React components
layouts/             # Page layout templates (AuthorLayout, PostLayout, etc.)
data/                # Content and configuration
├── blog/            # MDX blog post files
├── authors/         # Author information
├── siteMetadata.ts  # Site configuration
└── headerNavLinks.ts # Navigation links

lib/                 # Utility functions
├── mdx.ts           # MDX content processing
└── utils/           # Helper functions (formatDate, tags)

tests/               # Unit and component tests (Vitest)
e2e/                 # End-to-end tests (Playwright)
public/              # Static assets
css/                 # Global CSS and Tailwind config
types/               # TypeScript type definitions
scripts/             # Build and automation scripts
```

## Development Guidelines

### Running the Project

```bash
npm run dev              # Development mode with hot reloading
npm start                # Start with file watching (for content changes)
npm run build            # Build for production
npm run serve            # Serve built application
```

### Testing

```bash
# Unit/Component Tests (Vitest)
npm test                    # Run unit tests
npm run test:watch          # Watch mode
npm run test:interactive    # Interactive UI mode
npm run test:coverage       # Coverage report
npm run cov-report          # View coverage report in browser

# E2E Tests (Playwright)
npm run playwright                      # Run E2E tests
npm run playwright:interactive          # Interactive mode
npm run playwright:interactive:local    # Local config
npm run playwright:update-browsers      # Update browsers
npm run playwright:report               # View report

# Allure Reports
npm run allure-report       # Generate and serve Allure report
```

### Code Quality

```bash
npm run lint         # Run ESLint with auto-fix
npm run analyze      # Analyze bundle size
```

### Git Hooks

- Husky is configured for pre-commit hooks
- Lint-staged runs ESLint and Prettier on staged files

## Working with Content

### Blog Posts

- Location: `data/blog/`
- Format: MDX (Markdown with JSX components)
- Frontmatter: title, date, tags, summary, authors
- Images: Store in `public/static/images/blog/`

### MDX Processing

- MDX bundling handled by `lib/mdx.ts`
- Supports: math (KaTeX), code highlighting (Prism+), footnotes, GFM
- Remark/Rehype plugins configured for auto-linking headings and slugs

### Site Configuration

- `data/siteMetadata.ts`: Site title, description, author, social links
- `data/headerNavLinks.ts`: Navigation menu items

## Coding Conventions

### React Components

- Use functional components with TypeScript
- Prefer named exports for components
- Server Components by default (Next.js App Router)
- Use 'use client' directive only when needed (interactivity, hooks, context)

### Styling

- Tailwind CSS utility classes
- Dark mode via next-themes
- Responsive design patterns already established

### File Naming

- Components: PascalCase (e.g., `BlogPost.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Pages: lowercase with hyphens (e.g., `test-automation-roi-calculator`)

### TypeScript

- Strict mode enabled
- Define types in `types/` directory or co-located with components
- Avoid `any` type; use proper type definitions

## Important Notes

### Dependencies

- Node.js >= 18.17.0 required
- `sharp` is pinned to 0.32.6 for compatibility
- React 19 is being used (latest stable)

### Environment Variables

- Copy `.env.example` to `.env.local` for local development
- Required for Datadog RUM and InfluxDB integrations

### Analytics & Monitoring

- Datadog RUM initialized in `app/providers.tsx`
- Test metrics sent to InfluxDB via `scripts/send-metrics.mjs`
- Results saved to `metrics_results/`

### Testing Strategies

- **Unit Tests**: Component logic, utilities, helpers
- **E2E Tests**: User flows, navigation, interactive tools
- **Allure Reports**: Comprehensive test reporting for both Vitest and Playwright

## Common Tasks

### Adding a New Blog Post

1. Create MDX file in `data/blog/`
2. Add frontmatter (title, date, tags, summary, authors)
3. Write content using MDX syntax
4. Images go in `public/static/images/blog/`
5. Post will auto-appear in blog listing

### Adding a New Interactive Tool

1. Create route in `app/tools/[tool-name]/`
2. Implement page.tsx with tool logic
3. Use Chart.js for visualizations if needed
4. Add link to navigation in `data/headerNavLinks.ts`
5. Write tests in `tests/` and `e2e/`

### Updating Styles

1. Modify Tailwind config in `tailwind.config.ts`
2. Global styles in `css/tailwind.css`
3. Component-specific styles use Tailwind utilities

### Deployment

- Built for static export or server deployment
- Ensure environment variables are set in production
- Run `npm run build` to verify production build

## Security & Best Practices

- No hardcoded secrets (use environment variables)
- Images optimized via Next.js Image component
- Content Security Policy considerations for analytics
- Accessibility: Use semantic HTML and ARIA where needed

## External Integrations

- **Datadog RUM**: Real user monitoring
- **InfluxDB**: Test metrics storage
- **Allure**: Test reporting platform

## Notes for Claude

- This is a personal project by Scottie Crump
- Focus on quality, testing, and performance
- Maintain accessibility and responsive design
- Follow existing patterns for consistency
- Test automation and testing best practices are important to the author
- When adding features, include appropriate tests
- Respect the established architecture (App Router, Server Components)
