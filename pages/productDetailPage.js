const ElementHelper = require('../utils/elementHelper');
const WaitHelper = require('../utils/waitHelper');
const AssertHelper = require('../utils/assertHelper');

class ProductDetailPage {
  constructor(page) {
      this.page = page;
      this.elementHelper = new ElementHelper(page);
      this.waitHelper = new WaitHelper(page);
      this.assertHelper = new AssertHelper(page);

      this.productPrice = '.productPrice_new-price__EUt8P';
      this.addToCart = '[data-testid="pdc-btn-addtocart"]';
      this.cartConfirmation = '.productAddToCartModal_title__P67IJ';
      this.viewCartButton = page.getByRole('button', { name: 'View Cart' }).filter({ hasText: 'View Cart' }).first();
      this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async getProductDetailPrice() {
      await this.waitHelper.waitForPrice(this.productPrice);
      return await this.page.textContent(this.productPrice);
  }

  async addProductToCart() {
      await this.elementHelper.clickWhenReady(this.addToCart);
      await this.waitHelper.waitForElement(this.cartConfirmation);
  }

  async viewCart() {
      await this.elementHelper.clickWhenReady(this.viewCartButton);
      await this.waitHelper.waitForNavigation();
  }
}

module.exports = ProductDetailPage;