import { expect, test } from '@playwright/test'

test('should copy code snippet', async ({ page }) => {
  await page.goto('/blog/es6-typescript/part-3')
  const snippet = page.locator('pre').filter({ hasText: 'const add = (num1: number,' })
  await snippet.hover()
  const copyBtn = page.getByRole('button', { name: /copy code/i })
  await copyBtn.click()
  const copiedText = await page.evaluate(async () => {
    return await window.navigator.clipboard.readText()
  })

  expect(copiedText).toMatchSnapshot()
})
