import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ESSAY_CHECKLIST, ESSAY_PROMPTS, MODEL_ESSAY } from '../content'
import { Rich } from '../components/Rich'
import { update, useStore } from '../lib/store'

export default function Essay() {
  const st = useStore()
  const [pi, setPi] = useState(0)
  const prompt = ESSAY_PROMPTS[pi]
  const draft = st.essays[prompt] ?? ''
  const [secs, setSecs] = useState(30 * 60)
  const [running, setRunning] = useState(false)
  const [checks, setChecks] = useState<Record<number, boolean>>({})
  const [plan, setPlan] = useState({ thesis: '', r1: '', r2: '', counter: '', end: '' })
  const t = useRef<number>()
  useEffect(() => {
    if (!running) return
    t.current = window.setInterval(() => setSecs(s => (s <= 1 ? (setRunning(false), 0) : s - 1)), 1000)
    return () => clearInterval(t.current)
  }, [running])
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0')
  return (
    <>
      <h1>✍️ Essay studio</h1>
      <p className="muted">Learn the structure in the <Link to="/lesson/essay-structure">essay lessons</Link>, then practice here under a real timer. Aim for 250–350 words in 30 minutes: ~5 min plan, ~20 min write, ~5 min proofread.</p>

      <div className="card">
        <h3>1. Pick a prompt</h3>
        <div className="seg">{ESSAY_PROMPTS.map((p, i) => <button key={i} className={pi === i ? 'on' : ''} onClick={() => setPi(i)}>#{i + 1}</button>)}</div>
        <p className="qtext">{prompt}</p>
      </div>

      <div className="card">
        <h3>2. Plan (5 min). Don't skip this!</h3>
        <div className="grid2">
          <label>Thesis (your clear position)<textarea style={{ minHeight: 70 }} value={plan.thesis} onChange={e => setPlan({ ...plan, thesis: e.target.value })} /></label>
          <label>Reason 1 + example<textarea style={{ minHeight: 70 }} value={plan.r1} onChange={e => setPlan({ ...plan, r1: e.target.value })} /></label>
          <label>Reason 2 + example<textarea style={{ minHeight: 70 }} value={plan.r2} onChange={e => setPlan({ ...plan, r2: e.target.value })} /></label>
          <label>Opposing view + your reply<textarea style={{ minHeight: 70 }} value={plan.counter} onChange={e => setPlan({ ...plan, counter: e.target.value })} /></label>
        </div>
      </div>

      <div className="card">
        <div className="dayhead"><h3>3. Write</h3><span className={`timer ${secs < 300 ? 'low' : ''}`}>⏱ {mm}:{ss}</span></div>
        <div className="exbtns">
          <button className="btn small" onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start timer'}</button>
          <button className="btn small ghost" onClick={() => { setRunning(false); setSecs(30 * 60) }}>Reset</button>
          <span className="muted">{words} words {words < 200 ? '(aim for 250+)' : words > 450 ? '(too long for 30 min; be concise)' : '✓'}</span>
        </div>
        <textarea value={draft} onChange={e => update(s => ({ ...s, essays: { ...s.essays, [prompt]: e.target.value } }))} placeholder="Write your essay here. It autosaves on this device." spellCheck />
      </div>

      <div className="card">
        <h3>4. Self-check (be honest!)</h3>
        <div className="checks">
          {ESSAY_CHECKLIST.map((c, i) => <label key={i}><input type="checkbox" checked={!!checks[i]} onChange={e => setChecks({ ...checks, [i]: e.target.checked })} /><Rich text={c} /></label>)}
        </div>
        <div className="progress"><i style={{ width: `${(Object.values(checks).filter(Boolean).length / ESSAY_CHECKLIST.length) * 100}%` }} /></div>
      </div>

      <details className="card">
        <summary>See a model essay (try your own first!)</summary>
        <h3>Prompt: {MODEL_ESSAY.prompt}</h3>
        <Rich text={MODEL_ESSAY.text} block />
        <h3>Why it works</h3>
        <ul>{MODEL_ESSAY.notes.map((n, i) => <li key={i}><Rich text={n} /></li>)}</ul>
      </details>
    </>
  )
}
