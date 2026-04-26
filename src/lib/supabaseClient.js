import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dennmngpudbzxzbyshzs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PLLfG1eHF1VEGZuuDlzU1A_W_c2c7Kw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
