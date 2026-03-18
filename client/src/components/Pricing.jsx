const PACKAGES = [
  {
    tier: 'MVP',
    price: '$2,500',
    time: '10 days',
    items: ['Mobile-responsive template', 'AI chatbot integration', 'Appointment booking', 'Local SEO setup'],
  },
  {
    tier: 'Custom',
    price: '$4,500',
    time: '20 days',
    featured: true,
    items: ['Everything in MVP', 'Custom brand design', 'Service portfolio pages', 'Review integration', 'Analytics dashboard'],
  },
  {
    tier: 'Enterprise',
    price: '$6,500+',
    time: '30 days',
    items: ['Everything in Custom', 'CRM integration', 'Multi-location support', 'Predictive analytics', 'Dedicated account manager'],
  },
]

const SUPPORT = [
  { name: 'Basic',        price: '$199/mo', items: ['Hosting + uptime', 'Security patches', 'Email support'] },
  { name: 'Professional', price: '$399/mo', featured: true,
    items: ['Everything in Basic', 'Monthly optimization', 'Analytics review', 'Priority support'] },
  { name: 'Enterprise',   price: '$599/mo', items: ['Everything in Pro', 'Account manager', 'Strategy sessions', '24/7 phone line'] },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Simple, Transparent Pricing</h2>
        <p className="section__sub">One-time project fee + optional monthly support</p>

        <div className="grid-3" style={{ marginBottom: 72 }}>
          {PACKAGES.map(p => (
            <div key={p.tier} className={`card price-card${p.featured ? ' price-card--featured' : ''}`}>
              {p.featured && <div className="price-badge">⭐ Most Popular</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-val">{p.price}</div>
              <div className="price-sub">Setup in {p.time}</div>
              <ul className="feature-list">
                {p.items.map(i => <li key={i}>{i}</li>)}
              </ul>
              <a href="mailto:hello@optivoic.com"
                className="btn btn--ghost"
                style={{ marginTop: 24, width:'100%', justifyContent:'center' }}>
                Get Started
              </a>
            </div>
          ))}
        </div>

        <h3 style={{ textAlign:'center', fontSize:24, color:'var(--c-primary)', marginBottom:32 }}>
          Monthly Support Plans
        </h3>
        <div className="grid-3">
          {SUPPORT.map(s => (
            <div key={s.name} className={`card price-card${s.featured ? ' price-card--featured' : ''}`}>
              {s.featured && <div className="price-badge">Most Chosen</div>}
              <div className="price-tier">{s.name}</div>
              <div className="price-val">{s.price}</div>
              <ul className="feature-list">
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
