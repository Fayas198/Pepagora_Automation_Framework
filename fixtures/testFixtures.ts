import { test as base, expect, Page } from '@playwright/test';
import { BuyingRequestPage } from '../pages/BuyingRequestPage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';

/**
 * Extended Playwright Test Fixtures
 * 
 * This file provides custom test fixtures that:
 * 1. Auto-initialize page objects
 * 2. Follow dependency injection pattern for cleaner tests
 * 3. Eliminate the need to manually create page objects in tests
 * 
 * Usage in tests:
 *   test('should submit form', async ({ buyingRequestPageWithMocks }) => {
 *     await buyingRequestPageWithMocks.fillForm(testData);
 *     await buyingRequestPageWithMocks.submit();
 *   });
 */

// ============================================================================
// EXTENDED TEST FIXTURES
// ============================================================================

type ExtendedTestFixtures = {
  buyingRequestPageWithMocks: BuyingRequestPage;
  loginPageWithMocks: LoginPage;
  signupPageWithMocks: SignupPage;
};

export const test = base.extend<ExtendedTestFixtures>({
  /**
   * Fixture: buyingRequestPageWithMocks
   * 
   * Automatically:
   * 1. Navigates to buying request page
   * 2. Provides initialized BuyingRequestPage object
   * 
   * The page object's submit() method directly injects auth modal
   * to simulate successful form submission (bypasses reCAPTCHA)
   */
  buyingRequestPageWithMocks: async ({ page }: { page: Page }, use) => {
    // Navigate to buying request page
    await page.goto('https://staging.pepagora.com/post/buyingRequest');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Continue even if networkidle times out
    });
    await page.waitForTimeout(500);
    
    // Create and provide page object to test
    const buyingRequestPage = new BuyingRequestPage(page);
    await use(buyingRequestPage);
  },

  /**
   * Fixture: loginPageWithMocks
   * 
   * Automatically:
   * 1. Navigates to login page
   * 2. Provides initialized LoginPage object
   * 
   * The page object's login() method directly stores auth tokens
   * to simulate successful login (bypasses reCAPTCHA)
   */
  loginPageWithMocks: async ({ page }: { page: Page }, use) => {
    // Navigate to login page
    await page.goto('https://staging.pepagora.com/connect');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Continue even if networkidle times out
    });
    await page.waitForTimeout(500);
    
    // Create and provide page object to test
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Fixture: signupPageWithMocks
   * 
   * Automatically:
   * 1. Navigates to signup page
   * 2. Provides initialized SignupPage object
   * 
   * The page object's signup() method directly stores auth tokens
   * to simulate successful signup (bypasses reCAPTCHA)
   */
  signupPageWithMocks: async ({ page }: { page: Page }, use) => {
    // Navigate to signup page
    await page.goto('https://staging.pepagora.com/connect');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Continue even if networkidle times out
    });
    await page.waitForTimeout(500);
    
    // Create and provide page object to test
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
});

export { expect };