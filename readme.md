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
{
  helpers: {
    WebDriver: {
      url: 'https://www.amazon.de',
      manualStart: true,
      browser: "chrome",
      desiredCapabilities: {
        chromeOptions: {
          args: [ "--headless", '--disable-extensions', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      windowSize: "1440x700",
      smartWait: 5000,
      timeouts: {
        "script": 60000,
        "page load": 10000
      },
    },
    ApplitoolsHelper: {
      require: 'codeceptjs-applitoolshelper',
      applitoolsKey: 'YOUR_API_KEY',
      width: 1440,
      height: 700
    }
  },
}
```

To use this helper you need to provide the following info:
- Important: add this `manualStart: true` to WebDriver helper
- applitoolsKey (Required): You can find your API key under the user menu located at the right hand side of the test manager toolbar
- width/height (Optional): the windows size, if not provided, the default 800x600 will be used.
- appName (Optional): you can either provide your desired application name, if not provided, the default 'Application Under Test' will be used.