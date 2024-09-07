import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import user from '@testing-library/user-event'

export function renderWithUserEvent(
  jsx: ReactElement
): RenderResult & { user: ReturnType<typeof user.setup> } {
  return {
    user: user.setup(),
    ...render(jsx),
  }
}
