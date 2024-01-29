export type WindowSize = {
  width: number, height: number
}

export type ApplitoolsHelperConfig = {
  applitoolsKey: string;
  windowSize?: `${number}x${number}`;
  appName?: string;
  batchInfo?: string;
  debug?: boolean;
}

/*
*
* Match level
*
* More info: https://applitools.com/docs/common/cmn-eyes-match-levels.html
*
*
* */
export type MatchLevel = 'Exact'| 'Strict'| 'Content'| 'Layout'|'Ignore colors';
