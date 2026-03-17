import { test, expect } from '../fixtures/testFixtures';
import { getTestData } from '../utils/helpers';

/**
 * Signup Form Tests
 * 
 * These tests verify the user registration workflow.
 * API mocking is automatically setup by the fixture to bypass reCAPTCHA
 * and simulate backend responses.
 */

test('New user can sign up with valid credentials', async ({ signupPageWithMocks }) => {
  const user = getTestData('newUser');
  const fullName = `${user.firstName} ${user.lastName}`;
  
  // ACT: Fill signup form
  await signupPageWithMocks.signup(fullName, user.email, user.password, '9876543210');
  
  // Wait for mock API response
  await signupPageWithMocks.page.waitForTimeout(1000);
  
  // ASSERT: Verify we're signed up (token in storage)
  const token = await signupPageWithMocks.page.evaluate(() => 
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  );
  expect(token).toBeTruthy();
  console.log('✓ User signed up successfully');
});

test('Signup form displays all required fields', async ({ signupPageWithMocks }) => {
  // Click on Sign Up link to switch to signup form
  await signupPageWithMocks.page.getByRole('link', { name: 'Sign Up' }).click();
  
  // Wait for form to switch
  await signupPageWithMocks.page.waitForTimeout(1000);
  
  // ASSERT: Verify all form fields are visible
  await expect(signupPageWithMocks.nameInput).toBeVisible();
  await expect(signupPageWithMocks.emailInput).toBeVisible();
  await expect(signupPageWithMocks.passwordInput).toBeVisible();
  await expect(signupPageWithMocks.mobileInput).toBeVisible();
  // Note: SignUp button may be hidden, but form fields are visible
  console.log('✓ All signup form fields are visible');
});