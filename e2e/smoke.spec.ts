import { expect, test } from '@playwright/test'

test('Each page should load without error', async ({ page }) => {
  await page.goto('/')
  const mainNav = page.getByRole('navigation', { name: 'Main navigation' })
  // Home Page
  await expect(page.getByRole('heading', { name: 'From the Blog' })).toBeVisible()
  await mainNav.getByRole('link', { name: 'Blog', exact: true }).click()
  // Blog Page
  await expect(page.getByRole('heading', { name: 'All Posts' })).toBeVisible()
  await mainNav.getByRole('link', { name: 'Tags' }).click()
  // Tags Page
  await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible()
  await mainNav.getByRole('link', { name: 'Products' }).click()
  // Products Page
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  await mainNav.getByRole('link', { name: 'About' }).click()
  // About Page
  await expect(page.getByRole('heading', { name: 'Scottie Crump', level: 1 })).toBeVisible()
})

test('Blog navigation should navigate to prev and next page', async ({ page }) => {
  await page.goto('/blog')
  const nextButton = page.getByRole('link', { name: 'Next', exact: true })
  const prevButton = page.getByRole('link', { name: 'Previous' })
  await nextButton.click()
  await expect(page.getByText('2 of')).toBeVisible()
  await prevButton.click()
  await expect(page.getByText('1 of')).toBeVisible()
})
