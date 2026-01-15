require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase Environment Variables');
  // Don't crash in dev, but warn
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
