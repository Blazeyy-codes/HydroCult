import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rlibrbxpdohigkbzqrif.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsaWJyYnhwZG9oaWdrYnpxcmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MzM3MjUsImV4cCI6MjAzNDIwOTcyNX0.Pta8BwE4fJ1No33r1c1zO0n3o53l2p-2B2u2i2yO8uU'

if (!supabaseUrl) {
    throw new Error("Supabase URL is missing from environment variables.");
}
if (!supabaseKey) {
    throw new Error("Supabase anon key is missing from environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
