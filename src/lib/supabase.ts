import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rlibrbxpdohigkbzqrif.supabase.co'
const supabaseKey = 'sb_publishable_bEOQuyv3KaWDxr9Zw6O1sA_o_putxId'

if (!supabaseUrl) {
    throw new Error("Supabase URL is missing.");
}
if (!supabaseKey) {
    throw new Error("Supabase anon key is missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
