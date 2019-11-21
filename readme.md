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

This helper should be added in `codecept.json/codecept.conf.js`

Example:

```js
...
  helpers: {
    WebDriver: {
      url: 'https://applitools.com/helloworld',
      browser: 'chrome',
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

To use this helper you need to provide the following info:
- `applitoolsKey` (Required): You can find your API key under the user menu located at the right hand side of the test manager toolbar
- `windowSize` (Optional): the windows size as for instance `1440x700`, if not provided, the default `1920x600` will be used. The windowSize will follow this precedence: ApplitoolsHelper, Webdriver.
- `appName` (Optional): you can either provide your desired application name, if not provided, the default 'Application Under Test' will be used.

### Scenario

An example how to use this helper

```js
const { I } = inject();

Feature('Applitools functionality');

Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck('Homepage');
});

// Provide the second param to gather multiple tests
// more info could be found here https://help.applitools.com/hc/en-us/articles/360006914772-Batching
Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck('Homepage', 'Layout');
});

// Provide the third param to set the match level
// more info could be found here https://help.applitools.com/hc/en-us/articles/360007188591-Match-Levels
Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck('Homepage', 'Homepage', 'Layout');
});

```

For your reference, you can check out this repo: https://github.com/PeterNgTr/applitools-example