const { Eyes, Target } = require('@applitools/eyes-webdriverio');
let eyes = new Eyes();
let Helper = codecept_helper;
let windowsSize;
let appName;
let client;

class ApplitoolsHelper extends Helper {

    constructor(config) {
        super(config);
        this.config = config;
        appName = config.appName || 'Application Under Test';
    }

    async _beforeSuite() {
        this.helpers['WebDriver'].config.manualStart = true;
        this.helpers['WebDriver'].options.manualStart = true;
        if (this.config.windowSize) {
            windowsSize = this._getWindowsSize(this.config);
        } else if (this.helpers['WebDriver'].config.windowSize) {
            windowsSize = this._getWindowsSize(this.helpers['WebDriver'].config);
        } else {
            windowsSize = {'width': 1920, 'height': 600};
        }
        if (client) {
            await this.helpers['WebDriver']._stopBrowser();
        }
        client = await this.helpers['WebDriver']._startBrowser();
    }

    _getWindowsSize(config) {
        return { width: parseInt(config.windowSize.split('x')[0], 10), height: parseInt(config.windowSize.split('x')[1], 10) }
    }

    _generateRandomString() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
    * @param pageName {String} name of the page you want to check
    * @param element {String} selector of the target element which will be used as area for screenshot
    * @param uniqueId {String} provide a unique id to combine tests into a batch
    * @param matchLevel {String} set the match level. Possible values: Exact, Strict, Content, Layout
    * 
     */
    async eyeCheck(pageName, element, uniqueId, matchLevel) {
        eyes.setApiKey(this.config.applitoolsKey);

        if (uniqueId) {
            eyes.setBatch(pageName, uniqueId); 
        }

        if (matchLevel) {
            eyes.setMatchLevel(matchLevel);
        }

        await eyes.open(client, appName, pageName, windowsSize);

        if (element) {
            eyes.setForceFullPageScreenshot(false);
            await eyes.check(pageName, Target.region(element));
        } else {
            eyes.setForceFullPageScreenshot(true);
            await eyes.check(pageName, Target.window());
        }
        
        await eyes.close();
    }
}

module.exports = ApplitoolsHelper;