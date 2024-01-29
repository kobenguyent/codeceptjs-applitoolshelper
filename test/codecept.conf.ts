exports.config = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://applitools.com/helloworld',
      desiredCapabilities: {
        chromeOptions: {
          args: [ '--headless', '--disable-extensions', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      windowSize: '1920x600'
    },
    ApplitoolsHelper: {
      require: '../src/index',
      applitoolsKey: process.env.APPLITOOLS_API_KEY
    }
  },
  plugins: {
    tryTo: {
      enabled: true
    }
  },
  name: 'applitools-example'
}
