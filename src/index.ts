import { ApplitoolsHelperConfig, MatchLevel, WindowSize } from './types';

const { getWindowsSize } = require('./lib/Common');
const { initEyesSdk } = require('./lib/Applitools');
import { Helper } from 'codeceptjs';
const merge = require('deepmerge');

let windowsSize: WindowSize;
let client: any;
let _helper: string;

const supportedHelper = ['Playwright', 'WebDriver', 'Puppeteer'];
const defaultConfig = {
  appName: 'Application Under Test',
  batchInfo: 'Visual Tests with the Classic Runner',
};

class ApplitoolsHelper extends Helper {
  private readonly config: ApplitoolsHelperConfig;
  public helpers: any;

  constructor(config: ApplitoolsHelperConfig) {
    super(config);
    const { apiKey, ...restConfig } = config;

    if (!apiKey) {
      throw new Error('Please check your Applitools API key!');
    }

    this.config = merge(defaultConfig, restConfig);
  }

  async _before() {
    // Find the supported helper
    _helper = supportedHelper.find((item) => this.helpers[item]);

    if (!_helper) {
      console.error(`Helper not found: ${supportedHelper.join(', ')}`);
      throw new Error(`Unsupported Helper! Supported helpers are ${supportedHelper.join(', ')}`);
    }

    const helperConfig = this.helpers[_helper].config;
    const helperOptions = this.helpers[_helper].options;

    // Enable manual start in the helper
    helperConfig.manualStart = true;
    helperOptions.manualStart = true;

    // Determine window size
    windowsSize = this.config.windowSize || helperConfig.windowSize || { width: 1920, height: 600 };

    // Stop browser if client exists
    if (client) {
      await this.helpers[_helper]._stopBrowser();
    }

    // Assign the client (either page or browser based on helper)
    client = this.helpers[_helper]?.page || this.helpers[_helper]?.browser;
  }

  /**
   * Visual check using the eyeCheck method
   *
   */
  async eyeCheck({
    pageName,
    element,
    uniqueId,
    matchLevel = 'Strict', // Default match level
  }: {
    pageName: string;
    element?: string;
    uniqueId?: string;
    matchLevel?: MatchLevel;
  }): Promise<void> {
    const { eyes, Target, Runner } = initEyesSdk(_helper.toLowerCase(), this.config);

    if (uniqueId) {
      eyes.setBatch(pageName, uniqueId);
    }

    eyes.setMatchLevel(matchLevel);
    await eyes.open(client, this.config.appName, pageName, windowsSize);

    // Perform visual check based on element existence
    if (element) {
      eyes.setForceFullPageScreenshot(false);
      await eyes.check(pageName, Target.region(element));
    } else {
      await eyes.check(pageName, Target.window().fully().layout());
    }

				// Close and get test results in parallel
				await Promise.all([
				  eyes.closeAsync(),
				  Runner.getAllTestResults(),
				]);
  }
}

export = ApplitoolsHelper;