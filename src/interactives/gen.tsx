import { useMemo, useState } from 'react'
import { Rich } from '../components/Rich'

function Slider({ label, v, set, min, max, step = 1 }: { label: string; v: number; set: (n: number) => void; min: number; max: number; step?: number }) {
  return (
    <label className="slider">
      <span>{label}: <b>{v}</b></span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(Number(e.target.value))} />
    </label>
  )
}
const r2 = (x: number) => Math.round(x * 100) / 100
const fmt = (x: number) => (Number.isInteger(x) ? `${x}` : `${r2(x)}`)

/* ---------- two lines: where do they cross? ---------- */
export function SystemLab() {
  const [m1, setM1] = useState(1), [b1, setB1] = useState(1), [m2, setM2] = useState(-1), [b2, setB2] = useState(5)
  const P = (x: number, y: number) => [150 + x * 14, 100 - y * 8]
  const line = (m: number, b: number) => { const [x1, y1] = P(-10, m * -10 + b), [x2, y2] = P(10, m * 10 + b); return { x1, y1, x2, y2 } }
  const l1 = line(m1, b1), l2 = line(m2, b2)
  const parallel = m1 === m2
  const same = parallel && b1 === b2
  const x = parallel ? NaN : (b2 - b1) / (m1 - m2), y = m1 * x + b1
  const [ix, iy] = P(x, y)
  return (
    <div className="lab">
      <div className="grid2"><Slider label="line 1 slope" v={m1} set={setM1} min={-5} max={5} /><Slider label="line 1 y-intercept" v={b1} set={setB1} min={-8} max={8} /><Slider label="line 2 slope" v={m2} set={setM2} min={-5} max={5} /><Slider label="line 2 y-intercept" v={b2} set={setB2} min={-8} max={8} /></div>
      <svg viewBox="0 0 300 200" className="labsvg">
        <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" /><line x1="150" y1="0" x2="150" y2="200" stroke="var(--line)" />
        <line {...l1} stroke="#2f9e6b" strokeWidth="2.5" /><line {...l2} stroke="#d99a1f" strokeWidth="2.5" />
        {!parallel && Math.abs(x) < 10 && Math.abs(y) < 12 && <circle cx={ix} cy={iy} r="6" fill="var(--accent)" />}
      </svg>
      <p><Rich text={`Line 1: $y=${m1}x${b1 < 0 ? '' : '+'}${b1}$   Line 2: $y=${m2}x${b2 < 0 ? '' : '+'}${b2}$`} /></p>
      <p><Rich text={same ? 'Same line: **infinitely many solutions** (dependent system).' : parallel ? 'Same slope, different intercepts → **parallel**, they never meet: **no solution** (inconsistent).' : `They cross at $(${fmt(x)},\\ ${fmt(y)})$. That point is the **solution** of the system. Check by elimination: set $${m1}x${b1 < 0 ? '' : '+'}${b1}=${m2}x${b2 < 0 ? '' : '+'}${b2}$ → $x=\\frac{${b2}-(${b1})}{${m1}-(${m2})}=${fmt(x)}$.`} /></p>
    </div>
  )
}

/* ---------- function families ---------- */
type Fam = 'linear' | 'quadratic' | 'exponential' | 'logarithmic' | 'rational'
export function GraphLab({ data }: { data?: { kind?: Fam } }) {
  const [fam, setFam] = useState<Fam>(data?.kind ?? 'quadratic')
  const [a, setA] = useState(1), [h, setH] = useState(0), [k, setK] = useState(0), [bb, setBb] = useState(2)
  const f = (x: number): number => {
    switch (fam) {
      case 'linear': return a * (x - h) + k
      case 'quadratic': return a * (x - h) ** 2 + k
      case 'exponential': return a * bb ** (x - h) + k
      case 'logarithmic': return x - h > 0 ? a * (Math.log(x - h) / Math.log(bb)) + k : NaN
      case 'rational': return x - h === 0 ? NaN : a / (x - h) + k
    }
  }
  const pts = useMemo(() => {
    const segs: string[][] = [[]]
    for (let x = -10; x <= 10.001; x += 0.1) {
      const y = f(x)
      if (!Number.isFinite(y) || Math.abs(y) > 12) { if (segs[segs.length - 1].length) segs.push([]); continue }
      segs[segs.length - 1].push(`${150 + x * 14},${100 - y * 8}`)
    }
    return segs.filter(s => s.length > 1)
  }, [fam, a, h, k, bb]) // eslint-disable-line react-hooks/exhaustive-deps
  const text: Record<Fam, string> = {
    linear: `$f(x)=${a}(x${h < 0 ? '+' : '-'}${Math.abs(h)})${k < 0 ? '' : '+'}${k}$ — slope **${a}**. Domain: all real numbers. Range: all real numbers.`,
    quadratic: `$f(x)=${a}(x${h < 0 ? '+' : '-'}${Math.abs(h)})^2${k < 0 ? '' : '+'}${k}$ — vertex **(${h}, ${k})**, axis of symmetry $x=${h}$, opens ${a > 0 ? 'UP (minimum ' + k + ')' : 'DOWN (maximum ' + k + ')'}. Range: $y${a > 0 ? '\\ge' : '\\le'}${k}$.`,
    exponential: `$f(x)=${a}\\cdot${bb}^{x${h < 0 ? '+' : '-'}${Math.abs(h)}}${k < 0 ? '' : '+'}${k}$ — horizontal asymptote **y = ${k}**. Domain: all reals. Range: $y${a > 0 ? '>' : '<'}${k}$. It ${a > 0 ? 'grows' : 'falls'} as x increases.`,
    logarithmic: `$f(x)=${a}\\log_{${bb}}(x${h < 0 ? '+' : '-'}${Math.abs(h)})${k < 0 ? '' : '+'}${k}$ — vertical asymptote **x = ${h}**. Domain: $x>${h}$. Range: all reals.`,
    rational: `$f(x)=\\frac{${a}}{x${h < 0 ? '+' : '-'}${Math.abs(h)}}${k < 0 ? '' : '+'}${k}$ — vertical asymptote **x = ${h}**, horizontal asymptote **y = ${k}**. Domain: $x\\ne${h}$. Range: $y\\ne${k}$.`,
  }
  return (
    <div className="lab">
      <div className="seg">{(['linear', 'quadratic', 'exponential', 'logarithmic', 'rational'] as Fam[]).map(f2 => <button key={f2} className={fam === f2 ? 'on' : ''} onClick={() => setFam(f2)}>{f2}</button>)}</div>
      <div className="grid2"><Slider label="a (stretch / direction)" v={a} set={v => setA(v === 0 ? 1 : v)} min={-4} max={4} /><Slider label="h (shift right)" v={h} set={setH} min={-5} max={5} /><Slider label="k (shift up)" v={k} set={setK} min={-5} max={5} />{(fam === 'exponential' || fam === 'logarithmic') && <Slider label="base b" v={bb} set={v => setBb(Math.max(2, v))} min={2} max={5} />}</div>
      <svg viewBox="0 0 300 200" className="labsvg">
        <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" /><line x1="150" y1="0" x2="150" y2="200" stroke="var(--line)" />
        {fam === 'exponential' && <line x1="0" y1={100 - k * 8} x2="300" y2={100 - k * 8} stroke="var(--bad)" strokeDasharray="5 4" />}
        {fam === 'rational' && <><line x1="0" y1={100 - k * 8} x2="300" y2={100 - k * 8} stroke="var(--bad)" strokeDasharray="5 4" /><line x1={150 + h * 14} y1="0" x2={150 + h * 14} y2="200" stroke="var(--bad)" strokeDasharray="5 4" /></>}
        {fam === 'logarithmic' && <line x1={150 + h * 14} y1="0" x2={150 + h * 14} y2="200" stroke="var(--bad)" strokeDasharray="5 4" />}
        {pts.map((s, i) => <polyline key={i} points={s.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />)}
      </svg>
      <p><Rich text={text[fam]} /></p>
    </div>
  )
}

/* ---------- truth tables ---------- */
const OPS: Record<string, { sym: string; name: string; f: (p: boolean, q: boolean) => boolean; rule: string }> = {
  and: { sym: 'p ∧ q', name: 'conjunction (AND)', f: (p, q) => p && q, rule: 'True only when BOTH p and q are true.' },
  or: { sym: 'p ∨ q', name: 'disjunction (OR)', f: (p, q) => p || q, rule: 'False only when BOTH are false.' },
  imp: { sym: 'p → q', name: 'conditional (if p then q)', f: (p, q) => !p || q, rule: 'False only when p is TRUE and q is FALSE (a broken promise).' },
  iff: { sym: 'p ↔ q', name: 'biconditional (p if and only if q)', f: (p, q) => p === q, rule: 'True when p and q have the SAME truth value.' },
  nand: { sym: '~(p ∧ q)', name: 'negation of AND', f: (p, q) => !(p && q), rule: 'The opposite of p ∧ q (De Morgan: ~p ∨ ~q).' },
  xor: { sym: 'p ⊻ q', name: 'exclusive or', f: (p, q) => p !== q, rule: 'True when exactly ONE of them is true.' },
}
export function TruthTable() {
  const [op, setOp] = useState('imp')
  const o = OPS[op]
  const T = (b: boolean) => (b ? 'T' : 'F')
  return (
    <div className="lab">
      <div className="seg">{Object.entries(OPS).map(([k, v]) => <button key={k} className={op === k ? 'on' : ''} onClick={() => setOp(k)}>{v.sym}</button>)}</div>
      <p><b>{o.sym}</b>: {o.name}. {o.rule}</p>
      <div className="tablewrap"><table><thead><tr><th>p</th><th>q</th><th>~p</th><th>~q</th><th>{o.sym}</th></tr></thead>
        <tbody>{[[true, true], [true, false], [false, true], [false, false]].map(([p, q], i) => (
          <tr key={i}><td>{T(p)}</td><td>{T(q)}</td><td>{T(!p)}</td><td>{T(!q)}</td><td style={{ fontWeight: 700, background: o.f(p, q) ? 'var(--good-bg)' : 'var(--bad-bg)' }}>{T(o.f(p, q))}</td></tr>
        ))}</tbody></table></div>
      <p className="muted">Green rows are true, red rows are false. Notice: p → q is the same as ~p ∨ q, and p → q has the same truth column as its contrapositive ~q → ~p.</p>
    </div>
  )
}

/* ---------- interest ---------- */
export function InterestLab() {
  const [P, setP] = useState(10000), [rate, setRate] = useState(6), [t, setT] = useState(5), [m, setM] = useState(1)
  const simple = P * (1 + (rate / 100) * t)
  const comp = P * (1 + rate / 100 / m) ** (m * t)
  const mx = Math.max(simple, comp)
  return (
    <div className="lab">
      <div className="grid2"><Slider label="principal ₱" v={P} set={setP} min={1000} max={100000} step={1000} /><Slider label="annual rate %" v={rate} set={setRate} min={1} max={20} /><Slider label="years" v={t} set={setT} min={1} max={30} /></div>
      <div className="seg"><span>Compounded:</span>{[[1, 'yearly'], [2, 'semiannual'], [4, 'quarterly'], [12, 'monthly']].map(([v, l]) => <button key={v} className={m === v ? 'on' : ''} onClick={() => setM(v as number)}>{l}</button>)}</div>
      <div className="pbar"><i style={{ width: `${(simple / mx) * 100}%` }} /></div><p className="muted">Simple: ₱{Math.round(simple).toLocaleString()}</p>
      <div className="pbar"><i style={{ width: `${(comp / mx) * 100}%`, background: 'var(--gold)' }} /></div><p className="muted">Compound: ₱{Math.round(comp).toLocaleString()}</p>
      <p><Rich text={`Simple: $F=P(1+rt)=${P}(1+${rate / 100}\\cdot${t})=${Math.round(simple)}$.  Compound: $F=P\\left(1+\\frac{r}{m}\\right)^{mt}=${P}\\left(1+\\frac{${rate / 100}}{${m}}\\right)^{${m * t}}\\approx${Math.round(comp)}$. Compound earns **₱${Math.round(comp - simple).toLocaleString()}** more because interest earns interest.`} /></p>
    </div>
  )
}

/* ---------- statistics ---------- */
const median = (a: number[]) => { const n = a.length; return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2 }
export function StatsLab() {
  const [txt, setTxt] = useState('4, 8, 6, 5, 3, 9, 7, 8, 12')
  const xs = txt.split(/[ ,;]+/).map(Number).filter(n => txt.trim() !== '' && Number.isFinite(n)).sort((a, b) => a - b)
  const n = xs.length
  if (n < 2) return <div className="lab"><input value={txt} onChange={e => setTxt(e.target.value)} style={{ width: '100%', padding: 8 }} /><p className="muted">Type at least two numbers separated by commas.</p></div>
  const mean = xs.reduce((a, b) => a + b, 0) / n
  const lower = xs.slice(0, Math.floor(n / 2)), upper = xs.slice(Math.ceil(n / 2))
  const q1 = median(lower), q3 = median(upper), med = median(xs)
  const counts = new Map<number, number>(); xs.forEach(x => counts.set(x, (counts.get(x) ?? 0) + 1))
  const top = Math.max(...counts.values())
  const modes = top === 1 ? 'no mode' : [...counts].filter(([, c]) => c === top).map(([v]) => v).join(', ')
  const ss = xs.reduce((a, b) => a + (b - mean) ** 2, 0)
  return (
    <div className="lab">
      <label className="slider"><span>Your data (edit me):</span><input value={txt} onChange={e => setTxt(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--line)' }} /></label>
      <p className="terms">Sorted: {xs.join(', ')}</p>
      <div className="grid3 trig">
        <div><b>n</b><br /><big>{n}</big></div><div><b>mean</b><br /><big>{fmt(mean)}</big></div><div><b>median (Q2)</b><br /><big>{fmt(med)}</big></div>
        <div><b>Q1</b><br /><big>{fmt(q1)}</big></div><div><b>Q3</b><br /><big>{fmt(q3)}</big></div><div><b>IQR = Q3 − Q1</b><br /><big>{fmt(q3 - q1)}</big></div>
        <div><b>mode</b><br /><big>{modes}</big></div><div><b>variance (population)</b><br /><big>{fmt(ss / n)}</big></div><div><b>std. deviation</b><br /><big>{fmt(Math.sqrt(ss / n))}</big></div>
      </div>
      <p className="muted">Q1 is the median of the lower half and Q3 the median of the upper half (the middle value is left out when n is odd). Sample variance divides by n − 1 instead: {fmt(ss / (n - 1))}.</p>
    </div>
  )
}
