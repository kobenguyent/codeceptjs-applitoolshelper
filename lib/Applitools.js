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

module.exports.webdriverEyes = async function (config) {
    return init('webdriverio',config);
};

module.exports.playwrightEyes = async function (config) {
    return init('playwright',config);
};

module.exports.puppeteerEyes = async function (config) {
    return init('puppeteer',config);
};
