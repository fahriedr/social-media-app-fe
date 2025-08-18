export const API_CONFIG = {
    url: import.meta.env.VITE_API_URL,
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        bucketName: import.meta.env.VITE_SUPABASE_BUCKET_NAME,
        publishedKey: import.meta.env.VITE_SUPABASE_PUBLISHED_KEY
    }
}