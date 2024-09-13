import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import AllureReporter from 'allure-vitest/reporter'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts', 'allure-vitest/setup'],
    reporters: ['default', new AllureReporter({})],
    coverage: {
      include: [
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
        'pages/**/*.{js,jsx,ts,tsx}',
      ],
      exclude: ['e2e/**'],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{webpack,vite,vitest,babel,nyc,tsup,build}.config.*',
    ],
  },
  esbuild: {
    jsx: 'automatic',
  },
  plugins: [tsconfigPaths()],
})
