[![NPM](https://nodei.co/npm/codeceptjs-applitoolshelper.png?compact=true)](https://nodei.co/npm/codeceptjs-applitoolshelper/)

# codeceptjs-applitoolshelper
CodeceptJS Applitools helper to integrate the applitool

codeceptjs-applitoolshelper is a [CodeceptJS](https://codecept.io/) helper which can publish tests results on [Applitools](https://applitools.com) after execution.

NPM package: https://www.npmjs.com/package/codeceptjs-applitoolshelper

### Installation
```
npm install @wdio/eyes.webdriverio --save-dev
npm install codeceptjs-applitoolshelper --save-dev
```

### Configuration

This helper should be added in codecept.json/codecept.conf.js

Example:

```js
  helpers: {
    WebDriver: {
      url: 'https://www.amazon.de',
      browser: "chrome",
      desiredCapabilities: {
        chromeOptions: {
          args: [ "--headless", '--disable-extensions', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      windowSize: '1440x700',
      smartWait: 5000,
      timeouts: {
        "script": 60000,
        "page load": 10000
      },
    },
    ApplitoolsHelper: {
      require: 'codeceptjs-applitoolshelper',
      applitoolsKey: 'YOUR_API_KEY'
    }
  },
```

To use this helper you need to provide the following info:
- applitoolsKey (Required): You can find your API key under the user menu located at the right hand side of the test manager toolbar
- windowSize (Optional): the windows size as for instance '1440x700', if not provided, the default 800x600 will be used. The windowSize will follow this precedence: ApplitoolsHelper, Webdriver.
- appName (Optional): you can either provide your desired application name, if not provided, the default 'Application Under Test' will be used.

### Scenario

An example how to use this helper

```javascript
const { I } = inject();

Feature('Applitools functionality');

Before(() => {
    I.amOnPage('https://applitools.com/helloworld');
});

Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyesCheck('Homepage');
});
```