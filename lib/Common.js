function getWindowsSize (config) {
    if (!config.windowSize) throw Error(`Your configuration file doesn't have windowSize`);
    return { width: parseInt(config.windowSize.split('x')[0], 10), height: parseInt(config.windowSize.split('x')[1], 10) };
}

function generateRandomString () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {
    getWindowsSize,
    generateRandomString
}
