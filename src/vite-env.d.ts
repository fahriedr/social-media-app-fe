declare module '*.css';
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_BUCKET_NAME: string
  readonly VITE_SUPABASE_PUBLISHED_KEY: string
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}