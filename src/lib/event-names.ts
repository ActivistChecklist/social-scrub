/**
 * Every action the sheet counts. Shared by the browser and the server: the server
 * forwards only these names (plus page views), so nothing else reaches Umami.
 */
export const EVENT_NAMES = [
  'check_platform',
  'uncheck_platform',
  'select_all',
  'set_plan',
  'mark_step',
  'mark_deleted',
  'finish_platform',
  'add_platform',
  'remove_platform',
  'filter_checked',
  'open_help',
  'open_privacy',
  'open_block_party',
  'download',
  'clear_data',
] as const;

export type EventName = (typeof EVENT_NAMES)[number];
