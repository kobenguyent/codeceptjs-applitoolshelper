[![NPM](https://nodei.co/npm/codeceptjs-applitoolshelper.png?compact=true)](https://nodei.co/npm/codeceptjs-applitoolshelper/)

# codeceptjs-applitoolshelper
CodeceptJS Applitools helper to integrate the applitool

codeceptjs-applitoolshelper is a [CodeceptJS](https://codecept.io/) helper which can publish tests results on [Applitools](https://applitools.com) after the tests execution.

NPM package: https://www.npmjs.com/package/codeceptjs-applitoolshelper

### Installation
```
npm i codeceptjs-applitoolshelper --save
npm i webdriverio@5 --save
```

### Configuration

This helper should be added in `codecept.conf.ts/codecept.conf.js`

Example:

```js
...
  helpers: {
    Playwright: {
      url: 'https://applitools.com/helloworld',
      browser: 'chromium',
      desiredCapabilities: {
        chromeOptions: {
          args: [ '--headless', '--disable-extensions', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      windowSize: '1920x600',
      smartWait: 5000,
      timeouts: {
        'script': 60000,
        'page load': 10000
      },
    },
    ApplitoolsHelper: {
      require: 'codeceptjs-applitoolshelper',
      applitoolsKey: 'YOUR_API_KEY'
    }
  },
...
```
[![Screenshot](http://g.recordit.co/5kDTZ3TLAS.gif)]

To use this helper you need to provide the following info:
- `applitoolsKey` (Required): You can find your API key under the user menu located at the right hand side of the test manager toolbar
- `windowSize` (Optional): the windows size as for instance `1440x700`, if not provided, the default `1920x600` will be used. The windowSize will follow this precedence: ApplitoolsHelper, Webdriver.
- `appName` (Optional): you can either provide your desired application name, if not provided, the default 'Application Under Test' will be used.
- `batchInfo` (Optional): you can either provide your desired batch info, if not provided, the default 'Visual Tests with the Classic Runner' will be used.

### Scenario

Usage example

```js
const { I } = inject();

Feature('Applitools functionality');

// Provide just the page name to take a full page screenshot
Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'Homepage' });
});

// To be able to focus just on a single element instead of the full page, provide the element selector 
// more info could be found here https://www.npmjs.com/package/@applitools/eyes-webdriverio#region-screenshot
Scenario('Check a CTA button on home page @test', async () => {
    const targetElement = 'div.section.button-section > button';
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'CTA button', element: targetElement });
});

// Provide the third param to gather multiple tests
// more info could be found here https://help.applitools.com/hc/en-us/articles/360006914772-Batching
Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'Homepage', uniqueId: 'Unique ID' });
});

// Provide the fourth param to set the match level
// more info could be found here https://help.applitools.com/hc/en-us/articles/360007188591-Match-Levels
Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'Homepage', matchLevel: 'Layout' });
});

```



For your reference, you can check out this repo: https://github.com/PeterNgTr/applitools-example
