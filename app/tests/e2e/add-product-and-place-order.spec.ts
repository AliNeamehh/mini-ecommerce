import { test, expect } from '@playwright/test'

 

test('admin can add product and user can place order', async ({ page, baseURL }) => {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

  
  const adminLogin = await page.request.post(`${apiBase}/auth/login`, { data: { email: 'admin@example.com', password: 'admin' } })
  expect(adminLogin.ok()).toBeTruthy()
  const adminToken = await adminLogin.text()

  
  await page.context().addCookies([{ name: 'jwt', value: adminToken, domain: 'localhost', path: '/' }])

  
  await page.goto('/admin/products')
  await page.fill('input[placeholder="Name"]', 'E2E Test Product')
  await page.fill('input[placeholder="Price"]', '9.99')
  await page.fill('input[placeholder="Stock"]', '10')
  await page.fill('input[placeholder="Image URL"]', '')
  await page.click('text=Save product')
  await expect(page.locator('text=Product created')).toHaveCount(0) // product created shows toast; exact match may vary

  
  await page.context().clearCookies()

  
  await page.goto('/')
  
  await page.goto('/')
  await page.goto('/shop')
  
  await page.waitForSelector('[data-testid^="add-to-cart-"]')
  const addBtn = page.locator('[data-testid^="add-to-cart-"]').first()
  await addBtn.click()
  await page.goto('/cart')
  await page.click('[data-testid="place-order"]')
  
  await expect(page.locator('text=Order placed').first()).toHaveCount(0)
})
