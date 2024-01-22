[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)
[![NPM](https://nodei.co/npm/codeceptjs-applitoolshelper.png?compact=true)](https://nodei.co/npm/codeceptjs-applitoolshelper/)

# codeceptjs-applitoolshelper
CodeceptJS Applitools integration.

codeceptjs-applitoolshelper is a [CodeceptJS](https://codecept.io/) helper which can publish tests results on [Applitools](https://applitools.com) after the tests' execution.

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
      applitoolsKey: 'YOUR_API_KEY',
      debug: true // enable the verbose log
    }
  },
...
```
![Screenshot](http://g.recordit.co/5kDTZ3TLAS.gif)

To use this helper you need to provide the following info:
- `applitoolsKey` (Required): You can find your API key under the user menu located on the right hand side of the test manager toolbar
- `windowSize` (Optional): the windows size as for instance `1440x700`, if not provided, the default `1920x600` will be used. The windowSize will follow this precedence: ApplitoolsHelper, Webdriver.
- `appName` (Optional): you can either provide your desired application name, if not provided, the default 'Application Under Test' will be used.
- `batchInfo` (Optional): you can either provide your desired batch info, if not provided, the default 'Visual Tests with the Classic Runner' will be used.
- `debug` (Optional):  enable the verbose log

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

#### Test results

Passed test:
```
CodeceptJS v3.5.11 #StandWithUkraine
Using test root "/Users/t/Desktop/projects/applitools-example"
Helpers: Playwright, ApplitoolsHelper
Plugins: screenshotOnFail

Applitools functionality --
[1]  Starting recording promises
Timeouts:
› [Session] Starting singleton browser session
Check home page @test
I am on page "https://applitools.com/helloworld"
I eye check {"pageName":"Homepage"}
✔ OK in 17113ms


OK  | 1 passed   // 17s
```

Failed test:
```
CodeceptJS v3.5.11 #StandWithUkraine
Using test root "/Users/t/Desktop/projects/applitools-example"
Helpers: Playwright, ApplitoolsHelper
Plugins: screenshotOnFail

Applitools functionality --
    [1]  Starting recording promises
    Timeouts: 
 › [Session] Starting singleton browser session
  Check home page @test
    I am on page "https://applitools.com/helloworld"
    I eye check {"pageName":"Homepage"}
    I am on page "https://google.com"
    › [Browser:Error] Permissions policy violation: unload is not allowed in this document.
    I eye check {"pageName":"Homepage"}
    [1] Error (Non-Terminated) | Error: Test 'Homepage' of 'Application Under Test' detected differences! See details at: https://eyes.applitools.com/app/batches/xxxx/xxxx?accountId=xxxx | (err) => { step.status = 'failed'; step.endTime = ...
    [1] Error | Error: Test 'Homepage' of 'Application Under Test' detected differences! See details at: https://eyes.applitools.com/app/batches/00000251696383416241/xxxx/xxxx?accountId=xxxx (e) => { const err = (recorder.getAsyncErr() === n...
    [1] <teardown> Stopping recording promises
 › <screenshotOnFail> Test failed, try to save a screenshot
 › Screenshot is saving to /Users/t/Desktop/projects/applitools-example/output/Check_home_page_@test.failed.png
  ✖ FAILED in 43435ms

    [2]  Starting recording promises

-- FAILURES:

  1) Applitools functionality
       Check home page @test:
     Test 'Homepage' of 'Application Under Test' detected differences! See details at: https://eyes.applitools.com/app/batches/xxxx/xxxx?accountId=xxxx
      at ClassicRunner.getAllTestResults (node_modules/@applitools/eyes-api/dist/Runners.js:64:23)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async Test.<anonymous> (applitools_test.js:9:5)
  
  Scenario Steps:
  - I.eyeCheck({"pageName":"Homepage"}) at Test.<anonymous> (./applitools_test.js:9:13)
  - I.amOnPage("https://google.com") at Test.<anonymous> (./applitools_test.js:8:7)
  - I.eyeCheck({"pageName":"Homepage"}) at Test.<anonymous> (./applitools_test.js:7:13)
  - I.amOnPage("https://applitools.com/helloworld") at Test.<anonymous> (./applitools_test.js:6:7)
  
  Artifacts:
  - screenshot: /Users/t/Desktop/projects/applitools-example/output/Check_home_page_@test.failed.png


  FAIL  | 0 passed, 1 failed   // 44s

```

### Example Repo
To play around with this, you could checkout this repo: https://github.com/kobenguyent/applitools-example
