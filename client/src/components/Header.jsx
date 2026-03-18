import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'AI Demo',  href: '#demo' },
  { label: 'Results',  href: '#results' },
  { label: 'Pricing',  href: '#pricing' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header style={{
      background: 'linear-gradient(135deg,#2180A0,#1a6680)',
      color: '#fff', padding: '0', position: 'sticky', top: 0, zIndex: 200,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height: 64 }}>
        <Link to="/" style={{ fontSize: 22, fontWeight: 800, color:'#fff', letterSpacing:'.5px' }}>
          Opti<span style={{ color:'#E67E22' }}>Voic</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:'flex', gap:8, alignItems:'center' }}>
          {pathname === '/' && NAV.map(n => (
            <a key={n.label} href={n.href} style={{
              color:'rgba(255,255,255,.85)', fontSize:14, fontWeight:600, padding:'8px 12px',
              borderRadius:6, transition:'background .2s',
            }}
            onMouseOver={e => e.target.style.background='rgba(255,255,255,.15)'}
            onMouseOut={e  => e.target.style.background='transparent'}>
              {n.label}
            </a>
          ))}
          <a href="#pricing" className="btn btn--primary btn--sm" style={{ marginLeft:8 }}>Get Started</a>
        </nav>
      </div>
    </header>
  )
}
