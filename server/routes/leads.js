const router = require('express').Router()
const { supabaseAdmin } = require('../lib/supabaseAdmin')

router.post('/', async (req, res) => {
  const { name, email, phone, serviceInterest, message, source } = req.body

  const { data, error } = await supabaseAdmin.from('leads').insert([{
    name,
    email,
    phone,
    service_interest: serviceInterest,
    message,
    source: source || 'website',
    status: 'new',
  }]).select().single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('leads').select('*')
    .order('created_at', { ascending: false }).limit(100)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

module.exports = router
