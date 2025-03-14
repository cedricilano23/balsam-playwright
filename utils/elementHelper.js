class ElementHelper {
    constructor(page) {
        this.page = page;
    }

    async clickWhenReady(selector, timeout = 10000) {
        try {
            if (typeof selector === 'string') {
                await this.page.waitForSelector(selector, { state: 'visible', timeout });
                await this.page.click(selector);
            } else {
                await selector.waitFor({ state: 'visible', timeout });
                await selector.click();
            }
        } catch (error) {
            if (error.message.includes('Target closed') || 
                error.message.includes('Target page, context or browser has been closed')) {
                console.error('Page context was closed during operation');
                return;
            }
            throw error;
        }
    }

    async fillWhenReady(selector, text, timeout = 10000) {
        try {
            if (typeof selector === 'string') {
                await this.page.waitForSelector(selector, { state: 'visible', timeout });
                await this.page.fill(selector, text);
            } else {
                await selector.waitFor({ state: 'visible', timeout });
                await selector.fill(text);
            }
        } catch (error) {
            if (error.message.includes('Target closed') || 
                error.message.includes('Target page, context or browser has been closed')) {
                console.error('Page context was closed during operation');
                return;
            }
            console.error(`Failed to fill element: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ElementHelper; 