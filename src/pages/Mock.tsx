import { useEffect, useMemo, useRef, useState } from 'react'
import { LESSONS, PLAN, PRIORITY_IDS, SUBJECTS, lessonNumber } from '../content'
import { PuzzleView } from '../components/Figure'
import { Rich } from '../components/Rich'
import { QFig } from '../components/QFig'
import { Words } from '../components/Quiz'
import { mathDrill } from '../lib/drills'
import { makeNumberSeries, makePuzzle, Puzzle } from '../lib/patterns'
import { rng, shuffleChoices } from '../lib/rand'
import { lessonPool } from '../lib/pool'
import { update, useStore } from '../lib/store'
import type { Question, Subject } from '../types'

type Item = { sub: Subject; q?: Question; p?: Puzzle; topic?: string }
export type MockKind = 'priority' | 'full' | 'math' | 'mental' | 'english' | 'day1' | 'day2' | 'day3'

export function buildMock(kind: MockKind, seed: number): Item[] {
  const r = rng(seed)
  return build(kind, r).map(it => (it.q ? { ...it, q: shuffleChoices(it.q, r) } : it))
}

/** 100 questions covering EVERY lesson of one plan day, split evenly between the lessons. */
function buildDay(day: number, r: ReturnType<typeof rng>): Item[] {
  const ids = [...new Set(PLAN[day - 1].items.map(i => i.lesson).filter((x): x is string => !!x))]
  return buildFrom(ids, 100, r)
}

function buildFrom(ids: string[], total: number, r: ReturnType<typeof rng>): Item[] {
  const lessons = ids.map(id => LESSONS.find(l => l.id === id)!).filter(Boolean)
  const base = Math.floor(total / lessons.length)
  const items: Item[] = []
  lessons.forEach((l, i) => {
    const want = base + (i < total - base * lessons.length ? 1 : 0)
    const topic = `${lessonNumber(l.id) ? `${lessonNumber(l.id)}. ` : ''}${l.title}`
    const written = r.shuffle(lessonPool(l)).slice(0, Math.ceil(want * 0.6))
    written.forEach(q => items.push({ sub: l.subject, q, topic }))
    const kinds = l.checks?.drill ?? []
    for (let k = written.length; k < want; k++) {
      items.push({ sub: l.subject, topic, q: kinds.length ? mathDrill(r, r.pick(kinds)) : r.pick(lessonPool(l)) })
    }
  })
  return r.shuffle(items)
}

function build(kind: MockKind, r: ReturnType<typeof rng>): Item[] {
  if (kind === 'priority') return buildFrom(PRIORITY_IDS, 42, r)
  if (kind === 'day1') return buildDay(1, r)
  if (kind === 'day2') return buildDay(2, r)
  if (kind === 'day3') return buildDay(3, r)
  const pool = (s: Subject) => r.shuffle(LESSONS.filter(l => l.subject === s).flatMap(l => lessonPool(l).map(q => ({ sub: s, q }))))
  const mathItems = (n: number): Item[] => {
    const stat = pool('math').slice(0, Math.ceil(n / 2))
    const gen = Array.from({ length: n - stat.length }, () => ({ sub: 'math' as Subject, q: mathDrill(r) }))
    return r.shuffle([...stat, ...gen])
  }
  const mentalItems = (n: number): Item[] => {
    const items: Item[] = []
    for (let i = 0; i < n; i++) {
      if (i % 4 === 3) {
        const s = makeNumberSeries(r, 2)
        items.push({ sub: 'mental', q: { q: `What comes next?  **${s.prompt}**`, c: s.options.map(String) as Question['c'], a: s.correctIndex as 0, e: `Rule: ${s.rule}. The answer is **${s.answer}**.` } })
      } else items.push({ sub: 'mental', p: makePuzzle(r, i > n / 2 ? 'hard' : 'easy') })
    }
    return items
  }
  if (kind === 'math') return mathItems(30)
  if (kind === 'mental') return mentalItems(20)
  if (kind === 'english') return [...pool('english').slice(0, 20), ...pool('reading').slice(0, 10)]
  return [...pool('english').slice(0, 12), ...pool('reading').slice(0, 6), ...mathItems(30), ...mentalItems(14)]
}

const TIMES: Record<MockKind, number> = { priority: 50, full: 90, math: 40, mental: 25, english: 35, day1: 150, day2: 150, day3: 150 }

export default function Mock() {
  const st = useStore()
  const [kind, setKind] = useState<MockKind>('priority')
  const [run, setRun] = useState<{ items: Item[]; seed: number } | null>(null)
  if (run) return <Runner items={run.items} minutes={TIMES[kind]} kind={kind} onExit={() => setRun(null)} />
  return (
    <>
      <h1>📝 Mock exam</h1>
      <p className="muted">Timed, no feedback until you submit, just like the real thing. Questions are drawn from the lesson banks plus freshly generated math and pattern items, so every attempt is different. The real UA&amp;P test layout may differ (check the official admissions page); this mock trains the same skills under the same pressure.</p>
      <div className="card">
        <div className="seg">
          {(['priority', 'day1', 'day2', 'day3', 'math', 'full', 'english', 'mental'] as const).map(k => (
            <button key={k} className={kind === k ? 'on' : ''} onClick={() => setKind(k)}>{k === 'priority' ? '⭐ Priority mock (42 q)' : k === 'day1' ? 'Day 1 mock (100 q)' : k === 'day2' ? 'Day 2 mock (100 q)' : k === 'day3' ? 'Day 3 mock (100 q)' : k === 'full' ? 'Full mock (62 q)' : k === 'math' ? 'Quick math mock (30 q)' : k === 'english' ? 'English + reading (30 q)' : 'Mental ability (20 q)'}</button>
          ))}
        </div>
        <p>Time limit: <b>{TIMES[kind]} minutes</b>. Tip: don't spend more than ~1.3 min per question; flag and skip hard ones.</p>
        <button className="btn gold" onClick={() => { const seed = Date.now() % 2147483000; setRun({ items: buildMock(kind, seed), seed }) }}>Start mock</button>
      </div>
      {st.mocks.length > 0 && (
        <div className="card"><h3>Past attempts</h3>
          {st.mocks.slice().reverse().map((m, i) => (
            <div className="item" key={i}>
              <b>{Math.round((m.score / m.total) * 100)}%</b> {m.score}/{m.total}
              <span className="muted">{Object.entries(m.bySubject).map(([s, [a, b]]) => `${s} ${a}/${b}`).join(' · ')}</span>
              <span className="min">{new Date(m.at).toLocaleString()} · {Math.round(m.secs / 60)} min</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function Runner({ items, minutes, kind, onExit }: { items: Item[]; minutes: number; kind: string; onExit: () => void }) {
  const [i, setI] = useState(0)
  const [ans, setAns] = useState<(number | null)[]>(() => items.map(() => null))
  const [flag, setFlag] = useState<Record<number, boolean>>({})
  const [left, setLeft] = useState(minutes * 60)
  const [done, setDone] = useState(false)
  const started = useRef(Date.now())
  const finish = () => {
    setDone(true)
    const bySubject: Record<string, [number, number]> = {}
    let score = 0
    items.forEach((it, k) => {
      const right = (it.q ? it.q.a : it.p!.answer) === ans[k]
      if (right) score++
      const key = it.topic ?? it.sub
      const e = bySubject[key] ?? [0, 0]
      bySubject[key] = [e[0] + (right ? 1 : 0), e[1] + 1]
    })
    update(s => ({ ...s, mocks: [...s.mocks, { at: Date.now(), score, total: items.length, secs: Math.round((Date.now() - started.current) / 1000), bySubject }] }))
  }
  useEffect(() => {
    if (done) return
    const t = setInterval(() => setLeft(l => l - 1), 1000)
    return () => clearInterval(t)
  }, [done])
  useEffect(() => { if (left <= 0 && !done) finish() }, [left]) // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => {
    if (!done) return null
    const by: Record<string, [number, number]> = {}
    let score = 0
    items.forEach((it, k) => { const right = (it.q ? it.q.a : it.p!.answer) === ans[k]; if (right) score++; const key = it.topic ?? it.sub; const e = by[key] ?? [0, 0]; by[key] = [e[0] + (right ? 1 : 0), e[1] + 1] })
    return { by, score }
  }, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  if (done && result) {
    const pct = Math.round((result.score / items.length) * 100)
    return (
      <>
        <h1>Mock results</h1>
        <div className="card">
          <div className={`score ${pct >= 75 ? 'good' : pct >= 55 ? 'ok' : 'bad'}`}>{result.score}/{items.length} · {pct}%</div>
          {Object.entries(result.by).map(([s, [a, b]]) => (
            <div key={s} style={{ margin: '8px 0' }}><span className={`pill ${SUBJECTS.some(x => x.id === s) ? s : ''}`}>{SUBJECTS.find(x => x.id === s)?.label ?? s}</span> {a}/{b} ({Math.round((a / b) * 100)}%)<div className="progress"><i style={{ width: `${(a / b) * 100}%` }} /></div></div>
          ))}
          <p className="muted">Your weakest subject deserves your next hour. Review every miss below.</p>
          <button className="btn" onClick={onExit}>Back</button>
        </div>
        <h2>Review</h2>
        {items.map((it, k) => {
          const correct = it.q ? it.q.a : it.p!.answer
          if (ans[k] === correct) return null
          return (
            <div className="card" key={k}>
              <span className={`pill ${it.sub}`}>{it.sub}</span> <b>Q{k + 1}</b>
              {it.q ? (
                <>
                  <p><Rich text={it.q.q} /></p>
                  <QFig spec={it.q.fig} />
                  <p>Your answer: {ans[k] === null ? <i>blank</i> : <Rich text={it.q.c[ans[k]!]} />} · <span className="ans">Correct: <Rich text={it.q.c[it.q.a]} /></span></p>
                  <Rich text={it.q.e} block />
                  {it.sub === 'math' && <Words text={`${it.q.q} ${it.q.e}`} />}
                </>
              ) : (
                <>
                  <PuzzleView p={it.p!} chosen={ans[k]} reveal onPick={() => {}} />
                  <p><b>Rule:</b> {it.p!.rule}.</p><p>⚡ {it.p!.tip}</p>
                </>
              )}
            </div>
          )
        })}
      </>
    )
  }

  const it = items[i]
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
  const answered = ans.filter(a => a !== null).length
  return (
    <>
      <div className="dayhead">
        <h2>{kind} mock · Q{i + 1}/{items.length}</h2>
        <span className={`timer ${left < 300 ? 'low' : ''}`}>⏱ {mm}:{ss}</span>
      </div>
      <div className="navgrid">{items.map((_, k) => <button key={k} className={`${ans[k] !== null ? 'ans' : ''} ${k === i ? 'cur' : ''}`} onClick={() => setI(k)}>{flag[k] ? '⚑' : k + 1}</button>)}</div>
      <section className="card">
        <span className={`pill ${it.sub}`}>{SUBJECTS.find(s => s.id === it.sub)?.label}</span>
        {it.q ? (
          <>
            {it.q.passage && <blockquote className="passage"><Rich text={it.q.passage} block /></blockquote>}
            <p className="qtext"><Rich text={it.q.q} /></p>
            <QFig spec={it.q.fig} />
            <div className="choices">
              {it.q.c.map((c, k) => (
                <button key={k} className={`choice ${ans[i] === k ? 'right' : ''}`} onClick={() => setAns(a => a.map((v, j) => (j === i ? k : v)))}><b>{'ABCD'[k]}</b><Rich text={c} /></button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p><b>{it.p!.kind === 'odd' ? 'Which figure does NOT belong?' : it.p!.kind === 'matrix' ? 'Which option completes the grid?' : 'Which figure comes next?'}</b></p>
            <PuzzleView p={it.p!} chosen={ans[i]} reveal={false} onPick={k => setAns(a => a.map((v, j) => (j === i ? k : v)))} />
          </>
        )}
        <div className="exbtns">
          <button className="btn small ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Prev</button>
          <button className="btn small ghost" onClick={() => setFlag(f => ({ ...f, [i]: !f[i] }))}>{flag[i] ? 'Unflag' : '⚑ Flag'}</button>
          <button className="btn small" disabled={i === items.length - 1} onClick={() => setI(i + 1)}>Next →</button>
        </div>
      </section>
      <button className="btn gold" onClick={() => { if (answered === items.length || confirm(`${items.length - answered} unanswered. Submit anyway?`)) finish() }}>Submit exam ({answered}/{items.length} answered)</button>
    </>
  )
}
