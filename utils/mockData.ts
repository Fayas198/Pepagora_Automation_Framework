/**
 * MOCK DATA - Backend response mocking
 * 
 * Contains mock responses for API endpoints
 * Simulates successful form submissions and auth flows
 */

// ============================================================================
// BUYING REQUEST MOCK RESPONSES
// ============================================================================

export const mockBuyingRequestResponses = {
  /**
   * Mock successful form submission response
   */
  submitSuccess: {
    success: true,
    message: 'Buying request submitted successfully',
    requestId: 'BR-12345',
    status: 'PENDING_REVIEW',
    timestamp: new Date().toISOString(),
  },

  /**
   * Mock validation error response
   */
  validationError: {
    success: false,
    message: 'Form validation failed',
    errors: {
      productName: 'Product name is required',
      category: 'Category is required',
      quantity: 'Quantity must be greater than 0',
    },
  },

  /**
   * Mock authentication required response
   */
  authRequired: {
    success: false,
    message: 'Authentication required',
    statusCode: 401,
    requiresAuth: true,
  },
};

// ============================================================================
// LOGIN MOCK RESPONSES
// ============================================================================

export const mockLoginResponses = {
  /**
   * Mock successful login response
   */
  loginSuccess: {
    success: true,
    message: 'Login successful',
    token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9),
    user: {
      id: 'user-123',
      email: 'existing@example.com',
      name: 'Test User',
    },
  },

  /**
   * Mock login failure
   */
  loginFailure: {
    success: false,
    message: 'Invalid email or password',
    statusCode: 401,
  },
};

// ============================================================================
// SIGNUP MOCK RESPONSES
// ============================================================================

export const mockSignupResponses = {
  /**
   * Mock successful signup response
   */
  signupSuccess: {
    success: true,
    message: 'Signup successful',
    token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9),
    user: {
      id: 'user-new-123',
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
    },
  },

  /**
   * Mock signup failure - email exists
   */
  emailExists: {
    success: false,
    message: 'Email already registered',
    statusCode: 409,
    code: 'EMAIL_EXISTS',
  },
};
