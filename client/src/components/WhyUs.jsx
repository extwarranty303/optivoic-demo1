const REASONS = [
  { icon:'⚡', title:'Fast Deployment',      body:'10–30-day launch. Templates + custom code = speed without sacrifice.' },
  { icon:'🎯', title:'Conversion-Focused',    body:'Every pixel and CTA engineered to capture leads and book appointments.' },
  { icon:'🤖', title:'AI Built-In',           body:'Chatbot, booking engine, and personalization baked in from day one.' },
  { icon:'💰', title:'Transparent Pricing',   body:'$2,500–$6,500 upfront. No agency markup. No hidden fees.' },
  { icon:'🚀', title:'Modern Tech Stack',     body:'Vite, React, Node.js, Supabase — same stack OptiVoic runs internally.' },
  { icon:'🤝', title:'Ongoing Partnership',   body:'Monthly support, analytics reviews, and continuous optimization.' },
]

export default function WhyUs() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">Why OptiVoic?</h2>
        <p className="section__sub">The perfect middle ground between freelancers and full agencies</p>
        <div className="grid-3">
          {REASONS.map(r => (
            <div key={r.title} className="card">
              <div className="card__icon">{r.icon}</div>
              <div className="card__title">{r.title}</div>
              <p className="card__body">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
