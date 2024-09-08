import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push method
  }),
}))
