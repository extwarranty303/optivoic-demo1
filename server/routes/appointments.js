const router = require('express').Router()
const { supabaseAdmin } = require('../lib/supabaseAdmin')

// GET /api/appointments  (admin use)
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST /api/appointments
router.post('/', async (req, res) => {
  const { name, email, phone, serviceType, preferredDate, preferredTime, notes, isEmergency } = req.body
  if (!name || !phone || !serviceType)
    return res.status(400).json({ error: 'name, phone, serviceType required' })

  const { data, error } = await supabaseAdmin.from('appointments').insert([{
    name,
    email,
    phone,
    service_type:   serviceType,
    preferred_date: preferredDate || null,
    preferred_time: preferredTime || null,
    notes:          notes || null,
    is_emergency:   isEmergency ?? false,
    status:         'pending',
  }]).select().single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// PATCH /api/appointments/:id/status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body
  const allowed = ['pending','confirmed','completed','cancelled']
  if (!allowed.includes(status)) return res.status(400).json({ error: 'invalid status' })

  const { data, error } = await supabaseAdmin
    .from('appointments')
    .update({ status })
    .eq('id', req.params.id)
    .select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

module.exports = router
