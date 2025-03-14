const ElementHelper = require('../utils/elementHelper');
const WaitHelper = require('../utils/waitHelper');
const AssertHelper = require('../utils/assertHelper');

class ProductListingPage {
  constructor(page) {
      this.page = page;
      this.elementHelper = new ElementHelper(page);
      this.waitHelper = new WaitHelper(page);
      this.assertHelper = new AssertHelper(page);

      this.searchResults = page.locator('[data-testid="results-grid"]');
      this.productItems = page.locator('[data-cnstrc-item-id]');
      this.productPrice = page.locator('[data-testid="undefined-lbl-undefinedprice"]');
  }

  async selectProductByIndex(index) {   
      await this.elementHelper.clickWhenReady(this.productItems.nth(index));
  }

  async getProductListingPrice(index) {
      await this.waitHelper.waitForPrice(this.productPrice.nth(index));
      return await this.productPrice.nth(index).textContent();
  }
}

module.exports = ProductListingPage;
