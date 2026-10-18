import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LESSONS, SUBJECTS, lessonById } from '../content'
import { Blocks, VideoCard } from '../components/Blocks'
import { Quiz } from '../components/Quiz'
import { Rich } from '../components/Rich'
import { INTERACTIVES } from '../interactives'
import { addMinutes, recordQuiz, update, useStore } from '../lib/store'
import type { Subject } from '../types'

export function LessonList() {
  const st = useStore()
  const [filter, setFilter] = useState<Subject | 'all'>('all')
  const list = LESSONS.filter(l => filter === 'all' || l.subject === filter)
  return (
    <>
      <h1>All lessons</h1>
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
            <span className="muted">~{l.minutes} min · {l.quiz.length} questions</span>
          </Link>
        ))}
      </div>
    </>
  )
}

type Tab = 'watch' | 'learn' | 'try' | 'tricks' | 'quiz'
export function LessonPage() {
  const { id } = useParams()
  const lesson = lessonById(id ?? '')
  const st = useStore()
  const [tab, setTab] = useState<Tab>('watch')
  useEffect(() => { setTab('watch'); window.scrollTo(0, 0) }, [id])
  if (!lesson) return <p>Lesson not found. <Link to="/lessons">Back to lessons</Link></p>
  const idx = LESSONS.findIndex(l => l.id === lesson.id)
  const next = LESSONS[idx + 1], prev = LESSONS[idx - 1]
  const Lab = lesson.interactive ? INTERACTIVES[lesson.interactive.k] : undefined
  const tabs: [Tab, string][] = [['watch', '1 · Watch'], ['learn', '2 · Learn'], ...(Lab ? [['try', '3 · Try it'] as [Tab, string]] : []), ['tricks', '⚡ Tricks'], ['quiz', 'Quiz']]
  return (
    <>
      <p className="muted"><Link to="/lessons">← Lessons</Link></p>
      <span className={`pill ${lesson.subject}`}>{SUBJECTS.find(s => s.id === lesson.subject)?.label}</span>
      <h1>{lesson.title}</h1>
      <p className="muted">{lesson.blurb} · ~{lesson.minutes} min</p>
      <div className="tabs">{tabs.map(([t, label]) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{label}</button>)}</div>

      {tab === 'watch' && (
        <section>
          <p className="muted">Watch at 1.25× if you already know the basics. Pause and try the example before the teacher solves it. Then move to <b>Learn</b>.</p>
          {lesson.videos.map(v => <VideoCard key={v.id} v={v} onWatched={() => update(s => ({ ...s, watched: { ...s.watched, [v.id]: true } }))} />)}
          <button className="btn" onClick={() => setTab('learn')}>Next: written lesson →</button>
        </section>
      )}
      {tab === 'learn' && (
        <section className="card">
          <Blocks blocks={lesson.blocks} />
          <button className="btn" onClick={() => setTab(Lab ? 'try' : 'tricks')}>{Lab ? 'Next: interactive →' : 'Next: tricks →'}</button>
        </section>
      )}
      {tab === 'try' && Lab && (
        <section className="card">
          <h3>Play with it</h3>
          <Lab data={lesson.interactive?.data} />
          <button className="btn" onClick={() => setTab('tricks')}>Next: tricks →</button>
        </section>
      )}
      {tab === 'tricks' && (
        <section className="card">
          <h3>⚡ Tricks &amp; shortcuts</h3>
          <ul className="tricks">{lesson.tricks.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
          <button className="btn" onClick={() => setTab('quiz')}>Take the quiz →</button>
        </section>
      )}
      {tab === 'quiz' && (
        <Quiz questions={lesson.quiz} title={`${lesson.title} quiz`}
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
