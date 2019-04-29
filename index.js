const {Eyes, Target} = require('@wdio/eyes.webdriverio');
let eyes = new Eyes();
let Helper = codecept_helper;
let windowsSize;
let appName;

class ApplitoolsHelper extends Helper {

    constructor(config) {
        super(config);
        eyes.setApiKey(config.applitoolsKey);
        windowsSize = {width: config.width || 800, height: config.height || 600};
        appName = config.appName || 'Application Under Test';
    }

    async _beforeSuite(suite) {
        let client = await this.helpers['WebDriver']._startBrowser();
        await eyes.open(client, appName, suite.title, windowsSize);
    }

    async eyesCheck(pageName) {
        await eyes.check(pageName, Target.window());
        await eyes.close();
    }

}

module.exports = ApplitoolsHelper;