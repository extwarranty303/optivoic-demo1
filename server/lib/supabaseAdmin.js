const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in server/.env')
  process.exit(1)
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

module.exports = { supabaseAdmin }
