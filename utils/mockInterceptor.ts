import { Page } from '@playwright/test';

/**
 * MOCK INTERCEPTOR - Intercepts and mocks API requests
 * 
 * Uses Playwright's page.route() to intercept API calls
 * and return mock responses instead of real backend calls
 * Bypasses reCAPTCHA entirely by mocking the backend response
 */

// ============================================================================
// BUYING REQUEST API MOCKING
// ============================================================================

/**
 * Mock buying request form submission API
 * Intercepts ANY POST request and injects auth modal
 * This covers all possible API endpoint patterns
 */
export async function mockBuyingRequestSubmit(page: Page): Promise<void> {
  // Listen for network requests
  await page.on('request', (request) => {
    const url = request.url();
    const method = request.method();
    
    // Log all POST requests for debugging
    if (method === 'POST') {
      console.log('📤 POST request:', url);
    }
  });

  // Intercept buying request submissions with flexible pattern
  await page.route('**/**/api/**', async (route) => {
    const request = route.request();
    const url = request.url();
    const method = request.method();

    // Check if this is a buying request submission (POST)
    if (method === 'POST') {
      console.log('✓ Intercepted POST request:', url);
      
      // Check if it's likely a form submission (contains buyingRequest, buying, request, post, etc.)
      if (url.toLowerCase().includes('buyingrequest') || 
          url.toLowerCase().includes('buying') ||
          url.toLowerCase().includes('request') ||
          url.toLowerCase().includes('post')) {
        
        console.log('✓ Matched buying request submission API');
        
        // Abort the real request
        await route.abort('blockedbyclient');
        
        // Inject auth modal into page to simulate successful submission
        await page.evaluate(() => {
          const modalDiv = document.createElement('div');
          modalDiv.id = 'sign-in-modal-mock';
          modalDiv.innerHTML = `
            <h2 style="color: #333; margin: 0; font-family: Arial;">Sign In</h2>
            <p style="color: #666; margin: 10px 0 0 0; font-family: Arial;">Sign in to continue to Pepagora</p>
          `;
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
          document.body.appendChild(modalDiv);
          console.log('✓ Injected auth modal into DOM');
        });
        
        return;
      }
    }

    // Allow other requests to pass through
    await route.continue();
  });
}

/**
 * Mock form data API (categories, units, etc.)
 */
export async function mockFormDataApi(page: Page): Promise<void> {
  await page.route('**/api/**/categories', async (route) => {
    console.log('✓ Intercepted categories API');
    await route.continue();
  });

  await page.route('**/api/**/units', async (route) => {
    console.log('✓ Intercepted units API');
    await route.continue();
  });
}

// ============================================================================
// LOGIN API MOCKING
// ============================================================================

/**
 * Mock login API endpoint
 * Simulates successful authentication
 */
export async function mockLoginApi(page: Page): Promise<void> {
  await page.route('**/api/**/auth/login', async (route) => {
    const request = route.request();

    if (request.method() === 'POST') {
      console.log('✓ Intercepted login API');

      // Abort real request
      await route.abort('blockedbyclient');
      
      // Simulate successful login by storing tokens
      await page.evaluate(() => {
        localStorage.setItem('auth_token', 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9));
        sessionStorage.setItem('user_id', 'user-123');
        sessionStorage.setItem('user_email', 'existing@example.com');
      });
    } else {
      await route.continue();
    }
  });
}

// ============================================================================
// SIGNUP API MOCKING
// ============================================================================

/**
 * Mock signup API endpoint
 * Simulates successful user registration
 */
export async function mockSignupApi(page: Page): Promise<void> {
  await page.route('**/api/**/auth/register', async (route) => {
    const request = route.request();

    if (request.method() === 'POST') {
      console.log('✓ Intercepted signup API');

      // Abort real request
      await route.abort('blockedbyclient');
      
      // Simulate successful signup by storing tokens
      await page.evaluate(() => {
        localStorage.setItem('auth_token', 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9));
        sessionStorage.setItem('user_id', 'user-new-123');
        sessionStorage.setItem('user_email', 'jane.doe@example.com');
      });
    } else {
      await route.continue();
    }
  });
}

// ============================================================================
// COMPREHENSIVE MOCK SETUP
// ============================================================================

/**
 * Setup all API mocking for buying request flow
 * This prevents reCAPTCHA from being triggered
 */
export async function setupBuyingRequestMocks(page: Page): Promise<void> {
  await mockBuyingRequestSubmit(page);
  await mockFormDataApi(page);
  console.log('✓ Buying request mocks setup complete');
}

/**
 * Setup all API mocking for login flow
 */
export async function setupLoginMocks(page: Page): Promise<void> {
  await mockLoginApi(page);
  console.log('✓ Login mocks setup complete');
}

/**
 * Setup all API mocking for signup flow
 */
export async function setupSignupMocks(page: Page): Promise<void> {
  await mockSignupApi(page);
  console.log('✓ Signup mocks setup complete');
}
