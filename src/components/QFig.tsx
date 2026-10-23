// Figures attached to a question by a short spec string (Question.fig).
// "line:x1,y1,x2,y2" draws a coordinate grid (−6 to 6) with the line through the two marked points.
export function QFig({ spec }: { spec?: string }) {
  if (!spec) return null
  const [kind, args] = spec.split(':')
  if (kind !== 'line') return null
  const [x1, y1, x2, y2] = args.split(',').map(Number)
  const S = 20, O = 140, N = 6
  const px = (x: number) => O + x * S, py = (y: number) => O - y * S
  // extend the line to the edges of the grid
  const dx = x2 - x1, dy = y2 - y1
  const ends: [number, number][] = dx === 0
    ? [[x1, -N - 0.5], [x1, N + 0.5]]
    : [[-N - 0.5, y1 + (dy / dx) * (-N - 0.5 - x1)], [N + 0.5, y1 + (dy / dx) * (N + 0.5 - x1)]]
  const ticks = Array.from({ length: 2 * N + 1 }, (_, i) => i - N)
  return (
    <svg className="qfig" viewBox="0 0 280 280" width="280" height="280" role="img" aria-label={`Graph of a line through (${x1}, ${y1}) and (${x2}, ${y2})`}>
      <defs><clipPath id="qfig-clip"><rect x={px(-N - 0.5)} y={py(N + 0.5)} width={(2 * N + 1) * S} height={(2 * N + 1) * S} /></clipPath></defs>
      {ticks.map(t => (
        <g key={t}>
          <line x1={px(t)} y1={py(N + 0.5)} x2={px(t)} y2={py(-N - 0.5)} stroke="var(--line)" strokeWidth={1} />
          <line x1={px(-N - 0.5)} y1={py(t)} x2={px(N + 0.5)} y2={py(t)} stroke="var(--line)" strokeWidth={1} />
        </g>
      ))}
      <line x1={px(-N - 0.5)} y1={O} x2={px(N + 0.5)} y2={O} stroke="var(--ink)" strokeWidth={1.5} />
      <line x1={O} y1={py(N + 0.5)} x2={O} y2={py(-N - 0.5)} stroke="var(--ink)" strokeWidth={1.5} />
      {ticks.filter(t => t !== 0 && t % 2 === 0).map(t => (
        <g key={`l${t}`} fill="var(--muted)" fontSize="9">
          <text x={px(t)} y={O + 11} textAnchor="middle">{t}</text>
          <text x={O - 4} y={py(t) + 3} textAnchor="end">{t}</text>
        </g>
      ))}
      <text x={px(N + 0.5) - 2} y={O - 4} fill="var(--ink)" fontSize="10" textAnchor="end">x</text>
      <text x={O + 4} y={py(N + 0.5) + 10} fill="var(--ink)" fontSize="10">y</text>
      <line x1={px(ends[0][0])} y1={py(ends[0][1])} x2={px(ends[1][0])} y2={py(ends[1][1])} stroke="var(--accent)" strokeWidth={2.5} clipPath="url(#qfig-clip)" />
      {[[x1, y1], [x2, y2]].map(([x, y], i) => <circle key={i} cx={px(x)} cy={py(y)} r={4.5} fill="var(--gold)" stroke="var(--card)" strokeWidth={1.5} />)}
    </svg>
  )
}
