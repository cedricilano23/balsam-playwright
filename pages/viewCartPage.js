const ElementHelper = require('../utils/elementHelper');
const WaitHelper = require('../utils/waitHelper');
const AssertHelper = require('../utils/assertHelper');

class ViewCartPage {
  constructor(page) {
      this.page = page;
      this.elementHelper = new ElementHelper(page);
      this.waitHelper = new WaitHelper(page);
      this.assertHelper = new AssertHelper(page);

      this.cartIcon = page.locator('.undefined img-fluid').first();
      this.cartBadge = page.locator('a[aria-label*="Cart"] span').first();
      this.cartPrice = page.locator('.cartProductDetailItem_new_price__3YLJa');
      this.removeItemButton = page.locator('.delete.cartProductDetailItem_delete-icon__8MHyf');
      this.confirmationMessage = page.locator('.cartProductDetailItem_product-name-wrapper__2Yaco');
  }

  async open() {
      await this.elementHelper.clickWhenReady(this.cartIcon);
      await this.waitHelper.waitForNavigation();
  }

  async validateCartItem() {
      return await this.page.isVisible(this.cartIcon);
  }

  async validateCartPrice(expectedPrice) {
      const actualPrice = await this.page.textContent(this.cartPrice);
      return actualPrice.trim() === expectedPrice.trim();
  }

  async removeItem() {
      await this.elementHelper.clickWhenReady(this.removeItemButton);
      await this.waitHelper.waitForElement(this.confirmationMessage);
  }

  async validateItemRemoved() {
      return await this.page.isVisible(this.confirmationMessage);
  }

  async getCartBadgeCount(waitForUpdate = false) {
    const cartBadgeSelector = 'a[aria-label*="Cart"] span';
    
    if (waitForUpdate) {
        await this.waitHelper.waitForElement(cartBadgeSelector);
        const badge = await this.page.textContent(cartBadgeSelector);
        return parseInt(badge || '0', 10);
    }
    
    const exists = await this.page.$(cartBadgeSelector);
    if (!exists) return 0;
    
    const badge = await this.page.textContent(cartBadgeSelector);
    return parseInt(badge || '0', 10);
  }
}

module.exports = ViewCartPage;
