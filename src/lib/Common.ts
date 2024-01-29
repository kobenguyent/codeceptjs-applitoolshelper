/*
 *  Get the window size
 *
 * */
import { ApplitoolsHelperConfig, WindowSize } from '../types';

export function getWindowsSize(config: ApplitoolsHelperConfig): WindowSize {
	if (!config.windowSize)
		throw Error(`Your configuration file doesn't have windowSize`);
	return {
		width: parseInt(config.windowSize.split('x')[0], 10),
		height: parseInt(config.windowSize.split('x')[1], 10),
	};
}
