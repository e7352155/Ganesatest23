/* 
 * Manual type definitions for Vite environment variables.
 * The 'vite/client' reference was removed as it was not found in the environment.
 */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
