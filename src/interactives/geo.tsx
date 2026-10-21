import { useState } from 'react'
import { Rich } from '../components/Rich'

function Slider({ label, v, set, min, max }: { label: string; v: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <label className="slider">
      <span>{label}: <b>{v}</b></span>
      <input type="range" min={min} max={max} step={1} value={v} onChange={e => set(Number(e.target.value))} />
    </label>
  )
}

/** Drag three side lengths: does a triangle exist, and is it acute, right or obtuse? */
export function TriangleLab() {
  const [a, setA] = useState(5), [b, setB] = useState(6), [c, setC] = useState(7)
  const [x, y, z] = [a, b, c].sort((p, q) => p - q) // z is the longest side
  const valid = x + y > z
  const lhs = x * x + y * y, rhs = z * z
  const kind = lhs === rhs ? 'right' : lhs > rhs ? 'acute' : 'obtuse'
  const bySides = x === y && y === z ? 'equilateral' : x === y || y === z ? 'isosceles' : 'scalene'
  // draw: base = c along the x-axis, apex from the law of cosines
  const px = (b * b + c * c - a * a) / (2 * c)
  const py2 = b * b - px * px
  const py = valid && py2 > 0 ? Math.sqrt(py2) : 0
  const k = Math.min(240 / Math.max(c, 1), 130 / Math.max(py, 1))
  const X0 = 30, Y0 = 160
  return (
    <div className="lab">
      <p className="muted">Drag the three sides. Watch when the triangle “breaks” and when it flips from acute to obtuse.</p>
      <div className="grid3"><Slider label="side a" v={a} set={setA} min={1} max={20} /><Slider label="side b" v={b} set={setB} min={1} max={20} /><Slider label="side c" v={c} set={setC} min={1} max={20} /></div>
      <svg viewBox="0 0 320 180" className="labsvg">
        {valid ? (
          <>
            <polygon points={`${X0},${Y0} ${X0 + c * k},${Y0} ${X0 + px * k},${Y0 - py * k}`} fill="var(--soft)" stroke="var(--ink)" strokeWidth="2" />
            <text x={X0 + (c * k) / 2 - 12} y={Y0 + 14} fontSize="12">c={c}</text>
            <text x={X0 + (px * k) / 2 - 22} y={Y0 - (py * k) / 2} fontSize="12">b={b}</text>
            <text x={X0 + (c * k + px * k) / 2 + 4} y={Y0 - (py * k) / 2} fontSize="12">a={a}</text>
          </>
        ) : <text x="40" y="95" fontSize="15" fill="var(--bad)">These sides cannot make a triangle.</text>}
      </svg>
      <p><Rich text={valid
        ? `Two shorter sides: $${x}+${y}=${x + y}>${z}$ ✓ valid. By sides: **${bySides}**. Pythagoras test: $${x}^2+${y}^2=${lhs}$ vs $${z}^2=${rhs}$ → **${kind}** triangle.`
        : `Triangle Inequality fails: $${x}+${y}=${x + y}$ is NOT bigger than $${z}$. The two short sides cannot reach across.`} /></p>
    </div>
  )
}
