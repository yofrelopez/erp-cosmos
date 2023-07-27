import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string | undefined = import.meta.env.VITE_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;


if(!SUPABASE_URL || !SUPABASE_ANON_KEY){
  throw new Error("Environment variables not set")
}

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
    )