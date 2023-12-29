function init(sdk, config) {
    const { ClassicRunner, BatchInfo, Configuration, Eyes, Target, ConsoleLogHandler } = require(`@applitools/eyes-${sdk}`);
    const Runner = new ClassicRunner();
    const Batch = new BatchInfo({ name: config.batchInfo });
    const Config = new Configuration();
    Config.setBatch(Batch);
    Config.setApiKey(config.applitoolsKey);

    let eyes = new Eyes(Runner, Config);
    eyes.setLogHandler(new ConsoleLogHandler(true));
    return { eyes, Target };
};

async function webdriverEyes (config) {
    return init('webdriverio',config);
};

async function playwrightEyes (config) {
    return init('playwright',config);
};

async function puppeteerEyes (config) {
    return init('puppeteer',config);
};

module.exports = {
    webdriverEyes,
    playwrightEyes,
    puppeteerEyes
}
