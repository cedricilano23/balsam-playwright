module.exports = {
  spec: ['unit-tests/**/*.spec.js'],  // Test file pattern
  ignore: ['tests/**/*.spec.js'],     // Ignore Playwright tests
  timeout: 5000,
  reporter: 'spec',
  require: ['@babel/register']
}; 