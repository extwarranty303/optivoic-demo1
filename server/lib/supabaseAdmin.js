const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // service role — server-side only
)

module.exports = { supabaseAdmin }
