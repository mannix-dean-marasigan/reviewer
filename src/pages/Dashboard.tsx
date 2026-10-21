import { Link } from 'react-router-dom'
import { LESSONS, PLAN, SUBJECTS, lessonById } from '../content'
import { resetAll, today, update, useStore } from '../lib/store'

function dayNumber(start: string | null) {
  if (!start) return 1
  const d = Math.floor((new Date(today()).getTime() - new Date(start).getTime()) / 86400000) + 1
  return Math.max(1, Math.min(PLAN.length, d))
}

export default function Dashboard() {
  const st = useStore()
  const cur = dayNumber(st.startDate)
  const totalMin = PLAN.reduce((a, d) => a + d.hours * 60, 0)
  const doneCount = LESSONS.filter(l => st.done[l.id] !== undefined).length
  const studiedToday = st.minutes[today()] ?? 0
  const mocks = st.mocks
  const lastMock = mocks[mocks.length - 1]
  const bySubject = SUBJECTS.filter(s => s.id === 'math').map(s => {
    const ls = LESSONS.filter(l => l.subject === s.id)
    const scores = ls.map(l => st.done[l.id]).filter((x): x is number => x !== undefined)
    return { ...s, total: ls.length, done: scores.length, avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null }
  })
  const weak = bySubject.filter(s => s.avg !== null && s.avg < 70)

  return (
    <>
      <h1>You can pass this. Here's the plan. 💪</h1>
      <p className="muted">5 days · {totalMin / 60} study hours · math only, as you asked. Do the checklist for the day, in order, and don't skip the quizzes: they are where the learning sticks.</p>

      <div className="card">
        <div className="stat">
          <div><b>{doneCount}/{LESSONS.length}</b>lessons done</div>
          <div><b>{studiedToday}m</b>studied today</div>
          <div><b>{Object.keys(st.wrong).length}</b>in mistakes notebook</div>
          <div><b>{lastMock ? `${Math.round((lastMock.score / lastMock.total) * 100)}%` : '—'}</b>last mock</div>
        </div>
        <div className="progress"><i style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} /></div>
        {!st.startDate && (
          <p>Start Day 1 today? <button className="btn small" onClick={() => update(s => ({ ...s, startDate: today() }))}>Start my 5-day countdown</button></p>
        )}
        {st.startDate && <p className="muted">Day 1 started {st.startDate}. You are on <b>Day {cur}</b>. <button className="btn small ghost" onClick={() => update(s => ({ ...s, startDate: null }))}>Reset start date</button></p>}
        {weak.length > 0 && <p>⚠️ Weak spots (avg under 70%): {weak.map(w => <span key={w.id} className={`pill ${w.id}`}>{w.label} {w.avg}%</span>)} → redo those quizzes and drills.</p>}
      </div>

      {PLAN.map(day => {
        const isCur = day.day === cur
        const core = day.items.filter(i => !i.optional)
        const mins = core.reduce((a, i) => a + i.minutes, 0)
        const doneMin = core.reduce((a, i) => a + (st.checks[`${day.day}:${i.label}`] ? i.minutes : 0), 0)
        return (
          <section key={day.day} className="card" style={isCur ? { borderColor: 'var(--accent)', borderWidth: 2 } : undefined}>
            <div className="dayhead">
              <h2>Day {day.day}{isCur ? ' · today' : ''} — {day.theme}</h2>
              <span className="muted">{day.hours} h plan · {Math.round(doneMin / 60 * 10) / 10}/{Math.round(mins / 60 * 10) / 10} h ticked</span>
            </div>
            <div className="progress"><i style={{ width: `${(doneMin / mins) * 100}%` }} /></div>
            {day.items.map(item => {
              const k = `${day.day}:${item.label}`
              const l = item.lesson ? lessonById(item.lesson) : undefined
              return (
                <div className="item" key={k}>
                  <input type="checkbox" checked={!!st.checks[k]} onChange={e => update(s => { const c = { ...s.checks }; if (e.target.checked) c[k] = true; else delete c[k]; return { ...s, checks: c } })} aria-label={`Done: ${item.label}`} />
                  {l ? <Link to={`/lesson/${l.id}`}>{item.label}</Link> : item.route ? <Link to={item.route}>{item.label}</Link> : <span>{item.label}</span>}
                  {l && st.done[l.id] !== undefined && <span className="pill">{st.done[l.id]}%</span>}
                  <span className="min">{item.optional ? 'if time · ' : ''}{item.minutes} min</span>
                </div>
              )
            })}
          </section>
        )
      })}

      <section className="card">
        <h3>Subject strength</h3>
        {bySubject.map(s => (
          <div key={s.id} style={{ margin: '8px 0' }}>
            <span className={`pill ${s.id}`}>{s.label}</span> {s.done}/{s.total} lessons · avg {s.avg ?? '—'}{s.avg !== null ? '%' : ''}
            <div className="progress"><i style={{ width: `${s.avg ?? 0}%` }} /></div>
          </div>
        ))}
      </section>

      <p className="muted"><button className="btn small ghost" onClick={() => { if (confirm('Erase ALL progress on this device?')) resetAll() }}>Reset all progress</button></p>
    </>
  )
}
