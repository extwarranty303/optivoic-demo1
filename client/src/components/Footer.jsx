export default function Footer() {
  return (
    <footer style={{ background:'#2C3E50', color:'rgba(255,255,255,.8)', padding:'48px 24px', textAlign:'center' }}>
      <div className="container">
        <div style={{ fontSize:24, fontWeight:800, color:'#fff', marginBottom:8 }}>
          Opti<span style={{ color:'#E67E22' }}>Voic</span>
        </div>
        <p style={{ marginBottom:4 }}>AI-Enhanced Web Solutions for Home Service Businesses</p>
        <p style={{ fontSize:13, marginBottom:24 }}>
          <a href="mailto:hello@optivoic.com" style={{ color:'#E67E22' }}>hello@optivoic.com</a>
          {' · '}
          <a href="https://optivoic.com" style={{ color:'rgba(255,255,255,.6)' }}>optivoic.com</a>
        </p>
        <p style={{ fontSize:12, opacity:.5 }}>© {new Date().getFullYear()} OptiVoic. Built with React + Vite + Supabase.</p>
      </div>
    </footer>
  )
}
