class AssertHelper {
    constructor(page) {
        this.page = page;
    }

    async verifyElementText(selector, expectedText) {
        const actualText = await this.page.textContent(selector);
        return actualText.trim() === expectedText.trim();
    }

    async verifyElementVisible(selector) {
        return await this.page.isVisible(selector);
    }
}

module.exports = AssertHelper; 