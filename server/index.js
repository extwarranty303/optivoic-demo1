require('dotenv').config()
const express  = require('express')
const cors     = require('cors')

const chatRoute         = require('./routes/chat')
const appointmentsRoute = require('./routes/appointments')
const leadsRoute        = require('./routes/leads')

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/chat',         chatRoute)
app.use('/api/appointments', appointmentsRoute)
app.use('/api/leads',        leadsRoute)

app.get('/api/health', (_, res) => res.json({ status: 'ok', ts: new Date() }))

app.listen(PORT, () => console.log(`OptiVoic API running on :${PORT}`))
