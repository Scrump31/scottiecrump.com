import { screen } from '@testing-library/react'
import Pre from '@/components/Pre'
import { renderWithUserEvent } from '@/test-utils'

describe(`${Pre.name}`, () => {
  function CodeSnippet() {
    return <code data-testid="snippet">console.log("test snippet")</code>
  }

  test('when hover over code snippet, then displays copy button', async () => {
    const { user } = renderWithUserEvent(
      <Pre>
        <CodeSnippet />
      </Pre>
    )
    const codeSnippet = screen.getByTestId('snippet')

    await user.hover(codeSnippet)
    const copyButton = await screen.findByRole('button', { name: /copy code/i })

    expect(copyButton).toBeInTheDocument()
  })

  test('when de-hover code snippet, then copy button hidden', async () => {
    const { user } = renderWithUserEvent(
      <Pre>
        <CodeSnippet />
      </Pre>
    )
    const codeSnippet = screen.getByTestId('snippet')

    await user.hover(codeSnippet)
    await user.unhover(codeSnippet)

    expect(screen.queryByRole('button', { name: /copy code/i })).not.toBeInTheDocument()
  })
})
