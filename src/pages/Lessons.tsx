import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LESSONS, SPRINT_VIDEOS, SUBJECTS, isPriority, lessonById, lessonNumber } from '../content'
import { Blocks, VideoCard } from '../components/Blocks'
import { Quiz } from '../components/Quiz'
import { Rich } from '../components/Rich'
import { addMinutes, recordQuiz, recordWrong, update, useStore } from '../lib/store'
import { mathDrill } from '../lib/drills'
import { makeLetterSeries, makeNumberSeries } from '../lib/patterns'
import { rng } from '../lib/rand'
import { lessonPool, poolOffsets } from '../lib/pool'
import { VIDEO_MAP } from '../content/videoMap'
import type { Block, Lesson, Question, Subject } from '../types'

export function LessonList() {
  const st = useStore()
  const [filter, setFilter] = useState<Subject | 'all' | 'priority'>('math')
  const list = LESSONS.filter(l => filter === 'all' || (filter === 'priority' ? isPriority(l.id) : l.subject === filter))
  const total = LESSONS.reduce((a, l) => a + lessonPool(l).length, 0)
  return (
    <>
      <h1>All lessons</h1>
      <p className="muted">{LESSONS.length} lessons · {total} written questions (plus unlimited generated drills and puzzles).</p>
      <div className="seg">
        <button className={filter === 'priority' ? 'on' : ''} onClick={() => setFilter('priority')}>⭐ Exam priority ({LESSONS.filter(x => isPriority(x.id)).length})</button>
        <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({LESSONS.length})</button>
        {SUBJECTS.map(s => <button key={s.id} className={filter === s.id ? 'on' : ''} onClick={() => setFilter(s.id)}>{s.label}</button>)}
      </div>
      <div className="grid">
        {list.map(l => (
          <Link key={l.id} to={`/lesson/${l.id}`} className={`card lcard ${isPriority(l.id) ? 'prio' : ''}`}>
            <span className={`pill ${l.subject}`}>{SUBJECTS.find(s => s.id === l.subject)?.label}</span>
            {isPriority(l.id) && <span className="pill star">⭐ Likely on the exam</span>}
            {st.done[l.id] !== undefined && <span className="done">✓ {st.done[l.id]}%</span>}
            <h3>{lessonNumber(l.id) ? `${lessonNumber(l.id)}. ` : ''}{l.title}</h3>
            <p className="muted">{l.blurb}</p>
            <span className="muted">~{l.minutes} min · {lessonPool(l).length} questions</span>
          </Link>
        ))}
      </div>
    </>
  )
}

type Tab = 'watch' | 'learn' | 'tricks' | 'practice' | 'quiz'

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
  const total = lesson.videos.length
  const picks = SPRINT_VIDEOS[lesson.id]
  const [sprint, setSprint] = useState(!!picks)
  const order = useMemo(() => lesson.videos.map((_, i) => i).filter(i => !sprint || !picks || picks.includes(lesson.videos[i].id)), [lesson, sprint]) // eslint-disable-line react-hooks/exhaustive-deps
  const n = order.length
  const memKey = `uap-vpos-${lesson.id}-${sprint ? 's' : 'a'}`
  const [pos, setPos] = useState(() => { try { return Math.max(0, Number(localStorage.getItem(memKey)) || 0) } catch { return 0 } })
  const setK = (i: number) => { setPos(i); try { localStorage.setItem(memKey, String(i)) } catch { /* storage may be unavailable */ } }
  const [cleared, setCleared] = useState<Record<number, boolean>>({})
  const banks = useMemo(() => {
    const r = rng((Date.now() + 7919) % 2147483000)
    const extra = c?.extra ?? []
    const per = Math.ceil(extra.length / total)
    const map = VIDEO_MAP[lesson.id]
    return lesson.videos.map((_, i) => {
      const qs: Question[] = []
      const idxs: (number | null)[] = []
      if (map) {
        // math lessons: only the questions that match what THIS video teaches
        ;(map.q?.[i] ?? []).forEach(j => { const x = c?.video[j]; if (x) { qs.push(x); idxs.push(off.video + j) } })
        const kinds = map.kinds[i] ?? []
        if (kinds.length) for (let t = qs.length; t < 10; t++) { qs.push(mathDrill(r, r.pick(kinds))); idxs.push(null) }
        return { qs, idxs }
      }
      if (i === 0) (c?.video ?? []).forEach((x, j) => { qs.push(x); idxs.push(off.video + j) })
      extra.slice(i * per, (i + 1) * per).forEach((x, j) => { qs.push(x); idxs.push(off.extra + i * per + j) })
      const need = 10 - qs.length
      if (need > 0 && c?.gen === 'series') for (let t = 0; t < need; t++) {
        const s2 = t % 3 === 2 ? makeLetterSeries(r) : makeNumberSeries(r, t < 4 ? 1 : 2)
        qs.push({ q: `What comes next?  **${s2.prompt}**`, c: s2.options.map(String) as Question['c'], a: s2.correctIndex as 0, e: `Rule: ${s2.rule}. The answer is **${s2.answer}**.` }); idxs.push(null)
      }
      return { qs, idxs }
    })
  }, [lesson]) // eslint-disable-line react-hooks/exhaustive-deps
  const k = order[Math.min(pos, n - 1)]
  const v = lesson.videos[k]
  const last = pos >= n - 1
  const bank = sprint ? { qs: banks[k].qs.slice(0, 5), idxs: banks[k].idxs.slice(0, 5) } : banks[k]
  const done = cleared[k] || !bank.qs.length
  return (
    <section>
      {picks && (
        <p className="muted">
          {sprint ? <><b>⭐ Sprint mode:</b> the {n} key videos of {total}, 5 checkpoint questions each. </> : <><b>All {total} videos.</b> </>}
          <button className="btn small ghost" onClick={() => { setSprint(x => !x); setPos(0) }}>{sprint ? `Show all ${total} videos` : 'Back to sprint mode'}</button>
        </p>
      )}
      {n > 1 && (
        <p className="muted">Jump to video: <select value={Math.min(pos, n - 1)} onChange={e => { setK(Number(e.target.value)); window.scrollTo(0, 0) }}>
          {order.map((vi, j) => <option key={vi} value={j}>{j + 1}. {lesson.videos[vi].title.slice(0, 70)}</option>)}
        </select></p>
      )}
      {n > 1 && <p className="muted"><b>Video {pos + 1} of {n}</b>: watch it, then clear the checkpoint to unlock {last ? 'the written lesson' : 'the next video'}.</p>}
      {n === 1 && <p className="muted">Watch at 1.25× if you already know the basics. Pause and try the example before the teacher solves it.</p>}
      <VideoCard key={v.id} v={v} onWatched={() => update(s => ({ ...s, watched: { ...s.watched, [v.id]: true } }))} />
      <Checkpoint key={`${sprint}-${k}`} lesson={lesson} qs={bank.qs} idxs={bank.idxs} onDone={() => setCleared(x => ({ ...x, [k]: true }))} title={`✋ Checkpoint ${pos + 1}: ${bank.qs.length} questions`} />
      {done && (last
        ? <button className="btn" onClick={onDone}>Next: written lesson →</button>
        : <button className="btn" onClick={() => { setK(pos + 1); window.scrollTo(0, 0) }}>Next video →</button>)}
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
  const c = lesson.checks
  const off = poolOffsets(lesson)
  const hasPractice = !!(c?.more?.length || c?.drill?.length)
  const tabs: [Tab, string][] = [['watch', '1 · Watch'], ['learn', '2 · Learn'], ['tricks', '⚡ Tricks'], ...(hasPractice ? [['practice', '✏️ Practice'] as [Tab, string]] : []), ['quiz', '🏁 Quiz']]
  const go = (t: Tab) => { setTab(t); window.scrollTo(0, 0) }
  const afterLearn: Tab = 'tricks'
  const learnChecks = c?.learn ?? []
  const allUnlocked = unlocked >= secs.length
  return (
    <>
      <p className="muted"><Link to="/lessons">← Lessons</Link></p>
      <span className={`pill ${lesson.subject}`}>{SUBJECTS.find(s => s.id === lesson.subject)?.label}</span>
      {isPriority(lesson.id) && <span className="pill star">⭐ Likely on the exam: test-takers report this topic most</span>}
      <h1>{lessonNumber(lesson.id) ? `Lesson ${lessonNumber(lesson.id)}: ` : ''}{lesson.title}</h1>
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
          {allUnlocked && <button className="btn" onClick={() => go(afterLearn)}>Next: tricks →</button>}
          {!allUnlocked && <p className="muted">Answer the checkpoint to unlock the next part ↑</p>}
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
