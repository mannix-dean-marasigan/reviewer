// Infinite generated math questions with worked explanations (each one is verified by tests).
import type { Question } from '../types'
import { Rng } from './rand'

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a))
const frac = (n: number, d: number) => {
  const g = gcd(n, d)
  n /= g; d /= g
  if (d < 0) { n = -n; d = -d }
  return d === 1 ? `${n}` : `\\frac{${n}}{${d}}`
}

/** Build a Question from a correct answer string + wrong candidates (deduped, padded). */
function mk(r: Rng, q: string, correct: string, wrongs: string[], e: string, trick?: string): Question {
  const w: string[] = []
  for (const x of wrongs) if (x !== correct && !w.includes(x)) w.push(x)
  let pad = 1
  while (w.length < 3) { const n = Number(correct); const cand = Number.isFinite(n) && correct.trim() !== '' ? String(n + pad * (pad % 2 ? 1 : -2)) : correct + '*'.repeat(pad); pad++; if (cand !== correct && !w.includes(cand)) w.push(cand) }
  const a = r.int(0, 3)
  const c = w.slice(0, 3)
  c.splice(a, 0, correct)
  return { q, c: c as Question['c'], a: a as 0 | 1 | 2 | 3, e, trick }
}

const GEN: Record<string, (r: Rng) => Question> = {
  order(r) {
    const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 6), d = r.int(2, 5)
    const ans = a + b * c ** 2 - d
    return mk(r, `Evaluate: $${a} + ${b} \\times ${c}^2 - ${d}$`, `${ans}`,
      [`${(a + b) * c ** 2 - d}`, `${a + b * c * 2 - d}`, `${(a + b * c) ** 2 - d}`, `${ans + d}`].map(String),
      `PEMDAS: exponent first, $${c}^2=${c * c}$. Then multiply: $${b}\\times${c * c}=${b * c * c}$. Then add/subtract left to right: $${a}+${b * c * c}=${a + b * c * c}$, then $-${d}$ gives **${ans}**.`,
      'Circle the exponent first, then the × / ÷, and only then + / −.')
  },
  percentOf(r) {
    const p = r.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75]), n = r.pick([40, 60, 80, 120, 140, 160, 200, 240, 360, 480])
    const ans = (p * n) / 100
    return mk(r, `What is ${p}% of ${n}?`, `${ans}`, [`${ans + n / 10}`, `${(p * n) / 10}`, `${n - ans}`, `${ans / 2}`],
      `${p}% means ${p}/100. So ${p}/100 × ${n} = ${ans}.`,
      'Shortcut: 10% = move the decimal one place; build other percents from it (15% = 10% + half of 10%).')
  },
  fracAdd(r) {
    const d1 = r.pick([2, 3, 4, 5, 6]), d2 = r.pick([3, 4, 5, 6, 8].filter(x => x !== d1))
    const n1 = r.int(1, d1 - 1), n2 = r.int(1, d2 - 1)
    const num = n1 * d2 + n2 * d1, den = d1 * d2
    return mk(r, `Compute: $\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}$`, `$${frac(num, den)}$`,
      [`$${frac(n1 + n2, d1 + d2)}$`, `$${frac(num + 1, den)}$`, `$${frac(num, den + d1)}$`, `$${frac(n1 * n2, d1 * d2)}$`],
      `Common denominator = ${d1}×${d2} = ${den} (or the LCM). $\\frac{${n1}}{${d1}}=\\frac{${n1 * d2}}{${den}}$ and $\\frac{${n2}}{${d2}}=\\frac{${n2 * d1}}{${den}}$. Add numerators: ${n1 * d2}+${n2 * d1}=${num}. Result $${frac(num, den)}$ (simplified).`,
      'Never add the denominators. Cross-multiply: (n1·d2 + n2·d1) / (d1·d2).')
  },
  exponent(r) {
    const base = r.pick([2, 3, 5]), m = r.int(3, 7), n = r.int(2, 5), k = r.int(1, 3)
    const ans = m + n - k
    return mk(r, `Simplify: $\\dfrac{${base}^{${m}} \\cdot ${base}^{${n}}}{${base}^{${k}}}$ as a power of ${base}`, `$${base}^{${ans}}$`,
      [`$${base}^{${m * n - k}}$`, `$${base}^{${m + n + k}}$`, `$${base}^{${m + n - 2 * k}}$`, `$${base * 2}^{${ans}}$`],
      `Same base: multiplying ADDS exponents, dividing SUBTRACTS. Top: ${m}+${n}=${m + n}. Divide: ${m + n}−${k}=${ans}. So $${base}^{${ans}}$.`,
      'Add on top, subtract for the bottom. Never multiply the bases.')
  },
  linear(r) {
    const x = r.int(-6, 9), a = r.pick([2, 3, 4, 5, 6, 7]), b = r.int(1, 15)
    const c = a * x + b
    return mk(r, `Solve for $x$: $${a}x + ${b} = ${c}$`, `${x}`, [`${x + 1}`, `${x - 1}`, `${(c + b) / a}`, `${-x}`].map(String),
      `Subtract ${b} from both sides: $${a}x=${c - b}$. Divide by ${a}: $x=${x}$. Check: ${a}(${x})+${b}=${c} ✓`,
      'Always plug your answer back in; it takes 5 seconds and catches sign errors.')
  },
  discriminant(r) {
    const a = r.pick([1, 2, 3]), b = r.int(-7, 7), c = r.int(-6, 6)
    const D = b * b - 4 * a * c
    const ans = D > 0 ? 'Two different real roots' : D === 0 ? 'One repeated real root' : 'No real roots'
    return mk(r, `How many real roots does $${a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0$ have?`, ans,
      ['Two different real roots', 'One repeated real root', 'No real roots', 'Cannot be determined'],
      `Discriminant $D=b^2-4ac=(${b})^2-4(${a})(${c})=${b * b}-${4 * a * c}=${D}$. ${D > 0 ? 'D > 0 → two different real roots.' : D === 0 ? 'D = 0 → exactly one repeated real root.' : 'D < 0 → no real roots.'}`,
      'D > 0: 2 roots, D = 0: 1 root, D < 0: none. No need to solve the equation.')
  },
  pythag(r) {
    const t = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), k = r.int(1, 3)
    const [a, b, c] = t.map(x => x * k)
    return mk(r, `A right triangle has legs ${a} and ${b}. What is its hypotenuse?`, `${c}`, [`${a + b}`, `${c + 1}`, `${c - 1}`, `${Math.abs(b - a)}`].map(String),
      `$c^2=a^2+b^2=${a * a}+${b * b}=${c * c}$, so $c=${c}$. (This is a ${t.join('-')} triple${k > 1 ? ` scaled by ${k}` : ''}.)`,
      'Memorize the triples 3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples: instant answers.')
  },
  mean(r) {
    const n = r.int(4, 6)
    const arr = Array.from({ length: n }, () => r.int(60, 99))
    const sum = arr.reduce((x, y) => x + y, 0)
    const target = r.int(75, 90)
    const need = target * (n + 1) - sum
    if (need < 0 || need > 130) return GEN.mean(r)
    return mk(r, `A student's first ${n} scores are ${arr.join(', ')}. What score on the next test makes the average exactly ${target}?`, `${need}`,
      [`${target}`, `${need + n}`, `${need - n}`, `${Math.round(sum / n)}`].map(String),
      `Needed total for ${n + 1} tests = ${target}×${n + 1} = ${target * (n + 1)}. Current total = ${sum}. Missing score = ${target * (n + 1)} − ${sum} = **${need}**.`,
      'Average problems: work with TOTALS, not averages. Total needed − total so far.')
  },
  combos(r) {
    const n = r.int(5, 9), k = r.int(2, 3)
    const f = (x: number): number => (x <= 1 ? 1 : x * f(x - 1))
    const ans = f(n) / (f(k) * f(n - k))
    return mk(r, `In how many ways can a committee of ${k} be chosen from ${n} people?`, `${ans}`, [`${f(n) / f(n - k)}`, `${n * k}`, `${ans + n}`, `${Math.pow(n, k)}`].map(String),
      `Order does not matter, so use $\\binom{${n}}{${k}}=\\dfrac{${n}!}{${k}!\\,${n - k}!}=${ans}$.`,
      'Committee / team / group → combination. Schedule / ranking / arrangement → permutation.')
  },
  slope(r) {
    const x1 = r.int(-3, 3), y1 = r.int(-4, 4), dx = r.int(1, 4), m = r.pick([-3, -2, -1, 1, 2, 3])
    const x2 = x1 + dx, y2 = y1 + m * dx
    return mk(r, `Find the slope of the line through $(${x1},${y1})$ and $(${x2},${y2})$.`, `${m}`, [`${-m}`, `${m + 1}`, `${dx}`, `${m * dx}`].map(String),
      `$m=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{${y2}-(${y1})}{${x2}-(${x1})}=\\dfrac{${y2 - y1}}{${dx}}=${m}$.`,
      'Rise over run: subtract in the SAME order on top and bottom.')
  },
  arith(r) {
    const a = r.int(2, 9), d = r.int(2, 8), n = r.int(8, 20)
    const first = r.int(1, 12)
    const ans = first + (n - 1) * d
    return mk(r, `Find the ${n}th term of the arithmetic sequence starting ${first}, ${first + d}, ${first + 2 * d}, …`, `${ans}`, [`${ans + d}`, `${ans - d}`, `${first + n * d}`, `${first * n}`].map(String),
      `$a_n=a_1+(n-1)d=${first}+(${n}-1)(${d})=${first}+${(n - 1) * d}=${ans}$.`,
      'You add the difference ONE FEWER time than the term number.')
  },
  angles(r) {
    const a = r.int(30, 80), b = r.int(30, 80)
    const c = 180 - a - b
    return mk(r, `Two angles of a triangle measure ${a}° and ${b}°. What is the exterior angle at the third vertex?`, `${a + b}°`, [`${c}°`, `${180 - a}°`, `${a + b + 10}°`, `${360 - a - b}°`],
      `Third angle = 180 − ${a} − ${b} = ${c}°. Exterior angle = 180 − ${c} = ${a + b}°. (Exterior angle = sum of the two remote interior angles.)`,
      'Exterior angle = sum of the two opposite interior angles. Skip finding the third angle.')
  },
  circle(r) {
    const rad = r.int(3, 12)
    return mk(r, `A circle has diameter ${2 * rad}. Its area is (use $\\pi$ as is):`, `$${rad * rad}\\pi$`, [`$${2 * rad}\\pi$`, `$${4 * rad * rad}\\pi$`, `$${2 * rad * rad}\\pi$`, `$${rad}\\pi$`],
      `Radius = ${2 * rad}/2 = ${rad}. Area = $\\pi r^2=\\pi(${rad})^2=${rad * rad}\\pi$.`,
      'Trap: the problem gives the DIAMETER. Halve it before using πr².')
  },
  work(r) {
    const a = r.pick([6, 10, 12, 15, 20, 30]), b = r.pick([3, 4, 5, 6, 10, 12, 20, 30].filter(x => x !== a))
    const num = a * b, den = a + b
    return mk(r, `Ana can finish a job in ${a} hours; Ben in ${b} hours. Working together, how long (in hours)?`, `$${frac(num, den)}$`,
      [`$${frac(a + b, 2)}$`, `$${frac(a + b, 1)}$`, `$${frac(num, den + 1)}$`, `$${frac(num + 1, den)}$`],
      `Rates add: $\\frac1{${a}}+\\frac1{${b}}=\\frac{${b}+${a}}{${a * b}}=\\frac{${den}}{${num}}$ job/hour. Time = reciprocal = $${frac(num, den)}$ hours.`,
      'Together time = (a × b) / (a + b). Product over sum.')
  },
}

export const DRILL_KINDS = Object.keys(GEN)
export function mathDrill(r: Rng, kind?: string): Question {
  return GEN[kind ?? r.pick(DRILL_KINDS)](r)
}
