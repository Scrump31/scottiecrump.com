import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tag from '@/components/Tag'

describe(`${Tag.name}`, () => {
  test('when tag rendered with text, then returns kebab-case link', () => {
    render(<Tag text="quality engineering" />)
    const tagLink = screen.getByRole('link', {
      name: /quality-engineering/i,
    })
    expect(tagLink).toBeInTheDocument()
    expect(tagLink).toHaveAttribute('href', '/tags/quality-engineering')
  })

  test('when tag rendered without text, then returns empty string link', () => {
    render(<Tag text="" />)
    const tagLink = screen.getByRole('link')
    expect(tagLink).toBeInTheDocument()
    expect(tagLink).toHaveTextContent('')
  })
})
