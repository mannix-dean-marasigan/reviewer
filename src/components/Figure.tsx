import type { Cell, Item, Puzzle } from '../lib/patterns'

const FILL = ['#ffffff', '#b8bfc9', '#1c2530']

function poly(n: number, r = 32, rot = -90) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((rot + (360 / n) * i) * Math.PI) / 180
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function Shape({ i }: { i: Item }) {
  const common = { fill: FILL[i.fill], stroke: '#1c2530', strokeWidth: 3, strokeLinejoin: 'round' as const }
  let el
  switch (i.s) {
    case 'tri': el = <polygon points="50,18 82,76 18,76" {...common} />; break
    case 'sq': el = <rect x="24" y="24" width="52" height="52" {...common} />; break
    case 'circ': el = <circle cx="50" cy="50" r="28" {...common} />; break
    case 'diamond': el = <polygon points="50,16 82,50 50,84 18,50" {...common} />; break
    case 'pent': el = <polygon points={poly(5)} {...common} />; break
    case 'arrow': el = <polygon points="50,12 80,46 62,46 62,88 38,88 38,46 20,46" {...common} />; break
    case 'L': el = <polygon points="26,18 48,18 48,58 76,58 76,80 26,80" {...common} />; break
    case 'dot': el = <circle cx="50" cy="50" r="7" {...common} /> ; break
  }
  const t = `translate(${50 + i.x} ${50 + i.y}) rotate(${i.rot}) scale(${i.flip ? -i.sz : i.sz} ${i.sz}) translate(-50 -50)`
  return <g transform={t}>{el}</g>
}

export function CellSvg({ cell, size = 84, label }: { cell: Cell | null; size?: number; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={label ?? 'figure'} className="cell">
      <rect x="1" y="1" width="98" height="98" rx="8" fill="#fbfbf8" stroke="#aeb6bd" strokeWidth="2" />
      {cell ? cell.map((it, k) => <Shape key={k} i={it} />) : (
        <text x="50" y="66" textAnchor="middle" fontSize="52" fontWeight="700" fill="#0f6b43">?</text>
      )}
    </svg>
  )
}

export function PuzzleView({ p, chosen, reveal, onPick }: { p: Puzzle; chosen: number | null; reveal: boolean; onPick: (i: number) => void }) {
  const cols = p.kind === 'matrix' ? 3 : 5
  return (
    <div className="puzzle">
      <div className="stem" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
        {p.stem.map((c, i) => {
          const isOdd = p.kind === 'odd'
          const picked = isOdd && chosen === i
          const good = isOdd && reveal && i === p.answer
          return isOdd ? (
            <button key={i} className={`figbtn ${picked ? 'sel' : ''} ${good ? 'good' : ''} ${reveal && picked && i !== p.answer ? 'bad' : ''}`}
              onClick={() => !reveal && onPick(i)} aria-label={`Figure ${i + 1}`}>
              <CellSvg cell={c} />
              <span>{i + 1}</span>
            </button>
          ) : (
            <CellSvg key={i} cell={c} />
          )
        })}
      </div>
      {p.kind !== 'odd' && (
        <div className="opts">
          {p.options.map((o, i) => (
            <button key={i} className={`figbtn ${chosen === i ? 'sel' : ''} ${reveal && i === p.answer ? 'good' : ''} ${reveal && chosen === i && i !== p.answer ? 'bad' : ''}`}
              onClick={() => !reveal && onPick(i)} aria-label={`Option ${'ABCD'[i]}`}>
              <CellSvg cell={o} size={72} />
              <span>{'ABCD'[i]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
