const METRICS = [
  { val: '+210%', lbl: 'Avg. Lead Increase' },
  { val: '15.6%', lbl: 'Conversion Rate' },
  { val: '−30%',  lbl: 'No-Show Rate' },
  { val: '+23%',  lbl: 'AI Booking Lift' },
]

const TABLE = [
  { type: 'Plumbing',   base: '15.61%', ai: '19–22%', lift: '+23%' },
  { type: 'HVAC',       base: '15.11%', ai: '18–21%', lift: '+23%' },
  { type: 'Electrical', base: '12–14%', ai: '15–18%', lift: '+23%' },
  { type: 'General',    base: '2–5%',   ai: '5–8%',   lift: '+60%' },
]

export default function Results() {
  return (
    <section id="results" className="section">
      <div className="container">
        <h2 className="section__title">Proven Results</h2>
        <p className="section__sub">Industry benchmarks from real home-service deployments</p>

        <div className="grid-4" style={{ marginBottom: 56 }}>
          {METRICS.map(m => (
            <div key={m.lbl} className="metric-card">
              <div className="metric-val">{m.val}</div>
              <div className="metric-lbl">{m.lbl}</div>
            </div>
          ))}
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Baseline Conv. Rate</th>
              <th>With OptiVoic AI</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map(r => (
              <tr key={r.type}>
                <td><strong>{r.type}</strong></td>
                <td>{r.base}</td>
                <td className="td--highlight">{r.ai}</td>
                <td className="td--up">{r.lift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
