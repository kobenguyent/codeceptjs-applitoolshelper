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
        let _helper;

        if (this.helpers['WebDriver']) {
            _helper = this.helpers['WebDriver'];
        }

        if (this.helpers['Playwright']) {
            _helper = this.helpers['Playwright'];
        }


        _helper.config.manualStart = true;
        _helper.options.manualStart = true;
        if (this.config.windowSize) {
            windowsSize = this._getWindowsSize(this.config);
        } else if (_helper.config.windowSize) {
            windowsSize = this._getWindowsSize(_helper.config);
        } else {
            windowsSize = {width: 1920, height: 600};
        }
        if (client) {
            await _helper._stopBrowser();
        }
        //client = await this.helpers[_helper]._startBrowser();
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
    async eyeCheck({ pageName, element, uniqueId, matchLevel }) {
        const { playwrightEyes, wdioEyes } = require('./lib/Applitools');
        const { eyes, Target } = playwrightEyes(this.config.applitoolsKey);

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
