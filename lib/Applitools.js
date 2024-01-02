function initEyesSdk(sdk, config) {
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

module.exports = {
    initEyesSdk
}
