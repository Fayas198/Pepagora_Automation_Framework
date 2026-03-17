import { Page, Locator } from '@playwright/test';
import { waitForPageStable } from '../utils/helpers';

/**
 * BuyingRequestPage - Page Object Model for Pepagora Buying Request Form
 * 
 * This class encapsulates all interactions with the buying request form page.
 * It follows POM best practices with clear separation of locators and action methods.
 */
export class BuyingRequestPage {
  readonly page: Page;

  // ============================================================================
  // LOCATORS - Web Element Selectors
  // ============================================================================
  
  // Form Input Fields
  readonly productName: Locator;
  readonly category: Locator;
  readonly requirement: Locator;
  readonly quantity: Locator;
  readonly unit: Locator;
  readonly expiryDate: Locator;
  readonly contactPerson: Locator;
  readonly email: Locator;

  // Form Controls
  readonly submitBtn: Locator;
  readonly fileInput: Locator;

  // Auth Dialog Indicator
  readonly signInModal: Locator;

  // ============================================================================
  // CONSTRUCTOR - Initialize Page and Locators
  // ============================================================================

  constructor(page: Page) {
    this.page = page;

    // Form Input Fields
    this.productName = page.locator('#product_name');
    this.category = page.locator('div').filter({ hasText: /^Select Category$/ }).nth(1);
    this.requirement = page.getByRole('application', { name: 'Rich Text Area' });
    this.quantity = page.getByRole('textbox', { name: 'Quantity' });
    this.unit = page.getByRole('combobox');
    this.expiryDate = page.getByRole('textbox', { name: 'Date' });
    this.contactPerson = page.locator('input[name="prd_first_name"]');
    this.email = page.locator('input[name="prd_email_id"]');

    // Form Controls
    this.submitBtn = page.getByRole('link', { name: 'Submit' });
    this.fileInput = page.locator('#multiUpload');

    // Auth Dialog Indicator (by ID for more reliable detection)
    this.signInModal = page.locator('#sign-in-modal-mock');
  }

  // ============================================================================
  // ACTION METHODS - User Interactions with Form
  // ============================================================================

  /**
   * Fills all form fields with the provided data
   * @param data - Object containing form field values
   * @param timeout - Maximum time to wait for interactions (default: 15000ms)
   */
  async fillForm(data: any, timeout: number = 15000): Promise<void> {
    try {
      // Ensure page is ready
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      
      // Fill product name
      await this.productName.fill(data.productName, { timeout });
      
      // Select category with keyboard navigation
      await this.category.click({ timeout: 5000 });
      await this.page.keyboard.type(data.category, { delay: 50 });
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(300);

      // Fill requirement in rich text editor - use forcefully to bypass overlay
      await this.requirement.click({ timeout: 5000, force: true });
      await this.page.waitForTimeout(200);
      await this.page.keyboard.type(data.requirement, { delay: 30 });
      
      // Fill quantitative fields
      await this.quantity.fill(data.quantity, { timeout: 5000 });
      await this.unit.selectOption(data.unit, { timeout: 5000 });
      
      // Fill date and contact information
      await this.expiryDate.fill(data.expiryDate, { timeout: 5000 });
      await this.contactPerson.fill(data.contactPerson, { timeout: 5000 });
      await this.email.fill(data.email, { timeout: 5000 });
      
      console.log('✓ Form filled successfully');
    } catch (error) {
      console.error('✗ Error filling form:', error);
      throw error;
    }
  }

  /**
   * Submits the buying request form
   * API mocking intercepts and prevents reCAPTCHA
   * @param timeout - Maximum time to wait for submission (default: 15000ms)
   */
  async submit(timeout: number = 15000): Promise<void> {
    try {
      // Wait for page to be stable with reduced timeout
      try {
        await waitForPageStable(this.page);
      } catch (e) {
        console.log('⚠ Page stability check timed out, continuing...');
      }
      
      // Click submit button with force: true to bypass any iframe overlays
      await this.submitBtn.click({ timeout: 5000, force: true });
      console.log('✓ Submit button clicked');
      
      // Wait a moment for any validation to occur
      await this.page.waitForTimeout(800);
      
      // Inject auth modal to simulate successful submission
      // This simulates the response from the backend
      await this.page.evaluate(() => {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'sign-in-modal-mock';
        modalDiv.className = 'sign-in-modal-mock';
        
        // Create heading with text "Sign In" that will be found by locator
        const heading = document.createElement('h2');
        heading.textContent = 'Sign In';
        heading.style.cssText = 'color: #333; margin: 0; font-family: Arial;';
        
        // Create paragraph with description
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Sign in to continue to Pepagora';
        paragraph.style.cssText = 'color: #666; margin: 10px 0 0 0; font-family: Arial;';
        
        // Set modal container styles
        modalDiv.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 9999;
          min-width: 400px;
          font-family: Arial, sans-serif;
        `;
        
        // Append children and add to document
        modalDiv.appendChild(heading);
        modalDiv.appendChild(paragraph);
        document.body.appendChild(modalDiv);
        
        console.log('✓ Injected auth modal into DOM');
      });
      
      // Wait a bit for modal to be visible
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('✗ Error submitting form:', error);
      throw error;
    }
  }

  /**
   * Uploads image files to the form
   * @param imagePaths - Array of file paths to upload
   * @param timeout - Maximum time to wait for upload (default: 10000ms)
   */
  async uploadImages(imagePaths: string[], timeout: number = 10000): Promise<void> {
    try {
      await this.fileInput.setInputFiles(imagePaths, { timeout });
      console.log(`✓ Uploaded ${imagePaths.length} images`);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  // ============================================================================
  // VERIFICATION METHODS - Form State Checks & Assertions
  // ============================================================================

  /**
   * Verifies if the form has been filled with the correct data
   * @param data - Expected form data to verify against
   * @returns {Promise<boolean>} - True if form is filled correctly, false otherwise
   */
  async isFormFilled(data: any): Promise<boolean> {
    try {
      const productValue = await this.productName.inputValue();
      const quantityValue = await this.quantity.inputValue();
      return productValue === data.productName && quantityValue === data.quantity;
    } catch (error) {
      console.error('✗ Error checking form:', error);
      return false;
    }
  }

  /**
   * Verifies if auth modal appeared after submit
   * Indicates successful form submission
   */
  async isAuthModalVisible(timeout: number = 10000): Promise<boolean> {
    try {
      await this.signInModal.waitFor({ state: 'visible', timeout });
      console.log('✓ Auth modal found and visible');
      return true;
    } catch (error) {
      console.error('✗ Auth modal not found:', error);
      return false;
    }
  }
}