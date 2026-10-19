import { useMemo, useState } from 'react'
import { Quiz } from '../components/Quiz'
import { DRILL_KINDS, mathDrill } from '../lib/drills'
import { rng } from '../lib/rand'
import { update } from '../lib/store'
import { INTERACTIVES } from '../interactives'

const LABEL: Record<string, string> = {
  order: 'Order of operations', percentOf: 'Percent of a number', fracAdd: 'Fractions', exponent: 'Exponents', linear: 'Linear equations',
  discriminant: 'Discriminant', pythag: 'Pythagorean', mean: 'Averages', combos: 'Combinations', slope: 'Slope', arith: 'Arithmetic sequence',
  angles: 'Triangle angles', circle: 'Circle area', work: 'Work problems',
}

export default function Drills() {
  const [mode, setMode] = useState<'math' | 'pattern' | 'series'>('math')
  const [kinds, setKinds] = useState<string[]>(DRILL_KINDS)
  const [round, setRound] = useState(0)
  const [count, setCount] = useState(10)
  const qs = useMemo(() => {
    const r = rng((Date.now() + round * 7919) % 2147483646)
    return Array.from({ length: count }, () => mathDrill(r, r.pick(kinds.length ? kinds : DRILL_KINDS)))
  }, [round, kinds, count])
  const Pattern = INTERACTIVES.pattern, Series = INTERACTIVES.series
  return (
    <>
      <h1>⚡ Drills</h1>
      <p className="muted">Unlimited, freshly generated questions with full worked explanations. Math is generated on the spot, so you can never run out.</p>
      <div className="seg">
        <button className={mode === 'math' ? 'on' : ''} onClick={() => setMode('math')}>Math speed drill</button>
        <button className={mode === 'pattern' ? 'on' : ''} onClick={() => setMode('pattern')}>Pattern puzzles</button>
        <button className={mode === 'series' ? 'on' : ''} onClick={() => setMode('series')}>Number &amp; letter series</button>
      </div>
      {mode === 'math' && (
        <>
          <details className="card"><summary>Choose topics ({kinds.length}/{DRILL_KINDS.length}) and length</summary>
            <div className="seg" style={{ marginTop: 10 }}>
              {DRILL_KINDS.map(k => (
                <button key={k} className={kinds.includes(k) ? 'on' : ''} onClick={() => setKinds(kinds.includes(k) ? kinds.filter(x => x !== k) : [...kinds, k])}>{LABEL[k] ?? k}</button>
              ))}
            </div>
            <div className="seg"><span>Questions:</span>{[5, 10, 20].map(n => <button key={n} className={count === n ? 'on' : ''} onClick={() => setCount(n)}>{n}</button>)}</div>
          </details>
          <Quiz key={round} questions={qs} title="Math speed drill" retryLabel="New set" glossary
            onFinish={r => { update(s => ({ ...s, drills: [...s.drills, { at: Date.now(), kind: 'math', score: r.correct, total: r.total }] })); }} />
          <button className="btn gold" onClick={() => setRound(round + 1)}>🔄 Fresh set of questions</button>
        </>
      )}
      {mode === 'pattern' && <div className="card"><h3>Pattern puzzles (mental ability)</h3><Pattern /></div>}
      {mode === 'series' && <div className="card"><h3>Number &amp; letter series</h3><Series /></div>}
    </>
  )
}
