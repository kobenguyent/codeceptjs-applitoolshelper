let Helper = codecept_helper;
let windowsSize;
let appName;
let client;
let batchInfo;
const supportedHelper = ['Playwright', 'WebDriver'];

class ApplitoolsHelper extends Helper {

    constructor(config) {
        super(config);
        this.config = config;
        appName = config.appName || 'Application Under Test';
        batchInfo = config.batchInfo || 'Visual Tests with the Classic Runner'
    }

    async _before() {
        let _helper;

        for (const item of supportedHelper) {
            if (this.helpers[item]) {
                _helper = item;
                break;
            }
        }

        if (!_helper) throw Error('Not supported Helper!');

        this.helpers[_helper].config.manualStart = true;
        this.helpers[_helper].options.manualStart = true;
        if (this.config.windowSize) {
            windowsSize = this._getWindowsSize(this.config);
        } else if (this.helpers[_helper].config.windowSize) {
            windowsSize = this._getWindowsSize(this.helpers[_helper].config);
        } else {
            windowsSize = {width: 1920, height: 600};
        }
        if (client) {
            await this.helpers[_helper]._stopBrowser();
        }

        if (_helper === 'Playwright') {
            const { page } = this.helpers[_helper];
            client = page;
        }

        if (_helper === 'WebDriver') {
            const { browser } = this.helpers[_helper];
            client = browser;
        }
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
        const { eyes, Target } = await playwrightEyes(this.config);

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
            await eyes.check(pageName, Target.window().fully().layout());
        }

        await eyes.closeAsync();
    }
}

module.exports = ApplitoolsHelper;
