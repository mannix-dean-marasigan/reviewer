import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LESSONS, SUBJECTS, lessonById } from '../content'
import { Blocks, VideoCard } from '../components/Blocks'
import { Quiz } from '../components/Quiz'
import { Rich } from '../components/Rich'
import { INTERACTIVES } from '../interactives'
import { addMinutes, recordQuiz, recordWrong, update, useStore } from '../lib/store'
import { mathDrill } from '../lib/drills'
import { makeLetterSeries, makeNumberSeries } from '../lib/patterns'
import { rng } from '../lib/rand'
import { lessonPool, poolOffsets } from '../lib/pool'
import type { Block, Lesson, Question, Subject } from '../types'

export function LessonList() {
  const st = useStore()
  const [filter, setFilter] = useState<Subject | 'all'>('all')
  const list = LESSONS.filter(l => filter === 'all' || l.subject === filter)
  const total = LESSONS.reduce((a, l) => a + lessonPool(l).length, 0)
  return (
    <>
      <h1>All lessons</h1>
      <p className="muted">{LESSONS.length} lessons · {total} written questions (plus unlimited generated drills and puzzles).</p>
      <div className="seg">
        <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({LESSONS.length})</button>
        {SUBJECTS.map(s => <button key={s.id} className={filter === s.id ? 'on' : ''} onClick={() => setFilter(s.id)}>{s.label}</button>)}
      </div>
      <div className="grid">
        {list.map(l => (
          <Link key={l.id} to={`/lesson/${l.id}`} className="card lcard">
            <span className={`pill ${l.subject}`}>{SUBJECTS.find(s => s.id === l.subject)?.label}</span>
            {st.done[l.id] !== undefined && <span className="done">✓ {st.done[l.id]}%</span>}
            <h3>{l.title}</h3>
            <p className="muted">{l.blurb}</p>
            <span className="muted">~{l.minutes} min · {lessonPool(l).length} questions</span>
          </Link>
        ))}
      </div>
    </>
  )
}

type Tab = 'watch' | 'learn' | 'try' | 'tricks' | 'practice' | 'quiz'

/** Split the written lesson into sections at each heading so a checkpoint can follow each one. */
function sections(blocks: Block[]): Block[][] {
  const out: Block[][] = []
  for (const b of blocks) {
    if (b.t === 'h' && out.length && out[out.length - 1].some(x => x.t !== 'h')) out.push([b])
    else if (!out.length) out.push([b])
    else out[out.length - 1].push(b)
  }
  return out
}

function Checkpoint({ lesson, qs, offset, idxs, onDone, title = '✋ Checkpoint' }: { lesson: Lesson; qs: Question[]; offset?: number; idxs?: (number | null)[]; onDone?: () => void; title?: string }) {
  const [skipped, setSkipped] = useState(false)
  const [finished, setFinished] = useState(false)
  if (!qs.length || skipped) return null
  return (
    <div className="checkpoint">
      <Quiz questions={qs} title={title} retryLabel="Redo checkpoint" glossary={lesson.subject === 'math'}
        onFinish={r => {
          const saved = r.wrongIdx.map(i => (idxs ? idxs[i] : (offset ?? 0) + i)).filter((x): x is number => x !== null && x !== undefined)
          recordWrong(lesson.id, saved)
          setFinished(true); onDone?.()
        }} />
      {!finished && <button className="linkbtn" onClick={() => { setSkipped(true); onDone?.() }}>Skip this checkpoint →</button>}
    </div>
  )
}

/** One video at a time, each followed by its own checkpoint of up to 10 questions. */
function VideoFlow({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const c = lesson.checks
  const off = poolOffsets(lesson)
  const n = lesson.videos.length
  const [k, setK] = useState(0)
  const [cleared, setCleared] = useState<Record<number, boolean>>({})
  const banks = useMemo(() => {
    const r = rng((Date.now() + 7919) % 2147483000)
    const extra = c?.extra ?? []
    const per = Math.ceil(extra.length / n)
    return lesson.videos.map((_, i) => {
      const qs: Question[] = []
      const idxs: (number | null)[] = []
      if (i === 0) (c?.video ?? []).forEach((x, j) => { qs.push(x); idxs.push(off.video + j) })
      extra.slice(i * per, (i + 1) * per).forEach((x, j) => { qs.push(x); idxs.push(off.extra + i * per + j) })
      const need = 10 - qs.length
      if (need > 0 && c?.drill?.length) for (let t = 0; t < need; t++) { qs.push(mathDrill(r, r.pick(c.drill))); idxs.push(null) }
      if (need > 0 && c?.gen === 'series') for (let t = 0; t < need; t++) {
        const s = t % 3 === 2 ? makeLetterSeries(r) : makeNumberSeries(r, t < 4 ? 1 : 2)
        qs.push({ q: `What comes next?  **${s.prompt}**`, c: s.options.map(String) as Question['c'], a: s.correctIndex as 0, e: `Rule: ${s.rule}. The answer is **${s.answer}**.` }); idxs.push(null)
      }
      return { qs, idxs }
    })
  }, [lesson]) // eslint-disable-line react-hooks/exhaustive-deps
  const v = lesson.videos[k]
  const last = k === n - 1
  const done = cleared[k] || !banks[k].qs.length
  return (
    <section>
      {n > 1 && <p className="muted"><b>Video {k + 1} of {n}</b>: watch it, then clear the checkpoint to unlock {last ? 'the written lesson' : 'the next video'}.</p>}
      {n === 1 && <p className="muted">Watch at 1.25× if you already know the basics. Pause and try the example before the teacher solves it.</p>}
      <VideoCard key={v.id} v={v} onWatched={() => update(s => ({ ...s, watched: { ...s.watched, [v.id]: true } }))} />
      <Checkpoint key={k} lesson={lesson} qs={banks[k].qs} idxs={banks[k].idxs} onDone={() => setCleared(x => ({ ...x, [k]: true }))} title={`✋ Checkpoint ${k + 1}: ${banks[k].qs.length} questions`} />
      {done && (last
        ? <button className="btn" onClick={onDone}>Next: written lesson →</button>
        : <button className="btn" onClick={() => { setK(k + 1); window.scrollTo(0, 0) }}>Next video →</button>)}
      {!done && <p className="muted">Finish the checkpoint ↑ (or skip it) to continue.</p>}
    </section>
  )
}

function Practice({ lesson }: { lesson: Lesson }) {
  const c = lesson.checks
  const off = poolOffsets(lesson)
  const [round, setRound] = useState(0)
  const gen = useMemo(() => {
    if (!c?.drill?.length) return []
    const r = rng((Date.now() + round * 104729) % 2147483000)
    const kinds = c.drill
    return Array.from({ length: 8 }, () => mathDrill(r, r.pick(kinds)))
  }, [round, c])
  return (
    <>
      {c?.more && c.more.length > 0 && (
        <Quiz questions={c.more} title="More practice" retryLabel="Redo practice" glossary={lesson.subject === 'math'}
          onFinish={r => { recordWrong(lesson.id, r.wrongIdx.map(i => off.more + i)); addMinutes(Math.round(lesson.minutes / 4)) }} />
      )}
      {gen.length > 0 && (
        <>
          <Quiz key={round} questions={gen} title="Fresh generated problems" retryLabel="New set" glossary={lesson.subject === 'math'} />
          <button className="btn gold" onClick={() => setRound(round + 1)}>🔄 Generate 8 new problems on this topic</button>
        </>
      )}
      {!c?.more?.length && !gen.length && <div className="card">No extra practice bank here. Go to Drills for unlimited puzzles.</div>}
    </>
  )
}

export function LessonPage() {
  const { id } = useParams()
  const lesson = lessonById(id ?? '')
  const st = useStore()
  const [tab, setTab] = useState<Tab>('watch')
  const [unlocked, setUnlocked] = useState(1)
  useEffect(() => { setTab('watch'); setUnlocked(1); window.scrollTo(0, 0) }, [id])
  const secs = useMemo(() => (lesson ? sections(lesson.blocks) : []), [lesson])
  if (!lesson) return <p>Lesson not found. <Link to="/lessons">Back to lessons</Link></p>
  const idx = LESSONS.findIndex(l => l.id === lesson.id)
  const next = LESSONS[idx + 1], prev = LESSONS[idx - 1]
  const Lab = lesson.interactive ? INTERACTIVES[lesson.interactive.k] : undefined
  const c = lesson.checks
  const off = poolOffsets(lesson)
  const hasPractice = !!(c?.more?.length || c?.drill?.length)
  const tabs: [Tab, string][] = [['watch', '1 · Watch'], ['learn', '2 · Learn'], ...(Lab ? [['try', '3 · Try it'] as [Tab, string]] : []), ['tricks', '⚡ Tricks'], ...(hasPractice ? [['practice', '✏️ Practice'] as [Tab, string]] : []), ['quiz', '🏁 Quiz']]
  const go = (t: Tab) => { setTab(t); window.scrollTo(0, 0) }
  const afterLearn: Tab = Lab ? 'try' : 'tricks'
  const learnChecks = c?.learn ?? []
  const allUnlocked = unlocked >= secs.length
  return (
    <>
      <p className="muted"><Link to="/lessons">← Lessons</Link></p>
      <span className={`pill ${lesson.subject}`}>{SUBJECTS.find(s => s.id === lesson.subject)?.label}</span>
      <h1>{lesson.title}</h1>
      <p className="muted">{lesson.blurb} · ~{lesson.minutes} min</p>
      <div className="tabs">{tabs.map(([t, label]) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => go(t)}>{label}</button>)}</div>

      {tab === 'watch' && <VideoFlow key={lesson.id} lesson={lesson} onDone={() => go('learn')} />}
      {tab === 'learn' && (
        <section>
          {secs.map((sec, k) => k < unlocked && (
            <div key={k}>
              <div className="card"><Blocks blocks={sec} /></div>
              {learnChecks[k] && <Checkpoint lesson={lesson} qs={[learnChecks[k]]} offset={off.learn + k} onDone={() => setUnlocked(u => Math.max(u, k + 2))} />}
              {!learnChecks[k] && k + 1 === unlocked && k + 1 < secs.length && <button className="btn small" onClick={() => setUnlocked(k + 2)}>Continue ↓</button>}
            </div>
          ))}
          {allUnlocked && learnChecks.length > secs.length && <Checkpoint lesson={lesson} qs={learnChecks.slice(secs.length)} offset={off.learn + secs.length} title="✋ Section recap" />}
          {allUnlocked && <button className="btn" onClick={() => go(afterLearn)}>{Lab ? 'Next: interactive →' : 'Next: tricks →'}</button>}
          {!allUnlocked && <p className="muted">Answer the checkpoint to unlock the next part ↑</p>}
        </section>
      )}
      {tab === 'try' && Lab && (
        <section>
          <div className="card"><h3>Play with it</h3><Lab data={lesson.interactive?.data} /></div>
          <Checkpoint lesson={lesson} qs={c?.lab ?? []} offset={off.lab} title="✋ Use what you just played with" />
          <button className="btn" onClick={() => go('tricks')}>Next: tricks →</button>
        </section>
      )}
      {tab === 'tricks' && (
        <section className="card">
          <h3>⚡ Tricks &amp; shortcuts</h3>
          <ul className="tricks">{lesson.tricks.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
          <button className="btn" onClick={() => go(hasPractice ? 'practice' : 'quiz')}>{hasPractice ? 'Next: extra practice →' : 'Take the quiz →'}</button>
        </section>
      )}
      {tab === 'practice' && (
        <section>
          <Practice lesson={lesson} />
          <button className="btn" onClick={() => go('quiz')}>Final quiz →</button>
        </section>
      )}
      {tab === 'quiz' && (
        <Quiz questions={lesson.quiz} title={`${lesson.title}: final quiz`} glossary={lesson.subject === 'math'}
          onFinish={r => { recordQuiz(lesson.id, r.wrongIdx, Math.round((r.correct / r.total) * 100)); addMinutes(lesson.minutes) }} />
      )}
      {tab === 'quiz' && st.done[lesson.id] !== undefined && next && (
        <p><Link className="btn gold" to={`/lesson/${next.id}`}>Next lesson: {next.title} →</Link></p>
      )}
      <hr style={{ margin: '28px 0', border: 0, borderTop: '1px solid var(--line)' }} />
      <div className="dayhead">{prev ? <Link to={`/lesson/${prev.id}`}>← {prev.title}</Link> : <span />}{next && <Link to={`/lesson/${next.id}`}>{next.title} →</Link>}</div>
    </>
  )
}
