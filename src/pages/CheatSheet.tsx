import { Link } from 'react-router-dom'
import { FORMULAS, LESSONS, PLAYBOOK, SUBJECTS } from '../content'
import { Rich } from '../components/Rich'

export default function CheatSheet() {
  return (
    <>
      <h1>🧾 Tricks &amp; formulas</h1>
      <p className="muted">Everything worth memorizing in one place. Skim this every morning and again the night before the exam. Print it (Ctrl+P) if you like.</p>

      <section className="card">
        <h2>🎯 Test-day playbook</h2>
        <ul className="tricks">{PLAYBOOK.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
      </section>

      <section className="card">
        <h2>📐 Formula sheet</h2>
        {FORMULAS.map(g => (
          <div key={g.title}>
            <h3>{g.title}</h3>
            <div className="formula">{g.items.map((f, i) => <div key={i}><Rich text={f} /></div>)}</div>
          </div>
        ))}
      </section>

      {SUBJECTS.map(s => (
        <section className="card" key={s.id}>
          <h2><span className={`pill ${s.id}`}>{s.label}</span> shortcuts by lesson</h2>
          {LESSONS.filter(l => l.subject === s.id).map(l => (
            <details key={l.id}>
              <summary>{l.title}</summary>
              <ul className="tricks">{l.tricks.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
              <p className="muted"><Link to={`/lesson/${l.id}`}>Open lesson →</Link></p>
            </details>
          ))}
        </section>
      ))}
    </>
  )
}
