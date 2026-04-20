# Pepagora Automation Framework

A comprehensive Playwright-based test automation framework for Pepagora's buying request system. This framework provides end-to-end testing capabilities with specialized testing agents for different aspects of the application.

## 📋 Overview

This project implements automated testing for Pepagora's buying request functionality, including user authentication, form validation, and complete workflow testing. The framework uses Playwright with TypeScript and includes multiple specialized testing agents for comprehensive coverage.

## 🚀 Features

- **Multi-Agent Testing Architecture**: Specialized agents for different testing aspects
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit
- **API Mocking**: Built-in mock interceptors for reliable testing
- **Page Object Model**: Organized page objects for maintainable tests
- **Comprehensive Reporting**: HTML reports with detailed test results
- **Parallel Execution**: Optimized for fast test execution

## 🏗️ Project Structure

```
├── tests/                          # Test specifications
│   ├── agents/                     # Specialized testing agents
│   │   ├── formValidationAgent.spec.ts
│   │   ├── functionalFlowAgent.spec.ts
│   │   ├── negativeTestingAgent.spec.ts
│   │   └── uiInteractionAgent.spec.ts
│   ├── buyingRequest.spec.ts       # Buying request tests
│   ├── login.spec.ts              # Authentication tests
│   ├── signup.spec.ts             # User registration tests
│   └── seed.spec.ts               # Seed test for setup
├── pages/                         # Page Object Models
│   ├── BuyingRequestPage.ts
│   ├── loginPage.ts
│   └── signupPage.ts
├── fixtures/                      # Test fixtures and setup
│   └── testFixtures.ts
├── utils/                         # Utility functions and helpers
│   ├── helpers.ts
│   ├── testUtils.ts
│   ├── mockData.ts
│   ├── mockInterceptor.ts
│   ├── buyingRequestTestData.json
│   └── testData.json
├── reports/                       # Test reports and artifacts
├── test-results/                  # Test execution results
└── playwright-report/             # Playwright HTML reports
```

## 🤖 Testing Agents

### 1. 📋 Form Validation Agent
Validates form input requirements and constraints:
- Mandatory field validation
- Input type validation (numeric, email, date)
- Boundary value testing
- Text length constraints
- Format validation

### 2. 🔄 Functional Flow Agent
Tests complete multi-step workflows:
- Sequential form navigation
- Component interactions
- End-to-end process flows
- State transitions

### 3. 🖱️ UI Interaction Agent
Focuses on user interface interactions:
- Dropdown selections
- File uploads
- Button actions
- Rich text editor functionality

### 4. ❌ Negative Testing Agent
Tests error conditions and edge cases:
- Invalid inputs
- Missing required fields
- Error response handling
- Boundary condition failures

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pepagora_assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suite
```bash
# Run buying request tests
npx playwright test tests/buyingRequest.spec.ts

# Run login tests
npx playwright test tests/login.spec.ts

# Run agent tests
npx playwright test tests/agents/
```

### Run Tests in Specific Browser
```bash
# Run in Chromium only
npx playwright test --project=chromium

# Run in Firefox only
npx playwright test --project=firefox

# Run in WebKit only
npx playwright test --project=webkit
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Generate and View Reports
```bash
# Run tests and generate HTML report
npx playwright test

# View the HTML report
npx playwright show-report
```

## 📊 Test Configuration

The framework is configured in `playwright.config.ts` with the following settings:

- **Parallel Execution**: Tests run in parallel for faster execution
- **Retry Logic**: Automatic retries on CI environments
- **Tracing**: Trace collection on first retry for debugging
- **HTTPS Handling**: Ignores HTTPS errors for staging environments
- **Reporters**: HTML reporting enabled

## 🔧 Development

### Adding New Tests

1. Create test file in appropriate directory
2. Use existing fixtures for setup
3. Follow Page Object Model pattern
4. Add test data to `utils/testData.json`

### Adding New Page Objects

1. Create page class in `pages/` directory
2. Extend base page functionality
3. Implement page-specific methods
4. Export from index file

### Test Data Management

Test data is managed in JSON files:
- `utils/testData.json` - General test data
- `utils/buyingRequestTestData.json` - Buying request specific data

## 📈 Test Results

Current test status (as of latest execution):
- **Total Tests**: 50
- **Pass Rate**: 100%
- **Browsers Tested**: Chromium, Firefox, WebKit
- **Agent Tests**: 42 (all passing)
- **Core Tests**: 8 (all passing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For questions or issues, please refer to the test reports in the `reports/` directory or check the Playwright documentation.