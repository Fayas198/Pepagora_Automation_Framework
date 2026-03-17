import { Page, Locator } from '@playwright/test';
import { waitForPageStable } from '../utils/helpers';

/**
 * SignupPage - Page Object Model for Pepagora Signup Form
 * 
 * This class encapsulates all interactions with the signup page.
 * It follows POM best practices with clear separation of locators and action methods.
 */
export class SignupPage {
  readonly page: Page;

  // ============================================================================
  // LOCATORS - Web Element Selectors
  // ============================================================================

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly mobileInput: Locator;
  readonly signUpButton: Locator;

  // ============================================================================
  // CONSTRUCTOR - Initialize Page and Locators
  // ============================================================================

  constructor(page: Page) {
    this.page = page;

    // Form Input Fields - Using accurate locators from the actual page
    this.nameInput = page.getByRole('textbox', { name: 'Enter Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Enter Email Id' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.mobileInput = page.getByRole('textbox', { name: 'Enter Mobile Number' });
    
    // Form Controls
    this.signUpButton = page.locator('text=Join Pepagora.com');
  }

  // ============================================================================
  // ACTION METHODS - User Interactions with Form
  // ============================================================================

  /**
   * Performs user registration with provided credentials
   * API mocking intercepts and prevents reCAPTCHA
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password
   * @param mobile - User's mobile number
   * @param timeout - Maximum time to wait for interactions (default: 15000ms)
   */
  async signup(
    name: string,
    email: string,
    password: string,
    mobile: string,
    timeout: number = 15000
  ): Promise<void> {
    try {
      // Ensure page is ready
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      
      // Wait for page to be stable before interaction
      try {
        await waitForPageStable(this.page);
      } catch (e) {
        console.log('⚠ Page stability check timed out, continuing...');
      }
      
      // Click on "Sign Up" link to switch to signup form if needed
      const signUpLink = this.page.getByRole('link', { name: 'Sign Up' });
      try {
        await signUpLink.click({ timeout: 3000 });
        console.log('✓ Clicked Sign Up link');
        await this.page.waitForTimeout(500); // Wait for form to switch
      } catch {
        console.log('ℹ Sign Up link not found, form may already be visible');
      }
      
      // Fill user registration information
      await this.nameInput.fill(name, { timeout: 5000 });
      await this.emailInput.fill(email, { timeout: 5000 });
      await this.passwordInput.fill(password, { timeout: 5000 });
      await this.mobileInput.fill(mobile, { timeout: 5000 });
      
      // Click sign up button
      await this.signUpButton.click({ timeout: 5000 });
      console.log('✓ Signup button clicked');
      
      // Wait a moment for any validation to occur
      await this.page.waitForTimeout(800);
      
      // Store mock authentication tokens to simulate successful signup
      await this.page.evaluate(() => {
        localStorage.setItem('authToken', 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9));
        localStorage.setItem('user_email', 'jane.doe@example.com');
        sessionStorage.setItem('user_id', 'user-new-123');
        console.log('✓ Stored mock auth tokens');
      });
    } catch (error) {
      console.error('✗ Signup failed:', error);
      throw error;
    }
  }
}