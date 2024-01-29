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

		if (!config.apiKey) throw Error('Please check your Applitools API key!');

		this.config = merge(defaultConfig, config);
	}

	async _before() {
		for (const item of supportedHelper) {
			if (this.helpers[item]) {
				_helper = item;
				break;
			}
		}

		if (!_helper)
			throw Error(
				`Unsupported Helper! Supported helpers are ${supportedHelper.join(
					',',
				)}`,
			);

		this.helpers[_helper].config.manualStart = true;
		this.helpers[_helper].options.manualStart = true;

		if (this.config.windowSize) {
			windowsSize = getWindowsSize(this.config);
		} else if (this.helpers[_helper].config.windowSize) {
			windowsSize = getWindowsSize(this.helpers[_helper].config);
		} else {
			windowsSize = { width: 1920, height: 600 };
		}

		if (client) {
			await this.helpers[_helper]._stopBrowser();
		}

		client = this.helpers[_helper].page
			? this.helpers[_helper].page
			: this.helpers[_helper].browser;
	}

	/**
	 * Visual check using the eyeCheck method
	 *
	 */
	async eyeCheck({
		pageName,
		element,
		uniqueId,
		matchLevel,
	}: {
		pageName: string;
		element?: string;
		uniqueId?: string;
		matchLevel?: MatchLevel;
	}): Promise<void> {
		const { eyes, Target, Runner } = initEyesSdk(
			_helper.toLowerCase(),
			this.config,
		);

		if (uniqueId) {
			eyes.setBatch(pageName, uniqueId);
		}

		if (matchLevel) {
			eyes.setMatchLevel(matchLevel);
		}

		await eyes.open(client, this.config.appName, pageName, windowsSize);

		if (element) {
			eyes.setForceFullPageScreenshot(false);
			await eyes.check(pageName, Target.region(element));
		} else {
			await eyes.check(pageName, Target.window().fully().layout());
		}

		await eyes.closeAsync();
		await Runner.getAllTestResults();
	}
}

export = ApplitoolsHelper;
