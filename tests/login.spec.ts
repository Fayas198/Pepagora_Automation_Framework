import { test, expect } from '../fixtures/testFixtures';
import { getTestData } from '../utils/helpers';

/**
 * Login Form Tests
 * 
 * These tests verify the login workflow.
 * API mocking is automatically setup by the fixture to bypass reCAPTCHA
 * and simulate backend responses.
 */

test('Existing user can login with valid credentials', async ({ loginPageWithMocks }) => {
  const user = getTestData('existingUser');
  
  // ACT: Fill login form
  await loginPageWithMocks.login(user.email, user.password);
  
  // Wait for mock API response
  await loginPageWithMocks.page.waitForTimeout(1000);
  
  // ASSERT: Verify we're logged in (token in storage)
  const token = await loginPageWithMocks.page.evaluate(() => 
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  );
  expect(token).toBeTruthy();
  console.log('✓ User logged in successfully');
});

test('Login form displays all required fields', async ({ loginPageWithMocks }) => {
  // ASSERT: Verify all form fields are visible
  await expect(loginPageWithMocks.emailInput).toBeVisible();
  await expect(loginPageWithMocks.passwordInput).toBeVisible();
  await expect(loginPageWithMocks.signInButton).toBeVisible();
  console.log('✓ All login form fields are visible');
});