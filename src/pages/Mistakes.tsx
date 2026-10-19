import { useState } from 'react'
import type { Question } from '../types'
import { Link } from 'react-router-dom'
import { lessonById } from '../content'
import { Quiz, Words } from '../components/Quiz'
import { Rich } from '../components/Rich'
import { lessonPool } from '../lib/pool'
import { clearWrong, useStore } from '../lib/store'

export default function Mistakes() {
  const st = useStore()
  const items = Object.entries(st.wrong)
    .map(([key, w]) => ({ key, w, l: lessonById(w.lesson) }))
    .filter(x => x.l && lessonPool(x.l)[x.w.idx])
    .sort((a, b) => b.w.count - a.w.count)
  const [retry, setRetry] = useState<{ qs: Question[]; keys: string[] } | null>(null)
  if (retry) {
    const { qs, keys } = retry
    return (
      <>
        <h1>🧠 Retry your mistakes</h1>
        <Quiz questions={qs} title="Mistakes retry" glossary={items.every(x => x.l!.subject === 'math')} onFinish={r => keys.forEach((k, i) => { if (!r.wrongIdx.includes(i)) clearWrong(k) })} />
        <button className="btn ghost" onClick={() => setRetry(null)}>Back to list</button>
      </>
    )
  }
  return (
    <>
      <h1>🧠 Mistakes notebook</h1>
      <p className="muted">Every question you miss in a lesson quiz lands here. Re-doing mistakes is the highest-value study you can do. A question leaves the notebook when you get it right on retry.</p>
      {items.length === 0 ? <div className="card">Nothing here yet. Take some lesson quizzes! <Link to="/lessons">Go to lessons</Link></div> : (
        <>
          <button className="btn gold" onClick={() => setRetry({ qs: items.map(x => lessonPool(x.l!)[x.w.idx]), keys: items.map(x => x.key) })}>Retry all {items.length} mistakes</button>
          {items.map(({ key, w, l }) => {
            const q = lessonPool(l!)[w.idx]
            return (
              <details key={key} className="card">
                <summary><Rich text={q.q} /> <span className="pill">missed {w.count}×</span></summary>
                <p className="muted">From <Link to={`/lesson/${l!.id}`}>{l!.title}</Link></p>
                <p className="ans">Answer: <Rich text={q.c[q.a]} /></p>
                <div className="expl"><Rich text={q.e} block /></div>
                {l!.subject === 'math' && <Words text={`${q.q} ${q.e}`} />}
                {q.trick && <p className="trick">⚡ <Rich text={q.trick} /></p>}
              </details>
            )
          })}
        </>
      )}
    </>
  )
}
