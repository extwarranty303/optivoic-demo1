export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg,#2180A0,#1a6680)',
      color: '#fff', padding: '100px 24px 80px', textAlign: 'center',
    }}>
      <div className="container">
        <div style={{ display:'inline-block', background:'rgba(255,255,255,.15)',
          color:'#fff', padding:'6px 18px', borderRadius:20, fontSize:13,
          fontWeight:700, marginBottom:24, letterSpacing:'.5px' }}>
          🚀 AI-Enhanced Web Solutions
        </div>
        <h1 style={{ fontSize:'clamp(34px,5vw,58px)', fontWeight:800, lineHeight:1.15,
          marginBottom:22, maxWidth:760, margin:'0 auto 22px' }}>
          Websites That Convert for<br />
          <span style={{ color:'#E67E22' }}>Home Service Businesses</span>
        </h1>
        <p style={{ fontSize:'clamp(16px,2vw,20px)', maxWidth:620, margin:'0 auto 40px',
          opacity:.9, lineHeight:1.6 }}>
          Vite + React + AI — faster than agencies, smarter than templates.
          Capture more leads, book more appointments, grow faster.
        </p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#demo" className="btn btn--primary">See AI in Action →</a>
          <a href="#pricing" className="btn btn--outline">View Pricing</a>
        </div>

        {/* Stats Bar */}
        <div style={{ display:'flex', justifyContent:'center', gap:48, flexWrap:'wrap',
          marginTop:64, paddingTop:48,
          borderTop:'1px solid rgba(255,255,255,.2)' }}>
          {[
            { val:'15.6%', lbl:'Avg. Conversion Rate' },
            { val:'+210%', lbl:'More Leads' },
            { val:'-30%',  lbl:'No-Show Rate' },
            { val:'10 days', lbl:'Launch Time' },
          ].map(s => (
            <div key={s.lbl} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'clamp(28px,4vw,36px)', fontWeight:800 }}>{s.val}</div>
              <div style={{ fontSize:13, opacity:.8, marginTop:4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
