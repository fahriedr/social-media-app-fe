import { createClient } from "@supabase/supabase-js";
import { API_CONFIG } from "../api/config";

export const supabase = createClient(API_CONFIG.supabase.url, API_CONFIG.supabase.anonKey);