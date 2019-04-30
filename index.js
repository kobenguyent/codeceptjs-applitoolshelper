const { Eyes, Target } = require('@wdio/eyes.webdriverio');
let eyes = new Eyes();
let Helper = codecept_helper;
let windowsSize;
let appName;
let config;

class ApplitoolsHelper extends Helper {

    constructor(config) {
        super(config);
        this.config = config;
        eyes.setApiKey(config.applitoolsKey);
        appName = config.appName || 'Application Under Test';
    }

    async _beforeSuite(suite) {
        this.helpers['WebDriver'].config.manualStart = true;
        this.helpers['WebDriver'].options.manualStart = true;
        if (this.config.windowSize) {
            windowsSize = this._getWindowsSize(this.config);
        } else if (this.helpers['WebDriver'].config.windowSize) {
            windowsSize = this._getWindowsSize(this.helpers['WebDriver'].config);
        } else {
            windowsSize = { width: 800, height: 600 };
        }

        let client = await this.helpers['WebDriver']._startBrowser();
        await eyes.open(client, appName, suite.title, windowsSize);
    }

    _getWindowsSize(config) {
        return { width: parseInt(config.windowSize.split('x')[0], 10), height: parseInt(config.windowSize.split('x')[1], 10) }
    }

    async eyesCheck(pageName) {
        await eyes.check(pageName, Target.window());
        await eyes.close();
    }

}

module.exports = ApplitoolsHelper;