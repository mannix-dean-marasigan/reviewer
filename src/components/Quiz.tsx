import { useMemo, useState } from 'react'
import type { Question } from '../types'
import { Rich } from './Rich'
import { QFig } from './QFig'
import { rng, shuffleChoices } from '../lib/rand'
import { termsIn } from '../lib/glossary'

export function Words({ text }: { text: string }) {
  const terms = termsIn(text)
  if (!terms.length) return null
  return (
    <details className="words" open>
      <summary>📖 Words used here (tap to hide)</summary>
      <ul>{terms.map(t => <li key={t.name}><b>{t.name}:</b> {t.def}</li>)}</ul>
    </details>
  )
}

export interface QuizResult { correct: number; total: number; wrongIdx: number[] }

/** One-question-at-a-time quiz with instant feedback + detailed explanations. */
export function Quiz({ questions: source, onFinish, title = 'Check yourself', retryLabel = 'Try again', glossary = false }: {
  questions: Question[]; onFinish?: (r: QuizResult) => void; title?: string; retryLabel?: string; glossary?: boolean
}) {
  const [round, setRound] = useState(0)
  // choices are re-shuffled on every attempt so the right letter is never predictable
  const questions = useMemo(() => source.map(x => shuffleChoices(x, rng(Math.floor(Math.random() * 2147483000)))), [source, round]) // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [done, setDone] = useState(false)
  const q = questions[i]

  const result = useMemo<QuizResult>(() => {
    const wrongIdx: number[] = []
    let correct = 0
    questions.forEach((qq, k) => (answers[k] === qq.a ? correct++ : wrongIdx.push(k)))
    return { correct, total: questions.length, wrongIdx }
  }, [answers, questions])

  const choose = (k: number) => {
    if (picked !== null) return
    setPicked(k)
    setAnswers(a => a.map((v, j) => (j === i ? k : v)))
  }
  const next = () => {
    if (i + 1 >= questions.length) {
      setDone(true)
      onFinish?.(result)
    } else { setI(i + 1); setPicked(null) }
  }
  const restart = () => { setRound(r => r + 1); setI(0); setPicked(null); setAnswers(source.map(() => null)); setDone(false) }

  if (done) {
    const pct = Math.round((result.correct / result.total) * 100)
    return (
      <section className="card quiz">
        <h3>{title}: results</h3>
        <div className={`score ${pct >= 80 ? 'good' : pct >= 60 ? 'ok' : 'bad'}`}>{result.correct}/{result.total} · {pct}%</div>
        <p>{pct >= 80 ? 'Strong. Move on. Any miss is saved in your Mistakes notebook.' : pct >= 60 ? 'Decent, but re-read the explanations of what you missed, then retry.' : 'Not yet. Rewatch the video, re-read the tricks, then retry. Misses are saved for review.'}</p>
        {result.wrongIdx.length > 0 && (
          <details open>
            <summary>Review what you missed ({result.wrongIdx.length})</summary>
            {result.wrongIdx.map(k => (
              <div key={k} className="review">
                <p><b>Q{k + 1}.</b> <Rich text={questions[k].q} /></p>
                <QFig spec={questions[k].fig} />
                <p className="ans">Correct: <Rich text={questions[k].c[questions[k].a]} /></p>
                <div className="expl"><Rich text={questions[k].e} block /></div>
                {glossary && <Words text={`${questions[k].q} ${questions[k].e}`} />}
              </div>
            ))}
          </details>
        )}
        <button className="btn" onClick={restart}>{retryLabel}</button>
      </section>
    )
  }

  const shown = picked !== null
  return (
    <section className="card quiz">
      <div className="qhead"><h3>{title}</h3><span className="muted">Question {i + 1} of {questions.length}</span></div>
      <div className="progress"><i style={{ width: `${((i + (shown ? 1 : 0)) / questions.length) * 100}%` }} /></div>
      {q.passage && <blockquote className="passage"><Rich text={q.passage} block /></blockquote>}
      <p className="qtext"><Rich text={q.q} /></p>
      <QFig spec={q.fig} />
      <div className="choices">
        {q.c.map((c, k) => (
          <button key={k}
            className={`choice ${shown && k === q.a ? 'right' : ''} ${shown && picked === k && k !== q.a ? 'wrong' : ''}`}
            onClick={() => choose(k)} disabled={shown}>
            <b>{'ABCD'[k]}</b><Rich text={c} />
          </button>
        ))}
      </div>
      {shown && (
        <div className={`feedback ${picked === q.a ? 'good' : 'bad'}`}>
          <strong>{picked === q.a ? '✓ Correct' : `✗ Not quite. The answer is ${'ABCD'[q.a]}.`}</strong>
          <Rich text={q.e} block />
          {glossary && <Words text={`${q.q} ${q.c.join(' ')} ${q.e}`} />}
          {q.trick && <p className="trick">⚡ <b>Shortcut:</b> <Rich text={q.trick} /></p>}
          <button className="btn" onClick={next}>{i + 1 >= questions.length ? 'See results' : 'Next question →'}</button>
        </div>
      )}
    </section>
  )
}
