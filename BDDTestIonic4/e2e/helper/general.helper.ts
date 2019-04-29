import { browser, by, ElementFinder, $, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class GeneralHelper {

    public static async elementExists(finder: string) {
        const finderDeepList = finder.split(' ');
        let foundItem;
        let exists;
        for (const item of finderDeepList) {
            console.log(item);
            try {
                exists = await this.checkExists(item, foundItem);
                if (!exists) {
                    await browser.sleep(3000);
                    exists = await this.checkExists(item, foundItem);
                }
                console.log(item + ' exists is ' + exists);
                if (exists) {
                    foundItem = await this.getItemInstance(item, foundItem);
                }
            } catch (err) {
                console.error(err);
            }
        }
        return exists;
    }

    private static async checkExists(finder: string, foundItem: ElementFinder) {
        let exists;
        if (foundItem) {
            exists = await foundItem.$(finder).isPresent();
        } else {
            exists = await $(finder).isPresent();
        }
        return exists;
    }

    private static async getItemInstance(finder: string, foundItem: ElementFinder) {
        let exists;
        if (foundItem) {
            exists = await foundItem.$(finder);
        } else {
            exists = await $(finder);
        }
        return exists;
    }

    public static async alertExists(text: string) {
        let elementText = await this.getElementText('ion-alert .alert-title');
        if (!elementText.includes(text)) {
            elementText = await this.getElementText('ion-alert .alert-sub-title');
            if (!elementText.includes(text)) {
                elementText = await this.getElementText('ion-alert .alert-message');
                if (!elementText.includes(text)) {
                    return false;
                }
            }
        }
        return true;
    }

    public static async getItem(finder: string) {
        const finderDeepList = finder.split(' ');
        let foundItem;
        let exists;
        for (const item of finderDeepList) {
            exists = await this.checkExists(item, foundItem);
            if (!exists) {
                await browser.sleep(3000);
                exists = await this.checkExists(item, foundItem);
            }
            if (exists) {
                foundItem = await this.getItemInstance(item, foundItem);
            }
        }
        return foundItem;
    }

    public static async clickItem(finder: string) {
        console.error(finder);
        const exists = await this.elementExists(finder);
        console.error(finder + exists);
        if (exists) {
            const item = await this.getItem(finder);
            try {
                const expected = browser.ExpectedConditions;
                await browser.wait(expected.elementToBeClickable(item), 3000);
                // await item.click();
                browser.executeScript('arguments[0].click()', item.getWebElement());
                console.error(finder + 'Item Clicked');
            } catch (e) {
                try {
                    browser.executeScript('arguments[0].click()', item.getWebElement());
                } catch (err) {
                    console.error(e);
                    try {
                        await browser.actions().mouseMove(item).perform();
                        await browser.actions().click().perform();
                        console.error(finder + 'Location Clicked');
                    } catch (e) {
                        console.error(finder + 'exception Occured');
                        throw e;
                    }
                }
            }
        } else {
            throw new Error('No element found');
        }
    }

    public static async sendKeys(finder: string, value: string) {
        const exists = await this.elementExists(finder);
        if (exists) {
            await this.clickItem(finder);
            await this.elementExists(finder);
            const item = await this.getItem(finder);
            item.sendKeys(value);
            item.sendKeys(protractor.Key.TAB);
        } else {
            throw new Error('No element found');
        }
    }

    public static async getElementText(finder: string) {
        const exists = await this.elementExists(finder);
        if (exists) {
            const elem = await this.getItem(finder);
            return elem.getText();
        } else {
            throw new Error('No element found');
        }
    }

    public static async elementExistsByKey(page: string, finder: string, text: string) {
        const exists = await this.elementExists(page);
        console.log(exists);
        if (exists) {
            const count = await $(page).$$(finder).count();
            console.log(count);
            for (let i = 0; i < count; i++) {
                const t: string = await $(page).$$(finder).get(i).getText();
                console.log(t);
                if (t.includes(text)) {
                    return true;
                }
            }
        }
        return false;
    }
}
