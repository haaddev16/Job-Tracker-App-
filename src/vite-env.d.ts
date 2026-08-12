/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Preferred — set this on Vercel */
  readonly VITE_API_URL?: string
  /** Legacy alias (still supported) */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
