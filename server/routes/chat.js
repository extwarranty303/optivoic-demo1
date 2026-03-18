const router  = require('express').Router()
const { supabaseAdmin } = require('../lib/supabaseAdmin')

// ── Optionally swap to OpenAI for production ─────────────────────────────────
// const OpenAI = require('openai')
// const openai  = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
// async function aiReply(messages) {
//   const res = await openai.chat.completions.create({
//     model: 'gpt-4o-mini',
//     messages,
//     max_tokens: 200,
//   })
//   return res.choices[0].message.content
// }

// ── Intent detection ─────────────────────────────────────────────────────────
function detectIntent(msg) {
  const m = msg.toLowerCase()
  if (/emergency|burst|flood|asap|urgent|no water|no heat|no power/.test(m)) return 'emergency'
  if (/schedule|appointment|book|monday|tuesday|wednesday|thursday|friday|next week/.test(m)) return 'schedule'
  if (/price|cost|how much|quote|estimate|charge/.test(m)) return 'pricing'
  if (/plumb|pipe|faucet|drain|toilet|leak|water heater/.test(m)) return 'plumbing'
  if (/hvac|heat|cool|air con|furnace|ac |a\.c|thermostat/.test(m)) return 'hvac'
  if (/electric|outlet|breaker|wiring|power|light|switch/.test(m)) return 'electrical'
  if (/morning|afternoon|evening|\d+(am|pm)/.test(m)) return 'time_pref'
  if (/^(yes|yep|yeah|sure|sounds good|perfect|confirm|ok)/.test(m)) return 'confirm'
  if (/thank|bye|goodbye/.test(m)) return 'closing'
  return 'general'
}

function buildReply(intent) {
  const r = {
    emergency: {
      reply: "⚠️ Emergency flagged! I'm alerting the on-call technician now. We have availability TODAY 2–4 pm or tomorrow 8–11 am. Which works for you?",
      isEmergency: true,
    },
    schedule: {
      reply: "I can get you on the schedule right away! What service do you need, and do you prefer mornings (8 am–12 pm) or afternoons (12–5 pm)?",
    },
    pricing: {
      reply: "Pricing depends on the job scope. We offer free on-site estimates—typically same week. Would you like me to book one?",
    },
    plumbing: {
      reply: "Plumbing is our specialty! Is this an active leak or a routine repair? I'll prioritize accordingly.",
      serviceType: 'plumbing',
    },
    hvac: {
      reply: "HVAC issues can be urgent in extreme weather. Is your system completely down or just underperforming?",
      serviceType: 'hvac',
    },
    electrical: {
      reply: "Safety first! Is this an immediate hazard or a non-urgent fix? I want to prioritize correctly.",
      serviceType: 'electrical',
    },
    time_pref: {
      reply: "✅ Got it! To confirm, can I get your name and best phone number?",
      collectContact: true,
    },
    confirm: {
      reply: "🎉 Appointment confirmed! You'll get an SMS reminder 24 h and 1 h before arrival. Need anything else?",
      appointmentBooked: true,
    },
    closing: {
      reply: "Thanks for reaching out! Don't hesitate to come back any time. Have a great day! 👋",
    },
    general: {
      reply: "Happy to help! Could you tell me a bit more about what service you need? (plumbing, HVAC, electrical, etc.)",
    },
  }
  return r[intent] ?? r.general
}

// ── POST /api/chat ────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { message, sessionId } = req.body
  if (!message || !sessionId) return res.status(400).json({ error: 'message and sessionId required' })

  const intent   = detectIntent(message)
  const response = buildReply(intent)

  // Persist session to Supabase (upsert)
  try {
    const { data: existing } = await supabaseAdmin
      .from('chat_sessions')
      .select('id, messages')
      .eq('session_id', sessionId)
      .single()

    const newMsg = [
      { role: 'user',      text: message,         ts: new Date().toISOString() },
      { role: 'assistant', text: response.reply,   ts: new Date().toISOString() },
    ]

    if (existing) {
      await supabaseAdmin.from('chat_sessions').update({
        messages:          [...(existing.messages || []), ...newMsg],
        appointment_booked: response.appointmentBooked ?? false,
        updated_at:        new Date().toISOString(),
      }).eq('session_id', sessionId)
    } else {
      await supabaseAdmin.from('chat_sessions').insert({
        session_id: sessionId,
        messages:   newMsg,
      })
    }
  } catch (e) {
    // Non-fatal — still return reply
    console.error('Supabase chat_sessions error:', e.message)
  }

  res.json({ reply: response.reply, meta: { intent, ...response } })
})

module.exports = router
