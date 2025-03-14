const ElementHelper = require('../utils/elementHelper');
const WaitHelper = require('../utils/waitHelper');

class HomePage {
  constructor(page) {
      this.page = page;
      this.elementHelper = new ElementHelper(page);
      this.waitHelper = new WaitHelper(page);
      
      this.searchBar = page.getByRole('searchbox');
      this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async navigate() {
    await this.page.goto('/');
    await this.waitHelper.waitForNavigation();
  }

  async searchProducts(productName) {
    await this.elementHelper.fillWhenReady(this.searchBar, productName);
    await this.elementHelper.clickWhenReady(this.searchButton);
    await this.waitHelper.waitForNavigation();
  }
}

module.exports = HomePage;