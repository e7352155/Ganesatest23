// Reference to vite/client removed to fix "Cannot find type definition file" error
// /// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Fix "Cannot redeclare block-scoped variable 'process'" error.
// Instead of declaring 'var process', we augment the global NodeJS namespace
// to add the API_KEY property to ProcessEnv.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}

export {};