import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MobileNav from '@/components/MobileNav'
import headerNavLinks from '@/data/headerNavLinks'

describe(`${MobileNav.name}`, () => {
  test('when toggle button clicked, nav opens and all nav links are displayed', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)

    await user.click(screen.getByRole('button', { name: /toggle menu/i }))

    expect(screen.getByRole('button', { name: /toggle menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    for (const { title, href } of headerNavLinks) {
      const link = screen.getByRole('link', { name: title })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    }
  })

  test('when nav is open and backdrop button clicked, nav closes', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)

    await user.click(screen.getByRole('button', { name: /toggle menu/i }))
    await user.click(screen.getByRole('button', { name: /close menu/i }))

    expect(screen.getByRole('button', { name: /toggle menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  test('when nav is open and a nav link clicked, nav closes', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)

    await user.click(screen.getByRole('button', { name: /toggle menu/i }))
    await user.click(screen.getByRole('link', { name: headerNavLinks[0].title }))

    expect(screen.getByRole('button', { name: /toggle menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})
