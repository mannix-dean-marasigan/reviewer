import { useState } from 'react'
import type { Block, Video } from '../types'
import { Rich } from './Rich'

export function VideoCard({ v, onWatched }: { v: Video; onWatched?: () => void }) {
  const [on, setOn] = useState(false)
  return (
    <div className="video">
      <div className="frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`}
            title={v.title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button className="thumb" onClick={() => { setOn(true); onWatched?.() }} aria-label={`Play ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="play">▶</span>
          </button>
        )}
      </div>
      <div className="vmeta">
        <b>{v.title}</b>
        <span className="muted">{v.channel}</span>
        <span>{v.why}</span>
        <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
      </div>
    </div>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h': return <h3 key={i} className="bh"><Rich text={b.text} /></h3>
          case 'p': return <p key={i}><Rich text={b.text} /></p>
          case 'list': return <ul key={i}>{b.items.map((x, k) => <li key={k}><Rich text={x} /></li>)}</ul>
          case 'formula': return <div key={i} className="formula">{b.items.map((x, k) => <div key={k}><Rich text={x} /></div>)}</div>
          case 'tip': return <div key={i} className="callout tip"><b>💡 Tip</b><Rich text={b.text} block /></div>
          case 'trap': return <div key={i} className="callout trap"><b>⚠️ Trap</b><Rich text={b.text} block /></div>
          case 'table': return (
            <div key={i} className="tablewrap"><table><thead><tr>{b.head.map((h, k) => <th key={k}><Rich text={h} /></th>)}</tr></thead>
              <tbody>{b.rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>)}</tbody></table></div>
          )
          case 'ex': return <Example key={i} title={b.title} steps={b.steps} ans={b.ans} />
        }
      })}
    </>
  )
}

function Example({ title, steps, ans }: { title: string; steps: string[]; ans?: string }) {
  const [n, setN] = useState(0)
  return (
    <div className="example">
      <div className="exhead"><b>Worked example</b> <Rich text={title} /></div>
      <ol>
        {steps.slice(0, n).map((s, k) => <li key={k}><Rich text={s} /></li>)}
      </ol>
      {n >= steps.length && ans && <div className="exans">Answer: <Rich text={ans} /></div>}
      <div className="exbtns">
        {n < steps.length
          ? <button className="btn small" onClick={() => setN(n + 1)}>{n === 0 ? 'Try it first, then reveal step 1' : `Reveal step ${n + 1} of ${steps.length}`}</button>
          : <button className="btn small ghost" onClick={() => setN(0)}>Hide steps (retry from memory)</button>}
        {n < steps.length && n > 0 && <button className="btn small ghost" onClick={() => setN(steps.length)}>Show all</button>}
      </div>
    </div>
  )
}
