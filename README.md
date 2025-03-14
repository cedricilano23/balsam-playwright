<<<<<<< HEAD
# balsam-playwright
Automated test suite for Balsam Hill's web application platform using Playwright and Mocha. This framework tests core shopping functionalities including product search, cart operations, and price validations.
=======
# Balsam Hill Test Automation

## Overview
Automated test suite for Balsam Hill's web application platform using Playwright and Mocha. This framework tests core shopping functionalities including product search, cart operations, and price validations.

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation
1. Clone the repository

```bash
git clone <repository-url>
```

```bash
cd balsam-playwright
```

2. Install dependencies

```bash
npm install
```

## Project Structure
```
├── tests/ # E2E Test files
│ └── addToCart.spec.js
├── pages/ # Page Object Models
│ ├── homePage.js
│ ├── productListingPage.js
│ ├── productDetailPage.js
│ └── viewCartPage.js
├── utils/ # Utility functions
│ ├── elementHelper.js
│ ├── waitHelper.js
│ └── assertHelper.js
├── test-data/ # Test data files
│ └── products.json
├── .mocharc.js # Mocha configuration
├── package.json # Project dependencies
└── playwright.config.js # Playwright configuration
```

## Running Tests

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test

# Run in headed mode
npm run test:headed

# View Playwright report
npm run report
```

### Unit Tests (Mocha)
```bash
# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit:watch

# Run unit tests with coverage
npm run test:unit:coverage
```

## Test Features
- Page Object Model design pattern
- Dual testing framework (Playwright for E2E, Mocha for unit tests)
- Cross-browser testing support
- Screenshot capture on failure
- Retry logic for flaky tests
- Environment-based configuration

## Test Scenarios
1. Product Search
2. Price Validation
3. Cart Operations
4. Product Selection
5. Cart Removal
6. Badge Count Validation

## Configuration
The framework supports multiple environments through playwright.config.js:
- Viewport settings: 1280x720
- Timeout: 50000ms
- Screenshots: Only on failure
- Trace: On first retry
- Parallel execution enabled

## Reporting
- HTML reports (Playwright)
- Console logs
- Allure reports
- Mochawesome reports (Unit tests)

## Best Practices Implemented
- Page Object Model
- Custom error handling
- Explicit waits
- Test data separation
- Modular design
- Clean code structure
>>>>>>> master
