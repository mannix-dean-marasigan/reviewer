import { useMemo, useState } from 'react'
import { Rich } from '../components/Rich'
import { PuzzleView } from '../components/Figure'
import { makeLetterSeries, makeNumberSeries, makePuzzle, Puzzle, Series } from '../lib/patterns'
import { rng } from '../lib/rand'

/* ---------- StepOrder: tap the steps in the right order ---------- */
export function StepOrder({ data }: { data: { prompt: string; steps: string[]; why?: string } }) {
  const [seed, setSeed] = useState(1)
  const order = useMemo(() => rng(seed * 977).shuffle(data.steps.map((_, i) => i)), [data, seed])
  const [picked, setPicked] = useState<number[]>([])
  const done = picked.length === data.steps.length
  const next = picked.length
  return (
    <div className="lab">
      <p><b>Put the steps in the correct order</b> — <Rich text={data.prompt} /></p>
      <ol className="picked">{picked.map((i, k) => <li key={k} className="ok"><Rich text={data.steps[i]} /></li>)}</ol>
      <div className="chips">
        {order.filter(i => !picked.includes(i)).map(i => (
          <button key={i} className="chip" onClick={() => (i === next ? setPicked([...picked, i]) : navigator.vibrate?.(60))}
            onMouseDown={e => { if (i !== next) e.currentTarget.classList.add('shake') }} onAnimationEnd={e => e.currentTarget.classList.remove('shake')}>
            <Rich text={data.steps[i]} />
          </button>
        ))}
      </div>
      {!done && <p className="muted">Wrong picks just shake. Think about what must happen first.</p>}
      {done && <div className="feedback good"><b>✓ Nailed it.</b> {data.why && <Rich text={data.why} />}<br /><button className="btn small" onClick={() => { setPicked([]); setSeed(seed + 1) }}>Shuffle &amp; redo</button></div>}
    </div>
  )
}

/* ---------- FlashDeck: flip cards, mark known/unknown ---------- */
export function FlashDeck({ data }: { data: { cards: [string, string][]; frontLabel?: string } }) {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const [known, setKnown] = useState<Record<number, boolean>>({})
  const deck = useMemo(() => data.cards.map((_, k) => k).filter(k => !known[k]), [data, known])
  if (deck.length === 0) return <div className="lab"><div className="feedback good"><b>🎉 Whole deck mastered.</b></div><button className="btn small" onClick={() => { setKnown({}); setI(0) }}>Restart deck</button></div>
  const cur = deck[i % deck.length]
  const [front, back] = data.cards[cur]
  const mark = (k: boolean) => { setKnown(p => (k ? { ...p, [cur]: true } : p)); setFlip(false); setI(x => (k ? x : x + 1)) }
  return (
    <div className="lab">
      <div className="muted">{deck.length} left · {Object.keys(known).length} mastered</div>
      <button className={`flash ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)} aria-label="Flip card">
        <small>{flip ? 'ANSWER' : data.frontLabel ?? 'WORD / TERM'} (tap to flip)</small>
        <span><Rich text={flip ? back : front} /></span>
      </button>
      <div className="exbtns"><button className="btn small ghost" onClick={() => mark(false)}>Still learning ↻</button><button className="btn small" onClick={() => mark(true)}>I know it ✓</button></div>
    </div>
  )
}

/* ---------- ErrorHunt: spot the underlined error ---------- */
export interface ErrItem { parts: string[]; err: number | -1; why: string } // parts = A,B,C,D segments, err index or -1 = no error
export function ErrorHunt({ data }: { data: { items: ErrItem[] } }) {
  const [i, setI] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [fin, setFin] = useState(false)
  const it = data.items[i]
  if (fin) return <div className="lab"><div className="score good">{score}/{data.items.length}</div><button className="btn small" onClick={() => { setI(0); setPick(null); setScore(0); setFin(false) }}>Again</button></div>
  const answerIdx = it.err === -1 ? 4 : it.err
  const choose = (k: number) => { if (pick !== null) return; setPick(k); if (k === answerIdx) setScore(s => s + 1) }
  return (
    <div className="lab">
      <p className="muted">Which underlined part has the error? Tap it. (E = no error)</p>
      <p className="sentence">{it.parts.map((p, k) => (
        <button key={k} className={`seg2 ${pick !== null && k === answerIdx ? 'right' : ''} ${pick === k && k !== answerIdx ? 'wrong' : ''}`} onClick={() => choose(k)}><sub>{'ABCD'[k]}</sub>{p}</button>
      ))}</p>
      <button className={`btn small ghost ${pick === 4 ? (answerIdx === 4 ? 'okb' : 'badb') : ''}`} onClick={() => choose(4)}>E. No error</button>
      {pick !== null && <div className={`feedback ${pick === answerIdx ? 'good' : 'bad'}`}><Rich text={it.why} block />
        <button className="btn small" onClick={() => (i + 1 >= data.items.length ? setFin(true) : (setI(i + 1), setPick(null)))}>{i + 1 >= data.items.length ? 'Finish' : 'Next →'}</button></div>}
    </div>
  )
}

/* ---------- PatternLab: unlimited abstract reasoning ---------- */
export function PatternLab({ data }: { data?: { kind?: Puzzle['kind']; level?: 'easy' | 'hard' } }) {
  const [seed, setSeed] = useState(() => Date.now() % 100000)
  const [level, setLevel] = useState<'easy' | 'hard'>(data?.level ?? 'easy')
  const [chosen, setChosen] = useState<number | null>(null)
  const [stats, setStats] = useState({ ok: 0, n: 0 })
  const p = useMemo(() => makePuzzle(rng(seed), level, data?.kind), [seed, level, data?.kind])
  const reveal = chosen !== null
  const pick = (i: number) => { setChosen(i); setStats(s => ({ ok: s.ok + (i === p.answer ? 1 : 0), n: s.n + 1 })) }
  return (
    <div className="lab">
      <div className="seg"><button className={level === 'easy' ? 'on' : ''} onClick={() => { setLevel('easy'); setChosen(null); setSeed(seed + 1) }}>Warm-up</button><button className={level === 'hard' ? 'on' : ''} onClick={() => { setLevel('hard'); setChosen(null); setSeed(seed + 1) }}>Exam level</button><span className="muted">Score {stats.ok}/{stats.n}</span></div>
      <p><b>{p.kind === 'odd' ? 'Which figure does NOT belong?' : p.kind === 'matrix' ? 'Which option completes the grid?' : 'Which figure comes next?'}</b></p>
      <PuzzleView p={p} chosen={chosen} reveal={reveal} onPick={pick} />
      {reveal && (
        <div className={`feedback ${chosen === p.answer ? 'good' : 'bad'}`}>
          <b>{chosen === p.answer ? '✓ Correct' : `✗ The answer is ${p.kind === 'odd' ? `figure ${p.answer + 1}` : 'ABCD'[p.answer]}`}</b>
          <p><b>Rule:</b> {p.rule}.</p><p>⚡ {p.tip}</p>
          <button className="btn small" onClick={() => { setChosen(null); setSeed(seed + 1) }}>Next puzzle →</button>
        </div>
      )}
    </div>
  )
}

/* ---------- SeriesLab: number & letter series ---------- */
export function SeriesLab({ data }: { data?: { letters?: boolean; level?: 1 | 2 | 3 } }) {
  const [seed, setSeed] = useState(() => Date.now() % 100000)
  const [level, setLevel] = useState<1 | 2 | 3>(data?.level ?? 1)
  const [letters, setLetters] = useState(!!data?.letters)
  const [chosen, setChosen] = useState<number | null>(null)
  const [stats, setStats] = useState({ ok: 0, n: 0 })
  const s: Series = useMemo(() => (letters ? makeLetterSeries(rng(seed)) : makeNumberSeries(rng(seed), level)), [seed, level, letters])
  const pick = (i: number) => { if (chosen !== null) return; setChosen(i); setStats(t => ({ ok: t.ok + (i === s.correctIndex ? 1 : 0), n: t.n + 1 })) }
  const reset = () => { setChosen(null); setSeed(x => x + 1) }
  return (
    <div className="lab">
      <div className="seg">
        <button className={!letters && level === 1 ? 'on' : ''} onClick={() => { setLetters(false); setLevel(1); reset() }}>Easy</button>
        <button className={!letters && level === 2 ? 'on' : ''} onClick={() => { setLetters(false); setLevel(2); reset() }}>Medium</button>
        <button className={!letters && level === 3 ? 'on' : ''} onClick={() => { setLetters(false); setLevel(3); reset() }}>Hard</button>
        <button className={letters ? 'on' : ''} onClick={() => { setLetters(true); reset() }}>Letters</button>
        <span className="muted">Score {stats.ok}/{stats.n}</span>
      </div>
      <p className="series">{s.prompt}</p>
      <div className="choices">
        {s.options.map((o, k) => (
          <button key={k} className={`choice ${chosen !== null && k === s.correctIndex ? 'right' : ''} ${chosen === k && k !== s.correctIndex ? 'wrong' : ''}`} onClick={() => pick(k)}><b>{'ABCD'[k]}</b>{String(o)}</button>
        ))}
      </div>
      {chosen !== null && (
        <div className={`feedback ${chosen === s.correctIndex ? 'good' : 'bad'}`}>
          <b>{chosen === s.correctIndex ? '✓ Correct' : `✗ It was ${String(s.answer)}`}</b>
          <p><b>Rule:</b> {s.rule}.</p>
          <p>⚡ Write the <i>differences</i> between neighbours first. If they are constant → arithmetic. If they change → look at differences of differences, or ratios, or two interleaved series.</p>
          <button className="btn small" onClick={reset}>Next →</button>
        </div>
      )}
    </div>
  )
}
