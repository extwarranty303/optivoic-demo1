import { useState } from 'react'
import { useAppointments } from '../hooks/useAppointments'
import Header from '../components/Header'
import Footer from '../components/Footer'

const SERVICES = ['Plumbing','HVAC','Electrical','General Maintenance','Emergency Service','Other']
const TIMES    = ['Morning (8am–12pm)','Afternoon (12pm–5pm)','Evening (5pm–8pm)']

export default function AppointmentsPage() {
  const { bookAppointment, loading, error, success, setSuccess } = useAppointments()
  const [form, setForm] = useState({
    name:'', email:'', phone:'', serviceType:'', preferredDate:'',
    preferredTime:'', notes:'', isEmergency: false
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    await bookAppointment(form)
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 className="section__title" style={{ textAlign:'left', marginBottom:8 }}>Book an Appointment</h2>
          <p className="section__sub" style={{ textAlign:'left', marginBottom:32 }}>
            Fill out the form below and a technician will confirm within 2 hours.
          </p>

          {success ? (
            <div className="alert alert--success" style={{ padding:24, borderRadius:12 }}>
              <strong>🎉 Appointment request received!</strong><br />
              We'll send a confirmation SMS and email shortly.
              <br /><br />
              <button className="btn btn--ghost btn--sm" onClick={() => { setSuccess(false); setForm({ name:'',email:'',phone:'',serviceType:'',preferredDate:'',preferredTime:'',notes:'',isEmergency:false }) }}>
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert--error">{error}</div>}

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(904) 555-0100" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
                </div>
                <div className="form-group">
                  <label>Service Type *</label>
                  <select required value={form.serviceType} onChange={e => set('serviceType', e.target.value)}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select value={form.preferredTime} onChange={e => set('preferredTime', e.target.value)}>
                    <option value="">Any time</option>
                    {TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Describe the Issue</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Brief description of the problem…" />
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
                <input type="checkbox" id="emergency" checked={form.isEmergency}
                  onChange={e => set('isEmergency', e.target.checked)}
                  style={{ width:18, height:18, cursor:'pointer' }} />
                <label htmlFor="emergency" style={{ cursor:'pointer', fontWeight:600 }}>
                  ⚠️ This is an emergency — I need same-day service
                </label>
              </div>

              <button type="submit" className="btn btn--primary" style={{ width:'100%', justifyContent:'center' }} disabled={loading}>
                {loading ? 'Submitting…' : 'Request Appointment →'}
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
