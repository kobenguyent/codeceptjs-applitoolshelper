/*
*  Get the window size
*
* */
import { WindowSize } from '../types';

export function getWindowsSize (config: any): WindowSize {
    if (!config.windowSize) throw Error(`Your configuration file doesn't have windowSize`);
    return { width: parseInt(config.windowSize.split('x')[0], 10), height: parseInt(config.windowSize.split('x')[1], 10) };
}
