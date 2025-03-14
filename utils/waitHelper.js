class WaitHelper {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector, timeout = 10000) {
        try {
            if (typeof selector === 'string') {
                await this.page.waitForSelector(selector, { state: 'visible', timeout });
            } else {
                await selector.waitFor({ state: 'visible', timeout });
            }
        } catch (error) {
            console.error(`Failed to find element: ${selector}`, error);
            throw error;
        }
    }
    
    async waitForNavigation(timeout = 30000) {
        try {
            await this.page.waitForLoadState('networkidle', { timeout });
        } catch (error) {
            console.warn('Navigation timeout, continuing test...');
        }
    }

    async waitForPrice(selector, timeout = 10000) {
        await this.waitForElement(selector, timeout);
        
        if (typeof selector === 'string') {
            await this.page.waitForFunction(
                (sel) => {
                    const element = document.querySelector(sel);
                    return element && element.textContent.trim() !== '';
                },
                selector,
                { timeout }
            );
        } else {
            await selector.waitFor(element => element.textContent.trim() !== '', { timeout });
        }
    }
}

module.exports = WaitHelper; 