module.exports.wdioEyes = function (config) {
    const { Eyes, Target } = require('@applitools/eyes-webdriverio');
    let eyes = new Eyes();
    eyes.setApiKey(config.applitoolsKey);
    return { eyes, Target };
};

module.exports.playwrightEyes = function (config) {
    const { Eyes, Target } = require('@applitools/eyes-playwright');
    let eyes = new Eyes();
    eyes.setApiKey(config.applitoolsKey);
    return { eyes, Target };
}
