/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where anonymous action counts are sent. Leave unset to send nothing. */
  readonly VITE_EVENTS_URL?: string;
  /** The Umami website id those counts belong to. */
  readonly VITE_EVENTS_SITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
