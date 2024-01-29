import { ApplitoolsHelperConfig } from '../types';

export function initEyesSdk(sdk: string, config: ApplitoolsHelperConfig): { eyes: any, Target: any, Runner: any } {
    const { ClassicRunner, BatchInfo, Configuration, Eyes, Target, ConsoleLogHandler } = require(`@applitools/eyes-${sdk}`);
    const Runner = new ClassicRunner();
    const Batch = new BatchInfo({ name: config.batchInfo });
    const Config = new Configuration();
    Config.setBatch(Batch);
    Config.setApiKey(config.applitoolsKey);

    const eyes = new Eyes(Runner, Config);

    if (config.debug) {
        eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    return { eyes, Target, Runner };
};

