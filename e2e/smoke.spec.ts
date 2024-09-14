import { expect, test } from '@playwright/test'

test('Each page should load without error', async ({ page }) => {
  await page.goto('/')
  // Home Page
  await expect(page.getByRole('heading', { name: 'Latest' })).toBeVisible()
  await page.getByRole('link', { name: 'Blog', exact: true }).click()
  // Blog Page
  await expect(page.getByRole('heading', { name: 'All Posts' })).toBeVisible()
  await page.getByRole('link', { name: 'Tags' }).click()
  // Tags Page
  await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible()
  await page.getByRole('link', { name: 'Products' }).click()
  // Products Page
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  await page.getByRole('link', { name: 'About' }).click()
  // About Page
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
})

test('Blog navigation should navigate to prev and next page', async ({ page }) => {
  await page.goto('/blog')
  const nextButton = page.getByRole('button', { name: 'Next' })
  const prevButton = page.getByRole('button', { name: 'Previous' })
  await nextButton.click()
  await expect(page.getByText('2 of')).toBeVisible()
  await prevButton.click()
  await expect(page.getByText('1 of')).toBeVisible()
})
// testing allure report. remove this comment after confirming results
