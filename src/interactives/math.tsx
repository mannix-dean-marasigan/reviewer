import { useState } from 'react'
import { Rich } from '../components/Rich'

function Slider({ label, v, set, min, max, step = 1 }: { label: string; v: number; set: (n: number) => void; min: number; max: number; step?: number }) {
  return (
    <label className="slider">
      <span>{label}: <b>{v}</b></span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(Number(e.target.value))} />
    </label>
  )
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
const r1 = (x: number) => Math.round(x * 100) / 100

/* ---------------- fractions ---------------- */
export function FractionLab() {
  const [n1, setN1] = useState(1), [d1, setD1] = useState(3), [n2, setN2] = useState(1), [d2, setD2] = useState(4)
  const cd = d1 * d2, a = n1 * d2, b = n2 * d1, s = a + b, g = gcd(s, cd)
  const bar = (n: number, d: number, color: string) => (
    <div className="fbar">{Array.from({ length: d }, (_, i) => <i key={i} style={{ background: i < n ? color : 'transparent' }} />)}</div>
  )
  return (
    <div className="lab">
      <p className="muted">Move the sliders. See why you must re-cut the pizzas into the same size slices before adding.</p>
      <div className="grid2">
        <div><Slider label="numerator 1" v={n1} set={v => setN1(Math.min(v, d1))} min={0} max={d1} /><Slider label="denominator 1" v={d1} set={v => { setD1(v); setN1(Math.min(n1, v)) }} min={2} max={10} />{bar(n1, d1, '#2f9e6b')}</div>
        <div><Slider label="numerator 2" v={n2} set={v => setN2(Math.min(v, d2))} min={0} max={d2} /><Slider label="denominator 2" v={d2} set={v => { setD2(v); setN2(Math.min(n2, v)) }} min={2} max={10} />{bar(n2, d2, '#d99a1f')}</div>
      </div>
      <p>Re-cut both into <b>{cd}</b> equal slices: </p>
      <div className="fbar thin">{Array.from({ length: cd }, (_, i) => <i key={i} style={{ background: i < a ? '#2f9e6b' : i < a + b ? '#d99a1f' : 'transparent' }} />)}</div>
      <p><Rich text={`$\\frac{${n1}}{${d1}}+\\frac{${n2}}{${d2}}=\\frac{${a}}{${cd}}+\\frac{${b}}{${cd}}=\\frac{${s}}{${cd}}${g > 1 ? `=\\frac{${s / g}}{${cd / g}}` : ''}$ ≈ ${r1(s / cd)}`} /></p>
    </div>
  )
}

/* ---------------- triangle angles ---------------- */
export function AngleLab() {
  const [A, setA] = useState(55), [B, setB] = useState(65)
  const C = 180 - A - B, ext = A + B
  const pt = (x: number, y: number) => `${x},${y}`
  const Bx = 40, By = 150, Cx = 230, Cy = 150
  const rad = (A * Math.PI) / 180, rb = (B * Math.PI) / 180
  const L = ((Cx - Bx) * Math.sin(((180 - A - B) * Math.PI) / 180)) / Math.sin(rad)
  const Ax = Bx + L * Math.cos(rb), Ay = By - L * Math.sin(rb)
  return (
    <div className="lab">
      <Slider label="angle at B" v={B} set={setB} min={20} max={Math.min(120, 160 - A)} />
      <Slider label="angle at A (top)" v={A} set={v => setA(v)} min={20} max={Math.min(120, 160 - B)} />
      <svg viewBox="0 0 320 180" className="labsvg">
        <polygon points={`${pt(Bx, By)} ${pt(Cx, Cy)} ${pt(Ax, Ay)}`} fill="var(--soft)" stroke="var(--ink)" strokeWidth="2" />
        <line x1={Cx} y1={Cy} x2={Cx + 70} y2={Cy} stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />
        <text x={Bx + 22} y={By - 6} fontSize="13">B={B}°</text>
        <text x={Ax - 18} y={Ay + 22} fontSize="13">A={A}°</text>
        <text x={Cx - 44} y={Cy - 6} fontSize="13">C={C}°</text>
        <text x={Cx + 26} y={Cy - 8} fontSize="13" fill="var(--accent)">exterior={ext}°</text>
      </svg>
      <p><Rich text={`Angles add to $180°$: $${A}+${B}+${C}=180$. The exterior angle at C is $180-${C}=${ext}$, which equals $A+B=${A}+${B}$ (the two angles NOT next to it).`} /></p>
    </div>
  )
}

/* ---------------- circle theorem ---------------- */
export function CircleLab() {
  const [arc, setArc] = useState(80)
  const cx = 150, cy = 100, R = 80
  const pos = (deg: number) => [cx + R * Math.cos((deg * Math.PI) / 180), cy - R * Math.sin((deg * Math.PI) / 180)]
  const b = 90 - arc / 2, c = 90 + arc / 2
  const [bx, by] = pos(b), [ccx, ccy] = pos(c), [ax, ay] = pos(270)
  return (
    <div className="lab">
      <Slider label="arc BC (= central angle)" v={arc} set={setArc} min={20} max={180} step={10} />
      <svg viewBox="0 0 300 200" className="labsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <polygon points={`${cx},${cy} ${bx},${by} ${ccx},${ccy}`} fill="rgba(47,158,107,.25)" stroke="#2f9e6b" strokeWidth="2" />
        <polygon points={`${ax},${ay} ${bx},${by} ${ccx},${ccy}`} fill="rgba(217,154,31,.18)" stroke="#d99a1f" strokeWidth="2" />
        <text x={cx - 8} y={cy + 16} fontSize="12" fill="#2f9e6b">{arc}°</text>
        <text x={ax - 14} y={ay - 6} fontSize="12" fill="#b57b0c">{arc / 2}°</text>
        <text x={bx + 4} y={by - 4} fontSize="12">B</text><text x={ccx - 14} y={ccy - 4} fontSize="12">C</text><text x={ax - 4} y={ay + 14} fontSize="12">A</text>
      </svg>
      <p><Rich text={`Central angle $BOC=${arc}°$. Inscribed angle $BAC=\\frac{${arc}}{2}=${arc / 2}°$. Drag to 180° to see a **diameter**: the inscribed angle is always $90°$ (right angle in a semicircle).`} /></p>
    </div>
  )
}

/* ---------------- quadratic ---------------- */
export function QuadLab() {
  const [a, setA] = useState(1), [b, setB] = useState(-2), [c, setC] = useState(-3)
  const D = b * b - 4 * a * c
  const f = (x: number) => a * x * x + b * x + c
  const pts: string[] = []
  for (let x = -6; x <= 6.001; x += 0.2) { const y = f(x); if (Math.abs(y) < 40) pts.push(`${150 + x * 22},${100 - y * 6}`) }
  const roots = D >= 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)] : []
  return (
    <div className="lab">
      <div className="grid3"><Slider label="a" v={a} set={v => setA(v === 0 ? 1 : v)} min={-3} max={3} /><Slider label="b" v={b} set={setB} min={-8} max={8} /><Slider label="c" v={c} set={setC} min={-8} max={8} /></div>
      <svg viewBox="0 0 300 200" className="labsvg">
        <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" /><line x1="150" y1="0" x2="150" y2="200" stroke="var(--line)" />
        <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {roots.map((x, i) => <circle key={i} cx={150 + x * 22} cy={100} r="5" fill="#2f9e6b" />)}
      </svg>
      <p><Rich text={`$D=b^2-4ac=(${b})^2-4(${a})(${c})=${D}$ → ${D > 0 ? `**two** real roots: $x\\approx${r1(roots[0])}$ and $${r1(roots[1])}$ (the parabola crosses the x-axis twice)` : D === 0 ? `**one** repeated root $x=${r1(roots[0])}$ (the parabola just touches the axis)` : '**no** real roots (the parabola floats above or below the x-axis)'}`} /></p>
    </div>
  )
}

/* ---------------- trig ---------------- */
export function TrigLab() {
  const [deg, setDeg] = useState(30)
  const t = (deg * Math.PI) / 180
  const W = 200, H = W * Math.tan(t)
  const sc = Math.min(1, 140 / H)
  const w = W * sc, h = H * sc
  const x0 = 40, y0 = 170
  return (
    <div className="lab">
      <Slider label="angle θ" v={deg} set={setDeg} min={10} max={80} step={5} />
      <svg viewBox="0 0 300 190" className="labsvg">
        <polygon points={`${x0},${y0} ${x0 + w},${y0} ${x0 + w},${y0 - h}`} fill="var(--soft)" stroke="var(--ink)" strokeWidth="2" />
        <rect x={x0 + w - 12} y={y0 - 12} width="12" height="12" fill="none" stroke="var(--ink)" />
        <text x={x0 + 20} y={y0 - 6} fontSize="13" fill="var(--accent)">θ={deg}°</text>
        <text x={x0 + w / 2 - 20} y={y0 + 16} fontSize="13">adjacent</text>
        <text x={x0 + w + 6} y={y0 - h / 2} fontSize="13">opposite</text>
        <text x={x0 + w / 2 - 40} y={y0 - h / 2 - 8} fontSize="13" transform={`rotate(${-deg} ${x0 + w / 2} ${y0 - h / 2})`}>hypotenuse</text>
      </svg>
      <div className="grid3 trig">
        <div><b>sin θ</b><br />opp/hyp<br /><big>{r1(Math.sin(t))}</big></div>
        <div><b>cos θ</b><br />adj/hyp<br /><big>{r1(Math.cos(t))}</big></div>
        <div><b>tan θ</b><br />opp/adj<br /><big>{r1(Math.tan(t))}</big></div>
      </div>
      <p className="muted">Notice: sin and cos never exceed 1 (hypotenuse is the longest side); tan grows without limit as θ approaches 90°. At 45° sin = cos.</p>
    </div>
  )
}

/* ---------------- venn ---------------- */
export function VennLab() {
  const [total, setTotal] = useState(40), [A, setA] = useState(25), [B, setB] = useState(18), [both, setBoth] = useState(10)
  const bothMax = Math.min(A, B), bothVal = Math.min(both, bothMax)
  const union = A + B - bothVal
  const neither = total - union
  const ok = neither >= 0
  return (
    <div className="lab">
      <div className="grid2">
        <Slider label="total" v={total} set={setTotal} min={20} max={100} /><Slider label="n(A)" v={A} set={setA} min={0} max={60} />
        <Slider label="n(B)" v={B} set={setB} min={0} max={60} /><Slider label="n(A∩B) both" v={bothVal} set={setBoth} min={0} max={bothMax} />
      </div>
      <svg viewBox="0 0 300 150" className="labsvg">
        <rect x="4" y="4" width="292" height="142" rx="8" fill="none" stroke="var(--ink)" />
        <circle cx="115" cy="75" r="55" fill="rgba(47,158,107,.3)" stroke="#2f9e6b" strokeWidth="2" />
        <circle cx="185" cy="75" r="55" fill="rgba(217,154,31,.3)" stroke="#d99a1f" strokeWidth="2" />
        <text x="80" y="80" fontSize="16" textAnchor="middle">{A - bothVal}</text><text x="150" y="80" fontSize="16" textAnchor="middle" fontWeight="700">{bothVal}</text>
        <text x="220" y="80" fontSize="16" textAnchor="middle">{B - bothVal}</text><text x="272" y="136" fontSize="14" textAnchor="middle">{ok ? neither : '!'}</text>
      </svg>
      <p><Rich text={ok ? `$n(A\\cup B)=${A}+${B}-${bothVal}=${union}$. Neither: $${total}-${union}=${neither}$.` : 'Impossible: more people in A∪B than in the whole group. Adjust the sliders.'} /></p>
    </div>
  )
}

/* ---------------- line ---------------- */
export function LineLab() {
  const [x1, setX1] = useState(1), [y1, setY1] = useState(2), [x2, setX2] = useState(4), [y2, setY2] = useState(8)
  const same = x1 === x2
  const m = same ? NaN : (y2 - y1) / (x2 - x1)
  const bb = same ? NaN : y1 - m * x1
  const P = (x: number, y: number) => [150 + x * 12, 100 - y * 9]
  const [p1x, p1y] = P(x1, y1), [p2x, p2y] = P(x2, y2)
  return (
    <div className="lab">
      <div className="grid2"><Slider label="x₁" v={x1} set={setX1} min={-8} max={8} /><Slider label="y₁" v={y1} set={setY1} min={-8} max={8} /><Slider label="x₂" v={x2} set={setX2} min={-8} max={8} /><Slider label="y₂" v={y2} set={setY2} min={-8} max={8} /></div>
      <svg viewBox="0 0 300 200" className="labsvg">
        <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" /><line x1="150" y1="0" x2="150" y2="200" stroke="var(--line)" />
        {!same && <line x1={P(-12, m * -12 + bb)[0]} y1={P(-12, m * -12 + bb)[1]} x2={P(12, m * 12 + bb)[0]} y2={P(12, m * 12 + bb)[1]} stroke="var(--accent)" strokeWidth="2.5" />}
        <circle cx={p1x} cy={p1y} r="5" fill="#2f9e6b" /><circle cx={p2x} cy={p2y} r="5" fill="#d99a1f" />
      </svg>
      <p><Rich text={same ? 'Same x-values: a **vertical line**, slope undefined.' : `$m=\\frac{${y2}-${y1}}{${x2}-${x1}}=${r1(m)}$. Then $b=y_1-mx_1=${y1}-(${r1(m)})(${x1})=${r1(bb)}$. Line: $y=${r1(m)}x${bb < 0 ? '' : '+'}${r1(bb)}$`} /></p>
    </div>
  )
}

/* ---------------- sequences ---------------- */
export function SeqLab() {
  const [a1, setA1] = useState(3), [step, setStep] = useState(4), [n, setN] = useState(10), [geo, setGeo] = useState(false)
  const term = (k: number) => (geo ? a1 * step ** (k - 1) : a1 + (k - 1) * step)
  const list = Array.from({ length: Math.min(8, n) }, (_, i) => term(i + 1))
  return (
    <div className="lab">
      <div className="seg"><button className={!geo ? 'on' : ''} onClick={() => setGeo(false)}>Arithmetic (add d)</button><button className={geo ? 'on' : ''} onClick={() => setGeo(true)}>Geometric (multiply r)</button></div>
      <div className="grid3"><Slider label="first term" v={a1} set={setA1} min={1} max={10} /><Slider label={geo ? 'ratio r' : 'difference d'} v={step} set={setStep} min={geo ? 2 : -5} max={geo ? 4 : 9} /><Slider label="n" v={n} set={setN} min={2} max={geo ? 10 : 30} /></div>
      <p className="terms">{list.join(',  ')}{n > 8 ? ',  …' : ''}</p>
      <p><Rich text={geo ? `$a_n=a_1r^{n-1}=${a1}\\cdot${step}^{${n - 1}}=${term(n)}$` : `$a_n=a_1+(n-1)d=${a1}+${n - 1}(${step})=${term(n)}$`} /></p>
      {!geo && <p><Rich text={`Sum of first ${n} terms: $S_n=\\frac{n}{2}(a_1+a_n)=\\frac{${n}}{2}(${a1}+${term(n)})=${(n * (a1 + term(n))) / 2}$`} /></p>}
    </div>
  )
}

/* ---------------- similar triangles / scale ---------------- */
export function SimilarLab() {
  const [k, setK] = useState(1.5)
  const base = { a: 6, b: 8, c: 10 }
  return (
    <div className="lab">
      <Slider label="scale factor k" v={k} set={setK} min={0.5} max={3} step={0.5} />
      <svg viewBox="0 0 320 170" className="labsvg">
        <polygon points="20,150 20,70 80,150" fill="rgba(47,158,107,.25)" stroke="#2f9e6b" strokeWidth="2" />
        <polygon points={`120,150 120,${150 - 80 * k * 0.5} ${120 + 60 * k * 0.5},150`} fill="rgba(217,154,31,.25)" stroke="#d99a1f" strokeWidth="2" />
        <text x="28" y="165" fontSize="12">legs 6, 8 · hyp 10</text><text x="128" y="165" fontSize="12">legs {r1(6 * k)}, {r1(8 * k)} · hyp {r1(10 * k)}</text>
      </svg>
      <p><Rich text={`Lengths × ${k}. **Areas × ${k}² = ${r1(k * k)}**: original area $\\frac12(6)(8)=24$, new area $=${r1(24 * k * k)}$. Perimeter × ${k}: $${base.a + base.b + base.c}→${r1((base.a + base.b + base.c) * k)}$. Volume would be × ${k}³ = ${r1(k ** 3)}.`} /></p>
    </div>
  )
}

/* ---------------- counting ---------------- */
export function CountLab() {
  const [n, setN] = useState(6), [k, setK] = useState(3)
  const f = (x: number): number => (x <= 1 ? 1 : x * f(x - 1))
  const kk = Math.min(k, n)
  const P = f(n) / f(n - kk), C = P / f(kk)
  return (
    <div className="lab">
      <div className="grid2"><Slider label="n (people/items)" v={n} set={setN} min={3} max={10} /><Slider label="r (chosen)" v={kk} set={setK} min={1} max={Math.min(n, 6)} /></div>
      <div className="grid2 trig">
        <div><b>Permutation</b> (order matters)<br /><Rich text={`$P(${n},${kk})=\\frac{${n}!}{${n - kk}!}$`} /><br /><big>{P}</big></div>
        <div><b>Combination</b> (order doesn't)<br /><Rich text={`$C(${n},${kk})=\\frac{${n}!}{${kk}!\\,${n - kk}!}$`} /><br /><big>{C}</big></div>
      </div>
      <p className="muted">Each group of {kk} can be ordered in {kk}! = {f(kk)} ways. That is why P = C × {f(kk)}.</p>
    </div>
  )
}

/* ---------------- percent ---------------- */
export function PercentLab() {
  const [base, setBase] = useState(800), [pct, setPct] = useState(15), [mode, setMode] = useState<'off' | 'up'>('off')
  const delta = (base * pct) / 100
  const res = mode === 'off' ? base - delta : base + delta
  return (
    <div className="lab">
      <div className="seg"><button className={mode === 'off' ? 'on' : ''} onClick={() => setMode('off')}>Discount (−)</button><button className={mode === 'up' ? 'on' : ''} onClick={() => setMode('up')}>Increase (+)</button></div>
      <div className="grid2"><Slider label="original price ₱" v={base} set={setBase} min={100} max={2000} step={50} /><Slider label="percent %" v={pct} set={setPct} min={5} max={90} step={5} /></div>
      <div className="pbar"><i style={{ width: `${mode === 'off' ? 100 - pct : 100}%` }} /><b className={mode} style={{ width: `${pct}%` }} /></div>
      <p><Rich text={`${pct}% of ₱${base} = ₱${r1(delta)}. ${mode === 'off' ? 'Pay' : 'New price'}: **₱${r1(res)}** — the multiplier trick: $${base}\\times${r1(mode === 'off' ? 1 - pct / 100 : 1 + pct / 100)}=${r1(res)}$.`} /></p>
      <p className="muted">Successive discounts are NOT additive: 20% off then 10% off = ×0.8×0.9 = ×0.72 → 28% off, not 30%.</p>
    </div>
  )
}
