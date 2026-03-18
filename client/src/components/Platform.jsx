import { useState } from 'react'

const TABS = [
  {
    label: 'Platform',
    cards: [
      { icon: '🎨', title: 'Beautiful Design', body: 'Mobile-first, accessible, sub-2s load times built on React + Vite.',
        items: ['Responsive layout', 'Accessibility WCAG AA', 'Fast load < 2s', 'SEO-optimized HTML'] },
      { icon: '🔐', title: 'Secure Infrastructure', body: 'Supabase + PostgreSQL with RLS. SSL, 99.9% uptime.',
        items: ['Row Level Security', 'Daily Supabase backups', 'SSL / TLS everywhere', 'GDPR ready'] },
      { icon: '📊', title: 'Analytics Dashboard', body: 'Real-time visitor insights wired to your Supabase DB.',
        items: ['Visitor heatmaps', 'Conversion funnel', 'Lead source tracking', 'Monthly reports'] },
    ],
  },
  {
    label: 'AI Features',
    cards: [
      { icon: '🤖', title: 'Smart Chatbot', body: 'Intent-aware NLP that qualifies leads and books appointments 24/7.',
        items: ['Natural language', 'Emergency detection', 'Service classification', 'Human handoff'] },
      { icon: '📅', title: 'Appointment Booking', body: 'Real-time availability with SMS reminders that cut no-shows 30%.',
        items: ['Live availability', 'Auto-confirm SMS', 'Calendar sync', 'Supabase persistence'] },
      { icon: '🎯', title: 'Personalization', body: 'Adaptive CTAs and content reordering raise conversions 15–25%.',
        items: ['Behavior-based CTAs', 'Dynamic reorder', 'Service suggestions', 'Geo targeting'] },
    ],
  },
  {
    label: 'Integrations',
    cards: [
      { icon: '🔗', title: 'CRM Sync', body: 'Push leads to HubSpot, Salesforce, or any webhook target.',
        items: ['HubSpot / Salesforce', 'Zapier webhooks', 'REST API access', 'CSV export'] },
      { icon: '📞', title: 'SMS & Email', body: 'Twilio-powered automations keep customers and techs in the loop.',
        items: ['Appointment reminders', 'Follow-up sequences', 'Promo campaigns', 'Review requests'] },
      { icon: '⭐', title: 'Reviews', body: 'Aggregate Google & Yelp reviews directly on the site.',
        items: ['Google Reviews', 'Yelp integration', 'Rating widget', 'Reputation alerts'] },
    ],
  },
]

export default function Platform() {
  const [active, setActive] = useState(0)

  return (
    <section id="platform" className="section">
      <div className="container">
        <h2 className="section__title">Everything You Need</h2>
        <p className="section__sub">Three pillars powering every OptiVoic site</p>

        <div className="tabs">
          {TABS.map((t, i) => (
            <button key={t.label}
              className={`tab-btn${active === i ? ' tab-btn--active' : ''}`}
              onClick={() => setActive(i)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid-3 fade-in" key={active}>
          {TABS[active].cards.map(c => (
            <div key={c.title} className="card">
              <div className="card__icon">{c.icon}</div>
              <div className="card__title">{c.title}</div>
              <p className="card__body">{c.body}</p>
              <ul className="feature-list">
                {c.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
