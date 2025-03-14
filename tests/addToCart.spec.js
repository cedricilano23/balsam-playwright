const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ProductListingPage = require('../pages/productListingPage');
const ProductDetailPage = require('../pages/productDetailPage');
const ViewCartPage = require('../pages/viewCartPage');
const testData = require('../test-data/products.json');

//TODO: Add logger to the test  
test.describe('Balsam Hill Shopping Flow', () => {
    let homePage;
    let productListingPage;
    let productDetailPage;
    let viewCartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productListingPage = new ProductListingPage(page);
        productDetailPage = new ProductDetailPage(page);
        viewCartPage = new ViewCartPage(page);
        await homePage.navigate();
    });

    test('Should validate product price consistency and cart operations', async ({ page }) => {
        const initialBadgeCount = await viewCartPage.getCartBadgeCount();
        expect(initialBadgeCount).toBe(0);
        
        await homePage.searchProducts(testData.searchProducts.christmasTree);
        
        const listingPrice = await productListingPage.getProductListingPrice(2);
        await productListingPage.selectProductByIndex(2);
        
        await expect(productListingPage.searchResults).toBeVisible();
        const detailPrice = await productDetailPage.getProductDetailPrice();
        expect(detailPrice).toBe(listingPrice);

        await productDetailPage.addProductToCart();
        
        const badgeCount = await viewCartPage.getCartBadgeCount(true);
        expect(badgeCount).toBe(1);

        await productDetailPage.viewCart();
        
        await expect(viewCartPage.cartPrice).toHaveText(detailPrice);
        await viewCartPage.removeItem();
        await expect(viewCartPage.confirmationMessage).toContainText('has been removed');
    });

    test('Should display search results', async ({ page }) => {
        const searchProducts = testData.searchProducts.christmasTree;

        await homePage.searchProducts(searchProducts);

        await expect(productListingPage.searchResults).toBeVisible();
    });

    test('Should validate initial cart is empty', async ({ page }) => {
        const initialBadgeCount = await viewCartPage.getCartBadgeCount();
        expect(initialBadgeCount).toBe(0);
    });

    test('Should validate price consistency between listing and detail pages', async ({ page }) => {
        await homePage.searchProducts(testData.searchProducts.christmasTree);
        
        const listingPrice = await productListingPage.getProductListingPrice(2);
        await productListingPage.selectProductByIndex(2);
        
        await expect(productListingPage.searchResults).toBeVisible();
        const detailPrice = await productDetailPage.getProductDetailPrice();
        expect(detailPrice).toBe(listingPrice);
    });

    test('Should validate add to cart functionality', async ({ page }) => {
        await homePage.searchProducts(testData.searchProducts.christmasTree);
        await productListingPage.selectProductByIndex(2);
        const detailPrice = await productDetailPage.getProductDetailPrice();
        
        await productDetailPage.addProductToCart();
        
        const badgeCount = await viewCartPage.getCartBadgeCount(true);
        expect(badgeCount).toBe(1);

        await productDetailPage.viewCart();
        await expect(viewCartPage.cartPrice).toHaveText(detailPrice);
    });

    test('Should validate remove from cart functionality', async ({ page }) => {
        await homePage.searchProducts(testData.searchProducts.christmasTree);
        await productListingPage.selectProductByIndex(2);
        await productDetailPage.addProductToCart();
        await productDetailPage.viewCart();
        
        await viewCartPage.removeItem();
        await expect(viewCartPage.confirmationMessage).toContainText('has been removed');
    });
});
