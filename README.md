[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)
[![NPM](https://nodei.co/npm/codeceptjs-applitoolshelper.png?compact=true)](https://nodei.co/npm/codeceptjs-applitoolshelper/)

# codeceptjs-applitoolshelper
Integration of Applitools with CodeceptJS.

The `codeceptjs-applitoolshelper` is a [CodeceptJS](https://codecept.io/) helper designed to publish test results on [Applitools](https://applitools.com) after test execution.

## Installation
```bash
npm i codeceptjs-applitoolshelper --save
npm i webdriverio@5 --save
```

## Configuration
Add the helper to `codecept.conf.ts`:

```js
helpers: {
  Playwright: {
    // ... Playwright configuration
  },
  ApplitoolsHelper: {
    require: 'codeceptjs-applitoolshelper', 
    apiKey: 'YOUR_API_KEY',
    debug: true // enable verbose log
    // ... other configuration options
  },
}
```

| Key          | Description                                                                                                                                                                                                     |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`     | (Required) API key found under the user menu on the right-hand side of the test manager toolbar.                                                                                                               |
| `windowSize` | (Optional) Window size, e.g., `1440x700`. If not provided, the default `1920x600` is used. The window size follows this precedence: ApplitoolsHelper, Webdriver.                                                |
| `appName`    | (Optional) Desired application name. If not provided, the default 'Application Under Test' is used.                                                                                                           |
| `batchInfo`  | (Optional) Desired batch info. If not provided, the default 'Visual Tests with the Classic Runner' is used.                                                                                                    |
| `debug`      | (Optional) Enable verbose log.                                                                                                                                                                                  |


## Usage Example
```js
const { I } = inject();

Feature('Applitools functionality');

Scenario('Check home page @test', async () => {
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'Homepage' });
});

Scenario('Check a CTA button on home page @test', async () => {
    const targetElement = 'div.section.button-section > button';
    I.amOnPage('https://applitools.com/helloworld');
    await I.eyeCheck({ pageName: 'CTA button', element: targetElement });
});

// Additional scenarios...

```

## Test Results
- Passed Test:
  ```
  CodeceptJS v3.5.11 #StandWithUkraine
  ...
  Applitools functionality --
  [1]  Starting recording promises
  Check home page @test
  I am on page "https://applitools.com/helloworld"
  I eye check {"pageName":"Homepage"}
  ✔ OK in 17113ms
  ...
  ```

- Failed Test:
  ```
  CodeceptJS v3.5.11 #StandWithUkraine
  ...
  Applitools functionality --
      [1]  Starting recording promises
      Check home page @test
      I am on page "https://applitools.com/helloworld"
      I eye check {"pageName":"Homepage"}
      I am on page "https://google.com"
      ...
      ✖ FAILED in 43435ms
  
  -- FAILURES:

  1) Applitools functionality
       Check home page @test:
     Test 'Homepage' of 'Application Under Test' detected differences! See details at: https://eyes.applitools.com/app/batches/xxxx/xxxx?accountId=xxxx
      at ClassicRunner.getAllTestResults (node_modules/@applitools/eyes-api/dist/Runners.js:64:23)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async Test.<anonymous> (applitools_test.ts:9:5)
  
  Scenario Steps:
  - I.eyeCheck({"pageName":"Homepage"}) at Test.<anonymous> (./applitools_test.ts:9:13)
  - I.amOnPage("https://google.com") at Test.<anonymous> (./applitools_test.ts:8:7)
  - I.eyeCheck({"pageName":"Homepage"}) at Test.<anonymous> (./applitools_test.ts:7:13)
  - I.amOnPage("https://applitools.com/helloworld") at Test.<anonymous> (./applitools_test.ts:6:7)
  
  Artifacts:
  - screenshot: /Users/t/Desktop/projects/applitools-example/output/Check_home_page_@test.failed.png
      ...
  ```

## Example Repo
Explore the functionalities with the [example repository](https://github.com/kobenguyent/applitools-example).
