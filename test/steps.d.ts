/// <reference types='codeceptjs' />
type ApplitoolsHelper = import('../src/index');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, ApplitoolsHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
