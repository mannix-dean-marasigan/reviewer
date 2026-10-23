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

const plain = (s: string) => s.replace(/\$/g, '')
const coef = (a: number, v: string) => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`)
const sgn = (n: number) => (n < 0 ? `-${-n}` : `+${n}`)
/** a·x + b, written neatly (no 1x, no +0, no +-). */
const lin = (a: number, b: number) => `${coef(a, 'x')}${b === 0 ? '' : sgn(b)}`
/** a·x² + b·x + c, written neatly. */
/** (x − n) as a factor, or just x when n = 0. */
const fx = (n: number) => (n === 0 ? 'x' : `(x${sgn(-n)})`)
const quad = (a: number, b: number, c: number) => `${coef(a, 'x^2')}${b === 0 ? '' : b > 0 ? '+' + coef(b, 'x') : '-' + coef(-b, 'x')}${c === 0 ? '' : sgn(c)}`

/** Polynomial from coefficients, highest power first: [2, -3, 0, 5] → 2x^3-3x^2+5. */
const pstr = (cs: number[]) => {
  const n = cs.length - 1
  let out = ''
  cs.forEach((c, i) => {
    if (c === 0) return
    const e = n - i
    const v = e === 0 ? `${Math.abs(c)}` : coef(Math.abs(c), e === 1 ? 'x' : `x^${e}`)
    out += out === '' ? (c < 0 ? '-' : '') + v : (c < 0 ? '-' : '+') + v
  })
  return out || '0'
}
/** Build a Question from a correct answer string + wrong candidates (deduped, padded). */
function mk(r: Rng, q: string, correct: string, wrongs: string[], e: string, trick?: string): Question {
  const w: string[] = []
  for (const x of wrongs) if (x !== correct && !w.includes(x)) w.push(x)
  let pad = 1
  while (w.length < 3) { const n = Number(correct); const um = correct.match(/^(₱?)(-?\d+(?:\.\d+)?)([^\d,].*)?$/)
    const cand = Number.isFinite(n) && correct.trim() !== '' ? String(n + pad * (pad % 2 ? 1 : -2)) : um ? `${um[1]}${Number(um[2]) + pad * (pad % 2 ? 1 : -2)}${um[3] ?? ''}` : correct + '*'.repeat(pad); pad++; if (cand !== correct && !w.includes(cand)) w.push(cand) }
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
      `**Idea:** PEMDAS is the order of work: Parentheses, Exponents, Multiply/Divide (left to right), Add/Subtract (left to right).\n**Step 1 (exponent):** $${c}^2$ means ${c}×${c} = ${c * c}$.\n**Step 2 (multiply):** $${b}\\times${c * c}=${b * c * c}$.\n**Step 3 (add, then subtract, left to right):** $${a}+${b * c * c}=${a + b * c * c}$, then $${a + b * c * c}-${d}=${ans}$.\n**Answer: ${ans}**`,
      'Circle the exponent first, then the × / ÷, and only then + / −.')
  },
  percentOf(r) {
    const p = r.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75]), n = r.pick([40, 60, 80, 120, 140, 160, 200, 240, 360, 480])
    const ans = (p * n) / 100
    return mk(r, `What is ${p}% of ${n}?`, `${ans}`, [`${ans + n / 10}`, `${(p * n) / 10}`, `${n - ans}`, `${ans / 2}`],
      `**Words:** **percent** means “out of 100”.\n**Step 1:** ${p}% is the same as ${p}/100.\n**Step 2 (“of” means multiply):** ${p}/100 × ${n}.\n**Step 3:** ${n} × ${p} = ${n * p}, and ${n * p} ÷ 100 = ${ans}.\n**Answer: ${ans}**`,
      'Shortcut: 10% = move the decimal one place; build other percents from it (15% = 10% + half of 10%).')
  },
  fracAdd(r) {
    const d1 = r.pick([2, 3, 4, 5, 6]), d2 = r.pick([3, 4, 5, 6, 8].filter(x => x !== d1))
    const n1 = r.int(1, d1 - 1), n2 = r.int(1, d2 - 1)
    const num = n1 * d2 + n2 * d1, den = d1 * d2
    return mk(r, `Compute: $\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}$`, `$${frac(num, den)}$`,
      [`$${frac(n1 + n2, d1 + d2)}$`, `$${frac(num + 1, den)}$`, `$${frac(num, den + d1)}$`, `$${frac(n1 * n2, d1 * d2)}$`],
      `**Words:** the **denominator** is the bottom number (how many equal pieces). To add fractions the pieces must be the same size, so we need a **common denominator**.\n**Step 1:** a common denominator of ${d1} and ${d2} is ${d1}×${d2} = ${den}.\n**Step 2 (convert):** $\\frac{${n1}}{${d1}}=\\frac{${n1 * d2}}{${den}}$ and $\\frac{${n2}}{${d2}}=\\frac{${n2 * d1}}{${den}}$.\n**Step 3 (add the tops, keep the bottom):** ${n1 * d2}+${n2 * d1}=${num}, so $\\frac{${num}}{${den}}$.\n**Step 4 (simplify if you can):** $${frac(num, den)}$.\n**Answer: $${frac(num, den)}$**`,
      'Never add the denominators. Cross-multiply: (n1·d2 + n2·d1) / (d1·d2).')
  },
  exponent(r) {
    const base = r.pick([2, 3, 5]), m = r.int(3, 7), n = r.int(2, 5), k = r.int(1, 3)
    const ans = m + n - k
    return mk(r, `Simplify: $\\dfrac{${base}^{${m}} \\cdot ${base}^{${n}}}{${base}^{${k}}}$ as a power of ${base}`, `$${base}^{${ans}}$`,
      [`$${base}^{${m * n - k}}$`, `$${base}^{${m + n + k}}$`, `$${base}^{${m + n - 2 * k}}$`, `$${base * 2}^{${ans}}$`],
      `**Words:** in $${base}^{${m}}$ the ${base} is the **base** and ${m} is the **exponent** (how many times ${base} is multiplied by itself).\n**Rule 1:** same base multiplied → ADD the exponents. **Rule 2:** same base divided → SUBTRACT the exponents.\n**Step 1 (top):** ${m}+${n}=${m + n}, so the top is $${base}^{${m + n}}$.\n**Step 2 (divide):** ${m + n}−${k}=${ans}.\n**Answer: $${base}^{${ans}}$**`,
      'Add on top, subtract for the bottom. Never multiply the bases.')
  },
  linear(r) {
    const x = r.int(-6, 9), a = r.pick([2, 3, 4, 5, 6, 7]), b = r.int(1, 15)
    const c = a * x + b
    return mk(r, `Solve for $x$: $${a}x + ${b} = ${c}$`, `${x}`, [`${x + 1}`, `${x - 1}`, `${c - b}`, `${-x}`].map(String),
      `**Idea:** an equation is a balance. Whatever you do to one side you must do to the other. We want x alone.\n**Step 1 (subtract ${b} from both sides):** $${a}x=${c - b}$.\n**Step 2 (divide both sides by ${a}):** $x=${x}$.\n**Check:** ${a}(${x})+${b}=${c} ✓\n**Answer: ${x}**`,
      'Always plug your answer back in; it takes 5 seconds and catches sign errors.')
  },
  discriminant(r) {
    const want = r.pick(['pos', 'zero', 'neg'] as const)
    let a = 1, b = 0, c = 0
    if (want === 'zero') { const k = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]); a = r.pick([1, 1, 4]); const s = a === 4 ? 2 : 1; b = 2 * s * k; c = k * k }
    else if (want === 'neg') { a = r.pick([1, 2, 3]); b = r.int(-6, 6); c = Math.floor((b * b) / (4 * a)) + r.int(1, 6) }
    else { a = r.pick([1, 2, 3]); b = r.int(-7, 7); c = r.int(-8, 4); if (b * b - 4 * a * c <= 0) return GEN.discriminant(r) }
    const D = b * b - 4 * a * c
    const ans = D > 0 ? 'Two real solutions' : D === 0 ? 'One real solution' : 'Two imaginary solutions (no real solutions)'
    return mk(r, `Use the discriminant: how many real solutions does $${quad(a, b, c)}=0$ have?`, ans,
      ['Two real solutions', 'One real solution', 'Two imaginary solutions (no real solutions)', 'Cannot be determined'],
      `**Words:** the **discriminant** $D=b^2-4ac$ tells what kind of solutions a quadratic has: $D>0$ → two real, $D=0$ → one real, $D<0$ → two imaginary (no real ones).\n**Step 1 (read a, b, c):** $a=${a}$, $b=${b}$, $c=${c}$.\n**Step 2 (substitute):** $D=(${b})^2-4(${a})(${c})=${b * b}-(${4 * a * c})=${D}$.\n**Step 3:** ${D > 0 ? 'D is positive, so there are two real solutions.' : D === 0 ? 'D is zero, so there is only one real solution.' : 'D is negative, so there are two imaginary solutions and no real ones.'}\n**Answer: ${ans}**`,
      'D > 0: two real. D = 0: one real. D < 0: two imaginary.')
  },
  pythag(r) {
    const t = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), k = r.int(1, 3)
    const [a, b, c] = t.map(x => x * k)
    return mk(r, `A right triangle has legs ${a} and ${b}. What is its hypotenuse?`, `${c}`, [`${a + b}`, `${c + 1}`, `${c - 1}`, `${Math.abs(b - a)}`].map(String),
      `**Words:** in a right triangle the **hypotenuse** is the longest side (opposite the right angle). The Pythagorean theorem: $a^2+b^2=c^2$.\n**Step 1 (square the legs):** $${a}^2=${a * a}$ and $${b}^2=${b * b}$.\n**Step 2 (add):** ${a * a}+${b * b}=${c * c}$.\n**Step 3 (square root):** $\\sqrt{${c * c}}=${c}$.\n**Answer: ${c}**`,
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
      `**Words:** the **average** (mean) = total ÷ how many numbers. So total = average × how many.\n**Step 1 (total needed for ${n + 1} tests):** ${target} × ${n + 1} = ${target * (n + 1)}.\n**Step 2 (total so far):** ${arr.join(' + ')} = ${sum}.\n**Step 3 (what is missing):** ${target * (n + 1)} − ${sum} = ${need}.\n**Answer: ${need}**`,
      'Average problems: work with TOTALS, not averages. Total needed − total so far.')
  },
  combos(r) {
    const n = r.int(5, 9), k = r.int(2, 3)
    const f = (x: number): number => (x <= 1 ? 1 : x * f(x - 1))
    const ans = f(n) / (f(k) * f(n - k))
    return mk(r, `In how many ways can a committee of ${k} be chosen from ${n} people?`, `${ans}`, [`${f(n) / f(n - k)}`, `${n * k}`, `${ans + n}`, `${Math.pow(n, k)}`].map(String),
      `**Words:** a **combination** counts groups where ORDER does NOT matter (a committee). Formula: $C(n,r)=\\frac{n!}{r!(n-r)!}$ where $n!$ (“n factorial”) means $n\\times(n-1)\\times\\cdots\\times1$.\n**Step 1:** $C(${n},${k})=\\frac{${n}!}{${k}!\\,${n - k}!}$.\n**Step 2 (cancel):** the top is the first ${k} numbers counting down from ${n}, the bottom is ${k}!.\n**Step 3 (compute):** $${ans}$.\n**Answer: ${ans}**`,
      'Committee / team / group → combination. Schedule / ranking / arrangement → permutation.')
  },
  slope(r) {
    const x1 = r.int(-3, 3), y1 = r.int(-4, 4), dx = r.int(1, 4), m = r.pick([-3, -2, -1, 1, 2, 3])
    const x2 = x1 + dx, y2 = y1 + m * dx
    return mk(r, `Find the slope of the line through $(${x1},${y1})$ and $(${x2},${y2})$.`, `${m}`, [`${-m}`, `${m + 1}`, `${dx}`, `${m * dx}`].map(String),
      `**Words:** the **slope** tells how steep a line is: rise ÷ run = (change in y) ÷ (change in x).\n**Step 1 (change in y):** ${y2} − (${y1}) = ${y2 - y1}.\n**Step 2 (change in x, in the same order):** ${x2} − (${x1}) = ${dx}.\n**Step 3 (divide):** ${y2 - y1} ÷ ${dx} = ${m}.\n**Answer: ${m}**`,
      'Rise over run: subtract in the SAME order on top and bottom.')
  },
  arith(r) {
    const a = r.int(2, 9), d = r.int(2, 8), n = r.int(8, 20)
    const first = r.int(1, 12)
    const ans = first + (n - 1) * d
    return mk(r, `Find the ${n}th term of the arithmetic sequence starting ${first}, ${first + d}, ${first + 2 * d}, …`, `${ans}`, [`${ans + d}`, `${ans - d}`, `${first + n * d}`, `${first * n}`].map(String),
      `**Words:** an **arithmetic sequence** adds the same number each time (the **common difference**, d). Formula: $a_n=a_1+(n-1)d$.\n**Step 1 (find d):** ${first + d} − ${first} = ${d}.\n**Step 2 (substitute):** $a_{${n}}=${first}+(${n}-1)\\times${d}$.\n**Step 3:** ${n - 1} × ${d} = ${(n - 1) * d}, and ${first} + ${(n - 1) * d} = ${ans}.\n**Answer: ${ans}**`,
      'You add the difference ONE FEWER time than the term number.')
  },
  angles(r) {
    const a = r.int(30, 80), b = r.int(30, 80)
    const c = 180 - a - b
    return mk(r, `Two angles of a triangle measure ${a}° and ${b}°. What is the exterior angle at the third vertex?`, `${a + b}°`, [`${c}°`, `${180 - a}°`, `${a + b + 10}°`, `${360 - a - b}°`],
      `**Words:** the three angles inside a triangle add up to 180°. An **exterior angle** is formed outside by extending a side; it equals the sum of the two inside angles that are not next to it.\n**Step 1 (third angle):** 180 − ${a} − ${b} = ${c}°.\n**Step 2 (exterior angle = 180 − the inside angle next to it):** 180 − ${c} = ${a + b}°.\n**Shortcut:** ${a} + ${b} = ${a + b}° ✓\n**Answer: ${a + b}°**`,
      'Exterior angle = sum of the two opposite interior angles. Skip finding the third angle.')
  },
  circle(r) {
    const rad = r.int(3, 12)
    return mk(r, `A circle has diameter ${2 * rad}. Its area is (use $\\pi$ as is):`, `$${rad * rad}\\pi$`, [`$${2 * rad}\\pi$`, `$${4 * rad * rad}\\pi$`, `$${2 * rad * rad}\\pi$`, `$${rad}\\pi$`],
      `**Words:** the **diameter** goes across the whole circle; the **radius** is half of it (centre to edge). Area of a circle $=\\pi r^2$.\n**Step 1 (halve the diameter):** ${2 * rad} ÷ 2 = ${rad}.\n**Step 2 (square the radius):** ${rad}² = ${rad * rad}.\n**Step 3:** area = ${rad * rad}π.\n**Answer: ${rad * rad}π**`,
      'Trap: the problem gives the DIAMETER. Halve it before using πr².')
  },
  work(r) {
    const a = r.pick([6, 10, 12, 15, 20, 30]), b = r.pick([3, 4, 5, 6, 10, 12, 20, 30].filter(x => x !== a))
    const num = a * b, den = a + b
    return mk(r, `Ana can finish a job in ${a} hours; Ben in ${b} hours. Working together, how long (in hours)?`, `$${frac(num, den)}$`,
      [`$${frac(a + b, 2)}$`, `$${frac(a + b, 1)}$`, `$${frac(num, den + 1)}$`, `$${frac(num + 1, den)}$`],
      `**Words:** a **rate** is how much of the job gets done in one hour. If Ana takes ${a} hours, she does $\\frac1{${a}}$ of the job per hour.\n**Step 1 (rates):** Ana $\\frac1{${a}}$, Ben $\\frac1{${b}}$ of the job per hour.\n**Step 2 (add rates, common denominator ${a * b}):** $\\frac{${b}}{${a * b}}+\\frac{${a}}{${a * b}}=\\frac{${den}}{${num}}$ of the job per hour.\n**Step 3 (flip to get time for the whole job):** $\\frac{${num}}{${den}}$ hours = $${frac(num, den)}$.\n**Answer: $${frac(num, den)}$ hours**`,
      'Together time = (a × b) / (a + b). Product over sum.')
  },
  ratioShare(r) {
    const a = r.int(2, 5), b = r.int(a + 1, 8), unit = r.int(4, 25)
    const total = (a + b) * unit
    return mk(r, `₱${total} is shared in the ratio ${a}:${b}. How much is the larger share?`, `₱${b * unit}`,
      [`₱${a * unit}`, `₱${total / 2}`, `₱${b * unit + unit}`, `₱${total - unit}`],
      `**Words:** a **ratio** ${a}:${b} means the first person gets ${a} parts for every ${b} parts the second gets.\n**Step 1 (total parts):** ${a}+${b}=${a + b}.\n**Step 2 (value of one part):** ${total} ÷ ${a + b} = ${unit}.\n**Step 3 (larger share = ${b} parts):** ${b} × ${unit} = ${b * unit}.\n**Answer: ₱${b * unit}**`,
      'Add the ratio parts, divide the total by that sum, then multiply.')
  },
  discount(r) {
    const price = r.pick([400, 500, 800, 1200, 1500, 2000, 2500]), d = r.pick([10, 15, 20, 25, 30, 40])
    const sale = (price * (100 - d)) / 100
    return mk(r, `A ₱${price} item has a ${d}% discount. What is the sale price?`, `₱${sale}`,
      [`₱${price - d}`, `₱${(price * d) / 100}`, `₱${price + (price * d) / 100}`, `₱${sale + 50}`],
      `**Words:** a **discount** is money taken off the price.\n**Step 1 (what you still pay):** 100% − ${d}% = ${100 - d}%, which is ${(100 - d) / 100} as a decimal.\n**Step 2:** ${price} × ${(100 - d) / 100} = ${sale}.\n**Answer: ₱${sale}**`,
      'Multiply by (1 − discount) in one step.')
  },
  factor(r) {
    const p = r.int(1, 7), s = r.int(1, 8)
    const [lo, hi] = [Math.min(p, s), Math.max(p, s)]
    const b = lo + hi, c = lo * hi
    const f = (x: number, y: number) => `$(x+${x})(x+${y})$`
    return mk(r, `Factor: $x^2+${b}x+${c}$`, f(lo, hi),
      [f(lo + 1, hi), `$(x-${lo})(x-${hi})$`, f(lo, hi + 1), `$(x+${b})(x+${c})$`],
      `**Words:** to **factor** means to rewrite as a product of brackets. For $x^2+bx+c$ find two numbers that MULTIPLY to $c$ and ADD to $b$.\n**Step 1:** we need product ${c} and sum ${b}.\n**Step 2 (list pairs):** the numbers ${lo} and ${hi} work because ${lo}×${hi}=${c} and ${lo}+${hi}=${b}.\n**Step 3:** $x^2+${b}x+${c}=(x+${lo})(x+${hi})$.\n**Check (FOIL):** $x^2+${hi}x+${lo}x+${c}$ ✓\n**Answer: $(x+${lo})(x+${hi})$**`,
      'Product = last number, sum = middle number.')
  },
  venn(r) {
    const total = r.int(30, 90), both = r.int(3, 15), a = r.int(both + 5, both + 30), b = r.int(both + 4, both + 25)
    const union = a + b - both
    if (union >= total) return GEN.venn(r)
    return mk(r, `In a group of ${total}, ${a} like tea, ${b} like coffee and ${both} like both. How many like neither?`, `${total - union}`,
      [`${total - a - b}`, `${total - union + both}`, `${union}`, `${total - union - both}`],
      `**Words:** “neither” means in no group at all. The overlap (people in both) is counted twice when we add, so subtract it once.\n**Step 1 (in at least one group):** ${a}+${b}−${both}=${union}.\n**Step 2 (neither = total − at least one):** ${total}−${union}=${total - union}.\n**Answer: ${total - union}**`,
      'Subtract the overlap once, then subtract from the total.')
  },
  trig(r) {
    const t = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]])
    const [o, a, h] = t
    const which = r.pick(['sin', 'cos', 'tan'] as const)
    const val = which === 'sin' ? [o, h] : which === 'cos' ? [a, h] : [o, a]
    const wrongs = which === 'sin' ? [[a, h], [o, a], [h, o]] : which === 'cos' ? [[o, h], [o, a], [h, a]] : [[a, o], [o, h], [a, h]]
    return mk(r, `In a right triangle the side opposite θ is ${o}, the side adjacent to θ is ${a} and the hypotenuse is ${h}. Find $\\${which}\\theta$.`, `$${frac(val[0], val[1])}$`,
      wrongs.map(w => `$${frac(w[0], w[1])}$`),
      `**Words:** in a right triangle, **opposite** is across from θ, **adjacent** is next to θ, and the **hypotenuse** is the longest side. SOH: sin = opposite ÷ hypotenuse. CAH: cos = adjacent ÷ hypotenuse. TOA: tan = opposite ÷ adjacent.\n**Step 1 (which ratio?):** we want ${which}, so we use ${which === 'sin' ? 'opposite ÷ hypotenuse' : which === 'cos' ? 'adjacent ÷ hypotenuse' : 'opposite ÷ adjacent'}.\n**Step 2 (substitute):** ${val[0]} ÷ ${val[1]}.\n**Step 3 (simplify):** $${frac(val[0], val[1])}$.\n**Answer: $${frac(val[0], val[1])}$**`,
      'Write SOH-CAH-TOA first, then label the sides.')
  },
  dice(r) {
    const s = r.int(3, 11)
    const n = s <= 7 ? s - 1 : 13 - s
    return mk(r, `Two fair dice are rolled. What is the probability that the sum is ${s}?`, `$${frac(n, 36)}$`,
      [`$${frac(n + 1, 36)}$`, `$${frac(n, 12)}$`, `$${frac(Math.max(n - 1, 1), 36)}$`, `$${frac(1, 6)}$`, `$${frac(n + 2, 36)}$`],
      `**Words:** **probability** = (ways it can happen) ÷ (all possible outcomes).\n**Step 1 (all outcomes):** 6 × 6 = 36.\n**Step 2 (ways to make ${s}):** list the pairs (first die, second die) that add to ${s}: there are ${n}.\n**Step 3:** ${n} ÷ 36 = $${frac(n, 36)}$.\n**Answer: $${frac(n, 36)}$**`,
      'List pairs systematically: (1,x), (2,x), …')
  },
  polyAngle(r) {
    const n = r.int(5, 12)
    return mk(r, `What is the sum of the interior angles of a polygon with ${n} sides?`, `${(n - 2) * 180}°`,
      [`${n * 180}°`, `${(n - 1) * 180}°`, `${(n - 2) * 90}°`, `360°`],
      `**Words:** a polygon with ${n} sides can be cut into triangles from one corner, and each triangle has angles adding to 180°.\n**Step 1 (number of triangles):** ${n} − 2 = ${n - 2}.\n**Step 2:** ${n - 2} × 180° = ${(n - 2) * 180}°.\n**Answer: ${(n - 2) * 180}°**`,
      'A polygon splits into n − 2 triangles from one vertex.')
  },
  fracDiv(r) {
    const a = r.int(1, 5), b = r.int(a + 1, 9), c = r.int(1, 5), d = r.int(c + 1, 9)
    return mk(r, `Compute: $\\frac{${a}}{${b}}\\div\\frac{${c}}{${d}}$`, `$${frac(a * d, b * c)}$`,
      [`$${frac(a * c, b * d)}$`, `$${frac(b * c, a * d)}$`, `$${frac(a + c, b + d)}$`, `$${frac(a * d + 1, b * c)}$`],
      `**Words:** the **reciprocal** of a fraction is the fraction flipped upside-down. Dividing by a fraction means multiplying by its reciprocal (“keep-change-flip”).\n**Step 1 (keep, change, flip):** $\\frac{${a}}{${b}}\\times\\frac{${d}}{${c}}$.\n**Step 2 (multiply tops and bottoms):** $\\frac{${a * d}}{${b * c}}$.\n**Step 3 (simplify):** $${frac(a * d, b * c)}$.\n**Answer: $${frac(a * d, b * c)}$**`,
      'Flip the second fraction, then multiply.')
  },
  sciNot(r) {
    const m = r.int(11, 99) / 10, e = r.int(3, 7)
    const num = Math.round(m * 10 ** e)
    return mk(r, `Write ${num.toLocaleString('en-US')} in scientific notation.`, `$${m}\\times10^{${e}}$`,
      [`$${m}\\times10^{${e - 1}}$`, `$${m}\\times10^{${e + 1}}$`, `$${m * 10}\\times10^{${e}}$`, `$${m}\\times10^{-${e}}$`],
      `**Words:** **scientific notation** writes a number as (a number between 1 and 10) × 10 to a power.\n**Step 1:** move the decimal point to get a number between 1 and 10: ${m}.\n**Step 2 (count the places moved):** ${e} places to the left.\n**Step 3:** moving left means a big number, so the power is positive: $10^{${e}}$.\n**Answer: $${m}\\times10^{${e}}$**`,
      'Count how many places the decimal moves: left = positive power.')
  },
  distance(r) {
    const t = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]])
    const x1 = r.int(-4, 4), y1 = r.int(-4, 4)
    return mk(r, `Find the distance between $(${x1},${y1})$ and $(${x1 + t[0]},${y1 + t[1]})$.`, `${t[2]}`,
      [`${t[0] + t[1]}`, `${t[2] + 1}`, `${t[1] - t[0]}`, `${t[2] - 1}`],
      `**Words:** the **distance** between two points comes from the Pythagorean theorem.\n**Step 1 (change in x and change in y):** ${t[0]} and ${t[1]}.\n**Step 2 (square and add):** ${t[0]}² + ${t[1]}² = ${t[0] ** 2} + ${t[1] ** 2} = ${t[0] ** 2 + t[1] ** 2}.\n**Step 3 (square root):** √${t[0] ** 2 + t[1] ** 2} = ${t[2]}.\n**Answer: ${t[2]}**`,
      'Spot the Pythagorean triple.')
  },
  pctChange(r) {
    const old = r.pick([40, 50, 80, 120, 200, 250]), pct = r.pick([10, 20, 25, 30, 40, 50])
    const up = r.pick([true, false])
    const nw = up ? (old * (100 + pct)) / 100 : (old * (100 - pct)) / 100
    return mk(r, `A value changes from ${old} to ${nw}. What is the percent ${up ? 'increase' : 'decrease'}?`, `${pct}%`,
      [`${pct + 5}%`, `${Math.round((Math.abs(nw - old) / nw) * 100)}%`, `${Math.abs(nw - old)}%`, `${pct * 2}%`],
      `**Words:** **percent change** = (change ÷ the OLD value) × 100.\n**Step 1 (change):** ${nw} − ${old} = ${nw - old}.\n**Step 2 (divide by the OLD value):** ${Math.abs(nw - old)} ÷ ${old} = ${pct / 100}.\n**Step 3 (to percent):** ${pct / 100} × 100 = ${pct}%.\n**Answer: ${pct}%**`,
      'Always divide by the starting value.')
  },
  lcm(r) {
    const a = r.pick([4, 6, 8, 9, 10, 12, 14, 15]), b = r.pick([5, 6, 7, 9, 10, 12, 18, 20].filter(x => x !== a))
    const g = gcd(a, b)
    const l = (a * b) / g
    return mk(r, `What is the least common multiple of ${a} and ${b}?`, `${l}`,
      [`${a * b === l ? l + a : a * b}`, `${g}`, `${l + g}`, `${a + b}`],
      `**Words:** the **LCM** (least common multiple) is the smallest number that both numbers divide into. The **GCF** (greatest common factor) is the biggest number that divides both.\n**Step 1 (GCF of ${a} and ${b}):** ${g}.\n**Step 2 (LCM = product ÷ GCF):** (${a} × ${b}) ÷ ${g} = ${a * b} ÷ ${g} = ${l}.\n**Check:** ${l} ÷ ${a} = ${l / a} and ${l} ÷ ${b} = ${l / b}, both whole numbers ✓\n**Answer: ${l}**`,
      'LCM = product ÷ GCF.')
  },
  radical(r) {
    const k = r.int(2, 9), m = r.pick([2, 3, 5, 6, 7])
    return mk(r, `Simplify $\\sqrt{${k * k * m}}$`, `$${k}\\sqrt{${m}}$`,
      [`$${k * m}\\sqrt{${k}}$`, `$${k}\\sqrt{${m * m}}$`, `$${m}\\sqrt{${k}}$`, `$${k + m}$`],
      `**Words:** a **radical** (√) asks for a square root. To simplify, pull out a **perfect square** factor (4, 9, 16, 25, 36…).\n**Step 1:** ${k * k * m} = ${k * k} × ${m}, and ${k * k} is a perfect square ($${k}\\times${k}$).\n**Step 2:** $\\sqrt{${k * k * m}}=\\sqrt{${k * k}}\\times\\sqrt{${m}}$.\n**Step 3:** $\\sqrt{${k * k}}=${k}$.\n**Answer: $${k}\\sqrt{${m}}$**`,
      'Pull out the biggest perfect square factor.')
  },
  geo(r) {
    const a = r.int(1, 5), q = r.int(2, 4), n = r.int(4, 6)
    const ans = a * q ** (n - 1)
    return mk(r, `Find the ${n}th term of the geometric sequence ${a}, ${a * q}, ${a * q * q}, …`, `${ans}`,
      [`${a * q ** n}`, `${ans - a}`, `${a + (n - 1) * q}`, `${ans * q}`],
      `**Words:** a **geometric sequence** multiplies by the same number each time (the **common ratio**, r). Formula: $a_n=a_1\\times r^{n-1}$.\n**Step 1 (find r):** ${a * q} ÷ ${a} = ${q}.\n**Step 2 (substitute):** $a_{${n}}=${a}\\times${q}^{${n - 1}}$.\n**Step 3:** ${q}^${n - 1} = ${q ** (n - 1)}, and ${a} × ${q ** (n - 1)} = ${ans}.\n**Answer: ${ans}**`,
      'Multiply by the ratio (n − 1) times.')
  },
  rect(r) {
    const w = r.int(3, 12), l = w + r.int(1, 8)
    return mk(r, `A rectangle has length ${l} and width ${w}. What is its area?`, `${l * w}`,
      [`${2 * (l + w)}`, `${l + w}`, `${l * w + w}`, `${(l * w) / 2}`],
      `**Words:** **area** is the space inside a shape; **perimeter** is the distance around it.\n**Step 1 (area of a rectangle = length × width):** ${l} × ${w}.\n**Step 2:** ${l} × ${w} = ${l * w}.\n**Answer: ${l * w}**`,
      'Area multiplies; perimeter adds.')
  },
  quadRoot(r) {
    const a = r.int(1, 8), b = r.int(-8, -1)
    const B = -(a + b), C = a * b
    const eq = `${quad(1, B, C)}=0`
    return mk(r, `Solve $${eq}$. What is the larger root?`, `${a}`,
      [`${b}`, `${a + 1}`, `${-a}`, `${C}`].map(String),
      `**Words:** the **roots** of an equation are the x-values that make it true.\n**Step 1 (factor the left side):** find two numbers with product ${C} and sum ${B}. They are ${-a} and ${-b}.\n**Step 2 (write the brackets):** $(x${-a < 0 ? '-' : '+'}${Math.abs(a)})(x${-b < 0 ? '-' : '+'}${Math.abs(b)})=0$.\n**Step 3 (each bracket must be 0 for the product to be 0):** $x=${a}$ or $x=${b}$.\n**Step 4 (pick the larger):** ${a}.\n**Answer: ${a}**`,
      'Sum of roots = −b, product = c.')
  },
  segAdd(r) {
    const x = r.int(2, 9), a = r.int(2, 6), c = r.int(1, a - 1), b = r.int(1, 8)
    const d = (a - c) * x + b
    const pm = a * x + b
    return mk(r, `M is the midpoint of $\\overline{PQ}$. $PM=${a}x+${b}$ and $MQ=${lin(c, d)}$. Find $PQ$.`, `${2 * pm}`,
      [`${pm}`, `${x}`, `${2 * pm + 2}`, `${2 * pm - 2}`],
      `**Words:** a **midpoint** splits a segment into two EQUAL parts, so $PM=MQ$. The **Segment Addition Postulate** says $PQ=PM+MQ$.\n**Step 1 (set the halves equal):** ${a}x+${b}=${c}x+${d}.\n**Step 2 (subtract ${c}x from both sides):** ${a - c}x+${b}=${d}.\n**Step 3 (subtract ${b}):** ${a - c}x=${d - b}, so x=${x}.\n**Step 4 (find one half):** PM = ${a}(${x})+${b} = ${pm}.\n**Step 5 (whole segment = 2 halves):** PQ = 2 × ${pm} = ${2 * pm}.\n**Answer: ${2 * pm}**`,
      'Midpoint → the two halves are equal; solve for x first, then double.')
  },
  triIneq(r) {
    const s1 = r.int(4, 12), s2 = r.int(s1 + 1, 16)
    const lo = s2 - s1, hi = s1 + s2
    const ok = r.int(lo + 1, hi - 1)
    return mk(r, `Two sides of a triangle are ${s1} and ${s2}. Which could be the length of the third side?`, `${ok}`,
      [`${hi}`, `${lo}`, `${hi + 3}`, `${lo - 1}`].map(String),
      `**Words:** the **Triangle Inequality Theorem** says any two sides of a triangle must add up to MORE than the third side.\n**Step 1 (largest the third side can be):** it must be less than ${s1}+${s2} = ${hi}.\n**Step 2 (smallest the third side can be):** it must be more than ${s2}−${s1} = ${lo}.\n**Step 3:** the third side is between ${lo} and ${hi} (not equal to either).\n**Step 4:** only ${ok} is inside that range.\n**Answer: ${ok}**`,
      'Third side is between the DIFFERENCE and the SUM of the other two.')
  },
  parAngle(r) {
    const A = r.int(40, 130)
    return mk(r, `One angle of a parallelogram measures ${A}°. What is the measure of an angle NEXT to it (a consecutive angle)?`, `${180 - A}°`,
      [`${A}°`, `${360 - A}°`, `${90 - (A % 90)}°`, `${180 - A + 10}°`],
      `**Words:** a **parallelogram** has two pairs of parallel sides. **Consecutive** angles are angles that share a side.\n**Step 1:** the sides are parallel, so consecutive angles are **supplementary** (they add to 180°, like co-interior angles).\n**Step 2:** 180° − ${A}° = ${180 - A}°.\n**Check:** opposite angles are equal, so the four angles are ${A}°, ${180 - A}°, ${A}°, ${180 - A}°, and they add to 360° ✓\n**Answer: ${180 - A}°**`,
      'Next-door angles add to 180°; opposite angles are equal.')
  },
  arcAngle(r) {
    const kind = r.pick(['inscribed', 'central', 'chords', 'secants', 'tangent'] as const)
    if (kind === 'inscribed') {
      const arc = 2 * r.int(20, 80)
      return mk(r, `An inscribed angle intercepts an arc of ${arc}°. What is the measure of the inscribed angle?`, `${arc / 2}°`, [`${arc}°`, `${arc * 2}°`, `${180 - arc / 2}°`, `${arc / 4}°`],
        `**Words:** an **inscribed angle** has its corner ON the circle. The **arc** it “looks at” is the curved part between its two sides.\n**Step 1:** an inscribed angle is HALF of its arc.\n**Step 2:** ${arc}° ÷ 2 = ${arc / 2}°.\n**Answer: ${arc / 2}°**`,
        'Inscribed angle = half the arc. Central angle = the arc.')
    }
    if (kind === 'central') {
      const ang = r.int(30, 150)
      return mk(r, `A central angle measures ${ang}°. What is the measure of the arc it intercepts?`, `${ang}°`, [`${ang / 2}°`, `${ang * 2}°`, `${360 - ang}°`, `${180 - ang}°`],
        `**Words:** a **central angle** has its corner at the centre of the circle.\n**Step 1:** the arc between its sides has the SAME measure as the central angle.\n**Answer: ${ang}°**`,
        'Central angle = its arc.')
    }
    if (kind === 'chords') {
      const a = 2 * r.int(20, 60), b = 2 * r.int(15, 50)
      return mk(r, `Two chords cross inside a circle. The two arcs cut off by the angle and its vertical angle are ${a}° and ${b}°. What is the measure of the angle?`, `${(a + b) / 2}°`, [`${a + b}°`, `${Math.abs(a - b) / 2}°`, `${(a + b) / 4}°`, `${a}°`],
        `**Words:** a **chord** is a straight line joining two points on a circle.\n**Step 1:** for two chords that cross INSIDE a circle, the angle is half the SUM of the two arcs.\n**Step 2:** (${a} + ${b}) ÷ 2 = ${a + b} ÷ 2 = ${(a + b) / 2}°.\n**Answer: ${(a + b) / 2}°**`,
        'Inside the circle: half the SUM. Outside the circle: half the DIFFERENCE.')
    }
    if (kind === 'secants') {
      const far = 2 * r.int(40, 80), near = 2 * r.int(10, 30)
      return mk(r, `Two secants meet at a point OUTSIDE a circle. They cut off a far arc of ${far}° and a near arc of ${near}°. What is the angle between the secants?`, `${(far - near) / 2}°`, [`${(far + near) / 2}°`, `${far - near}°`, `${(far - near) / 4}°`, `${far / 2}°`],
        `**Words:** a **secant** is a line that cuts through a circle at two points.\n**Step 1:** for an angle formed OUTSIDE the circle, the angle is half the DIFFERENCE of the arcs (far minus near).\n**Step 2:** (${far} − ${near}) ÷ 2 = ${far - near} ÷ 2 = ${(far - near) / 2}°.\n**Answer: ${(far - near) / 2}°**`,
        'Outside: half of (far arc − near arc).')
    }
    const arc = 2 * r.int(25, 80)
    return mk(r, `A tangent and a chord meet at a point on a circle and cut off an arc of ${arc}°. What is the angle between the tangent and the chord?`, `${arc / 2}°`, [`${arc}°`, `${arc * 2}°`, `${180 - arc / 2}°`, `${arc / 4}°`],
      `**Words:** a **tangent** is a line that touches the circle at exactly one point.\n**Step 1:** the angle between a tangent and a chord is HALF the arc it cuts off (just like an inscribed angle).\n**Step 2:** ${arc}° ÷ 2 = ${arc / 2}°.\n**Answer: ${arc / 2}°**`,
      'Tangent-chord angle = half its arc.')
  },
  pythCheck(r) {
    const type = r.pick(['right', 'acute', 'obtuse'] as const)
    const bank = {
      right: [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]],
      acute: [[5, 6, 7], [6, 7, 8], [7, 8, 9], [4, 5, 5], [8, 9, 10]],
      obtuse: [[2, 3, 4], [3, 4, 6], [5, 6, 10], [4, 5, 8], [6, 7, 11]],
    }
    const [a, b, c] = r.pick(bank[type])
    const lhs = a * a + b * b, rhs = c * c
    return mk(r, `A triangle has sides ${a}, ${b} and ${c}. Is it acute, right or obtuse?`, type === 'right' ? 'Right' : type === 'acute' ? 'Acute' : 'Obtuse',
      ['Acute', 'Right', 'Obtuse', 'Not a triangle'],
      `**Words:** in a right triangle $a^2+b^2=c^2$ where $c$ is the longest side. **Acute** means all angles are less than 90°; **obtuse** means one angle is bigger than 90°.\n**Step 1 (square the two shorter sides and add):** ${a}² + ${b}² = ${a * a} + ${b * b} = ${lhs}.\n**Step 2 (square the longest side):** ${c}² = ${rhs}.\n**Step 3 (compare):** ${lhs} ${lhs === rhs ? '=' : lhs > rhs ? '>' : '<'} ${rhs}. ${lhs === rhs ? 'Equal → right triangle.' : lhs > rhs ? 'The short sides are “strong enough” → acute triangle.' : 'The short sides are too short → obtuse triangle.'}\n**Answer: ${type === 'right' ? 'Right' : type === 'acute' ? 'Acute' : 'Obtuse'}**`,
      'Short² + short² vs long²: bigger = acute, equal = right, smaller = obtuse.')
  },
  logicForm(r) {
    const bank = [
      ['a shape is a square', 'it is a rectangle'], ['it rains', 'the street is wet'], ['a number is divisible by 4', 'it is even'],
      ['an animal is a dog', 'it is a mammal'], ['a number ends in 0', 'it is divisible by 5'], ['a figure is a triangle', 'it has three sides'],
    ]
    const [p, q] = r.pick(bank)
    const neg = (s: string) => s.replace(' is ', ' is not ').replace(' ends ', ' does not end ').replace(' rains', ' does not rain').replace(' has ', ' does not have ')
    const forms: Record<string, string> = {
      original: `If ${p}, then ${q}.`,
      converse: `If ${q}, then ${p}.`,
      inverse: `If ${neg(p)}, then ${neg(q)}.`,
      contrapositive: `If ${neg(q)}, then ${neg(p)}.`,
    }
    const want = r.pick(['converse', 'inverse', 'contrapositive'] as const)
    return mk(r, `Statement: “${forms.original}” Which is its ${want}?`, forms[want],
      Object.entries(forms).filter(([k]) => k !== want).map(([, v]) => v),
      `**Words:** a **conditional** statement has the form “If p, then q”. Its relatives: the **converse** swaps p and q; the **inverse** negates both (adds “not”); the **contrapositive** swaps AND negates.\n**Step 1 (identify):** p = “${p}”, q = “${q}”.\n**Step 2 (build the ${want}):** ${want === 'converse' ? 'swap them: If q, then p' : want === 'inverse' ? 'add “not” to both: If not p, then not q' : 'swap and add “not”: If not q, then not p'}.\n**Step 3 (write it out):** ${forms[want]}\n**Answer: ${forms[want]}**`,
      'Only the contrapositive always has the same truth value as the original.')
  },
  sys2(r) {
    const x = r.int(3, 9), y = r.int(1, x - 1)
    const s = x + y, d = x - y
    return mk(r, `Solve the system: $x+y=${s}$ and $x-y=${d}$. What is $x$?`, `${x}`, [`${y}`, `${s}`, `${d}`, `${x + 1}`],
      `**Words:** a **system of equations** is two equations with the same unknowns. **Elimination** means adding or subtracting the equations so one variable disappears.\n**Step 1 (add the two equations):** $(x+y)+(x-y)=${s}+${d}$, so $2x=${s + d}$.\n**Step 2 (divide by 2):** $x=${x}$.\n**Step 3 (find y):** $${x}+y=${s}$, so $y=${y}$.\n**Check:** ${x}−${y}=${d} ✓\n**Answer: ${x}**`,
      'If one equation has +y and the other −y, adding them removes y.')
  },
  polyRem(r) {
    const c = r.pick([-3, -2, -1, 1, 2, 3, 4]), a = r.int(1, 3), b = r.int(-5, 5), d = r.int(-6, 6)
    const val = a * c ** 3 + b * c + d
    const poly = `${coef(a, 'x^3')}${b === 0 ? '' : b > 0 ? '+' + coef(b, 'x') : '-' + coef(-b, 'x')}${d === 0 ? '' : sgn(d)}`
    return mk(r, `Find the remainder when $${poly}$ is divided by $x${c < 0 ? '+' : '-'}${Math.abs(c)}$.`, `${val}`, [`${val + c}`, `${-val}`, `${a * c ** 3}`, `${val + d}`].map(String),
      `**Words:** the **Remainder Theorem** says the remainder when $p(x)$ is divided by $(x-c)$ is simply $p(c)$. No long division needed.\n**Step 1 (find c):** the divisor is $x${c < 0 ? '+' : '-'}${Math.abs(c)}$, so $c=${c}$.\n**Step 2 (substitute x = ${c}):** $${a}(${c})^3${b < 0 ? '' : '+'}${b}(${c})${d < 0 ? '' : '+'}${d}$.\n**Step 3 (cubes first, then multiply, then add):** $${a}\\times${c ** 3}=${a * c ** 3}$; $${b}\\times${c}=${b * c}$; total $${a * c ** 3}+(${b * c})+(${d})=${val}$.\n**Answer: ${val}**`,
      'Remainder when dividing by (x − c) is p(c).')
  },
  ratEq(r) {
    const k = r.pick([2, 3, 4, 6, 8, 12]), m = r.int(1, 5), x = r.pick([1, 2, 3, 4, 6].filter(v => k % v === 0))
    const n = m + k / x
    return mk(r, `Solve for $x$: $\\dfrac{${k}}{x}+${m}=${n}$`, `${x}`, [`${n - m}`, `${k * x}`, `${x + 1}`, `${k}`],
      `**Words:** a **rational equation** has the unknown in a denominator. Clear the fraction by multiplying by $x$ (and remember $x\\ne0$).\n**Step 1 (get the fraction alone, subtract ${m}):** $\\frac{${k}}{x}=${n - m}$.\n**Step 2 (multiply both sides by x):** ${k} = ${n - m}x.\n**Step 3 (divide by ${n - m}):** $x=\\frac{${k}}{${n - m}}=${x}$.\n**Check:** ${k}/${x} + ${m} = ${k / x} + ${m} = ${n} ✓\n**Answer: ${x}**`,
      'Isolate the fraction, then multiply by x. Always check that the bottom is not 0.')
  },
  vertex(r) {
    const h = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), k = r.pick([-8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 7, 8])
    const b = -2 * h, c = h * h + k
    if (Math.abs(h) === Math.abs(k)) return GEN.vertex(r)
    const eq = `x^2${b === 0 ? '' : b > 0 ? `+${b}x` : `${b}x`}${c === 0 ? '' : c > 0 ? `+${c}` : c}`
    return mk(r, `What is the vertex of $y=${eq}$?`, `$(${h},${k})$`, [`$(${-h},${k})$`, `$(${h},${-k})$`, `$(${k},${h})$`, `$(${h},${c})$`],
      `**Words:** the **vertex** is the turning point of a parabola (its lowest or highest point). For $y=ax^2+bx+c$ the vertex has $x=-\\frac{b}{2a}$.\n**Step 1 (read a, b, c):** $a=1$, $b=${b}$, $c=${c}$.\n**Step 2 (x of the vertex):** $x=-\\frac{${b}}{2(1)}=${h}$.\n**Step 3 (y of the vertex, substitute x back):** $y=(${h})^2${b < 0 ? '' : '+'}${b}(${h})${c < 0 ? '' : '+'}${c}=${h * h}+(${b * h})+(${c})=${k}$.\n**Answer: (${h}, ${k})**`,
      'Vertex x = −b ÷ 2a, then plug in to get y.')
  },
  quadIneq(r) {
    const p = r.int(-5, 1), q = r.int(p + 2, p + 7)
    const gt = r.pick([true, false])
    const ans = gt ? `$x<${p}$ or $x>${q}$` : `$${p}<x<${q}$`
    return mk(r, `Solve: $${fx(p)}${fx(q)}${gt ? '>' : '<'}0$`, ans,
      [gt ? `$${p}<x<${q}$` : `$x<${p}$ or $x>${q}$`, gt ? `$x>${q}$` : `$x<${q}$`, `$x=${p}$ or $x=${q}$`, `$x>${p}$`],
      `**Words:** a **quadratic inequality** asks for the x-values that make a quadratic positive (>0) or negative (<0).\n**Step 1 (find where it equals 0):** the **critical values** are $x=${p}$ and $x=${q}$. They split the number line into three parts.\n**Step 2 (test one number in each part):** left of ${p} the product of the two brackets is positive; between ${p} and ${q} it is negative; right of ${q} it is positive again.\n**Step 3 (pick the parts that match “${gt ? '>' : '<'} 0”):** ${gt ? 'positive parts: the outside pieces' : 'negative part: the middle piece'}.\n**Answer: ${ans.replace(/\$/g, '')}**`,
      'Parabola opens up: > 0 outside the roots, < 0 between the roots.')
  },
  joint(r) {
    const k = r.int(2, 6), x1 = r.int(1, 4), y1 = r.int(2, 5), x2 = r.int(2, 6), y2 = r.int(2, 6)
    const z1 = k * x1 * y1, z2 = k * x2 * y2
    return mk(r, `$z$ varies jointly as $x$ and $y$. If $z=${z1}$ when $x=${x1}$ and $y=${y1}$, find $z$ when $x=${x2}$ and $y=${y2}$.`, `${z2}`, [`${z1 + x2 * y2}`, `${z2 + k}`, `${x2 * y2}`, `${z1 * x2 * y2}`].map(String),
      `**Words:** **joint variation** means $z=kxy$: z grows with the PRODUCT of x and y. The number $k$ is the **constant of variation**.\n**Step 1 (find k):** ${z1} = k × ${x1} × ${y1} = k × ${x1 * y1}, so $k=${k}$.\n**Step 2 (use k with the new values):** $z=${k}\\times${x2}\\times${y2}$.\n**Step 3:** ${x2} × ${y2} = ${x2 * y2}, and ${k} × ${x2 * y2} = ${z2}.\n**Answer: ${z2}**`,
      'Find k from the first set of numbers, then reuse it.')
  },
  funcEval(r) {
    const a = r.int(1, 4), b = r.int(-6, 6), c = r.int(-8, 8), x = r.int(-3, 4)
    const v = a * x * x + b * x + c
    return mk(r, `If $f(x)=${quad(a, b, c)}$, find $f(${x})$.`, `${v}`, [`${v + 2 * Math.abs(b)}`, `${a * x + b * x + c}`, `${v - c}`, `${-v}`].map(String),
      `**Words:** $f(x)$ is read “f of x”. It is a rule: put a number in place of x and calculate.\n**Step 1 (replace every x by ${x}):** $f(${x})=${a}(${x})^2${b < 0 ? '' : '+'}${b}(${x})${c < 0 ? '' : '+'}${c}$.\n**Step 2 (square first):** $(${x})^2=${x * x}$, so $${a}\\times${x * x}=${a * x * x}$.\n**Step 3 (the middle term):** $${b}\\times(${x})=${b * x}$.\n**Step 4 (add everything):** ${a * x * x} + (${b * x}) + (${c}) = ${v}.\n**Answer: ${v}**`,
      'Put brackets around negative inputs: (−3)² = 9, not −9.')
  },
  composite(r) {
    const a = r.int(2, 5), b = r.int(-4, 5), c = r.int(2, 4), d = r.int(-3, 4), x = r.int(1, 4)
    const g = c * x + d, v = a * g + b
    return mk(r, `Let $f(x)=${lin(a, b)}$ and $g(x)=${lin(c, d)}$. Find $(f\\circ g)(${x})$.`, `${v}`, [`${c * (a * x + b) + d}`, `${a * x + b + c * x + d}`, `${g}`, `${v + 1}`].map(String),
      `**Words:** $(f\\circ g)(x)$ means $f(g(x))$: do g first, then feed the answer into f.\n**Step 1 (inner function g):** $g(${x})=${c}(${x})${d < 0 ? '' : '+'}${d}=${g}$.\n**Step 2 (outer function f at ${g}):** $f(${g})=${a}(${g})${b < 0 ? '' : '+'}${b}$.\n**Step 3:** ${a}×${g} = ${a * g}, and ${a * g} + (${b}) = ${v}.\n**Answer: ${v}**`,
      'Work from the inside out.')
  },
  inverseFn(r) {
    const a = r.int(2, 6), b = r.int(1, 9)
    const sign = r.pick([1, -1])
    const bb = sign * b
    return mk(r, `Find the inverse of $f(x)=${a}x${bb < 0 ? '' : '+'}${bb}$.`, `$f^{-1}(x)=\\dfrac{x${bb < 0 ? '+' : '-'}${Math.abs(bb)}}{${a}}$`,
      [`$f^{-1}(x)=\\dfrac{x${bb < 0 ? '-' : '+'}${Math.abs(bb)}}{${a}}$`, `$f^{-1}(x)=${a}x${bb < 0 ? '+' : '-'}${Math.abs(bb)}$`, `$f^{-1}(x)=\\dfrac{${a}}{x${bb < 0 ? '+' : '-'}${Math.abs(bb)}}$`, `$f^{-1}(x)=\\dfrac{x}{${a}}${bb < 0 ? '+' : '-'}${Math.abs(bb)}$`],
      `**Words:** the **inverse** function $f^{-1}$ undoes f: it takes the output back to the input.\n**Step 1 (write y for f(x)):** $y=${a}x${bb < 0 ? '' : '+'}${bb}$.\n**Step 2 (swap x and y):** $x=${a}y${bb < 0 ? '' : '+'}${bb}$.\n**Step 3 (solve for y, undo the ${bb < 0 ? 'minus' : 'plus'} first):** $${a}y=x${bb < 0 ? '+' : '-'}${Math.abs(bb)}$.\n**Step 4 (divide by ${a}):** $y=\\frac{x${bb < 0 ? '+' : '-'}${Math.abs(bb)}}{${a}}$.\n**Answer: $f^{-1}(x)=\\frac{x${bb < 0 ? '+' : '-'}${Math.abs(bb)}}{${a}}$**`,
      'Swap x and y, then solve for y.')
  },
  asymptote(r) {
    const a = r.int(1, 5), c = r.int(1, 4), dd = r.pick([-3, -2, -1, 1, 2, 3]) * c, b = r.int(-5, 5)
    const vx = -dd / c, hy = a / c
    return mk(r, `Find the vertical asymptote of $f(x)=\\dfrac{${lin(a, b)}}{${lin(c, dd)}}$.`, `$x=${vx}$`, [`$y=${frac(a, c)}$`, `$x=${-vx}$`, `$x=${dd}$`, `$y=${vx}$`, `$x=${vx + 1}$`, '$x=0$'],
      `**Words:** a **rational function** is a fraction of two polynomials. A **vertical asymptote** is a vertical line the graph gets closer and closer to but never touches. It sits where the DENOMINATOR is 0 (and the top is not 0).\n**Step 1 (set the denominator equal to 0):** ${lin(c, dd)}=0.\n**Step 2 (solve):** ${c}x=${-dd}, so $x=${vx}$.\n**Answer: x = ${vx}** (the horizontal asymptote is $y=\\frac{${a}}{${c}}=${frac(a, c)}$, the ratio of the leading coefficients).`,
      'Vertical asymptote: bottom = 0. Horizontal asymptote: ratio of the x-coefficients.')
  },
  expEq(r) {
    const base = r.pick([2, 3, 5]), x = r.int(2, 5), k = r.int(1, 3)
    return mk(r, `Solve for $x$: $${base}^{x+${k}}=${base ** (x + k)}$`, `${x}`, [`${x + k}`, `${x - k}`, `${base ** (x + k) / base}`, `${x + 1}`].map(String),
      `**Words:** an **exponential equation** has the unknown in the exponent. If both sides have the SAME base, the exponents must be equal.\n**Step 1 (write the right side as a power of ${base}):** ${base ** (x + k)} = ${base}^${x + k}.\n**Step 2 (same base, so equate exponents):** $x+${k}=${x + k}$.\n**Step 3 (subtract ${k}):** $x=${x}$.\n**Answer: ${x}**`,
      'Rewrite both sides with the same base, then compare the exponents.')
  },
  logVal(r) {
    const base = r.pick([2, 3, 4, 5, 10]), k = r.int(2, 4)
    const kind = r.pick(['single', 'sum', 'diff'] as const)
    if (kind === 'single') {
      return mk(r, `Evaluate: $\\log_{${base}}${base ** k}$`, `${k}`, [`${base * k}`, `${base ** k}`, `${k + 1}`, `${base}`].map(String),
        `**Words:** $\\log_{${base}}${base ** k}$ asks: “${base} raised to WHAT power gives ${base ** k}?” A **logarithm** is an exponent.\n**Step 1:** ${base}^1 = ${base}, ${base}^2 = ${base ** 2}${k >= 3 ? `, ${base}^3 = ${base ** 3}` : ''}${k >= 4 ? `, ${base}^4 = ${base ** 4}` : ''}.\n**Step 2:** ${base ** k} = ${base}^${k}.\n**Answer: ${k}**`,
        'log_b(N) = the power you raise b to in order to get N.')
    }
    const m = r.int(1, 3), n = r.int(1, 3)
    if (kind === 'sum') {
      return mk(r, `Evaluate: $\\log_{${base}}${base ** m}+\\log_{${base}}${base ** n}$`, `${m + n}`, [`${m * n}`, `${base ** (m + n)}`, `${m + n + 1}`, `${Math.abs(m - n)}`].map(String),
        `**Words:** a **logarithm** is an exponent: $\\log_{${base}}${base ** m}=${m}$ because ${base}^${m} = ${base ** m}.\n**Step 1 (first log):** $\\log_{${base}}${base ** m}=${m}$.\n**Step 2 (second log):** $\\log_{${base}}${base ** n}=${n}$.\n**Step 3 (add):** ${m} + ${n} = ${m + n}.\n**Check with the product rule:** $\\log_b M+\\log_b N=\\log_b(MN)=\\log_{${base}}${base ** (m + n)}=${m + n}$ ✓\n**Answer: ${m + n}**`,
        'Product rule: log M + log N = log (M × N).')
    }
    return mk(r, `Evaluate: $\\log_{${base}}${base ** (m + n)}-\\log_{${base}}${base ** n}$`, `${m}`, [`${m + n}`, `${m * n}`, `${m + 1}`, `${n}`].map(String),
      `**Words:** a **logarithm** is an exponent: $\\log_{${base}}${base ** (m + n)}=${m + n}$ because ${base}^${m + n} = ${base ** (m + n)}.\n**Step 1 (first log):** ${m + n}.\n**Step 2 (second log):** $\\log_{${base}}${base ** n}=${n}$.\n**Step 3 (subtract):** ${m + n} − ${n} = ${m}.\n**Check with the quotient rule:** $\\log_b M-\\log_b N=\\log_b\\frac{M}{N}=\\log_{${base}}${base ** m}=${m}$ ✓\n**Answer: ${m}**`,
      'Quotient rule: log M − log N = log (M ÷ N).')
  },
  simpleInt(r) {
    const P = r.pick([2000, 5000, 8000, 10000, 20000]), rate = r.pick([3, 4, 5, 6, 8, 10]), t = r.int(2, 6)
    const I = (P * rate * t) / 100
    return mk(r, `How much simple interest does ₱${P.toLocaleString('en-US')} earn at ${rate}% per year in ${t} years?`, `₱${I.toLocaleString('en-US')}`, [`₱${(I + P).toLocaleString('en-US')}`, `₱${(P * rate).toLocaleString('en-US')}`, `₱${(I / t).toLocaleString('en-US')}`, `₱${(I * 2).toLocaleString('en-US')}`],
      `**Words:** **simple interest** is earned only on the starting amount, the **principal** (P). Formula: $I=Prt$, where r is the yearly rate written as a decimal and t is the time in years.\n**Step 1 (rate as a decimal):** ${rate}% = ${rate / 100}.\n**Step 2 (substitute):** $I=${P}\\times${rate / 100}\\times${t}$.\n**Step 3:** ${P} × ${rate / 100} = ${(P * rate) / 100} per year, and × ${t} years = ${I}.\n**Answer: ₱${I.toLocaleString('en-US')}**`,
      'I = Prt. Rate as a decimal; time in years.')
  },
  compInt(r) {
    const P = r.pick([1000, 2000, 5000, 10000]), rate = r.pick([10, 20]), t = r.int(2, 3)
    const A = P * (1 + rate / 100) ** t
    const simple = P * (1 + (rate / 100) * t)
    return mk(r, `₱${P.toLocaleString('en-US')} is invested at ${rate}% compounded annually for ${t} years. What is the final amount?`, `₱${Math.round(A).toLocaleString('en-US')}`, [`₱${Math.round(simple).toLocaleString('en-US')}`, `₱${Math.round(P * (1 + rate / 100)).toLocaleString('en-US')}`, `₱${Math.round(A + P / 10).toLocaleString('en-US')}`, `₱${Math.round(P * rate * t).toLocaleString('en-US')}`],
      `**Words:** **compound interest** earns interest on the interest too. Each year the money is multiplied by $1+r$. Formula: $F=P(1+r)^t$.\n**Step 1 (yearly multiplier):** 1 + ${rate / 100} = ${1 + rate / 100}.\n**Step 2 (multiply once per year, ${t} times):** ${P} × ${1 + rate / 100}${t === 3 ? ` × ${1 + rate / 100} × ${1 + rate / 100}` : ` × ${1 + rate / 100}`}.\n**Step 3 (result):** ₱${Math.round(A).toLocaleString('en-US')}.\n**Compare:** simple interest would give only ₱${Math.round(simple).toLocaleString('en-US')}.\n**Answer: ₱${Math.round(A).toLocaleString('en-US')}**`,
      'Compound: multiply by (1 + r) once for each year.')
  },
  annuity(r) {
    const R = r.pick([1000, 2000, 5000]), n = r.int(2, 3)
    const FV = R * (((1.1 ** n) - 1) / 0.1)
    return mk(r, `₱${R.toLocaleString('en-US')} is deposited at the END of each year for ${n} years at 10% interest compounded yearly. What is the total at the end of year ${n}?`, `₱${Math.round(FV).toLocaleString('en-US')}`, [`₱${(R * n).toLocaleString('en-US')}`, `₱${Math.round(R * 1.1 ** n).toLocaleString('en-US')}`, `₱${Math.round(FV + R / 2).toLocaleString('en-US')}`, `₱${Math.round(R * n * 1.1).toLocaleString('en-US')}`],
      `**Words:** an **annuity** is a series of equal payments made at regular times. An **ordinary annuity** pays at the END of each period. Future value: $F=R\\times\\frac{(1+i)^n-1}{i}$, where R is the payment, i the rate per period and n the number of payments.\n**Step 1 (list the values):** R = ${R}, i = 0.10, n = ${n}.\n**Step 2 ($(1+i)^n$):** 1.1^${n} = ${(1.1 ** n).toFixed(2)}.\n**Step 3 (subtract 1, divide by i):** (${(1.1 ** n).toFixed(2)} − 1) ÷ 0.10 = ${((1.1 ** n - 1) / 0.1).toFixed(2)}.\n**Step 4 (multiply by R):** ${R} × ${((1.1 ** n - 1) / 0.1).toFixed(2)} = ${Math.round(FV)}.\n**Answer: ₱${Math.round(FV).toLocaleString('en-US')}**`,
      'Future value of an ordinary annuity = payment × [(1+i)^n − 1] ÷ i.')
  },
  truthVal(r) {
    const p = r.pick([true, false]), q = r.pick([true, false])
    const forms: [string, boolean, string][] = [
      ['p \\wedge q', p && q, 'both must be true'], ['p \\vee q', p || q, 'at least one must be true'], ['p \\rightarrow q', !p || q, 'false only if p is true and q is false'],
      ['\\sim p \\vee q', !p || q, 'NOT p, or q'], ['p \\leftrightarrow q', p === q, 'true when p and q match'], ['\\sim(p \\wedge q)', !(p && q), 'the opposite of (p AND q)'],
    ]
    const [sym, val, rule] = r.pick(forms)
    const T = (b: boolean) => (b ? 'True' : 'False')
    return mk(r, `Let $p$ be ${T(p)} and $q$ be ${T(q)}. What is the truth value of $${sym}$?`, T(val), ['True', 'False', 'Cannot be determined', 'Both true and false'].filter(x => x !== T(val)),
      `**Words:** a **proposition** is a statement that is either true or false. Symbols: ∧ means AND, ∨ means OR, → means IF-THEN, ↔ means “if and only if”, ~ means NOT.\n**Step 1 (what the symbol needs):** $${sym}$: ${rule}.\n**Step 2 (plug in p = ${T(p)}, q = ${T(q)}):** ${T(val)}.\n**Answer: ${T(val)}**`,
      'p → q is false ONLY when p is true and q is false.')
  },
  quartile(r) {
    const xs: number[] = []
    let cur = r.int(1, 8)
    for (let i = 0; i < 9; i++) { cur += r.int(1, 5); xs.push(cur) }
    const q1 = (xs[1] + xs[2]) / 2, q3 = (xs[6] + xs[7]) / 2, med = xs[4]
    const which = r.pick(['Q1', 'Q3', 'IQR'] as const)
    const val = which === 'Q1' ? q1 : which === 'Q3' ? q3 : q3 - q1
    const nice = (x: number) => (Number.isInteger(x) ? `${x}` : `${x}`)
    return mk(r, `For the data ${xs.join(', ')}, find ${which === 'IQR' ? 'the interquartile range (IQR)' : which}.`, nice(val), [nice(med), nice(val + 1), nice(which === 'IQR' ? q3 : q1), nice(Math.abs(val - 2))],
      `**Words:** **quartiles** split sorted data into four equal parts. Q2 is the median. **Q1** is the median of the lower half and **Q3** is the median of the upper half. The **IQR** = Q3 − Q1.\n**Step 1 (the data is sorted; the middle value is ${med}):** the lower half is ${xs.slice(0, 4).join(', ')} and the upper half is ${xs.slice(5).join(', ')} (the middle value is left out).\n**Step 2 (Q1 = middle of the lower half = average of ${xs[1]} and ${xs[2]}):** ${q1}.\n**Step 3 (Q3 = middle of the upper half = average of ${xs[6]} and ${xs[7]}):** ${q3}.\n${which === 'IQR' ? `**Step 4 (IQR):** ${q3} − ${q1} = ${q3 - q1}.\n` : ''}**Answer: ${nice(val)}**`,
      'Split the sorted list in half (drop the middle for odd n), then take the median of each half.')
  },
  variance(r) {
    const s = r.int(1, 10), d = r.int(1, 4)
    const xs = [0, 1, 2, 3, 4].map(i => s + i * d)
    const mean = s + 2 * d
    return mk(r, `Find the population variance of ${xs.join(', ')}.`, `${2 * d * d}`, [`${d * d}`, `${4 * d * d}`, `${Math.sqrt(2) * d}`.slice(0, 4), `${(10 * d * d) / 4}`].map(String),
      `**Words:** the **mean** is the average. The **variance** measures how spread out data is: the average of the squared distances from the mean. The **standard deviation** is the square root of the variance.\n**Step 1 (mean):** (${xs.join(' + ')}) ÷ 5 = ${mean}.\n**Step 2 (distance from the mean, squared):** ${xs.map(x => `(${x}−${mean})²=${(x - mean) ** 2}`).join(', ')}.\n**Step 3 (add the squares):** ${xs.reduce((a, x) => a + (x - mean) ** 2, 0)}.\n**Step 4 (divide by n = 5):** ${xs.reduce((a, x) => a + (x - mean) ** 2, 0)} ÷ 5 = ${2 * d * d}.\n**Answer: ${2 * d * d}**`,
      'Variance = (sum of squared distances from the mean) ÷ n.')
  },
  probOr(r) {
    const pa = r.pick([0.3, 0.4, 0.5, 0.6]), pb = r.pick([0.2, 0.3, 0.4]), both = r.pick([0.05, 0.1, 0.15])
    const ans = Math.round((pa + pb - both) * 100) / 100
    return mk(r, `$P(A)=${pa}$, $P(B)=${pb}$ and $P(A\\text{ and }B)=${both}$. Find $P(A\\text{ or }B)$.`, `${ans}`, [`${Math.round((pa + pb) * 100) / 100}`, `${Math.round(pa * pb * 100) / 100}`, `${Math.round((pa + pb + both) * 100) / 100}`, `${Math.round((ans + 0.1) * 100) / 100}`],
      `**Words:** $P(A\\text{ or }B)$ is the chance that A happens, or B happens, or both. The “both” part is counted twice when we add, so we subtract it once.\n**Step 1 (formula):** $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.\n**Step 2 (substitute):** ${pa} + ${pb} − ${both}.\n**Step 3:** ${pa} + ${pb} = ${Math.round((pa + pb) * 100) / 100}, and ${Math.round((pa + pb) * 100) / 100} − ${both} = ${ans}.\n**Answer: ${ans}**`,
      'OR: add, then subtract the overlap. If mutually exclusive, the overlap is 0.')
  },
  probAnd(r) {
    const pa = r.pick([0.2, 0.4, 0.5, 0.6, 0.8]), pb = r.pick([0.25, 0.5, 0.4, 0.3])
    const ans = Math.round(pa * pb * 1000) / 1000
    return mk(r, `A and B are INDEPENDENT events with $P(A)=${pa}$ and $P(B)=${pb}$. Find $P(A\\text{ and }B)$.`, `${ans}`, [`${Math.round((pa + pb) * 1000) / 1000}`, `${Math.round((pa + pb - ans) * 1000) / 1000}`, `${Math.round(Math.abs(pa - pb) * 1000) / 1000}`, `${Math.round(pa * pb * 10000) / 1000}`],
      `**Words:** two events are **independent** when one happening does not change the chance of the other (like two coin tosses).\n**Step 1 (rule):** for independent events, multiply: $P(A\\cap B)=P(A)\\times P(B)$.\n**Step 2:** ${pa} × ${pb}.\n**Step 3:** ${ans}.\n**Answer: ${ans}**`,
      'AND (independent): multiply. OR (mutually exclusive): add.')
  },
  lawCos(r) {
    const bank: [number, number, number, number][] = [[3, 8, 60, 7], [5, 8, 60, 7], [7, 15, 60, 13], [8, 15, 60, 13], [3, 5, 120, 7], [5, 16, 120, 19], [7, 8, 120, 13]]
    const [a, b, C, c] = r.pick(bank)
    const sign = C === 60 ? '-' : '+'
    const prod = a * b
    return mk(r, `In a triangle two sides are ${a} and ${b} and the angle between them is ${C}°. Find the third side.`, `${c}`, [`${a + b}`, `${Math.abs(b - a)}`, `${c + 1}`, `${c * c}`].map(String),
      `**Words:** the **Law of Cosines** works for ANY triangle: $c^2=a^2+b^2-2ab\\cos C$, where C is the angle between sides a and b. (For a right angle, cos 90° = 0 and it becomes the Pythagorean theorem.)\n**Step 1 (cos ${C}°):** ${C === 60 ? 'cos 60° = ½' : 'cos 120° = −½'}.\n**Step 2 (the middle term $2ab\\cos C$):** 2 × ${a} × ${b} × (${C === 60 ? '½' : '−½'}) = ${C === 60 ? prod : -prod}.\n**Step 3 (substitute):** $c^2=${a}^2+${b}^2${sign}${prod}=${a * a}+${b * b}${sign}${prod}=${c * c}$.\n**Step 4 (square root):** $c=${c}$.\n**Answer: ${c}**`,
      'Law of Cosines: c² = a² + b² − 2ab cos C.')
  },
  gcf(r) {
    const g = r.pick([4, 6, 8, 9, 12, 15]), a = r.int(2, 6), b = r.int(2, 6)
    const [x, y] = [g * a, g * b]
    if (gcd(a, b) !== 1 || a === b) return GEN.gcf(r)
    const fl = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d === 0)
    return mk(r, `What is the greatest common factor (GCF) of ${x} and ${y}?`, `${g}`, [`${g * 2}`, `${Math.max(1, g / 2)}`, `${x + y}`, `${a * b}`].map(String),
      `**Words:** a **factor** divides a number evenly. The **GCF** is the biggest factor that BOTH numbers share.\n**Step 1 (factors of ${x}):** ${fl(x).join(', ')}.\n**Step 2 (factors of ${y}):** ${fl(y).join(', ')}.\n**Step 3 (the biggest one in both lists):** ${g}.\n**Answer: ${g}**`,
      'List the factors of both, then pick the biggest shared one.')
  },
  fracConv(r) {
    const bank: [string, string, string][] = [['1', '4', '25%'], ['3', '4', '75%'], ['1', '5', '20%'], ['2', '5', '40%'], ['3', '8', '37.5%'], ['1', '8', '12.5%'], ['7', '10', '70%'], ['9', '20', '45%'], ['3', '5', '60%'], ['1', '2', '50%']]
    const [n, d, p] = r.pick(bank)
    const dec = (Number(n) / Number(d))
    return mk(r, `Convert $\\frac{${n}}{${d}}$ to a percent.`, p, ['12.5%', '25%', '40%', '75%', '60%', '20%', '45%', '70%', '37.5%'].filter(x => x !== p).slice(0, 4),
      `**Words:** **percent** means “out of 100”. To turn a fraction into a percent, divide the top by the bottom to get a decimal, then multiply by 100.\n**Step 1 (divide):** ${n} ÷ ${d} = ${dec}.\n**Step 2 (multiply by 100, move the decimal point 2 places right):** ${dec} × 100 = ${p.replace('%', '')}.\n**Answer: ${p}**`,
      'Fraction → decimal (top ÷ bottom) → percent (× 100).')
  },
  repDec(r) {
    const d = r.pick([3, 6, 7, 9, 11]), n = r.int(1, d - 1)
    const g0 = gcd(n, d)
    if (g0 !== 1 || ![3, 9, 11].includes(d)) return GEN.repDec(r)
    const digits = d === 3 || d === 9 ? 1 : 2
    const top = d === 3 ? n * 3 : d === 9 ? n : n * 9
    const bottom = digits === 1 ? 9 : 99
    const rep = d === 3 ? `${n * 3}` : d === 9 ? `${n}` : String(n * 9).padStart(2, '0')
    return mk(r, `Write $0.\\overline{${rep}}$ as a fraction in simplest form.`, `$${frac(n, d)}$`, [`$${frac(Number(rep), 100)}$`, `$${frac(Number(rep), bottom === 9 ? 10 : 100)}$`, `$${frac(Number(rep) + 1, bottom)}$`, `$${frac(n + 1, d)}$`],
      `**Words:** a **repeating decimal** has digits that repeat forever; the bar shows which ones.\n**Step 1 (put the repeating digits over as many 9s as there are digits):** $\\frac{${top}}{${bottom}}$.\n**Step 2 (simplify by dividing top and bottom by their GCF):** $\\frac{${top}}{${bottom}}=${frac(n, d)}$.\n**Answer: $${frac(n, d)}$**`,
      'One repeating digit → over 9; two → over 99.')
  },
  mixture(r) {
    const p1 = r.pick([10, 20, 30]), p2 = r.pick([40, 50, 60]), v1 = r.pick([10, 20]), v2 = r.pick([20, 30, 40].filter(x => x !== v1))
    const salt = (p1 * v1 + p2 * v2) / 100, tot = v1 + v2
    const ans = Math.round((salt / tot) * 1000) / 10
    return mk(r, `${v1} L of ${p1}% salt solution is mixed with ${v2} L of ${p2}% solution. What is the percent of salt in the mixture?`, `${ans}%`, [`${(p1 + p2) / 2}%`, `${Math.round((ans + 5) * 10) / 10}%`, `${Math.round((ans - 5) * 10) / 10}%`, `${p1 + p2}%`],
      `**Idea:** the amount of pure salt before mixing equals the amount after mixing. Add up the salt, then divide by the total liters.\n**Step 1 (salt in the first solution):** ${p1}% of ${v1} L = ${p1 / 100} × ${v1} = ${(p1 * v1) / 100} L.\n**Step 2 (salt in the second):** ${p2}% of ${v2} L = ${p2 / 100} × ${v2} = ${(p2 * v2) / 100} L.\n**Step 3 (total salt and total volume):** ${salt} L of salt in ${v1}+${v2} = ${tot} L.\n**Step 4 (divide, then × 100):** ${salt} ÷ ${tot} = ${Math.round((salt / tot) * 1000) / 1000} → ${ans}%.\n**Answer: ${ans}%**`,
      'Mixtures: add the pure amounts, then divide by the total amount.')
  },
  varDI(r) {
    const kind = r.pick(['direct', 'inverse'] as const)
    const k = r.int(2, 6), x1 = r.int(2, 6), x2 = r.int(2, 9)
    if (kind === 'direct') {
      const y1 = k * x1
      return mk(r, `y varies directly as x. If y = ${y1} when x = ${x1}, find y when x = ${x2}.`, `${k * x2}`, [`${y1 + x2}`, `${y1 * x2}`, `${Math.round((y1 / x2) * 10) / 10}`, `${k * x2 + k}`],
        `**Words:** **direct variation** means $y=kx$, where $k$ is a fixed number (the **constant of variation**).\n**Step 1 (find k):** ${y1} = k × ${x1}, so k = ${y1} ÷ ${x1} = ${k}.\n**Step 2 (use it):** y = ${k} × ${x2} = ${k * x2}.\n**Answer: ${k * x2}**`,
        'Direct: y ÷ x stays the same.')
    }
    const prod = k * x1 * x2
    return mk(r, `y varies inversely as x. If y = ${prod / x1} when x = ${x1}, find y when x = ${x2}.`, `${prod / x2}`, [`${prod / x1 + x2}`, `${prod * x2}`, `${prod / x1}`, `${prod / x2 + k}`].map(String),
      `**Words:** **inverse variation** means $xy=k$: when x gets bigger, y gets smaller.\n**Step 1 (find k = x × y):** ${x1} × ${prod / x1} = ${prod}.\n**Step 2 (new x):** y = ${prod} ÷ ${x2} = ${prod / x2}.\n**Answer: ${prod / x2}**`,
      'Inverse: x × y stays the same.')
  },
  lineEq(r) {
    const m = r.pick([-3, -2, -1, 1, 2, 3, 4]), b = r.int(-6, 6), x1 = r.int(-2, 2), dx = r.int(1, 3)
    const x2 = x1 + dx, y1 = m * x1 + b, y2 = m * x2 + b
    const eq = (mm: number, bb: number) => `$y=${mm === 0 ? `${bb}` : lin(mm, bb)}$`
    return mk(r, `Find the equation of the line through $(${x1},${y1})$ and $(${x2},${y2})$.`, eq(m, b), [eq(-m, b), eq(m, -b), eq(m + 1, b), eq(m, b + 2)],
      `**Words:** a line has the form $y=mx+b$: $m$ is the **slope** and $b$ is the **y-intercept** (where the line crosses the y-axis).\n**Step 1 (slope):** ${y2} − (${y1}) = ${y2 - y1} and ${x2} − (${x1}) = ${dx}, so m = ${y2 - y1} ÷ ${dx} = ${m}.\n**Step 2 (find b, plug in the point (${x1}, ${y1})):** ${y1} = ${m}(${x1}) + b, so b = ${y1} − (${m * x1}) = ${b}.\n**Step 3 (write it):** ${eq(m, b).replace(/\$/g, '')}.\n**Answer: ${eq(m, b).replace(/\$/g, '')}**`,
      'Slope first, then solve for b with one of the points.')
  },
  sysWord(r) {
    const a = r.int(2, 6), b = r.int(2, 6)
    if (a === b) return GEN.sysWord(r)
    const n1 = r.int(2, 5), n2 = r.int(2, 5)
    const t1 = a * n1 + b * n2, m1 = n1 + 1, m2 = n2 + 2
    const t2 = a * m1 + b * m2
    const det = n1 * m2 - n2 * m1
    if (det === 0) return GEN.sysWord(r)
    return mk(r, `${n1} apples and ${n2} bananas cost ₱${t1}. ${m1} apples and ${m2} bananas cost ₱${t2}. How much is one apple?`, `₱${a}`, [`₱${b}`, `₱${a + 1}`, `₱${a + b}`, `₱${Math.max(1, a - 1)}`],
      `**Idea:** write one equation for each purchase, with x = price of an apple and y = price of a banana.\n**Step 1 (equations):** ${n1}x + ${n2}y = ${t1} and ${m1}x + ${m2}y = ${t2}.\n**Step 2 (check the answer by substitution, since the numbers are friendly):** try x = ${a}, y = ${b}: ${n1}(${a}) + ${n2}(${b}) = ${t1} ✓ and ${m1}(${a}) + ${m2}(${b}) = ${t2} ✓.\n**Step 3 (to solve by elimination instead):** multiply the first equation by ${m1} and the second by ${n1}, then subtract; y cancels to leave x = ${a}.\n**Answer: ₱${a}**`,
      'Two purchases → two equations → eliminate one variable.')
  },
  gcfPoly(r) {
    const g = r.int(2, 9), a = r.int(1, 6), b = r.int(1, 7), n = r.pick([0, 1, 1, 2, 3]), m = n + r.int(1, 3), s = r.pick(['+', '-'])
    if (gcd(a, b) !== 1) return GEN.gcfPoly(r)
    const pw = (c: number, e: number) => (e === 0 ? `${c}` : `${c === 1 ? '' : c}x${e === 1 ? '' : `^{${e}}`}`)
    const flip = s === '+' ? '-' : '+'
    const txt = (c: number, e: number) => (e === 0 ? `${c}` : `${c === 1 ? '' : c}x${e === 1 ? '' : '^' + e}`)
    const ans = `$${pw(g, n)}(${pw(a, m - n)}${s}${b})$`
    const w = [`$${pw(g, n)}(${pw(a, m - n)}${s}${g * b})$`, `$${pw(g, n)}(${pw(a, m - n)}${flip}${b})$`, `$${pw(g, n)}(${pw(a, m - n)}${s}${b + 1})$`]
    if (a !== 1) w.push(`$${pw(g * a, n)}(${pw(1, m - n)}${s}${b})$`)
    if (n >= 1) w.push(`$${pw(g, 0)}(${pw(a, m)}${s}${pw(b, n)})$`, `$${pw(1, n)}(${pw(g * a, m - n)}${s}${g * b})$`)
    else w.push(`$${g}x(${pw(a, m - 1)}${s}${b})$`)
    return mk(r, `Factor out the GCF: $${pw(g * a, m)}${s}${pw(g * b, n)}$`, ans, w,
      `**Words:** the **GCF** (greatest common factor) is the biggest number AND the lowest power of x that divides every term.\n**Step 1 (numbers):** the biggest number that divides both ${g * a} and ${g * b} is ${g}.\n**Step 2 (letters):** ${n === 0 ? 'the second term has no x, so no x goes in the GCF' : `the lowest power of x is x${n === 1 ? '' : '^' + n}`}. GCF = ${txt(g, n)}.\n**Step 3 (divide each term by the GCF):** ${txt(g * a, m)} ÷ ${txt(g, n)} = ${txt(a, m - n)}, and ${txt(g * b, n)} ÷ ${txt(g, n)} = ${b}.\n**Check (multiply back):** gives the original ✓\n**Answer: ${plain(ans)}**`,
      'Biggest number that divides all coefficients, lowest power of x. Then divide each term.')
  },
  polyDiv(r) {
    const c = r.int(1, 6), k = r.int(-5, 6)
    if (k === 0) return GEN.polyDiv(r)
    const b = k - c, cc = -c * k
    const poly = quad(1, b, cc)
    const ln1 = (n: number) => lin(1, n)
    return mk(r, `Divide $${poly}$ by $x-${c}$. What is the quotient?`, `$${ln1(k)}$`, [`$${ln1(-k)}$`, `$${ln1(k + 1)}$`, `$${ln1(c)}$`, `$${ln1(cc)}$`, `$${ln1(k - 1)}$`, `$${ln1(k + 2)}$`],
      `**Words:** the **quotient** is the answer to a division. We can use **synthetic division** with $c=${c}$ (from $x-${c}$).\n**Step 1 (write c and the coefficients):** ${c} | 1, ${b}, ${cc}.\n**Step 2 (bring down 1, multiply by ${c}, add):** ${c}×1 = ${c}, and ${b} + ${c} = ${b + c}.\n**Step 3 (repeat):** ${c}×${b + c} = ${c * (b + c)}, and ${cc} + ${c * (b + c)} = ${cc + c * (b + c)} (the remainder).\n**Step 4 (read the answer):** quotient ${ln1(b + c)}, remainder ${cc + c * (b + c)}.\n**Answer: $${ln1(k)}$**`,
      'Bring down, multiply, add, repeat. The last number is the remainder.')
  },
  ratSimp(r) {
    const a = r.int(2, 9), k = r.int(1, 3)
    return mk(r, `Simplify $\\dfrac{x^2-${a * a}}{x-${a}}$ (for $x\\ne${a}$).`, `$x+${a}$`, [`$x-${a}$`, `$x^2-${a}$`, `$\\dfrac{x+${a}}{${a}}$`, `$x+${a * a}$`],
      `**Words:** a **rational expression** is a fraction with polynomials. To simplify, FACTOR the top and bottom, then cancel common factors.\n**Step 1 (factor the top, difference of squares):** $x^2-${a * a}=(x-${a})(x+${a})$.\n**Step 2 (cancel the common factor $x-${a}$):** $\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}$.\n**Answer: $x+${a}$**`,
      'Factor, then cancel factors (never terms).')
  },
  piecewise(r) {
    const c = r.int(1, 4), a = r.int(1, 3), b = r.int(0, 3)
    const x = r.int(-3, 6)
    const v = x < c ? a * x + b : x * x
    return mk(r, `$f(x)=\\begin{cases}${lin(a, b)} & \\text{if } x<${c}\\\\ x^2 & \\text{if } x\\ge${c}\\end{cases}$. Find $f(${x})$.`, `${v}`, [`${x < c ? x * x : a * x + b}`, `${v + 1}`, `${v - 1}`, `${-v}`].map(String),
      `**Words:** a **piecewise function** uses a different rule for different x-values.\n**Step 1 (which rule?):** ${x} is ${x < c ? `less than ${c}` : `${c} or more`}, so use the rule ${x < c ? `${lin(a, b)}` : 'x²'}.\n**Step 2 (substitute x = ${x}):** ${x < c ? `${a}(${x}) + ${b}` : `(${x})²`} = ${v}.\n**Answer: ${v}**`,
      'Decide which condition the input meets first, then use only that rule.')
  },
  logEq(r) {
    const base = r.pick([2, 3, 5]), n = r.int(2, 3), k = r.int(1, 5)
    const x = base ** n - k
    return mk(r, `Solve: $\\log_{${base}}(x+${k})=${n}$`, `${x}`, [`${base ** n}`, `${base * n - k}`, `${x + k + 1}`, `${n - k}`].map(String),
      `**Words:** a **logarithm** is an exponent: $\\log_b N=n$ means $b^n=N$.\n**Step 1 (rewrite in exponent form):** $x+${k}=${base}^${n}$.\n**Step 2 (compute the power):** ${base}^${n} = ${base ** n}.\n**Step 3 (subtract ${k}):** $x=${base ** n}-${k}=${x}$.\n**Check:** $\\log_{${base}}(${x}+${k})=\\log_{${base}}${base ** n}=${n}$ ✓\n**Answer: ${x}**`,
      'Turn the log equation into an exponent equation.')
  },
  midpointXY(r) {
    const x1 = r.int(-6, 4), y1 = r.int(-6, 4), x2 = x1 + 2 * r.int(1, 4), y2 = y1 + 2 * r.int(1, 4)
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
    return mk(r, `Find the midpoint of $(${x1},${y1})$ and $(${x2},${y2})$.`, `$(${mx},${my})$`, [`$(${x2 - x1},${y2 - y1})$`, `$(${mx + 1},${my})$`, `$(${mx},${my + 1})$`, `$(${x1 + x2},${y1 + y2})$`],
      `**Words:** the **midpoint** is the point exactly halfway between two points. Average the x-values and average the y-values.\n**Step 1 (x):** (${x1} + ${x2}) ÷ 2 = ${mx}.\n**Step 2 (y):** (${y1} + ${y2}) ÷ 2 = ${my}.\n**Answer: (${mx}, ${my})**`,
      'Midpoint = average of the x’s and average of the y’s.')
  },
  cpctc(r) {
    const n1 = ['ABC', 'DEF'], n2 = ['PQR', 'XYZ'], n3 = ['LMN', 'RST']
    const [t1, t2] = r.pick([n1, n2, n3])
    const side = r.pick([[0, 1], [1, 2], [0, 2]])
    const s1 = t1[side[0]] + t1[side[1]], s2 = t2[side[0]] + t2[side[1]]
    const wrongs = [[1, 2], [0, 2], [0, 1]].map(([i, j]) => t2[i] + t2[j]).filter(x => x !== s2)
    return mk(r, `$\\triangle ${t1}\\cong\\triangle ${t2}$. Which side of $\\triangle ${t2}$ corresponds to $${s1}$?`, s2, [...wrongs, 'No matching side'],
      `**Words:** **congruent** triangles (≅) are exact copies. **CPCTC** = Corresponding Parts of Congruent Triangles are Congruent. The letters in the statement match IN ORDER.\n**Step 1 (match the letters):** ${t1[0]}↔${t2[0]}, ${t1[1]}↔${t2[1]}, ${t1[2]}↔${t2[2]}.\n**Step 2:** side ${s1} uses ${t1[side[0]]} and ${t1[side[1]]}, so its partner uses ${t2[side[0]]} and ${t2[side[1]]}.\n**Answer: ${s2}**`,
      'Congruence letters match in order: first with first, second with second.')
  },
  triClass(r) {
    const type = r.pick(['acute', 'right', 'obtuse'] as const)
    const angs = type === 'right' ? [90, r.int(20, 60)] : type === 'obtuse' ? [r.int(95, 130), r.int(20, 40)] : [r.int(50, 75), r.int(50, 70)]
    const third = 180 - angs[0] - angs[1]
    const name = (t: string) => t[0].toUpperCase() + t.slice(1)
    return mk(r, `A triangle has angles ${angs[0]}°, ${angs[1]}° and ${third}°. Classify it by its angles.`, name(type), ['Acute', 'Right', 'Obtuse', 'Equilateral'].filter(x => x !== name(type)),
      `**Words:** **acute** = all angles less than 90°. **right** = one angle is exactly 90°. **obtuse** = one angle is more than 90°.\n**Step 1 (check the angles add to 180°):** ${angs[0]} + ${angs[1]} + ${third} = 180 ✓.\n**Step 2 (look at the biggest angle):** ${Math.max(angs[0], angs[1], third)}°.\n**Step 3:** ${type === 'right' ? 'exactly 90°, so it is right' : type === 'obtuse' ? 'more than 90°, so it is obtuse' : 'less than 90°, so every angle is acute'}.\n**Answer: ${name(type)}**`,
      'Look only at the biggest angle.')
  },
  compSupp(r) {
    const a = r.int(15, 80)
    const comp = r.pick([true, false])
    const ans = comp ? 90 - a : 180 - a
    return mk(r, `What is the ${comp ? 'complement' : 'supplement'} of ${comp ? a : a + 30}°?`, `${comp ? 90 - a : 180 - (a + 30)}°`, [`${comp ? 180 - a : 90 - (a + 30 > 89 ? 10 : a + 30)}°`, `${(comp ? a : a + 30)}°`, `${comp ? 90 - a + 10 : 180 - (a + 30) + 10}°`, `${comp ? 360 - a : 360 - (a + 30)}°`],
      `**Words:** **complementary** angles add up to 90°. **Supplementary** angles add up to 180° (a straight line).\n**Step 1:** the target is ${comp ? 90 : 180}°.\n**Step 2 (subtract the angle you have):** ${comp ? 90 : 180} − ${comp ? a : a + 30} = ${comp ? 90 - a : 180 - (a + 30)}.\n**Answer: ${comp ? 90 - a : 180 - (a + 30)}°**`,
      'Complement → 90. Supplement → 180.')
  },
  transversal(r) {
    const a = r.int(40, 120)
    const kind = r.pick(['corresponding', 'alternate interior', 'co-interior'] as const)
    const ans = kind === 'co-interior' ? 180 - a : a
    return mk(r, `Two parallel lines are cut by a transversal. One angle measures ${a}°. What is its ${kind} angle?`, `${ans}°`, [`${180 - ans}°`, `${a + 10}°`, `${360 - a}°`, `${90 - (a % 90)}°`],
      `**Words:** a **transversal** is a line that crosses two other lines. ${kind === 'corresponding' ? 'Corresponding angles are in the same position at each crossing (an “F” shape).' : kind === 'alternate interior' ? 'Alternate interior angles are on opposite sides of the transversal between the lines (a “Z” shape).' : 'Co-interior angles are on the same side between the lines (a “C” shape).'}\n**Step 1 (rule for parallel lines):** ${kind === 'co-interior' ? 'co-interior angles add to 180°' : `${kind} angles are EQUAL`}.\n**Step 2:** ${kind === 'co-interior' ? `180 − ${a} = ${180 - a}` : `the other angle is also ${a}`}.\n**Answer: ${ans}°**`,
      'Z and F angles equal; C angles add to 180°.')
  },
  special(r) {
    const s = r.int(2, 9)
    const kind = r.pick(['45', '30'] as const)
    if (kind === '45') {
      return mk(r, `A 45-45-90 triangle has legs of ${s}. What is its hypotenuse?`, `$${s}\\sqrt2$`, [`$${s}\\sqrt3$`, `$${2 * s}$`, `$${s}$`, `$${s * s}$`],
        `**Words:** a **45-45-90 triangle** has two equal legs. Its sides are in the ratio $1:1:\\sqrt2$.\n**Step 1:** hypotenuse = leg × $\\sqrt2$.\n**Step 2:** ${s} × $\\sqrt2$ = $${s}\\sqrt2$.\n**Check:** ${s}² + ${s}² = ${2 * s * s} and $(${s}\\sqrt2)^2=${2 * s * s}$ ✓\n**Answer: $${s}\\sqrt2$**`,
        '45-45-90: hypotenuse = leg × √2.')
    }
    return mk(r, `In a 30-60-90 triangle the short leg is ${s}. What is the hypotenuse?`, `${2 * s}`, [`${s}`, `${3 * s}`, `${s * s}`, `${s + 2}`].map(String),
      `**Words:** a **30-60-90 triangle** has sides in the ratio short leg : long leg : hypotenuse = $1:\\sqrt3:2$.\n**Step 1:** the hypotenuse is twice the short leg.\n**Step 2:** 2 × ${s} = ${2 * s}.\n**Answer: ${2 * s}** (the long leg would be $${s}\\sqrt3$).`,
      '30-60-90: hypotenuse = 2 × short leg.')
  },
  similarSide(r) {
    const k = r.pick([2, 3, 4]), a = r.int(2, 6), b = r.int(3, 8)
    return mk(r, `Two triangles are similar. A side of the small triangle is ${a} and the matching side of the big one is ${a * k}. Another side of the small triangle is ${b}. How long is the matching side of the big triangle?`, `${b * k}`, [`${b + k}`, `${b + (a * k - a)}`, `${Math.round((b / k) * 10) / 10}`, `${a * k}`].map(String),
      `**Words:** **similar** triangles have the same shape; matching sides are in the same ratio (the **scale factor**).\n**Step 1 (scale factor):** ${a * k} ÷ ${a} = ${k}.\n**Step 2 (multiply the other side):** ${b} × ${k} = ${b * k}.\n**Answer: ${b * k}**`,
      'Find the scale factor from one matching pair, then use it on the other.')
  },
  areaShapes(r) {
    const kind = r.pick(['triangle', 'trapezoid', 'parallelogram'] as const)
    if (kind === 'triangle') {
      const b = r.int(4, 14), h = r.int(3, 10) * 2
      return mk(r, `Find the area of a triangle with base ${b} and height ${h}.`, `${(b * h) / 2}`, [`${b * h}`, `${b + h}`, `${(b * h) / 4}`, `${(b * h) / 2 + b}`].map(String),
        `**Words:** the **height** is the straight-up distance from the base to the opposite corner.\n**Step 1 (formula):** area = ½ × base × height.\n**Step 2:** ½ × ${b} × ${h} = ${(b * h) / 2}.\n**Answer: ${(b * h) / 2}**`,
        'Triangle = half of base × height.')
    }
    if (kind === 'trapezoid') {
      const b1 = r.int(4, 10), b2 = b1 + 2 * r.int(1, 4), h = r.int(2, 8)
      return mk(r, `A trapezoid has parallel sides ${b1} and ${b2} and height ${h}. What is its area?`, `${((b1 + b2) * h) / 2}`, [`${(b1 + b2) * h}`, `${b1 * b2 * h}`, `${(b1 + b2 + h) / 2}`, `${((b1 + b2) * h) / 2 + h}`].map(String),
        `**Words:** a **trapezoid** has one pair of parallel sides (the **bases**).\n**Step 1 (formula):** area = ½ × (base₁ + base₂) × height.\n**Step 2 (add the bases):** ${b1} + ${b2} = ${b1 + b2}.\n**Step 3:** ½ × ${b1 + b2} × ${h} = ${((b1 + b2) * h) / 2}.\n**Answer: ${((b1 + b2) * h) / 2}**`,
        'Trapezoid = average of the bases × height.')
    }
    const b = r.int(4, 12), h = r.int(3, 9)
    return mk(r, `A parallelogram has base ${b} and height ${h}. What is its area?`, `${b * h}`, [`${(b * h) / 2}`, `${2 * (b + h)}`, `${b + h}`, `${b * h + b}`].map(String),
      `**Words:** the **height** is the straight perpendicular distance between the base and the opposite side (not the slanted side).\n**Step 1 (formula):** area = base × height.\n**Step 2:** ${b} × ${h} = ${b * h}.\n**Answer: ${b * h}**`,
      'Parallelogram = base × height.')
  },
  volume(r) {
    const kind = r.pick(['box', 'cylinder', 'cone'] as const)
    if (kind === 'box') {
      const l = r.int(3, 9), w = r.int(2, 6), h = r.int(2, 8)
      return mk(r, `Find the volume of a box that is ${l} by ${w} by ${h}.`, `${l * w * h}`, [`${2 * (l * w + l * h + w * h)}`, `${l + w + h}`, `${l * w}`, `${l * w * h + l}`].map(String),
        `**Words:** **volume** is the space inside a solid (measured in cubic units).\n**Step 1 (formula):** length × width × height.\n**Step 2:** ${l} × ${w} = ${l * w}, then × ${h} = ${l * w * h}.\n**Answer: ${l * w * h}**`,
        'Box volume = l × w × h.')
    }
    if (kind === 'cylinder') {
      const rr = r.int(2, 6), h = r.int(3, 10)
      return mk(r, `Find the volume of a cylinder with radius ${rr} and height ${h} (leave $\\pi$ in your answer).`, `$${rr * rr * h}\\pi$`, [`$${2 * rr * h}\\pi$`, `$${rr * h}\\pi$`, `$${rr * rr * h * 2}\\pi$`, `$${rr * rr + h}\\pi$`, `$${rr * rr * h + rr}\\pi$`].map(String),
        `**Words:** a **cylinder** is a can shape. Volume = base area × height.\n**Step 1 (base is a circle):** area = πr² = π × ${rr}² = ${rr * rr}π.\n**Step 2 (times height):** ${rr * rr}π × ${h} = ${rr * rr * h}π.\n**Answer: $${rr * rr * h}\\pi$**`,
        'Cylinder = πr²h.')
    }
    const rr = r.pick([3, 6]), h = r.pick([3, 6, 9]), v = (rr * rr * h) / 3
    return mk(r, `Find the volume of a cone with radius ${rr} and height ${h} (leave $\\pi$ in your answer).`, `$${v}\\pi$`, [`$${rr * rr * h}\\pi$`, `$${v * 2}\\pi$`, `$${v + rr}\\pi$`, `$${(rr * h) / 3}\\pi$`],
      `**Words:** a **cone** is like a pointed party hat. Its volume is ONE THIRD of the cylinder with the same base and height.\n**Step 1 (formula):** ⅓ × πr² × h.\n**Step 2:** ⅓ × π × ${rr * rr} × ${h} = ${v}π.\n**Answer: $${v}\\pi$**`,
      'Cone = ⅓ × πr²h.')
  },
  chordPower(r) {
    const a = r.int(2, 6), b = r.int(3, 8), c = r.pick([2, 3, 4])
    const x = (a * b) / c
    if (!Number.isInteger(x)) return GEN.chordPower(r)
    return mk(r, `Two chords cross inside a circle. One is cut into pieces ${a} and ${b}. The other is cut into pieces ${c} and $x$. Find $x$.`, `${x}`, [`${a + b - c}`, `${x + 1}`, `${a * b}`, `${Math.round((a + b) / c)}`].map(String),
      `**Rule:** when two chords cross inside a circle, (piece × piece) of one chord = (piece × piece) of the other.\n**Step 1:** ${a} × ${b} = ${c} × x.\n**Step 2:** ${a * b} = ${c}x.\n**Step 3 (divide by ${c}):** x = ${x}.\n**Answer: ${x}**`,
      'Chords inside a circle: piece × piece = piece × piece.')
  },
  elevation(r) {
    const kind = r.pick(['45', '30', '60'] as const)
    const d = r.pick([10, 20, 30, 40, 50])
    if (kind === '45') {
      return mk(r, `From ${d} m away from a tower, the angle of elevation to its top is 45°. How tall is the tower?`, `${d} m`, [`${2 * d} m`, `${Math.round(d * 1.41)} m`, `${d / 2} m`, `${d + 5} m`],
        `**Words:** the **angle of elevation** is the angle you look UP from the horizontal.\n**Step 1 (draw the right triangle):** the ground distance ${d} is next to (adjacent to) the 45° angle; the tower is opposite.\n**Step 2 (TOA: tan = opposite ÷ adjacent):** tan 45° = h ÷ ${d}, and tan 45° = 1.\n**Step 3:** h = ${d}.\n**Answer: ${d} m**`,
        'At 45° the height equals the ground distance.')
    }
    if (kind === '30') {
      return mk(r, `From ${d * 3} m away from a tower, the angle of elevation to its top is 30°. How tall is the tower? (use $\\tan30^\\circ=\\frac{1}{\\sqrt3}$)`, `$${d}\\sqrt3$ m`, [`$${d * 3}\\sqrt3$ m`, `$${d}$ m`, `$${2 * d}$ m`, `$${d * 3}$ m`],
        `**Words:** the **angle of elevation** is the angle you look UP from the horizontal.\n**Step 1 (TOA):** tan 30° = height ÷ ${d * 3}.\n**Step 2:** height = ${d * 3} × $\\frac{1}{\\sqrt3}$ = $\\frac{${d * 3}}{\\sqrt3}$.\n**Step 3 (rationalize: multiply top and bottom by $\\sqrt3$):** $\\frac{${d * 3}\\sqrt3}{3}=${d}\\sqrt3$.\n**Answer: $${d}\\sqrt3$ m**`,
        'tan 30° = 1/√3.')
    }
    return mk(r, `From ${d} m away from a tower, the angle of elevation to its top is 60°. How tall is the tower? (use $\\tan60^\\circ=\\sqrt3$)`, `$${d}\\sqrt3$ m`, [`$${d}$ m`, `$\\frac{${d}}{\\sqrt3}$ m`, `$${2 * d}$ m`, `$${d}\\sqrt2$ m`],
      `**Words:** the **angle of elevation** is the angle you look UP from the horizontal.\n**Step 1 (TOA):** tan 60° = height ÷ ${d}.\n**Step 2:** height = ${d} × $\\sqrt3$.\n**Answer: $${d}\\sqrt3$ m**`,
      'tan 60° = √3.')
  },
  lawSin(r) {
    const a = r.int(3, 12)
    return mk(r, `In a triangle, $A=30^\\circ$, $a=${a}$ and $B=90^\\circ$. Find $b$.`, `${2 * a}`, [`${a}`, `${a * 3}`, `${a / 2}`, `${a + 30}`].map(String),
      `**Words:** the **Law of Sines**: each side divided by the sine of its opposite angle gives the same number: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.\n**Step 1 (substitute):** $\\frac{${a}}{\\sin30^\\circ}=\\frac{b}{\\sin90^\\circ}$.\n**Step 2 (sin 30° = 0.5, sin 90° = 1):** $\\frac{${a}}{0.5}=b$.\n**Step 3:** b = ${a} ÷ 0.5 = ${2 * a}.\n**Answer: ${2 * a}**`,
      'Side ÷ sin(opposite angle) is the same for all three sides.')
  },
  setOps(r) {
    const a = r.int(8, 25), b = r.int(6, 20), both = r.int(2, Math.min(a, b) - 2)
    return mk(r, `$n(A)=${a}$, $n(B)=${b}$ and $n(A\\cap B)=${both}$. Find $n(A\\cup B)$.`, `${a + b - both}`, [`${a + b}`, `${a + b + both}`, `${a - both}`, `${b - both}`],
      `**Words:** $A\\cup B$ (“A union B”) is everything in A, or B, or both. $A\\cap B$ (“A intersection B”) is what is in BOTH.\n**Step 1 (add the sets):** ${a} + ${b} = ${a + b}. This counts the overlap twice.\n**Step 2 (subtract the overlap once):** ${a + b} − ${both} = ${a + b - both}.\n**Answer: ${a + b - both}**`,
      'n(A ∪ B) = n(A) + n(B) − n(A ∩ B).')
  },
  perm(r) {
    const n = r.int(5, 9), k = r.int(2, 3)
    let ans = 1
    for (let i = 0; i < k; i++) ans *= n - i
    return mk(r, `In how many ways can ${k} different prizes (1st, 2nd${k === 3 ? ', 3rd' : ''}) be given to ${n} people?`, `${ans}`, [`${(ans / (k === 2 ? 2 : 6))}`, `${n * k}`, `${Math.pow(n, k)}`, `${ans + n}`].map(String),
      `**Words:** a **permutation** counts arrangements where ORDER matters (first prize is different from second prize).\n**Step 1 (choices for each prize):** ${Array.from({ length: k }, (_, i) => n - i).join(' × ')}.\n**Step 2 (multiply):** ${ans}.\n**Answer: ${ans}**`,
      'Order matters → multiply the shrinking number of choices.')
  },
  sd(r) {
    const mean = r.int(5, 15), d = r.int(1, 4)
    const xs = [mean - d, mean + d]
    return mk(r, `Find the population standard deviation of ${xs[0]} and ${xs[1]}.`, `${d}`, [`${2 * d}`, `${d * d}`, `${mean}`, `${d + 1}`].map(String),
      `**Words:** the **standard deviation** tells how far the data are from the mean on average. It is the square root of the **variance**.\n**Step 1 (mean):** (${xs[0]} + ${xs[1]}) ÷ 2 = ${mean}.\n**Step 2 (distances squared):** (${xs[0]} − ${mean})² = ${d * d} and (${xs[1]} − ${mean})² = ${d * d}.\n**Step 3 (variance = average of those):** ${d * d}.\n**Step 4 (square root):** √${d * d} = ${d}.\n**Answer: ${d}**`,
      'Mean → squared distances → average → square root.')
  },
  isFunction(r) {
    const xs = r.shuffle([1, 2, 3, 4, 5, 6, -1, -2, 0]).slice(0, 3).sort((a, b) => a - b)
    const ys = () => r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, -3, -2]).slice(0, 3)
    const fmt = (pairs: number[][]) => `$\\{${pairs.map(([x, y]) => `(${x},${y})`).join(',')}\\}$`
    const good = fmt(xs.map((x, i) => [x, ys()[i]]))
    const bad = () => {
      const yy = ys(); const k = r.int(0, 1)
      const pairs = xs.map((x, i) => [x, yy[i]])
      pairs[k + 1] = [pairs[k][0], pairs[k + 1][1] === pairs[k][1] ? pairs[k + 1][1] + 1 : pairs[k + 1][1]]
      return fmt(pairs)
    }
    const wrongs = [bad(), bad(), bad()]
    if (new Set([good, ...wrongs]).size < 4) return GEN.isFunction(r)
    return mk(r, 'Which relation is a function?', good, wrongs,
      `**Words:** a **relation** is a set of ordered pairs $(x,y)$. It is a **function** when every input $x$ has exactly ONE output $y$ (no x-value is used twice with different y’s).\n**Step 1 (look at the first number of each pair):** in the correct choice the x-values ${xs.join(', ')} are all different. ✓\n**Step 2 (the others):** each of the other choices uses the same x-value twice with two different y-values, so it fails the test.\n**Answer: ${good.replace(/\$/g, '')}**`,
      'Repeated x with different y → not a function.')
  },
  relDomain(r) {
    const xs = r.shuffle([-2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 3).sort((a, b) => a - b)
    const ys = r.shuffle([-3, 0, 2, 4, 6, 7, 9]).slice(0, 3).sort((a, b) => a - b)
    const pairs = xs.map((x, i) => `(${x},${ys[(i + 1) % 3]})`)
    const asked = r.pick(['domain', 'range'] as const)
    const set = (a: number[]) => `$\\{${a.join(',')}\\}$`
    const right = asked === 'domain' ? set(xs) : set(ys)
    return mk(r, `What is the ${asked} of $\\{${pairs.join(',')}\\}$?`, right, [asked === 'domain' ? set(ys) : set(xs), set([...xs, ...ys].slice(0, 5)), set(xs.map(x => x + 1)), set(ys.map(y => y + 1))],
      `**Words:** the **domain** is the set of all inputs (the FIRST numbers of the pairs). The **range** is the set of all outputs (the SECOND numbers).\n**Step 1 (list the first numbers):** ${xs.join(', ')}.\n**Step 2 (list the second numbers):** ${ys.join(', ')}.\n**Step 3 (pick what the question asks):** the ${asked}.\n**Answer: ${right.replace(/\$/g, '')}**`,
      'Domain = x’s. Range = y’s.')
  },
  quadFormula(r) {
    let p = r.int(-6, 6), q = r.int(-6, 6)
    if (p === q) q = p + 3
    const S = p + q, P = p * q
    const [lo, hi] = [Math.min(p, q), Math.max(p, q)]
    const b = -S, c = P
    const eq = `${quad(1, b, c)}=0`
    const ans = (x: number, y: number) => `$x=${Math.min(x, y)}$ or $x=${Math.max(x, y)}$`
    const key = (x: number, y: number) => `${Math.min(x, y)},${Math.max(x, y)}`
    const wrongs: string[] = []
    for (const [x, y] of [[-lo, -hi], [lo, -hi], [-lo, hi], [lo + 1, hi + 1], [lo - 1, hi], [lo, hi + 2]])
      if (x !== y && key(x, y) !== key(lo, hi) && !wrongs.includes(ans(x, y))) wrongs.push(ans(x, y))
    const D = b * b - 4 * c
    const rt = Math.abs(p - q)
    return mk(r, `Use the quadratic formula to solve $${eq}$.`, ans(lo, hi), wrongs.slice(0, 3),
      `**Words:** for $ax^2+bx+c=0$ the **quadratic formula** is $x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.\n**Step 1 (read a, b, c):** $a=1$, $b=${b}$, $c=${c}$.\n**Step 2 (discriminant, the part under the root):** $b^2-4ac=(${b})^2-4(1)(${c})=${b * b}-(${4 * c})=${D}$.\n**Step 3 (square root):** $\\sqrt{${D}}=${rt}$.\n**Step 4 (plug in, with +):** $x=\\frac{${-b}+${rt}}{2}=${(-b + rt) / 2}$.\n**Step 5 (plug in, with −):** $x=\\frac{${-b}-${rt}}{2}=${(-b - rt) / 2}$.\n**Answer: x = ${lo} or x = ${hi}**`,
      'Watch the signs: −b means the OPPOSITE of the number in front of x.')
  },
  horizAsym(r) {
    const kind = r.pick(['smaller', 'equal', 'bigger'] as const)
    const a = r.int(1, 5), c = r.int(1, 4), k = r.int(1, 6)
    let expr = '', right = '', why = ''
    if (kind === 'smaller') { expr = `\\dfrac{${coef(a, 'x')}+${k}}{x^2+${c}}`; right = '$y=0$'; why = 'The top has degree 1 and the bottom has degree 2. When the bottom has the bigger degree, the graph flattens to $y=0$.' }
    else if (kind === 'equal') { expr = `\\dfrac{${coef(a, 'x^2')}+${k}}{${coef(c, 'x^2')}-1}`; right = `$y=${frac(a, c)}$`; why = `Both have degree 2 (equal degrees). The asymptote is the ratio of the leading coefficients: $\\frac{${a}}{${c}}=${frac(a, c)}$.` }
    else { expr = `\\dfrac{${coef(a, 'x^3')}+${k}}{x^2+${c}}`; right = 'There is no horizontal asymptote'; why = 'The top has degree 3 and the bottom has degree 2. When the top has the bigger degree, the graph keeps growing, so there is no horizontal asymptote (the function has a slant or curved end behavior instead).' }
    const opts = ['$y=0$', `$y=${frac(a, c)}$`, 'There is no horizontal asymptote', `$y=${a + c}$`, `$y=${k}$`]
    return mk(r, `Find the horizontal asymptote of $f(x)=${expr}$.`, right, opts.filter(o => o !== right),
      `**Words:** a **horizontal asymptote** is the height the graph settles toward when x gets very large (or very small). Compare the **degrees** (the highest powers of x) of the top and bottom.\n**Step 1 (degrees):** ${kind === 'smaller' ? 'top 1, bottom 2' : kind === 'equal' ? 'top 2, bottom 2' : 'top 3, bottom 2'}.\n**Step 2 (rule):** top smaller → $y=0$; equal → ratio of leading coefficients; top bigger → none.\n**Step 3:** ${why}\n**Answer: ${right.replace(/\$/g, '')}**`,
      'Compare the highest powers: smaller → 0, equal → ratio, bigger → none.')
  },
  arithSum(r) {
    const a = r.int(1, 9), d = r.int(2, 6), n = r.pick([8, 10, 12, 15, 20])
    const an = a + (n - 1) * d
    const S = (n * (a + an)) / 2
    return mk(r, `Find the sum of the first ${n} terms of the arithmetic sequence ${a}, ${a + d}, ${a + 2 * d}, …`, `${S}`, [`${S + n}`, `${(n * an) / 2}`, `${n * (a + an)}`, `${S - d}`].map(String),
      `**Words:** an **arithmetic series** is the SUM of an arithmetic sequence. Formula: $S_n=\\frac{n}{2}(a_1+a_n)$ (number of terms ÷ 2 × (first + last)).\n**Step 1 (common difference):** ${a + d} − ${a} = ${d}.\n**Step 2 (the last term, $a_n=a_1+(n-1)d$):** ${a} + ${n - 1} × ${d} = ${an}.\n**Step 3 (formula):** ${n} ÷ 2 × (${a} + ${an}) = ${n / 2} × ${a + an}.\n**Step 4:** ${S}.\n**Answer: ${S}**`,
      'Sum = (number of terms ÷ 2) × (first + last).')
  },
  geoSum(r) {
    const k = r.pick([2, 3]), m = r.int(1, 3)
    const a = (k === 2 ? 4 : 18) * m, S = (a * k) / (k - 1)
    return mk(r, `Find the sum of the infinite geometric series ${a} + ${a / k} + ${a / (k * k)} + …`.replace(/(\d+\.\d+)/g, x => x), `${S}`, [`${S + m}`, `${a * k * k}`, `${a + a / k}`, `${Math.round((a * k) / (k + 1))}`].map(String),
      `**Words:** a **geometric series** multiplies by the same number each time (the **common ratio**, r). If $|r|<1$ the infinite sum is $S=\\frac{a_1}{1-r}$.\n**Step 1 (ratio):** the second term ÷ the first term = $\\frac1{${k}}$.\n**Step 2 (check it is less than 1):** yes, so the series has a sum.\n**Step 3 (formula):** $S=\\frac{${a}}{1-\\frac1{${k}}}=\\frac{${a}}{\\frac{${k - 1}}{${k}}}$.\n**Step 4 (divide by a fraction = multiply by its flip):** ${a} × $\\frac{${k}}{${k - 1}}$ = ${S}.\n**Answer: ${S}**`,
      'Infinite sum = first term ÷ (1 − ratio).')
  },
  diffSq(r) {
    const a = r.int(1, 5), b = r.int(2, 9)
    if (gcd(a, b) !== 1) return GEN.diffSq(r)
    const t = (c: number) => (c === 1 ? 'x' : `${c}x`)
    return mk(r, `Factor: $${a * a === 1 ? '' : a * a}x^2-${b * b}$`, `$(${t(a)}-${b})(${t(a)}+${b})$`, [`$(${t(a)}-${b})^2$`, `$(${t(a * a)}-${b})(x+${b})$`, `$(${t(a)}+${b})^2$`, `$(${t(a)}-${b * b})(${t(a)}+1)$`],
      `**Words:** a **difference of squares** is one perfect square minus another: $A^2-B^2=(A-B)(A+B)$.\n**Step 1 (square roots of each term):** $\\sqrt{${a * a}x^2}=${t(a)}$ and $\\sqrt{${b * b}}=${b}$.\n**Step 2 (write the two brackets, one with − and one with +):** $(${t(a)}-${b})(${t(a)}+${b})$.\n**Check (multiply back):** the middle terms cancel, leaving $${a * a}x^2-${b * b}$ ✓\n**Answer: $(${t(a)}-${b})(${t(a)}+${b})$**`,
      'A² − B² = (A − B)(A + B). No middle term.')
  },
  expEqLinear(r) {
    const base = r.pick([2, 3, 5]), a = r.int(2, 4), b = r.int(-3, 4), x = r.int(1, 4)
    const e = a * x + b
    if (e < 1 || e > 5) return GEN.expEqLinear(r)
    const bTxt = b === 0 ? '' : b > 0 ? `+${b}` : `${b}`
    return mk(r, `Solve for $x$: $${base}^{${a}x${bTxt}}=${base ** e}$`, `${x}`, [`${e}`, `${x + 1}`, `${Math.round((e / a) * 10) / 10}`, `${x - 1}`].map(String),
      `**Words:** an **exponential equation** has the unknown in the exponent. If both sides are powers of the SAME base, the exponents must be equal.\n**Step 1 (write the right side as a power of ${base}):** ${base ** e} = ${base}^${e}.\n**Step 2 (same base, so set the exponents equal):** ${a}x${bTxt} = ${e}.\n**Step 3 (solve this ordinary equation):** ${a}x = ${e - b}, so x = ${x}.\n**Check:** ${base}^(${a}×${x}${bTxt}) = ${base}^${e} = ${base ** e} ✓\n**Answer: ${x}**`,
      'Same base → set the exponents equal, then solve normally.')
  },
  quadIneqInterval(r) {
    const p = r.int(-5, 1), q = r.int(p + 2, p + 7)
    const gt = r.pick([true, false])
    const inf = '\\infty'
    const ans = gt ? `$(-${inf},${p})\\cup(${q},${inf})$` : `$(${p},${q})$`
    return mk(r, `Solve $${fx(p)}${fx(q)}${gt ? '>' : '<'}0$ and write the answer in interval notation.`, ans,
      [gt ? `$(${p},${q})$` : `$(-${inf},${p})\\cup(${q},${inf})$`, `$[${p},${q}]$`, `$(-${inf},${q})$`, `$(${p},${inf})$`],
      `**Words:** **interval notation** writes a solution set with brackets: ( ) means the endpoint is NOT included, [ ] means it is. ∞ means it goes on forever.\n**Step 1 (critical values, where each bracket is 0):** $x=${p}$ and $x=${q}$. They cut the number line into 3 parts.\n**Step 2 (sign chart: test a number in each part):** left of ${p} the product is positive; between ${p} and ${q} it is negative; right of ${q} it is positive.\n**Step 3 (keep the parts that make “${gt ? '> 0' : '< 0'}” true):** ${gt ? 'the left and right parts' : 'the middle part'}.\n**Step 4 (strict inequality, so the endpoints are NOT included):** ${ans.replace(/\$/g, '')}.\n**Answer: ${ans.replace(/\$/g, '')}**`,
      '> 0 outside the roots, < 0 between them (for an upward parabola).')
  },
  ratFnDomain(r) {
    const a = r.int(1, 5), p = r.int(1, 7), q = r.int(1, 7)
    if (p === q) return GEN.ratFnDomain(r)
    const lo = Math.min(p, q), hi = Math.max(p, q)
    const ans = `all real numbers except $${-hi}$ and $${-lo}$`
    return mk(r, `What is the domain of $f(x)=\\dfrac{${coef(a, 'x')}}{(x+${lo})(x+${hi})}$?`, ans, [`all real numbers except $${lo}$ and $${hi}$`, `all real numbers except $0$`, `all real numbers`, `all real numbers except $${-lo}$`],
      `**Words:** the **domain** is the set of all x-values you are allowed to use. A fraction breaks (you cannot divide by 0) when its bottom is 0.\n**Step 1 (set the bottom equal to 0):** (x + ${lo})(x + ${hi}) = 0.\n**Step 2 (each bracket can be 0):** x = ${-lo} or x = ${-hi}.\n**Step 3 (these are the forbidden values):** the domain is every real number EXCEPT ${-hi} and ${-lo}.\n**Answer: ${ans.replace(/\$/g, '')}**`,
      'Domain of a fraction: bottom ≠ 0.')
  },
  ratXInt(r) {
    const a = r.int(1, 4), p = r.int(1, 8), d = r.int(1, 6)
    const x0 = -p / a
    if (!Number.isInteger(x0) || p === d * a) return GEN.ratXInt(r)
    return mk(r, `Find the x-intercept of $f(x)=\\dfrac{${a === 1 ? '' : a}x+${p}}{x+${d}}$.`, `$x=${x0}$`, [`$x=${-d}$`, `$x=${-x0}$`, `$x=${p}$`, `$x=${d}$`, '$x=0$'],
      `**Words:** the **x-intercept** is where the graph crosses the x-axis, which means $f(x)=0$.\n**Step 1 (a fraction is 0 only when its top is 0):** ${a === 1 ? '' : a}x + ${p} = 0.\n**Step 2 (solve):** ${a}x = ${-p}, so x = ${x0}.\n**Step 3 (check that the bottom is not 0 there):** ${x0} + ${d} = ${x0 + d}, which is not 0 ✓.\n**Answer: x = ${x0}**`,
      'x-intercept: top = 0 (and bottom ≠ 0).')
  },
  longDiv(r) {
    const c = r.int(1, 5), q0 = r.int(1, 6), rem = r.int(1, 7)
    const b = q0 - c, cc = rem - c * q0
    const poly = quad(1, b, cc)
    return mk(r, `Use long division: divide $${poly}$ by $x-${c}$. What is the quotient and the remainder?`, `quotient $x+${q0}$, remainder ${rem}`, [`quotient $x+${q0}$, remainder ${rem + 1}`, `quotient $x-${q0}$, remainder ${rem}`, `quotient $x+${q0 + 1}$, remainder 0`, `quotient $x+${c}$, remainder ${rem}`],
      `**Words:** long division of polynomials works like long division of numbers: divide the leading terms, multiply back, subtract, bring down, repeat. The **quotient** is the answer; the **remainder** is what is left over.\n**Step 1 (divide the leading terms):** x² ÷ x = x. Write x on top.\n**Step 2 (multiply x by the divisor x − ${c}):** x² − ${c}x. Subtract it from ${poly}: leaves (${b} + ${c})x ${cc < 0 ? '−' : '+'} ${Math.abs(cc)} = ${q0}x ${cc < 0 ? '−' : '+'} ${Math.abs(cc)}.\n**Step 3 (divide again):** ${q0}x ÷ x = ${q0}. Write +${q0} on top.\n**Step 4 (multiply ${q0} by x − ${c}):** ${q0}x − ${q0 * c}. Subtract: ${cc} − (−${q0 * c}) = ${rem}.\n**Step 5 (nothing left to divide):** the remainder is ${rem}.\n**Answer: quotient x + ${q0}, remainder ${rem}**`,
      'Divide, multiply, subtract, repeat. Same as number long division.')
  },
  ratSimp2(r) {
    const p = r.int(1, 6), q = r.int(1, 6)
    if (p === q) return GEN.ratSimp2(r)
    const s = p + q, pr = p * q
    return mk(r, `Simplify $\\dfrac{x^2+${s}x+${pr}}{x+${p}}$ (for $x\\ne-${p}$).`, `$x+${q}$`, [`$x+${p}$`, `$x+${pr}$`, `$x^2+${q}$`, `$\\dfrac{x+${q}}{x+${p}}$`],
      `**Words:** to simplify a **rational expression**, factor the top and the bottom, then cancel any factor they share.\n**Step 1 (factor the top, find two numbers with product ${pr} and sum ${s}):** ${p} and ${q}, so $x^2+${s}x+${pr}=(x+${p})(x+${q})$.\n**Step 2 (write the fraction):** $\\frac{(x+${p})(x+${q})}{x+${p}}$.\n**Step 3 (cancel the shared factor $x+${p}$):** $x+${q}$.\n**Answer: $x+${q}$**`,
      'Factor the top, then cancel the bracket that also sits on the bottom.')
  },
  rectDiag(r) {
    const x = r.int(2, 9), a = r.int(2, 5), b = r.int(1, 6), k = r.int(1, 4)
    const half = a * x + b
    const c = half + 0
    const left = `${a}x+${b}`, right = `${a + k}x+${b - k * x}`
    if (b - k * x === 0) return GEN.rectDiag(r)
    const rightTxt = `${a + k}x${b - k * x > 0 ? '+' : '-'}${Math.abs(b - k * x)}`
    void left; void right; void c
    return mk(r, `In rectangle $ABCD$ the diagonals meet at $E$. $AE=${a}x+${b}$ and $EC=${rightTxt}$. What is $AC$?`, `${2 * half}`, [`${half}`, `${2 * half + 2}`, `${half + x}`, `${2 * half - 2}`].map(String),
      `**Words:** a **diagonal** joins opposite corners. In a rectangle the diagonals **bisect** each other, meaning they cut each other into two equal halves at E.\n**Step 1 (bisect, so the two halves are equal):** AE = EC, so ${a}x + ${b} = ${rightTxt}.\n**Step 2 (solve for x):** x = ${x}.\n**Step 3 (find one half):** AE = ${a}(${x}) + ${b} = ${half}.\n**Step 4 (AC is both halves together):** AC = 2 × ${half} = ${2 * half}.\n**Answer: ${2 * half}**`,
      'Rectangle diagonals are equal and bisect each other: AE = EC = BE = ED.')
  },
  rectDiagLen(r) {
    const t = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]])
    return mk(r, `A rectangle is ${t[0]} cm long and ${t[1]} cm wide. How long is its diagonal?`, `${t[2]} cm`, [`${t[0] + t[1]} cm`, `${t[2] + 1} cm`, `${t[0] * t[1]} cm`, `${t[2] - 1} cm`],
      `**Words:** the **diagonal** of a rectangle cuts it into two right triangles, and the diagonal is the longest side (the hypotenuse).\n**Step 1 (Pythagorean theorem, a² + b² = c²):** ${t[0]}² + ${t[1]}² = c².\n**Step 2:** ${t[0] ** 2} + ${t[1] ** 2} = ${t[0] ** 2 + t[1] ** 2}.\n**Step 3 (square root):** c = √${t[2] ** 2} = ${t[2]}.\n**Answer: ${t[2]} cm**`,
      'Diagonal = √(length² + width²).')
  },
  numWord(r) {
    const a = r.int(2, 6), c = r.int(3, 20), x = r.int(1, 12)
    const T = a * x + c
    return mk(r, `The sum of ${a} times a number and ${c} is ${T}. What is the number?`, `${x}`, [`${T - c}`, `${x + 1}`, `${T + c}`, `${a * x}`],
      `**Words:** a **variable** is a letter standing for the unknown number. “Sum” means add and “is” means equals.\n**Step 1 (let x be the number):** ${a} times the number is ${a}x.\n**Step 2 (write the equation):** ${a}x + ${c} = ${T}.\n**Step 3 (subtract ${c} from both sides):** ${a}x = ${T - c}.\n**Step 4 (divide both sides by ${a}):** x = ${x}.\n**Check:** ${a}×${x} + ${c} = ${T} ✓\n**Answer: ${x}**`,
      '“Is” = “=”. Undo the +c first, then the ×a.')
  },
  lessThan(r) {
    const k = r.int(2, 9), twice = r.pick([true, false])
    const base = twice ? '2x' : 'x'
    const ans = `$${base}-${k}$`
    return mk(r, `Which expression means “${k} less than ${twice ? 'twice a number' : 'a number'}”?`, ans, [`$${k}-${base}$`, `$${base}+${k}$`, `$${twice ? '2(x-' + k + ')' : k + 'x'}$`],
      `**Words:** “less than” means subtract, but the thing you START from comes first, even though it is written second in the sentence.\n**Step 1 (what are we starting from?):** ${twice ? 'twice a number, which is 2x' : 'a number, which is x'}.\n**Step 2 (take away ${k}):** ${base} − ${k}.\n**Step 3 (do not flip it):** ${k} − ${base} would mean “${base} less than ${k}”, which is a different thing.\n**Answer: ${base} − ${k}**`,
      '“k less than A” is A − k (the A comes first).')
  },
  consecutive(r) {
    const kind = r.pick(['integers', 'even', 'odd'] as const)
    const step = kind === 'integers' ? 1 : 2
    let m = r.int(8, 40)
    if (kind === 'even' && m % 2) m++
    if (kind === 'odd' && m % 2 === 0) m++
    const S3 = 3 * m, lo = m - step
    const name = kind === 'integers' ? 'consecutive integers' : kind === 'even' ? 'consecutive even integers' : 'consecutive odd integers'
    return mk(r, `The sum of three ${name} is ${S3}. What is the smallest of the three?`, `${lo}`, [`${m}`, `${m + step}`, `${lo - step}`],
      `**Words:** **${name}** are ${kind === 'integers' ? 'whole numbers that come right after each other (1 apart)' : `${kind} numbers that come right after each other (2 apart)`}.\n**Step 1 (sum ÷ how many numbers gives the MIDDLE one):** ${S3} ÷ 3 = ${m}.\n**Step 2 (the others are ${step} below and ${step} above the middle):** ${lo}, ${m}, ${m + step}.\n**Step 3 (check):** ${lo} + ${m} + ${m + step} = ${S3} ✓\n**Step 4 (the smallest is the first one):** ${lo}.\n**Answer: ${lo}**`,
      'Sum ÷ 3 = the middle number. Then step down.')
  },
  ageWord(r) {
    let j = 8, k = 3, n = 8, m = 2
    for (let t = 0; t < 80; t++) {
      const jj = r.int(3, 16), kk = r.int(3, 5), nn = r.int(2, 12)
      if ((kk * jj + nn) % (jj + nn) === 0) {
        const mm = (kk * jj + nn) / (jj + nn)
        if (mm >= 2 && mm < kk) { j = jj; k = kk; n = nn; m = mm; break }
      }
    }
    return mk(r, `Sally is ${k} times as old as John. In ${n} years Sally will be ${m} times as old as John. How old is John now?`, `${j}`, [`${k * j}`, `${j + n}`, `${j - 1}`],
      `**Step 1 (name the ages NOW):** Sally = s, John = j.\n**Step 2 (the present equation):** s = ${k}j.\n**Step 3 (in ${n} years EVERYONE is ${n} older):** s + ${n} = ${m}(j + ${n}).\n**Step 4 (substitute s = ${k}j):** ${k}j + ${n} = ${m}j + ${m * n}.\n**Step 5 (subtract ${m}j and ${n} from both sides):** ${k - m}j = ${m * n - n}.\n**Step 6 (divide by ${k - m}):** j = ${j}.\n**Check:** Sally is ${k * j} now; in ${n} years she is ${k * j + n} and John is ${j + n}, and ${k * j + n} = ${m}×${j + n} ✓\n**Answer: John is ${j}**`,
      'Everybody ages the same amount. Two people means two equations: substitute.')
  },
  workFind(r) {
    const [a, b, T] = r.pick([[6, 12, 4], [12, 6, 4], [10, 15, 6], [15, 10, 6], [3, 6, 2], [6, 3, 2], [12, 24, 8], [20, 5, 4], [30, 15, 10], [12, 4, 3], [4, 12, 3], [20, 30, 12], [30, 20, 12], [15, 30, 10]])
    return mk(r, `Ana and Ben together finish a job in ${T} hours. Ana alone takes ${a} hours. How long would Ben take alone?`, `${b} hours`, [`${a} hours`, `${a + T} hours`, `${b + T} hours`],
      `**Words:** a **rate** is the part of the job done in ONE hour. If a worker takes h hours for the whole job, the rate is 1/h.\n**Step 1 (together rate):** 1/${T} of the job per hour.\n**Step 2 (Ana's rate):** 1/${a} per hour.\n**Step 3 (Ben's rate = together − Ana):** 1/${T} − 1/${a} = ${a}/${a * T} − ${T}/${a * T} = ${a - T}/${a * T}, which simplifies to 1/${b}.\n**Step 4 (flip the rate to get the time):** ${b} hours.\n**Check:** 1/${a} + 1/${b} = ${b}/${a * b} + ${a}/${a * b} = ${a + b}/${a * b} = 1/${T} ✓\n**Answer: ${b} hours**`,
      'Subtract the known rate from the together rate, then flip.')
  },
  lineMB(r) {
    const p = r.pick([-5, -3, -2, 2, 3, 4, 5]), q0 = r.pick([1, 1, 2, 3]), b = r.pick([-7, -5, -3, -2, 2, 3, 4, 6, 8])
    const g = (a: number, c: number): number => (c ? g(c, a % c) : Math.abs(a))
    if ((q0 > 1 && g(p, q0) !== 1) || p === b) return GEN.lineMB(r)
    const slope = (n: number) => (q0 === 1 ? `${n}` : n < 0 ? `-\\frac{${-n}}{${q0}}` : `\\frac{${n}}{${q0}}`)
    const bt = (n: number) => (n > 0 ? `+${n}` : `${n}`)
    const ans = `$y=${slope(p)}x${bt(b)}$`
    const sw = q0 === 1 ? `$y=${b}x${bt(p)}$` : `$y=${slope(b)}x${bt(p)}$`
    return mk(r, `Write the equation of the line in slope-intercept form if the slope is $${slope(p)}$ and the y-intercept is $${b}$.`, ans,
      [sw, `$y=${slope(p)}x${bt(-b)}$`, `$y=${slope(-p)}x${bt(b)}$`],
      `**Words:** the **slope-intercept form** is $y=mx+b$. $m$ is the **slope** (how steep the line is) and $b$ is the **y-intercept** (the height where the line crosses the y-axis).\n**Step 1 (what is m?):** m = ${q0 === 1 ? p : p + '/' + q0}.\n**Step 2 (what is b?):** b = ${b}.\n**Step 3 (just replace m and b in y = mx + b):** ${ans.replace(/\$/g, '')}.\n**Answer: ${ans.replace(/\$/g, '')}**`,
      'Slope-intercept: just replace m and b. No solving needed.')
  },
  pointSlopeForm(r) {
    const m = r.pick([-4, -3, -2, 2, 3, 4, 5]), x1 = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), y1 = r.pick([-6, -4, -3, -2, -1, 1, 2, 3, 5, 7])
    if (x1 === y1) return GEN.pointSlopeForm(r)
    const t = (v: number, letter: string) => (v < 0 ? `${letter}+${-v}` : `${letter}-${v}`)
    const ans = `$${t(y1, 'y')}=${m}(${t(x1, 'x')})$`
    return mk(r, `A line has slope $${m}$ and passes through $(${x1},${y1})$. Write its equation in point-slope form.`, ans,
      [`$${t(-y1, 'y')}=${m}(${t(x1, 'x')})$`, `$${t(y1, 'y')}=${m}(${t(-x1, 'x')})$`, `$${t(x1, 'y')}=${m}(${t(y1, 'x')})$`],
      `**Words:** the **point-slope form** is $y-y_1=m(x-x_1)$, where $m$ is the slope and $(x_1,y_1)$ is ANY point on the line.\n**Step 1 (m, x₁, y₁):** m = ${m}, x₁ = ${x1}, y₁ = ${y1}.\n**Step 2 (put them in y − y₁ = m(x − x₁)):** y − (${y1}) = ${m}(x − (${x1})).\n**Step 3 (subtracting a negative becomes plus):** ${ans.replace(/\$/g, '')}.\n**Answer: ${ans.replace(/\$/g, '')}**`,
      'Point-slope: y − y₁ = m(x − x₁). Watch the signs: minus a negative is plus.')
  },
  stdForm(r) {
    const p = r.pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 7]), q0 = r.pick([2, 3, 4, 5]), b = r.int(1, 5)
    const g = (a: number, c: number): number => (c ? g(c, a % c) : Math.abs(a))
    if (g(p, q0) !== 1) return GEN.stdForm(r)
    const A = Math.abs(p), B = p > 0 ? -q0 : q0, C = p > 0 ? -q0 * b : q0 * b
    const f = (a: number, bb: number, c: number) => `$${a}x${bb > 0 ? '+' : '-'}${Math.abs(bb)}y=${c}$`
    const ans = f(A, B, C)
    const slope = p < 0 ? `-\\frac{${-p}}{${q0}}` : `\\frac{${p}}{${q0}}`
    return mk(r, `Write $y=${slope}x+${b}$ in standard form $Ax+By=C$ (with whole numbers and A positive).`, ans,
      [f(A, -B, C), f(A, B, -C), f(q0, p > 0 ? -A : A, C)],
      `**Words:** **standard form** is $Ax+By=C$: the x and y terms are on the SAME side, and there are no fractions.\n**Step 1 (get rid of the fraction, multiply EVERYTHING by ${q0}):** ${q0}y = ${p < 0 ? '−' : ''}${A}x + ${q0 * b}.\n**Step 2 (move the x term to the left side):** ${p < 0 ? `${A}x + ${q0}y = ${q0 * b}` : `−${A}x + ${q0}y = ${q0 * b}`}.\n**Step 3 (make the x term positive, multiply both sides by −1 if needed):** ${ans.replace(/\$/g, '')}.\n**Check:** pick x = 0: y = ${b} in the original, and ${A}(0) ${B > 0 ? '+' : '−'} ${Math.abs(B)}(${b}) = ${C} ✓\n**Answer: ${ans.replace(/\$/g, '')}**`,
      'Standard form: clear fractions first, then x and y on the same side, x term positive.')
  },
  slopeSpecial(r) {
    const kind = r.pick(['horizontal', 'vertical', 'riseRun', 'riseRun'] as const)
    if (kind === 'riseRun') {
      const rise = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), run = r.int(1, 5)
      if (Math.abs(rise) === run) return GEN.slopeSpecial(r)
      const ans = `$${frac(rise, run)}$`
      return mk(r, `Going from one point on a line to another point, you move ${rise > 0 ? 'UP' : 'DOWN'} ${Math.abs(rise)} unit${Math.abs(rise) === 1 ? '' : 's'} and ${run} unit${run === 1 ? '' : 's'} to the RIGHT. What is the slope of the line?`, ans, [`$${frac(run, rise)}$`, `$${frac(-rise, run)}$`, `$${frac(rise, run + 1)}$`],
        `**Words:** **slope** = rise ÷ run. The **rise** is how far you go up (+) or down (−). The **run** is how far you go to the right.\n**Step 1 (rise):** ${rise > 0 ? 'up' : 'down'} ${Math.abs(rise)}, so rise = ${rise}.\n**Step 2 (run):** right ${run}, so run = ${run}.\n**Step 3 (divide):** ${rise} ÷ ${run} = ${frac(rise, run).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Answer: ${plain(ans)}**`,
        'Going down means a NEGATIVE rise, so the slope is negative.')
    }
    if (kind === 'horizontal') {
      const y = r.pick([-6, -4, -3, 2, 3, 5, 7]), x1 = r.int(-4, 1), x2 = x1 + r.int(2, 5)
      return mk(r, `What is the slope of the line through $(${x1},${y})$ and $(${x2},${y})$?`, '0', ['Undefined', `${y}`, '1'],
        `**Words:** both points have the same y-value (${y}), so the line is **horizontal** (flat).\n**Step 1 (rise = change in y):** ${y} − (${y}) = 0.\n**Step 2 (run = change in x):** ${x2} − (${x1}) = ${x2 - x1}.\n**Step 3 (divide):** 0 ÷ ${x2 - x1} = 0.\n**Answer: 0** (every horizontal line has slope 0)`,
        'Horizontal line: slope 0. Vertical line: slope is Undefined (you cannot divide by 0).')
    }
    const x = r.pick([-5, -3, -2, 2, 4, 6]), y1 = r.int(-4, 0), y2 = y1 + r.int(2, 6)
    return mk(r, `What is the slope of the line through $(${x},${y1})$ and $(${x},${y2})$?`, 'Undefined', ['0', `${y2 - y1}`, '1'],
      `**Words:** both points have the same x-value (${x}), so the line is **vertical** (straight up and down).\n**Step 1 (rise = change in y):** ${y2} − (${y1}) = ${y2 - y1}.\n**Step 2 (run = change in x):** ${x} − (${x}) = 0.\n**Step 3 (divide):** ${y2 - y1} ÷ 0 cannot be done, because you can never divide by 0.\n**Answer: Undefined** (every vertical line has an Undefined slope)`,
      'Horizontal line: slope 0. Vertical line: slope is Undefined.')
  },
  distCircle(r) {
    const [a, b, R] = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]])
    const sa = r.pick([1, -1]), sb = r.pick([1, -1]), h = r.int(-3, 3), k = r.int(-3, 3)
    const px = h + sa * a, py = k + sb * b
    return mk(r, `A circle has its center at $(${h},${k})$ and passes through the point $(${px},${py})$. What is the area of the circle?`, `$${R * R}\\pi$`, [`$${R}\\pi$`, `$${2 * R}\\pi$`, `$${2 * R * R}\\pi$`],
      `**Words:** the **radius** is the distance from the center to any point on the circle. The **area** of a circle is $\\pi r^2$.\n**Step 1 (distance formula):** $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.\n**Step 2 (differences):** ${px} − (${h}) = ${px - h} and ${py} − (${k}) = ${py - k}.\n**Step 3 (square and add):** ${(px - h) ** 2} + ${(py - k) ** 2} = ${R * R}.\n**Step 4 (square root, this is the radius):** r = √${R * R} = ${R}.\n**Step 5 (area):** π × ${R}² = ${R * R}π.\n**Answer: ${R * R}π**`,
      'The distance from the center to the point IS the radius. Then area = πr².')
  },
  sysElim(r) {
    const x = r.int(-4, 5), y = r.int(-4, 5), a1 = r.int(2, 4), b1 = r.pick([-5, -4, -3, -2, 2, 3, 4, 5]), b2 = r.pick([-3, -2, -1, 1, 2, 3])
    const K = b1 - a1 * b2
    if (K === 0 || x === y || x === 0 || y === 0) return GEN.sysElim(r)
    const c1 = a1 * x + b1 * y, c2 = x + b2 * y
    const eq = (a: number, b: number, c: number) => `${coef(a, 'x')}${b > 0 ? '+' : '-'}${coef(Math.abs(b), 'y')}=${c}`
    const ans = `$(${x},${y})$`
    return mk(r, `Solve the system: $${eq(a1, b1, c1)}$ and $${eq(1, b2, c2)}$. What is the solution $(x,y)$?`, ans, [`$(${y},${x})$`, `$(${x},${-y})$`, `$(${-x},${y})$`, `$(${x + 1},${y})$`],
      `**Words:** **elimination** means adding the two equations so that one letter cancels.\n**Step 1 (make the x-terms opposites, multiply the second equation by ${-a1}):** $${eq(-a1, -a1 * b2, -a1 * c2)}$.\n**Step 2 (add it to the first equation, the x-terms cancel):** ${K}y = ${c1} + (${-a1 * c2}) = ${c1 - a1 * c2}.\n**Step 3 (divide by ${K}):** y = ${y}.\n**Step 4 (put y = ${y} into the second equation):** x ${b2 > 0 ? '+' : '−'} ${Math.abs(b2)}(${y}) = ${c2}, so x = ${c2} ${b2 * y >= 0 ? '−' : '+'} ${Math.abs(b2 * y)} = ${x}.\n**Check:** ${a1}(${x}) + (${b1})(${y}) = ${c1} ✓\n**Answer: (${x}, ${y})**`,
      'Multiply one equation so a letter has opposite numbers, then add.')
  },
  sysSub(r) {
    const x = r.int(-3, 5), y = r.int(-4, 8), m = r.pick([-3, -2, -1, 2, 3]), a = r.int(2, 5), c = r.pick([-4, -3, -2, 2, 3, 4])
    const b = y - m * x
    if (a + c * m === 0 || x === y || x === 0 || y === 0 || y + 1 === x) return GEN.sysSub(r)
    const d = a * x + c * y
    const ans = `$(${x},${y})$`
    return mk(r, `Solve by substitution: $y=${lin(m, b)}$ and $${coef(a, 'x')}${c > 0 ? '+' : '-'}${coef(Math.abs(c), 'y')}=${d}$. What is $(x,y)$?`, ans, [`$(${y},${x})$`, `$(${x},${-y})$`, `$(${-x},${y})$`, `$(${x},${y + 1})$`],
      `**Words:** **substitution** means replacing a letter with what it equals.\n**Step 1 (replace y in the second equation with ${lin(m, b)}):** ${a}x + (${c})(${lin(m, b)}) = ${d}.\n**Step 2 (distribute):** ${a}x + (${c * m})x + (${c * b}) = ${d}.\n**Step 3 (combine like terms):** ${a + c * m}x = ${d} − (${c * b}) = ${d - c * b}.\n**Step 4 (divide):** x = ${x}.\n**Step 5 (find y from the first equation):** y = ${m}(${x}) + (${b}) = ${y}.\n**Answer: (${x}, ${y})**`,
      'If one equation already says “y = …”, plug that whole expression into the other equation.')
  },
  gcfBinom(r) {
    const a = r.pick([1, 1, 2, 3]), p = r.pick([-5, -3, -2, -1, 1, 2, 4]), v = r.pick(['x', 'y']), k = r.pick([-5, -4, -3, -2, 2, 3, 4, 5])
    if (v === 'x' && a !== 1) return GEN.gcfBinom(r)
    const inner = lin(a, p)
    const ans = `$(${inner})(${v}${sgn(k)})$`
    return mk(r, `Factor: $${v}(${inner})${k > 0 ? '+' : '-'}${Math.abs(k)}(${inner})$`, ans, [`$(${inner})(${v}${sgn(-k)})$`, `$(${lin(a, -p)})(${v}${sgn(k)})$`, `$${k}${v}(${inner})$`],
      `**Words:** here the **common factor** is a whole bracket, $(${inner})$, which appears in both terms.\n**Step 1 (take out the common bracket once):** $(${inner})(\\ \\ \\ )$.\n**Step 2 (what is left from each term):** from the first term ${v}, from the second term ${k}.\n**Step 3 (write them in the second bracket):** $(${inner})(${v}${sgn(k)})$.\n**Answer: ${plain(ans)}**`,
      'A repeated bracket is a GCF too: pull it out once.')
  },
  ratGcf(r) {
    const p = r.int(2, 7), q = r.int(2, 7), a = r.pick([-6, -4, -3, -2, 2, 3, 4, 5])
    if (p === q || gcd(p, q) !== 1) return GEN.ratGcf(r)
    const ans = `$\\dfrac{${p}x}{${q}}$`
    return mk(r, `Simplify $\\dfrac{${quad(p, p * a, 0)}}{${lin(q, q * a)}}$.`, ans, [`$\\dfrac{${p}}{${q}}$`, `$\\dfrac{${q}x}{${p}}$`, `$${p}x$`, `$\\dfrac{${lin(p, a)}}{${q}}$`],
      `**Words:** to simplify a **rational expression** (a fraction with polynomials), factor the top and bottom, then cancel what they share.\n**Step 1 (GCF of the top is ${p}x):** $${quad(p, p * a, 0)}=${p}x(${lin(1, a)})$.\n**Step 2 (GCF of the bottom is ${q}):** $${lin(q, q * a)}=${q}(${lin(1, a)})$.\n**Step 3 (cancel the shared bracket $(${lin(1, a)})$):** $\\frac{${p}x}{${q}}$.\n**Answer: ${p}x/${q}**`,
      'Factor out the GCF on top and bottom, then cancel the matching bracket.')
  },
  ratNeg(r) {
    const a = r.int(2, 9), m = r.pick([1, 2, 3]), t = r.int(1, 4), k = m * t
    const ans = `${-t}`
    return mk(r, `Simplify $\\dfrac{${k * a}-${coef(k, 'x')}}{${lin(m, -m * a)}}$.`, ans, [`${t}`, '0', `${-(t + 1)}`],
      `**Words:** $(${a}-x)$ and $(x-${a})$ look alike but are OPPOSITES: $${a}-x=-(x-${a})$.\n**Step 1 (factor the top):** $${k * a}-${coef(k, 'x')}=${k}(${a}-x)=-${k}(x-${a})$.\n**Step 2 (factor the bottom):** $${lin(m, -m * a)}=${m === 1 ? '' : m}(x-${a})$.\n**Step 3 (cancel $(x-${a})$):** $\\frac{-${k}}{${m}}=${-t}$.\n**Answer: ${-t}**`,
      '(a − x) = −(x − a): take out a −1, then cancel.')
  },
  ratAdd(r) {
    if (r.int(0, 2) === 0) {
      const a = r.int(1, 6), b = r.int(1, 6)
      if (a === b) return GEN.ratAdd(r)
      const ans = `$\\dfrac{${lin(a, b)}}{x^2}$`
      return mk(r, `Add: $\\dfrac{${a}}{x}+\\dfrac{${b}}{x^2}$`, ans, [`$\\dfrac{${a + b}}{x^2}$`, `$\\dfrac{${a + b}}{x^3}$`, `$\\dfrac{${lin(b, a)}}{x^2}$`],
        `**Words:** to add fractions you need a **common denominator** (the same bottom).\n**Step 1 (common denominator):** x².\n**Step 2 (multiply the first fraction by x/x):** $\\frac{${a}}{x}=\\frac{${a}x}{x^2}$.\n**Step 3 (add the tops):** $\\frac{${a}x+${b}}{x^2}$.\n**Answer: (${a}x + ${b})/x²**`,
        'Same bottom first, then add the tops.')
    }
    const a = r.int(1, 5), b = r.int(1, 5), p = r.pick([-5, -3, -2, -1, 1, 2, 3, 4]), q = r.pick([-4, -3, -1, 1, 2, 3, 5])
    if (p === q || a === b) return GEN.ratAdd(r)
    const D = `(${lin(1, p)})(${lin(1, q)})`
    const top = lin(a + b, a * q + b * p)
    const ans = `$\\dfrac{${top}}{${D}}$`
    return mk(r, `Add: $\\dfrac{${a}}{${lin(1, p)}}+\\dfrac{${b}}{${lin(1, q)}}$`, ans, [`$\\dfrac{${a + b}}{${lin(2, p + q)}}$`, `$\\dfrac{${a + b}}{${D}}$`, `$\\dfrac{${lin(a + b, a * p + b * q)}}{${D}}$`],
      `**Words:** to add fractions you need a **common denominator**. Here it is the product of the two bottoms, ${D}.\n**Step 1 (multiply the first fraction top and bottom by $(${lin(1, q)})$):** top becomes ${a}(${lin(1, q)}) = ${lin(a, a * q)}.\n**Step 2 (multiply the second fraction top and bottom by $(${lin(1, p)})$):** top becomes ${b}(${lin(1, p)}) = ${lin(b, b * p)}.\n**Step 3 (add the tops, combine like terms):** ${top}.\n**Answer: (${top}) / ${D}**`,
      'Multiply each fraction by the bottom it is missing, then add the tops.')
  },
  ratCross(r) {
    const p = r.int(1, 6), q = r.int(1, 6), x = p + r.int(1, 6), t = r.int(1, 2)
    const a = t * (x - p), b = t * (x + q)
    if (a === b) return GEN.ratCross(r)
    return mk(r, `Solve: $\\dfrac{${a}}{x-${p}}=\\dfrac{${b}}{x+${q}}$`, `${x}`, [`${x + 1}`, `${-x}`, `${p + q}`],
      `**Words:** when one fraction equals another fraction, **cross multiply**: top-left × bottom-right = top-right × bottom-left.\n**Step 1 (cross multiply):** ${a}(x + ${q}) = ${b}(x − ${p}).\n**Step 2 (distribute):** ${a}x + ${a * q} = ${b}x − ${b * p}.\n**Step 3 (x-terms on one side, numbers on the other):** ${a * q} + ${b * p} = ${b}x − ${a}x, so ${a * q + b * p} = ${b - a}x.\n**Step 4 (divide):** x = ${x}.\n**Check:** the bottoms are ${x - p} and ${x + q}, not 0 ✓\n**Answer: ${x}**`,
      'Fraction = fraction → cross multiply.')
  },
  ratCrossSq(r) {
    const s = r.int(2, 9)
    const divs = [] as number[]
    for (let d = 1; d < s * s; d++) if ((s * s) % d === 0 && d !== s) divs.push(d)
    const k = r.pick(divs), m = (s * s) / k
    const ans = `$x=${s}$ or $x=-${s}$`
    return mk(r, `Solve: $\\dfrac{${k}}{x}=\\dfrac{x}{${m}}$`, ans, [`$x=${s}$ only`, `$x=${s * s}$`, `$x=${k + m}$`],
      `**Step 1 (cross multiply):** x · x = ${k} × ${m}, so x² = ${s * s}.\n**Step 2 (take the square root of both sides, remember ±):** x = ±√${s * s} = ±${s}.\n**Step 3 (check: neither answer makes a bottom 0):** both work.\n**Answer: x = ${s} or x = −${s}**`,
      'x² = number → TWO answers, + and −.')
  },
  vertexForm(r) {
    const a = r.pick([-3, -2, -1, 1, 2, 3]), h = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), k = r.pick([-6, -5, -4, -3, -1, 1, 2, 3, 6, 7])
    if (Math.abs(h) === Math.abs(k)) return GEN.vertexForm(r)
    const ans = `$(${h},${k})$`
    return mk(r, `What is the vertex of $y=${a === 1 ? '' : a === -1 ? '-' : a}(x${sgn(-h)})^2${sgn(k)}$?`, ans, [`$(${-h},${k})$`, `$(${h},${-k})$`, `$(${k},${h})$`],
      `**Words:** **vertex form** is $y=a(x-h)^2+k$, and the vertex (the turning point) is $(h,k)$.\n**Step 1 (h is the number inside the bracket with its sign SWITCHED):** the bracket is (x ${h < 0 ? '+' : '−'} ${Math.abs(h)}), so h = ${h}.\n**Step 2 (k is the number outside, sign NOT switched):** k = ${k}.\n**Answer: (${h}, ${k})**`,
      'Vertex form: switch the sign inside the bracket, keep the sign outside.')
  },
  vertexFactored(r) {
    const p = r.int(-5, 4), d = r.pick([2, 4, 6]), q = p + d, a = r.pick([1, 1, -1, 2])
    const xv = (p + q) / 2, yv = a * (xv - p) * (xv - q)
    const ans = `$(${xv},${yv})$`
    const br = (n: number) => (n === 0 ? 'x' : `(x${sgn(-n)})`)
    if (xv === 0) return GEN.vertexFactored(r)
    return mk(r, `What is the vertex of $y=${a === 1 ? '' : a === -1 ? '-' : a}${br(p)}${br(q)}$?`, ans, [`$(${-xv},${yv})$`, `$(${xv},${-yv})$`, `$(${p},${q})$`],
      `**Words:** in **factored form** the x-intercepts are where each bracket is 0. The vertex is exactly halfway between them.\n**Step 1 (x-intercepts):** x = ${p} and x = ${q}.\n**Step 2 (x of the vertex is their average):** (${p} + ${q}) ÷ 2 = ${xv}.\n**Step 3 (put x = ${xv} into the equation):** y = ${a}(${xv} − (${p}))(${xv} − (${q})) = ${a} × ${xv - p} × ${xv - q} = ${yv}.\n**Answer: (${xv}, ${yv})**`,
      'Factored form: vertex x = average of the two x-intercepts.')
  },
  vertexA(r) {
    const a = r.pick([-3, -2, 2, 3]), h = r.pick([-3, -2, -1, 1, 2, 3]), c = r.int(-6, 6)
    const b = -2 * a * h, k = c - a * h * h
    if (k === c || k === 0 || c === -k || Math.abs(h) === Math.abs(k)) return GEN.vertexA(r)
    const ans = `$(${h},${k})$`
    return mk(r, `What is the vertex of $y=${quad(a, b, c)}$?`, ans, [`$(${-h},${k})$`, `$(${h},${-k})$`, `$(${h},${c})$`],
      `**Words:** in **standard form** $y=ax^2+bx+c$ the x-coordinate of the vertex is $x=-\\dfrac{b}{2a}$.\n**Step 1 (read a and b):** a = ${a}, b = ${b}.\n**Step 2 (x of the vertex):** x = −(${b}) ÷ (2 × ${a}) = ${-b} ÷ ${2 * a} = ${h}.\n**Step 3 (put x = ${h} back in to get y):** y = ${a}(${h})² + (${b})(${h}) + (${c}) = ${a * h * h} + (${b * h}) + (${c}) = ${k}.\n**Answer: (${h}, ${k})**`,
      'x = −b/(2a), then plug that x back in for y.')
  },
  quadIneqFull(r) {
    const p = r.int(-6, 3), q = p + r.int(1, 7), rel = r.pick(['>', '\\ge', '<', '\\le'] as const), moved = r.pick([true, false])
    const b = -(p + q), c = p * q
    const outside = rel === '>' || rel === '\\ge', closed = rel === '\\ge' || rel === '\\le'
    const L = closed ? '[' : '(', R = closed ? ']' : ')'
    const out = (l: string, rr: string) => `$(-\\infty,${p}${rr}\\cup${l}${q},\\infty)$`
    const ins = (l: string, rr: string) => `$${l}${p},${q}${rr}$`
    const ans = outside ? out(L, R) : ins(L, R)
    const wrong = outside ? [ins(L, R), out(closed ? '(' : '[', closed ? ')' : ']'), ins(closed ? '(' : '[', closed ? ')' : ']')] : [out(L, R), ins(closed ? '(' : '[', closed ? ')' : ']'), out(closed ? '(' : '[', closed ? ')' : ']')]
    const lhs = moved && c !== 0 ? quad(1, b, 0) : quad(1, b, c), rhs = moved && c !== 0 ? `${-c}` : '0'
    const relWord = rel === '>' ? '> 0' : rel === '\\ge' ? '≥ 0' : rel === '<' ? '< 0' : '≤ 0'
    return mk(r, `Solve $${lhs}${rel}${rhs}$. Write the answer in interval notation.`, ans, wrong,
      `**Words:** **interval notation** uses ( ) when an endpoint is NOT included and [ ] when it IS included (for ≥ or ≤).\n**Step 1 (get 0 on one side):** $${quad(1, b, c)}${rel}0$.\n**Step 2 (factor):** $${p === 0 ? 'x' : `(x${sgn(-p)})`}${q === 0 ? 'x' : `(x${sgn(-q)})`}${rel}0$, so the critical points are ${p} and ${q}.\n**Step 3 (test a number in each region):** left of ${p} the product is +, between ${p} and ${q} it is −, right of ${q} it is +.\n**Step 4 (keep the regions that make it ${relWord}):** ${outside ? 'the two outside regions' : 'the middle region'}.\n**Step 5 (brackets):** ${closed ? 'the endpoints make it equal 0, which is allowed, so use [ ]' : 'the endpoints are not allowed, so use ( )'}. ∞ always gets ( ).\n**Answer: ${plain(ans)}**`,
      '> 0 → outside the roots; < 0 → between. ≥ or ≤ → square brackets on the roots.')
  },
  compositeExpr(r) {
    const a = r.int(2, 4), b = r.pick([-5, -4, -3, -1, 1, 2, 3, 5]), c = r.pick([-4, -3, -2, 2, 3, 5])
    const fg = quad(a, 0, a * c + b), gf = quad(a * a, 2 * a * b, b * b + c)
    if (new Set([fg, gf, quad(a, 0, c + b), quad(a, 0, b * c)]).size < 4) return GEN.compositeExpr(r)
    const which = r.pick(['fg', 'gf'] as const)
    const ans = `$${which === 'fg' ? fg : gf}$`
    return mk(r, `Let $f(x)=${lin(a, b)}$ and $g(x)=${quad(1, 0, c)}$. Find $${which === 'fg' ? 'f(g(x))' : 'g(f(x))'}$.`, ans, [`$${which === 'fg' ? gf : fg}$`, `$${quad(a, 0, c + b)}$`, `$${quad(a, 0, b * c)}$`],
      which === 'fg'
        ? `**Words:** $f(g(x))$ means put the WHOLE of $g(x)$ in place of x inside f.\n**Step 1:** $f(g(x))=${a}(${quad(1, 0, c)})${sgn(b)}$.\n**Step 2 (distribute ${a}):** $${a}x^2${sgn(a * c)}${sgn(b)}$.\n**Step 3 (combine the numbers):** $${fg}$.\n**Answer: ${fg}**`
        : `**Words:** $g(f(x))$ means put the WHOLE of $f(x)$ in place of x inside g.\n**Step 1:** $g(f(x))=(${lin(a, b)})^2${sgn(c)}$.\n**Step 2 (FOIL the square):** $(${lin(a, b)})(${lin(a, b)})=${quad(a * a, 2 * a * b, b * b)}$.\n**Step 3 (add ${c}):** $${gf}$.\n**Answer: ${gf}**`,
      'Replace x with the whole inner function, in brackets.')
  },
  inversePoint(r) {
    const a = r.pick([-4, -2, 1, 2, 3, 5]), b = r.pick([-3, -1, 4, 6, 7, 9])
    if (a === b || a === -b) return GEN.inversePoint(r)
    return mk(r, `The point $(${a},${b})$ is on the graph of $f$. Which point must be on the graph of $f^{-1}$ (the inverse)?`, `$(${b},${a})$`, [`$(${a},${b})$`, `$(${-a},${-b})$`, `$(${-b},${-a})$`],
      `**Words:** the **inverse** function undoes f, so it SWITCHES every x and y.\n**Step 1:** (x, y) = (${a}, ${b}).\n**Step 2 (switch them):** (${b}, ${a}).\n**Answer: (${b}, ${a})**`,
      'Inverse = switch x and y.')
  },
  ratHole(r) {
    const vals = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
    const a = r.pick(vals), b = r.pick(vals), c = r.pick(vals)
    if (a === b || a === c || b === c) return GEN.ratHole(r)
    const top = quad(1, -(a + b), a * b), bot = quad(1, -(a + c), a * c)
    const ask = r.pick(['hole', 'va'] as const)
    const ans = ask === 'hole' ? `$x=${a}$` : `$x=${c}$`
    if (new Set([a, b, c, -(ask === 'hole' ? a : c)]).size < 4) return GEN.ratHole(r)
    return mk(r, `For $f(x)=\\dfrac{${top}}{${bot}}$, where is the ${ask === 'hole' ? 'hole' : 'vertical asymptote'}?`, ans, [ask === 'hole' ? `$x=${c}$` : `$x=${a}$`, `$x=${b}$`, `$x=${-(ask === 'hole' ? a : c)}$`],
      `**Words:** a **hole** is where a factor CANCELS from top and bottom. A **vertical asymptote** is where a factor stays on the bottom after cancelling.\n**Step 1 (factor the top):** ${top} = (x${sgn(-a)})(x${sgn(-b)}).\n**Step 2 (factor the bottom):** ${bot} = (x${sgn(-a)})(x${sgn(-c)}).\n**Step 3 (cancel the shared factor (x${sgn(-a)})):** that gives the hole at x = ${a}.\n**Step 4 (what is left on the bottom, (x${sgn(-c)})):** vertical asymptote at x = ${c}.\n**Answer: ${plain(ans)}**`,
      'Cancelled factor → hole. Factor left on the bottom → vertical asymptote.')
  },
  slantAsym(r) {
    const A = r.int(1, 3), B = r.int(-4, 4), C = r.int(-5, 6), d = r.pick([-3, -2, -1, 1, 2, 3])
    const m0 = B + A * d, rem = C + d * m0
    if (rem === 0 || m0 === B - A * d || m0 === (B === 0 ? 1 : B)) return GEN.slantAsym(r)
    const ans = `$y=${lin(A, m0)}$`
    if (new Set([ans, `$y=${lin(A, B - A * d)}$`, `$y=${lin(A, B === 0 ? 1 : B)}$`]).size < 3) return GEN.slantAsym(r)
    return mk(r, `Find the slant (oblique) asymptote of $f(x)=\\dfrac{${quad(A, B, C)}}{${lin(1, -d)}}$.`, ans, [`$y=${lin(A, B - A * d)}$`, `$y=${lin(A, B === 0 ? 1 : B)}$`, 'There is no slant asymptote'],
      `**Words:** when the top's degree is exactly ONE more than the bottom's, there is a **slant asymptote**: a slanted line the graph approaches. Find it with long division and IGNORE the remainder.\n**Step 1 (divide the first terms):** ${A === 1 ? '' : A}x² ÷ x = ${coef(A, 'x')}.\n**Step 2 (multiply back and subtract):** ${coef(A, 'x')}(${lin(1, -d)}) = ${quad(A, -A * d, 0)}; subtracting leaves ${lin(m0, C)}.\n**Step 3 (divide again):** ${m0}x ÷ x = ${m0}. The remainder is ${rem}, which we ignore.\n**Step 4 (the quotient is the asymptote):** y = ${lin(A, m0)}.\n**Answer: y = ${lin(A, m0)}**`,
      'Top degree = bottom degree + 1 → slant asymptote = the quotient (drop the remainder).')
  },
  ratShift(r) {
    const p = r.pick([-5, -4, -3, -2, 2, 3, 4, 6]), k = r.pick([-6, -3, -1, 1, 2, 5, 7])
    if (p === k) return GEN.ratShift(r)
    const ask = r.pick(['domain', 'range'] as const)
    const iv = (n: number) => `$(-\\infty,${n})\\cup(${n},\\infty)$`
    const ans = ask === 'domain' ? iv(p) : iv(k)
    return mk(r, `What is the ${ask} of $y=\\dfrac{1}{${lin(1, -p)}}${sgn(k)}$?`, ans, [ask === 'domain' ? iv(k) : iv(p), iv(-p === k ? 0 : -p), '$(-\\infty,\\infty)$'],
      `**Words:** the **domain** is every x allowed, the **range** is every y the graph reaches. Remove the vertical asymptote from the domain and the horizontal asymptote from the range.\n**Step 1 (vertical asymptote, bottom = 0):** x ${p > 0 ? '−' : '+'} ${Math.abs(p)} = 0, so x = ${p}.\n**Step 2 (horizontal asymptote):** 1/(x ${p > 0 ? '−' : '+'} ${Math.abs(p)}) goes to 0, then the ${sgn(k)} shifts it, so y = ${k}.\n**Step 3 (${ask}):** all real numbers except ${ask === 'domain' ? p : k}.\n**Answer: ${plain(ans)}**`,
      'Domain: remove the vertical asymptote. Range: remove the horizontal asymptote.')
  },
  expEqTwoBase(r) {
    const base = r.pick([2, 3]), k = r.pick([2, 3]), m2 = r.pick([1, 2]), m1 = r.int(1, 5), x = r.int(-4, 6), n2 = r.int(-4, 4)
    if (m1 === k * m2) return GEN.expEqTwoBase(r)
    const n1 = k * (m2 * x + n2) - m1 * x
    const big = base ** k
    return mk(r, `Solve for $x$: $${base}^{${lin(m1, n1)}}=${big}^{${lin(m2, n2)}}$`, `${x}`, [`${x + 1}`, `${-x}`, `${x + 2}`],
      `**Words:** to solve an **exponential equation**, write both sides with the SAME base, then set the exponents equal.\n**Step 1 (write ${big} as a power of ${base}):** ${big} = ${base}^${k}.\n**Step 2 (power to a power: multiply the exponents):** ${big}^(${lin(m2, n2)}) = ${base}^(${k}(${lin(m2, n2)})) = ${base}^(${lin(k * m2, k * n2)}).\n**Step 3 (same base, so exponents are equal):** ${lin(m1, n1)} = ${lin(k * m2, k * n2)}.\n**Step 4 (solve):** ${n1} − (${k * n2}) = ${k * m2}x − ${m1}x, so ${n1 - k * n2} = ${k * m2 - m1}x, x = ${x}.\n**Answer: ${x}**`,
      'Rewrite both sides with the same base, then exponents are equal.')
  },
  expLn(r) {
    if (r.pick([true, false])) {
      const n = r.pick([2, 3, 5, 6, 7, 10])
      return mk(r, `Solve for $x$: $e^x=${n}$`, `$x=\\ln ${n}$`, [`$x=\\log ${n}$`, `$x=e^{${n}}$`, `$x=\\dfrac{${n}}{e}$`],
        `**Words:** **ln** is the natural log, the log with base e. It undoes e.\n**Step 1 (take ln of both sides):** ln(eˣ) = ln ${n}.\n**Step 2 (move the exponent to the front):** x · ln e = ln ${n}, and ln e = 1.\n**Step 3:** x = ln ${n} (about ${Math.log(n).toFixed(4)}).\n**Answer: x = ln ${n}**`,
        'Base e → use ln. ln e = 1.')
    }
    const [a, n] = r.pick([[3, 8], [2, 5], [2, 7], [3, 10], [5, 12], [4, 9], [2, 11]])
    return mk(r, `Solve for $x$: $${a}^x=${n}$`, `$x=\\dfrac{\\log ${n}}{\\log ${a}}$`, [`$x=\\dfrac{\\log ${a}}{\\log ${n}}$`, `$x=\\log ${n}-\\log ${a}$`, `$x=\\dfrac{${n}}{${a}}$`],
      `**Words:** ${n} is not a whole power of ${a}, so take the **log** of both sides.\n**Step 1 (log both sides):** log(${a}ˣ) = log ${n}.\n**Step 2 (power rule: move x to the front):** x · log ${a} = log ${n}.\n**Step 3 (divide by log ${a}):** x = log ${n} / log ${a} (about ${(Math.log(n) / Math.log(a)).toFixed(4)}).\n**Answer: x = log ${n} / log ${a}**`,
      'Cannot match the bases? Take the log of both sides and bring the exponent down.')
  },
  logRules(r) {
    const kind = r.pick(['power', 'product', 'quotient'] as const)
    const [b, maxE] = r.pick([[2, 7], [3, 4], [4, 4], [5, 3]])
    if (kind === 'power') {
      const i = r.int(1, Math.min(3, maxE)), m = r.int(2, 6)
      return mk(r, `Evaluate $\\log_{${b}}\\left(${b ** i}^{${m}}\\right)$.`, `${i * m}`, [`${i + m}`, `${b ** i * m}`, `${i}`],
        `**Words:** the **power rule** says $\\log(A^n)=n\\log A$: the exponent moves to the front.\n**Step 1 (power rule):** ${m} · log_${b}(${b ** i}).\n**Step 2 (${b} to what power is ${b ** i}?):** ${b}^${i} = ${b ** i}, so log_${b}(${b ** i}) = ${i}.\n**Step 3 (multiply):** ${m} × ${i} = ${i * m}.\n**Answer: ${i * m}**`,
        'Exponent inside a log → move it to the front.')
    }
    const i = r.int(2, maxE), j = r.int(1, maxE)
    if (kind === 'quotient' && i <= j) return GEN.logRules(r)
    const v = kind === 'product' ? i + j : i - j
    return mk(r, `Evaluate $\\log_{${b}}${kind === 'product' ? `(${b ** i}\\times${b ** j})` : `\\dfrac{${b ** i}}{${b ** j}}`}$.`, `${v}`, [`${kind === 'product' ? i * j : i + j}`, `${kind === 'product' ? b ** i * b ** j : b ** i / b ** j}`, `${v + 1}`],
      `**Words:** the **${kind} rule** says $\\log(AB)=\\log A+\\log B$ and $\\log\\frac AB=\\log A-\\log B$.\n**Step 1 (split):** log_${b}(${b ** i}) ${kind === 'product' ? '+' : '−'} log_${b}(${b ** j}).\n**Step 2 (each log):** ${b}^${i} = ${b ** i} gives ${i}; ${b}^${j} = ${b ** j} gives ${j}.\n**Step 3:** ${i} ${kind === 'product' ? '+' : '−'} ${j} = ${v}.\n**Answer: ${v}**`,
      'Times → add the logs. Divide → subtract the logs.')
  },
  logEqForms(r) {
    const [b, k] = r.pick([[2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [3, 4], [4, 3], [5, 2], [5, 3], [10, 2], [6, 2], [7, 2]])
    const N = b ** k
    const kind = r.pick(['x', 'base', 'arg'] as const)
    if (kind === 'x') return mk(r, `Solve: $\\log_{${b}}${N}=x$`, `${k}`, [`${N / b}`, `${b * k + 1}`, `${k + 1}`],
      `**Words:** $\\log_bN=x$ means $b^x=N$ (exponential form).\n**Step 1 (rewrite):** ${b}ˣ = ${N}.\n**Step 2:** ${b}^${k} = ${N}.\n**Answer: ${k}**`, 'log form → exponential form: base^answer = number.')
    if (kind === 'base') return mk(r, `Solve: $\\log_{x}${N}=${k}$`, `${b}`, [`${b * k}`, `${N}`, `${b + 1}`],
      `**Step 1 (exponential form):** x^${k} = ${N}.\n**Step 2 (take the ${k === 2 ? 'square' : k === 3 ? 'cube' : k + 'th'} root):** x = ${b}, because ${b}^${k} = ${N}.\n**Answer: ${b}**`, 'log form → exponential form, then take the root.')
    return mk(r, `Solve: $\\log_{${b}}x=${k}$`, `${N}`, [`${b * k}`, `${k ** b}`, `${N / b}`],
      `**Step 1 (exponential form):** x = ${b}^${k}.\n**Step 2:** ${b}^${k} = ${N}.\n**Answer: ${N}**`, 'log_b x = k → x = b^k.')
  },
  logEqSame(r) {
    const b = r.pick([2, 3, 5, 7]), x = r.int(1, 9), a1 = r.int(2, 7), a2 = r.int(2, 7), c1 = r.int(-3, 9)
    if (a1 === a2) return GEN.logEqSame(r)
    const c2 = a1 * x + c1 - a2 * x
    if (a1 * x + c1 <= 0) return GEN.logEqSame(r)
    return mk(r, `Solve: $\\log_{${b}}(${lin(a1, c1)})=\\log_{${b}}(${lin(a2, c2)})$`, `${x}`, [`${x + 1}`, `${-x}`, `${b}`],
      `**Words:** if two logs with the SAME base are equal, the insides must be equal.\n**Step 1 (set the insides equal):** ${lin(a1, c1)} = ${lin(a2, c2)}.\n**Step 2 (x-terms on one side):** ${a1}x − ${a2}x = ${c2} − (${c1}), so ${a1 - a2}x = ${c2 - c1}.\n**Step 3 (divide):** x = ${x}.\n**Check (the inside must be positive):** ${a1}(${x}) + (${c1}) = ${a1 * x + c1} > 0 ✓\n**Answer: ${x}**`,
      'Same base on both sides → drop the logs and set the insides equal.')
  },
  logEqSum(r) {
    const [b, x, k, n] = r.pick([[2, 2, 2, 3], [2, 2, 6, 4], [2, 4, 4, 5], [2, 1, 7, 3], [3, 3, 6, 3], [3, 1, 8, 2], [2, 4, 12, 6], [2, 8, 8, 7]])
    const bad = -(x + k)
    return mk(r, `Solve: $\\log_{${b}}x+\\log_{${b}}(x+${k})=${n}$`, `$x=${x}$`, [`$x=${x}$ or $x=${bad}$`, `$x=${bad}$`, `$x=${b ** n}$`],
      `**Words:** the **product rule** joins two logs: $\\log A+\\log B=\\log(AB)$. An **extraneous** answer is one that comes out of the algebra but does not work in the original (you can never take the log of a negative number).\n**Step 1 (join the logs):** log_${b}(x(x + ${k})) = ${n}.\n**Step 2 (exponential form):** x(x + ${k}) = ${b}^${n} = ${b ** n}.\n**Step 3 (quadratic):** x² + ${k}x − ${b ** n} = 0, so (x − ${x})(x + ${x + k}) = 0, giving x = ${x} or x = ${bad}.\n**Step 4 (check):** x = ${bad} would put a negative number inside a log, so it is extraneous.\n**Answer: x = ${x}**`,
      'Join the logs, solve, then THROW AWAY answers that make a log of a negative.')
  },
  simpleIntSolve(r) {
    const P = r.pick([2000, 3000, 4000, 5000, 8000, 10000, 25000]), rate = r.int(2, 9), t = r.int(2, 9)
    const I = (P * rate * t) / 100
    const peso = (n: number) => `₱${n.toLocaleString('en-US')}`
    const kind = r.pick(['t', 'r', 'total'] as const)
    if (kind === 't') return mk(r, `${peso(P)} is invested at ${rate}% simple interest per year. How many years will it take to earn ${peso(I)} in interest?`, `${t} years`, [`${t + 1} years`, `${t - 1} years`, `${t * 2} years`],
      `**Words:** **simple interest** uses $I=Prt$ (P = principal, r = rate as a decimal, t = years).\n**Step 1 (rate as a decimal):** ${rate}% = ${rate / 100}.\n**Step 2 (substitute):** ${I} = ${P} × ${rate / 100} × t = ${(P * rate) / 100}t.\n**Step 3 (divide):** t = ${I} ÷ ${(P * rate) / 100} = ${t}.\n**Answer: ${t} years**`, 'I = Prt. Divide to undo the multiplying.')
    if (kind === 'r') return mk(r, `${peso(P)} earns ${peso(I)} in simple interest in ${t} years. What is the annual interest rate?`, `${rate}%`, [`${rate + 1}%`, `${rate * t}%`, `${rate / 10}%`],
      `**Step 1 (I = Prt):** ${I} = ${P} × r × ${t} = ${P * t}r.\n**Step 2 (divide):** r = ${I} ÷ ${P * t} = ${rate / 100}.\n**Step 3 (decimal to percent, × 100):** ${rate}%.\n**Answer: ${rate}%**`, 'Solve for r, then multiply by 100 to get a percent.')
    return mk(r, `${peso(P)} is invested at ${rate}% simple interest for ${t} years. What is the total value of the account at the end?`, peso(P + I), [peso(I), peso(P + 2 * I), peso(P)],
      `**Words:** the **total** (future value) is the principal PLUS the interest.\n**Step 1 (interest, I = Prt):** ${P} × ${rate / 100} × ${t} = ${I}.\n**Step 2 (add the principal):** ${P} + ${I} = ${P + I}.\n**Answer: ${peso(P + I)}**`, 'Total = principal + interest.')
  },
  compIntN(r) {
    const P = r.pick([1000, 5000, 10000]), rate = r.pick([4, 6, 8, 10, 12]), [n, word] = r.pick([[2, 'semi-annually'], [4, 'quarterly'], [12, 'monthly']] as [number, string][]), t = r.int(2, 20)
    const dec = rate / 100
    const ans = `$${P}\\left(1+\\dfrac{${dec}}{${n}}\\right)^{${n * t}}$`
    return mk(r, `₱${P.toLocaleString('en-US')} is invested at ${rate}% interest compounded ${word} for ${t} years. Which expression gives the final amount?`, ans,
      [`$${P}\\left(1+\\dfrac{${dec}}{${n}}\\right)^{${t}}$`, `$${P}\\left(1+${dec}\\right)^{${n * t}}$`, `$${P}\\left(1+\\dfrac{${rate}}{${n}}\\right)^{${n * t}}$`],
      `**Words:** the **compound interest** formula is $A=P\\left(1+\\frac rn\\right)^{nt}$. n is how many times per year interest is added: ${word} means n = ${n}.\n**Step 1 (P, r as a decimal, n, t):** P = ${P}, r = ${dec}, n = ${n}, t = ${t}.\n**Step 2 (exponent nt):** ${n} × ${t} = ${n * t}.\n**Step 3 (put them in):** ${P}(1 + ${dec}/${n})^${n * t}.\n**Answer: ${P}(1 + ${dec}/${n})^${n * t}**`,
      'Annually n = 1, semi-annually 2, quarterly 4, monthly 12. Exponent = n × t.')
  },
  rule72(r) {
    const rate = r.pick([2, 3, 4, 6, 8, 9, 12, 18])
    const t = 72 / rate
    return mk(r, `Using the Rule of 72, about how many years does it take money to double at ${rate}% interest per year?`, `${t} years`, [`${t * 2} years`, `${Math.round(100 / rate)} years`, `${rate * 2} years`],
      `**Words:** the **Rule of 72** estimates doubling time: years ≈ 72 ÷ (the rate as a percent, NOT a decimal).\n**Step 1:** 72 ÷ ${rate}.\n**Step 2:** = ${t}.\n**Answer: about ${t} years**`,
      'Doubling time ≈ 72 ÷ rate%.')
  },
  annuityType(r) {
    const bank: [string, string, string[], string][] = [
      ['In an ORDINARY annuity, the deposits are made:', 'at the END of each period', ['at the BEGINNING of each period', 'only once, at the start', 'only once, at the end'], 'Ordinary annuity: you deposit at the END of each period, after interest is credited.'],
      ['In an annuity DUE, the deposits are made:', 'at the BEGINNING of each period', ['at the END of each period', 'only once, at the start', 'only once, at the end'], 'Annuity due: you deposit at the BEGINNING of each period, so every deposit earns one extra interest payment.'],
      ['Same deposit, same rate, same number of years. Which has the bigger future value?', 'the annuity due', ['the ordinary annuity', 'they are always equal', 'it depends on the deposit'], 'In an annuity due each deposit is made earlier, so it gets one more interest payment. Its future value is bigger.'],
      ['Which formula gives the future value of an ORDINARY annuity (deposit C each period, rate r, n periods)?', '$C\\cdot\\dfrac{(1+r)^n-1}{r}$', ['$C\\cdot\\dfrac{(1+r)^n-1}{r}\\cdot(1+r)$', '$C(1+r)^n$', '$C\\cdot n\\cdot r$'], 'The ordinary annuity formula is C × ((1 + r)ⁿ − 1) / r. The annuity due formula is the same times an extra (1 + r).'],
    ]
    const [q, a, w, why] = r.pick(bank)
    return mk(r, q, a, w, `**Words:** an **annuity** is a series of equal deposits made every period.\n**Step 1:** ${why}\n**Answer: ${plain(a)}**`, 'Ordinary = End. Due = beginning (and worth more).')
  },
  logicParts(r) {
    const bank = [['you live in Los Angeles', 'you live in California'], ['I am hungry', 'I will eat pizza'], ['it rains', 'the street is wet'], ['a number is divisible by 4', 'it is even']]
    const [p, q] = r.pick(bank)
    const kind = r.pick(['hyp', 'con', 'same', 'conv'] as const)
    const st = `If ${p}, then ${q}.`
    if (kind === 'hyp' || kind === 'con')
      return mk(r, `In “${st}”, what is the ${kind === 'hyp' ? 'hypothesis' : 'conclusion'}?`, kind === 'hyp' ? p : q, [kind === 'hyp' ? q : p, `not ${p}`, `${p} and ${q}`],
        `**Words:** in “If p, then q”, the **hypothesis** p is the part after “if”, and the **conclusion** q is the part after “then”.\n**Step 1:** after “if”: “${p}”. After “then”: “${q}”.\n**Answer: ${kind === 'hyp' ? p : q}**`, 'If = hypothesis, then = conclusion.')
    if (kind === 'same')
      return mk(r, `The statement “${st}” is true. Which statement must ALSO be true?`, 'its contrapositive', ['its converse', 'its inverse', 'none of them'],
        `**Words:** the **contrapositive** (switch AND negate) always has the same truth value as the original statement.\n**Step 1:** the converse and inverse can be false even when the original is true.\n**Answer: its contrapositive**`, 'Original ↔ contrapositive always match. Converse ↔ inverse always match.')
    return mk(r, `Which statement ALWAYS has the same truth value as the converse?`, 'the inverse', ['the original statement', 'the contrapositive', 'the negation of the converse'],
      `**Step 1:** the inverse is the contrapositive of the converse, so the two always match.\n**Answer: the inverse**`, 'Converse and inverse are a matching pair.')
  },
  discValue(r) {
    const a = r.pick([1, 1, 2, 3]), b = r.int(-7, 7), c = r.int(-8, 9)
    const D = b * b - 4 * a * c
    return mk(r, `What is the discriminant of $${quad(a, b, c)}=0$?`, `${D}`, [`${b * b + 4 * a * c}`, `${b - 4 * a * c}`, `${-D}`],
      `**Words:** the **discriminant** is $b^2-4ac$ for $ax^2+bx+c=0$.\n**Step 1 (read a, b, c):** a = ${a}, b = ${b}, c = ${c}.\n**Step 2 (b²):** (${b})² = ${b * b}.\n**Step 3 (4ac):** 4 × ${a} × (${c}) = ${4 * a * c}.\n**Step 4 (subtract):** ${b * b} − (${4 * a * c}) = ${D}.\n**Answer: ${D}**`,
      'Square b first (always positive), THEN subtract 4ac.')
  },
  quadFormulaA(r) {
    const p = r.pick([1, 2, 3]), rr = r.pick([2, 3]), q = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), s = r.pick([-5, -3, -2, -1, 1, 2, 3, 4])
    if (gcd(p, q) !== 1 || gcd(rr, s) !== 1 || q * rr === s * p || q * rr === -s * p) return GEN.quadFormulaA(r)
    const a = p * rr, b = -(p * s + q * rr), c = q * s
    const rt = Math.abs(p * s - q * rr), D = rt * rt
    const v1 = q / p, v2 = s / rr
    const [lo, hi] = v1 < v2 ? [frac(q, p), frac(s, rr)] : [frac(s, rr), frac(q, p)]
    const pair = (x: string, y: string) => `$x=${x}$ or $x=${y}$`
    const ans = pair(lo, hi)
    const key = (a: number, b: number) => [a, b].sort((x, y) => x - y).map(z => z.toFixed(6)).join()
    const show = (n1: number, d1: number, n2: number, d2: number) => (n1 / d1 < n2 / d2 ? pair(frac(n1, d1), frac(n2, d2)) : pair(frac(n2, d2), frac(n1, d1)))
    const cand: [number, number, number, number][] = [[-q, p, -s, rr], [q, p, -s, rr], [-q, p, s, rr], [q, 1, s, 1], [q + p, p, s, rr], [q, p, s + rr, rr]]
    const w: string[] = []
    for (const [n1, d1, n2, d2] of cand) if (n1 * d2 !== n2 * d1 && key(n1 / d1, n2 / d2) !== key(v1, v2)) { const t = show(n1, d1, n2, d2); if (!w.includes(t)) w.push(t) }
    return mk(r, `Use the quadratic formula to solve $${quad(a, b, c)}=0$.`, ans, w,
      `**Words:** for $ax^2+bx+c=0$ the **quadratic formula** is $x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.\n**Step 1 (read a, b, c):** a = ${a}, b = ${b}, c = ${c}.\n**Step 2 (the part under the root, b² − 4ac):** (${b})² − 4(${a})(${c}) = ${b * b} − (${4 * a * c}) = ${D}.\n**Step 3 (square root):** √${D} = ${rt}.\n**Step 4 (with +):** (${-b} + ${rt}) ÷ ${2 * a} = ${frac(-b + rt, 2 * a).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Step 5 (with −):** (${-b} − ${rt}) ÷ ${2 * a} = ${frac(-b - rt, 2 * a).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Answer: ${plain(ans)}**`,
      'Divide by 2a, the WHOLE top. Then reduce the fraction.')
  },
  arithMid(r) {
    const a1 = r.int(-5, 12), d = r.pick([-4, -3, -2, 2, 3, 4, 5, 6])
    const t = (n: number) => a1 + (n - 1) * d
    if (r.pick([true, false])) {
      const m = r.int(2, 5), k = m + r.int(3, 6)
      return mk(r, `In an arithmetic sequence, $a_{${m}}=${t(m)}$ and the common difference is $${d}$. Find $a_{${k}}$.`, `${t(k)}`, [`${t(m) + k * d}`, `${t(k) + d}`, `${t(m) + (k - m + 1) * d}`],
        `**Words:** an **arithmetic sequence** adds the same **common difference** d each step. To jump from term m to term k, add d exactly (k − m) times: $a_k=a_m+(k-m)d$.\n**Step 1 (how many steps):** ${k} − ${m} = ${k - m}.\n**Step 2 (add that many d's):** ${t(m)} + ${k - m}(${d}) = ${t(m)} + (${(k - m) * d}) = ${t(k)}.\n**Answer: ${t(k)}**`,
        'From term m to term k: add (k − m) common differences.')
    }
    const m = r.int(1, 4), k = m + 2 * r.int(2, 4), mid = (m + k) / 2
    return mk(r, `In an arithmetic sequence, $a_{${m}}=${t(m)}$ and $a_{${k}}=${t(k)}$. Find $a_{${mid}}$.`, `${t(mid)}`, [`${t(m) + t(k)}`, `${t(mid) + d}`, `${t(k) - t(m)}`],
      `**Words:** the **arithmetic mean** is the average. In an arithmetic sequence, the term exactly in the middle of two terms is their average.\n**Step 1 (the middle position):** (${m} + ${k}) ÷ 2 = ${mid}.\n**Step 2 (average the two terms):** (${t(m)} + ${t(k)}) ÷ 2 = ${t(m) + t(k)} ÷ 2 = ${t(mid)}.\n**Answer: ${t(mid)}**`,
      'Middle term = average of the two outer terms.')
  },
  sigmaSum(r) {
    const a = r.int(1, 4), b = r.int(-3, 5), k = r.int(4, 6)
    const terms = Array.from({ length: k }, (_, i) => a * (i + 1) + b)
    const S = terms.reduce((x, y) => x + y, 0)
    const body = `${a === 1 ? '' : a}n${b === 0 ? '' : sgn(b)}`
    return mk(r, `Evaluate $\\displaystyle\\sum_{n=1}^{${k}}(${body})$.`, `${S}`, [`${S - terms[0]}`, `${terms[k - 1]}`, `${S + a}`],
      `**Words:** **Σ (sigma)** means “add up”. Put n = 1, 2, 3, … up to ${k} into ${body}, then add the results.\n**Step 1 (write out the terms):** ${terms.join(', ')}.\n**Step 2 (add them):** ${terms.join(' + ')} = ${S}.\n**Check (partial sum formula, (first + last) ÷ 2 × number of terms):** (${terms[0]} + ${terms[k - 1]}) ÷ 2 × ${k} = ${S} ✓\n**Answer: ${S}**`,
      'Write the terms out, then add. Or (first + last)/2 × how many.')
  },
  geoFinite(r) {
    const a1 = r.int(1, 5), q = r.pick([2, 3]), n = r.int(4, q === 2 ? 7 : 5)
    const S = (a1 * (q ** n - 1)) / (q - 1)
    const terms = Array.from({ length: n }, (_, i) => a1 * q ** i)
    return mk(r, `Find the sum of the first ${n} terms of the geometric series ${terms.slice(0, 3).join(' + ')} + …`, `${S}`, [`${terms[n - 1]}`, `${a1 * q ** n}`, `${S + a1}`],
      `**Words:** a **geometric series** multiplies by the same **common ratio** r each time. The sum of the first n terms is $S_n=\\dfrac{a_1(1-r^n)}{1-r}$.\n**Step 1 (a₁ and r):** a₁ = ${a1}, r = ${terms[1]} ÷ ${terms[0]} = ${q}.\n**Step 2 (rⁿ):** ${q}^${n} = ${q ** n}.\n**Step 3 (formula):** ${a1}(1 − ${q ** n}) ÷ (1 − ${q}) = ${a1 * (1 - q ** n)} ÷ ${1 - q} = ${S}.\n**Check (add them):** ${terms.join(' + ')} = ${S} ✓\n**Answer: ${S}**`,
      'Finite geometric sum: a₁(1 − rⁿ)/(1 − r).')
  },
  geoMean(r) {
    const x = r.int(1, 6), q = r.int(2, 4)
    const a = x, b = x * q * q, gm = x * q
    return mk(r, `What is the geometric mean of ${a} and ${b}?`, `${gm}`, [`${(a + b) / 2}`, `${a * b}`, `${gm + 1}`],
      `**Words:** the **geometric mean** of two numbers is $\\sqrt{ab}$. In a geometric sequence it is the term halfway between them.\n**Step 1 (multiply):** ${a} × ${b} = ${a * b}.\n**Step 2 (square root):** √${a * b} = ${gm}.\n**Answer: ${gm}**`,
      'Geometric mean = √(a × b). Arithmetic mean = (a + b)/2.')
  },
  geoConverge(r) {
    const [num, den, mult] = r.pick([[1, 2, 4], [1, 3, 9], [-1, 2, 4], [2, 3, 9], [2, 1, 1], [3, 1, 1], [3, 2, 4]] as [number, number, number][])
    const a1 = mult * r.int(1, 4)
    const t2 = (a1 * num) / den, t3 = (a1 * num * num) / (den * den)
    const conv = Math.abs(num) < den
    const sumVal = (a1 * den) / (den - num)
    const sumStr = frac(a1 * den, den - num)
    const div = 'It diverges (no finite sum)'
    const ans = conv ? `$${sumStr}$` : div
    return mk(r, `Does the infinite geometric series $${a1}${t2 < 0 ? '' : '+'}${t2}${t3 < 0 ? '' : '+'}${t3}+\\cdots$ converge? If it does, what is its sum?`, ans,
      conv ? [div, `$${frac(a1 * den, den + num)}$`, `$${2 * a1}$`, `$${a1 * den}$`, `$${frac(a1 * den, den - num) === `${a1}` ? a1 + 1 : a1}$`] : [`$${sumStr}$`, `$${2 * a1}$`, `$${a1 + t2 + t3}$`],
      `**Words:** an infinite geometric series **converges** (has a finite sum) only when the common ratio r is between −1 and 1, that is |r| < 1. Then the sum is $S=\\dfrac{a_1}{1-r}$. If |r| ≥ 1 it **diverges**.\n**Step 1 (common ratio):** r = ${t2} ÷ ${a1} = ${frac(num, den).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Step 2 (check |r| < 1):** ${conv ? 'yes, so it converges' : `no, |r| ≥ 1, so it diverges (the formula would give ${sumVal}, which is nonsense)`}.\n${conv ? `**Step 3 (sum):** ${a1} ÷ (1 − (${frac(num, den).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')})) = ${sumStr.replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n` : ''}**Answer: ${plain(ans)}**`,
      'Infinite sum only works if |r| < 1. Then S = a₁/(1 − r).')
  },
  seqClassify(r) {
    const kind = r.pick(['arith', 'geo', 'neither'] as const)
    let list: number[] = []
    if (kind === 'arith') { const a = r.int(-5, 10), d = r.pick([-4, -3, 2, 3, 5, 7]); list = [0, 1, 2, 3, 4].map(i => a + i * d) }
    else if (kind === 'geo') { const a = r.int(1, 5), q = r.pick([-2, 2, 3, 4]); list = [0, 1, 2, 3, 4].map(i => a * q ** i) }
    else { const s = r.int(1, 3); list = [0, 1, 2, 3, 4].map(i => (i + s) ** 2) }
    const ans = kind === 'arith' ? 'Arithmetic' : kind === 'geo' ? 'Geometric' : 'Neither'
    return mk(r, `Is the sequence ${list.join(', ')}, … arithmetic, geometric, or neither?`, ans, ['Arithmetic', 'Geometric', 'Neither', 'Both'],
      `**Words:** **arithmetic** = the same number is ADDED each time (common difference). **Geometric** = the same number MULTIPLIES each time (common ratio).\n**Step 1 (differences):** ${list.slice(1).map((v, i) => v - list[i]).join(', ')}.\n**Step 2 (ratios):** ${list.slice(1).map((v, i) => frac(v, list[i]).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')).join(', ')}.\n**Step 3:** ${kind === 'arith' ? 'the differences are all equal' : kind === 'geo' ? 'the ratios are all equal' : 'neither the differences nor the ratios are equal'}.\n**Answer: ${ans}**`,
      'Check differences first, then ratios.')
  },
  factorNeg(r) {
    const vals = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
    const p = r.pick(vals), q = r.pick(vals)
    if (p === q || p === -q || (p > 0 && q > 0)) return GEN.factorNeg(r)
    const f = (m: number, n: number) => { const [x, y] = m < n ? [m, n] : [n, m]; return `$(x${sgn(x)})(x${sgn(y)})$` }
    const ans = f(p, q)
    return mk(r, `Factor: $${quad(1, p + q, p * q)}$`, ans, [f(-p, -q), f(p, -q), f(-p, q)],
      `**Words:** to **factor** $x^2+bx+c$, find two numbers that MULTIPLY to c and ADD to b. Watch the signs.\n**Step 1 (what we need):** product ${p * q}, sum ${p + q}.\n**Step 2 (signs):** ${p * q < 0 ? 'the product is negative, so one number is + and one is −' : 'the product is positive and the sum is negative, so both numbers are −'}.\n**Step 3 (the numbers):** ${p} and ${q}, because ${p} × ${q} = ${p * q} and ${p} + ${q} = ${p + q}.\n**Step 4 (write the brackets):** ${plain(ans)}.\n**Answer: ${plain(ans)}**`,
      'Product = c, sum = b. Negative product → opposite signs.')
  },
  factorA(r) {
    const p = r.pick([1, 2, 3]), rr = r.pick([2, 3]), q = r.pick([-5, -3, -2, -1, 1, 2, 3, 5]), s = r.pick([-4, -3, -1, 1, 2, 3, 5])
    if (gcd(p, q) !== 1 || gcd(rr, s) !== 1) return GEN.factorA(r)
    const exp = (a: number, b: number, c: number, d: number) => [a * c, a * d + b * c, b * d].join(',')
    const target = exp(p, q, rr, s)
    const cands: [number, number, number, number][] = [[p, s, rr, q], [p, -q, rr, -s], [p, -q, rr, s], [p, q, rr, -s]]
    const w = cands.filter(c => exp(...c) !== target).map(([a, b, c, d]) => `$(${lin(a, b)})(${lin(c, d)})$`)
    if (w.length < 3) return GEN.factorA(r)
    const A = p * rr, B = p * s + q * rr, C = q * s
    if (B === 0) return GEN.factorA(r)
    const ans = `$(${lin(p, q)})(${lin(rr, s)})$`
    return mk(r, `Factor: $${quad(A, B, C)}$`, ans, w,
      `**Words:** when the number in front of x² is not 1, use the **AC method**: multiply a × c, find two numbers that multiply to it and add to b, split the middle term, then **factor by grouping**.\n**Step 1 (a × c):** ${A} × ${C} = ${A * C}.\n**Step 2 (two numbers, product ${A * C}, sum ${B}):** ${p * s} and ${q * rr}.\n**Step 3 (split the middle term):** ${quad(A, 0, 0)} ${p * s < 0 ? '−' : '+'} ${Math.abs(p * s)}x ${q * rr < 0 ? '−' : '+'} ${Math.abs(q * rr)}x ${C < 0 ? '−' : '+'} ${Math.abs(C)}.\n**Step 4 (group and take out the GCF of each pair):** the common bracket is (${lin(rr, s)}).\n**Step 5:** ${plain(ans)}.\n**Check (FOIL):** gives ${quad(A, B, C)} ✓\n**Answer: ${plain(ans)}**`,
      'AC method: a × c, find the pair, split the middle, group.')
  },
  factorGroup(r) {
    const c = r.pick([1, 2, 3]), d = r.pick([1, 2, 3, 5, 7, -2, -3, -5, -7]), a = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    if (Math.abs(a) === Math.abs(d) || gcd(c, Math.abs(d)) !== 1) return GEN.factorGroup(r)
    const terms = [[c, 3], [c * a, 2], [d, 1], [d * a, 0]] as [number, number][]
    const poly = terms.map(([k, e], i) => {
      const v = e === 0 ? `${Math.abs(k)}` : coef(Math.abs(k), e === 1 ? 'x' : `x^${e}`)
      return i === 0 ? (k < 0 ? '-' : '') + v : (k < 0 ? '-' : '+') + v
    }).join('')
    const sq = (k: number) => `${coef(c, 'x^2')}${sgn(k)}`
    const ans = `$(${sq(d)})(${lin(1, a)})$`
    return mk(r, `Factor by grouping: $${poly}$`, ans, [`$(${sq(-d)})(${lin(1, a)})$`, `$(${sq(d)})(${lin(1, -a)})$`, `$(${sq(a)})(${lin(1, d)})$`],
      `**Words:** **factoring by grouping** works on 4 terms: split them into two pairs, take the GCF out of each pair, then take out the bracket they share.\n**Step 1 (first pair):** ${coef(c, 'x^3')} ${c * a < 0 ? '−' : '+'} ${coef(Math.abs(c * a), 'x^2')} = ${coef(c, 'x^2')}(${lin(1, a)}).\n**Step 2 (second pair):** ${coef(d, 'x')} ${d * a < 0 ? '−' : '+'} ${Math.abs(d * a)} = ${d}(${lin(1, a)}).\n**Step 3 (take out the shared bracket (${lin(1, a)})):** (${sq(d)})(${lin(1, a)}).\n**Answer: ${plain(ans)}**`,
      'Two pairs → GCF of each → the brackets must match → pull the bracket out.')
  },
  factorGcfTri(r) {
    const g = r.pick([2, 3, 4, 5]), vals = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]
    const p = r.pick(vals), q = r.pick(vals)
    if (p === q || p === -q) return GEN.factorGcfTri(r)
    const [x, y] = p < q ? [p, q] : [q, p]
    const ans = `$${g}(x${sgn(x)})(x${sgn(y)})$`
    return mk(r, `Factor completely: $${quad(g, g * (p + q), g * p * q)}$`, ans, [`$(x${sgn(x)})(x${sgn(y)})$`, `$${g}(x${sgn(-y)})(x${sgn(-x)})$`, `$${g}(x${sgn(x)})(x${sgn(-y)})$`],
      `**Words:** **factor completely** means take out the GCF FIRST, then factor what is left.\n**Step 1 (GCF of ${g}, ${g * (p + q)}, ${g * p * q}):** ${g}. So it becomes ${g}(${quad(1, p + q, p * q)}).\n**Step 2 (factor the trinomial: product ${p * q}, sum ${p + q}):** ${x} and ${y}.\n**Step 3:** ${g}(x${sgn(x)})(x${sgn(y)}).\n**Answer: ${plain(ans)}**`,
      'GCF first, then factor the trinomial. Keep the GCF in front.')
  },
  synthDiv(r) {
    const c0 = r.pick([-3, -2, -1, 1, 2, 3]), b1 = r.int(-4, 5), b0 = r.int(-6, 6), R = r.pick([0, 0, 1, 2, -3, 4])
    // dividend = (x − c0)(x² + b1 x + b0) + R
    const A2 = b1 - c0, A1 = b0 - c0 * b1, A0 = -c0 * b0 + R
    const cubic = `x^3${A2 === 0 ? '' : A2 > 0 ? '+' + coef(A2, 'x^2') : '-' + coef(-A2, 'x^2')}${A1 === 0 ? '' : A1 > 0 ? '+' + coef(A1, 'x') : '-' + coef(-A1, 'x')}${A0 === 0 ? '' : sgn(A0)}`
    const qt = quad(1, b1, b0)
    const show = (q: string, rem: number) => `quotient $${q}$, remainder ${rem}`
    const ans = show(qt, R)
    const w = [show(quad(1, b1, b0 + 1), R), show(quad(1, -b1, b0), R), show(qt, R + 2), show(quad(1, b1 + 2 * c0, b0), R)].filter(s => s !== ans)
    return mk(r, `Use synthetic division to divide $${cubic}$ by $(x${sgn(-c0)})$. What are the quotient and the remainder?`, ans, w,
      `**Words:** **synthetic division** divides a polynomial by $(x-c)$ using only the coefficients. The last number is the **remainder**; the other numbers are the coefficients of the **quotient** (one power lower).\n**Step 1 (c and the coefficients, put 0 for any missing term):** c = ${c0} (from x ${c0 > 0 ? '−' : '+'} ${Math.abs(c0)}, switch the sign); coefficients 1, ${A2}, ${A1}, ${A0}.\n**Step 2 (bring down the 1):** 1.\n**Step 3 (multiply by ${c0}, add):** ${A2} + ${c0} = ${b1}.\n**Step 4 (multiply by ${c0}, add):** ${A1} + (${c0 * b1}) = ${b0}.\n**Step 5 (multiply by ${c0}, add, this is the remainder):** ${A0} + (${c0 * b0}) = ${R}.\n**Step 6 (read the quotient):** 1, ${b1}, ${b0} means ${qt}.${R === 0 ? ` The remainder is 0, so (x${sgn(-c0)}) IS a factor and x = ${c0} is a zero.` : ''}\n**Answer: quotient ${qt}, remainder ${R}**`,
      'Switch the sign of c. Bring down, multiply, add, repeat. Remainder 0 means it is a factor.')
  },
  lineGraph(r) {
    const run = r.int(1, 4), rise = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]), b = r.int(-4, 4)
    const x2 = run * (Math.abs(b + 2 * rise) <= 6 && 2 * run <= 6 ? 2 : 1), y2 = b + (rise * x2) / run
    if (Math.abs(y2) > 6 || gcd(Math.abs(rise), run) !== 1) return GEN.lineGraph(r)
    const sl = (n: number, d: number) => (d === 1 ? coef(n, 'x') : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}x`)
    const eq = (n: number, d: number, bb: number) => `$y=${sl(n, d)}${bb === 0 ? '' : sgn(bb)}$`
    const ans = eq(rise, run, b)
    const w = [eq(-rise, run, b), eq(rise, run, -b === b ? b + 1 : -b), Math.abs(rise) === 1 && run === 1 ? eq(2 * rise, 1, b) : eq(run * Math.sign(rise), Math.abs(rise), b)]
    const q = mk(r, `Write the equation of the line shown in the graph, in slope-intercept form. (The two marked points sit exactly on grid corners.)`, ans, w,
      `**Words:** **slope-intercept form** is $y=mx+b$. The **y-intercept** b is where the line crosses the y-axis. The **slope** m is rise ÷ run.\n**Step 1 (y-intercept, read where the line crosses the y-axis):** (0, ${b}), so b = ${b}.\n**Step 2 (rise and run between the marked points (0, ${b}) and (${x2}, ${y2})):** rise = ${y2} − (${b}) = ${y2 - b}, run = ${x2} − 0 = ${x2}.\n**Step 3 (slope):** ${y2 - b} ÷ ${x2} = ${run === 1 ? rise : `${rise}/${run}`}.\n**Step 4 (put m and b into y = mx + b):** ${plain(ans)}.\n**Answer: ${plain(ans)}**`,
      'Read b where the line hits the y-axis, then count rise over run.')
    return { ...q, fig: `line:0,${b},${x2},${y2}` }
  },
  slopeGraph(r) {
    const run = r.int(1, 5), rise = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), x1 = r.int(-5, 0), y1 = r.int(-3, 3)
    const x2 = x1 + run, y2 = y1 + rise
    if (Math.abs(y2) > 6 || x2 > 6 || Math.abs(rise) === run) return GEN.slopeGraph(r)
    const ans = `$${frac(rise, run)}$`
    const q = mk(r, `What is the slope of the line shown in the graph? (The two marked points sit exactly on grid corners.)`, ans, [`$${frac(run, rise)}$`, `$${frac(-rise, run)}$`, `$${frac(rise, run + 1)}$`],
      `**Words:** **slope** = rise ÷ run. Count how far you go up or down (rise) and how far right (run) from one marked point to the other.\n**Step 1 (the points):** (${x1}, ${y1}) and (${x2}, ${y2}).\n**Step 2 (rise, moving left to right):** ${rise > 0 ? 'up' : 'down'} ${Math.abs(rise)}, so rise = ${rise}.\n**Step 3 (run):** right ${run}.\n**Step 4 (slope):** ${rise} ÷ ${run} = ${frac(rise, run).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Check (formula):** (${y2} − (${y1})) ÷ (${x2} − (${x1})) = ${rise}/${run} ✓\n**Answer: ${plain(ans)}**`,
      'Line goes DOWN from left to right → negative slope.')
    return { ...q, fig: `line:${x1},${y1},${x2},${y2}` }
  },
  parPerp(r) {
    const [n, d] = r.pick([[2, 3], [3, 4], [-2, 5], [4, 3], [-3, 2], [5, 2], [2, 1], [-3, 1], [1, 4], [-1, 3]] as [number, number][])
    const kind = r.pick(['par', 'perp', 'neither'] as const)
    const sl = (a: number, b: number) => { const g = gcd(a, b); a /= g; b /= g; if (b < 0) { a = -a; b = -b } return b === 1 ? coef(a, 'x') : `${a < 0 ? '-' : ''}\\frac{${Math.abs(a)}}{${b}}x` }
    const b1 = r.int(-5, 5), b2 = r.pick([-6, -4, -1, 2, 3, 7].filter(v => v !== b1))
    const [n2, d2] = kind === 'par' ? [n, d] : kind === 'perp' ? [-d, n] : [d, n]
    const eq = (a: number, b: number, c: number) => `y=${sl(a, b)}${c === 0 ? '' : sgn(c)}`
    const ans = kind === 'par' ? 'Parallel' : kind === 'perp' ? 'Perpendicular' : 'Neither'
    const txt = (a: number, b: number) => { const g = gcd(a, b); a /= g; b /= g; if (b < 0) { a = -a; b = -b } return b === 1 ? `${a}` : `${a}/${b}` }
    return mk(r, `Are the lines $${eq(n, d, b1)}$ and $${eq(n2, d2, b2)}$ parallel, perpendicular, or neither?`, ans, ['Parallel', 'Perpendicular', 'Neither', 'They are the same line'],
      `**Words:** **parallel** lines have the SAME slope. **Perpendicular** lines (they meet at a 90° angle) have slopes that are **negative reciprocals**: flip the fraction AND change the sign.\n**Step 1 (slopes, the number in front of x):** ${txt(n, d)} and ${txt(n2, d2)}.\n**Step 2 (same?):** ${kind === 'par' ? 'yes, so they are parallel' : 'no'}.\n${kind === 'par' ? '' : `**Step 3 (negative reciprocal of ${txt(n, d)}):** ${txt(-d, n)}, ${kind === 'perp' ? 'which matches, so they are perpendicular' : `which does not match ${txt(n2, d2)}, so neither`}.\n`}**Answer: ${ans}**`,
      'Same slope → parallel. Flip and change sign → perpendicular.')
  },
  perpSlope(r) {
    const [n, d] = r.pick([[2, 3], [3, 4], [-2, 5], [4, 3], [-3, 2], [5, 2], [2, 1], [-3, 1], [-4, 1], [1, 4], [-1, 3]] as [number, number][])
    const kind = r.pick(['parallel', 'perpendicular'] as const), b = r.int(-6, 6)
    const m = `$${frac(n, d)}$`, perp = `$${frac(-d, n)}$`
    const ans = kind === 'parallel' ? m : perp
    const sl = d === 1 ? coef(n, 'x') : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}x`
    return mk(r, `What is the slope of a line ${kind} to $y=${sl}${b === 0 ? '' : sgn(b)}$?`, ans, [m, perp, `$${frac(-n, d)}$`, `$${frac(d, n)}$`],
      `**Words:** **parallel** lines have the SAME slope. **Perpendicular** slopes are **negative reciprocals**: flip the fraction and change the sign.\n**Step 1 (slope of the given line, the number in front of x):** ${frac(n, d).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Step 2:** ${kind === 'parallel' ? 'parallel → keep the same slope' : `perpendicular → flip it to ${frac(d, n).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}, then change the sign`}.\n**Answer: ${plain(ans).replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '$1/$2')}**`,
      'Perpendicular: flip and change the sign. Parallel: same slope.')
  },
  sysCount(r) {
    const a = r.int(1, 4), b = r.pick([-3, -2, -1, 1, 2, 3, 4]), c = r.int(-8, 12), k = r.pick([2, 3, -2])
    const kind = r.pick(['one', 'none', 'many'] as const)
    let a2 = k * a, b2 = k * b, c2 = k * c
    if (kind === 'none') c2 = k * c + r.pick([-3, -1, 2, 5])
    if (kind === 'one') b2 = k * b + r.pick([-2, 1, 3])
    if (b2 === 0) return GEN.sysCount(r)
    const eq = (x: number, y: number, z: number) => `${coef(x, 'x')}${y > 0 ? '+' : '-'}${coef(Math.abs(y), 'y')}=${z}`
    const ans = kind === 'one' ? 'Exactly one solution' : kind === 'none' ? 'No solution' : 'Infinitely many solutions'
    const L = -k
    return mk(r, `How many solutions does the system $${eq(a, b, c)}$ and $${eq(a2, b2, c2)}$ have?`, ans, ['Exactly one solution', 'No solution', 'Infinitely many solutions', 'Exactly two solutions'],
      `**Words:** solve by elimination. If you end with x = a number → **one solution**. If you end with a FALSE statement like 0 = 5 → **no solution** (inconsistent). If you end with a TRUE statement like 0 = 0 → **infinitely many solutions** (dependent).\n**Step 1 (multiply the first equation by ${L} so the x-terms cancel):** $${eq(L * a, L * b, L * c)}$.\n**Step 2 (add it to the second equation):** ${kind === 'one' ? `the y-terms leave ${b2 + L * b}y = ${c2 + L * c}, so y has one value` : `everything with x and y cancels, leaving 0 = ${c2 + L * c}`}.\n**Step 3:** ${kind === 'one' ? 'one value of y (and then of x)' : kind === 'none' ? `0 = ${c2 + L * c} is false` : '0 = 0 is always true'}.\n**Answer: ${ans}**`,
      '0 = 0 → infinitely many. 0 = 5 → none. x = number → one.')
  },
  polyClass(r) {
    const n = r.int(2, 4), exps = [4, 3, 2, 1, 0, 5]
    const used = r.shuffle(exps).slice(0, n)
    const terms = used.map(e => [r.pick([-9, -7, -5, -3, -2, 2, 3, 4, 6, 8]), e] as [number, number])
    const show = terms.map(([c, e], i) => { const v = e === 0 ? `${Math.abs(c)}` : coef(Math.abs(c), e === 1 ? 'x' : `x^${e}`); return i === 0 ? (c < 0 ? '-' : '') + v : (c < 0 ? '-' : '+') + v }).join('')
    const top = terms.reduce((x, y) => (y[1] > x[1] ? y : x))
    const kind = r.pick(['degree', 'lead', 'name'] as const)
    if (kind === 'name') {
      const nm = ['', 'monomial', 'binomial', 'trinomial', 'polynomial (4 terms)'][n]
      return mk(r, `How do you classify $${show}$ by its number of terms?`, nm, ['monomial', 'binomial', 'trinomial', 'polynomial (4 terms)'],
        `**Words:** a **term** is a piece separated by + or −. 1 term = monomial, 2 = binomial, 3 = trinomial, more = polynomial.\n**Step 1 (count the terms):** ${n}.\n**Answer: ${nm}**`, 'Mono 1, bi 2, tri 3, poly = many.')
    }
    if (kind === 'degree') return mk(r, `What is the degree of $${show}$?`, `${top[1]}`, [`${n}`, `${terms[0][1] === top[1] ? top[1] + 1 : terms[0][1]}`, `${Math.abs(top[0])}`],
      `**Words:** the **degree** of a polynomial is the HIGHEST exponent of x (not the first one written).\n**Step 1 (exponents):** ${terms.map(t => t[1]).join(', ')}.\n**Step 2 (highest):** ${top[1]}.\n**Answer: ${top[1]}**`, 'Degree = biggest exponent, wherever it is written.')
    return mk(r, `What is the leading coefficient of $${show}$?`, `${top[0]}`, [`${terms[0][0] === top[0] ? -top[0] : terms[0][0]}`, `${top[1]}`, `${-top[0]}`],
      `**Words:** the **leading term** is the term with the highest exponent; its number is the **leading coefficient**.\n**Step 1 (highest exponent):** ${top[1]}.\n**Step 2 (that term):** ${top[0]}x^${top[1]}, so the leading coefficient is ${top[0]}.\n**Answer: ${top[0]}**`, 'Leading term = highest power, even if it is written last.')
  },
  polyAddSub(r) {
    const a1 = r.int(2, 9), b1 = r.int(-8, 8), c1 = r.int(-9, 9), a2 = r.int(1, 7), b2 = r.int(-8, 8), c2 = r.int(-9, 9)
    const sub = r.pick([true, false])
    if ((sub && a1 === a2) || b2 === 0 || c2 === 0) return GEN.polyAddSub(r)
    const A = sub ? a1 - a2 : a1 + a2, B = sub ? b1 - b2 : b1 + b2, C = sub ? c1 - c2 : c1 + c2
    const ans = `$${pstr([A, B, C])}$`
    const w = sub ? [`$${pstr([A, b1 + b2, c1 + c2])}$`, `$${pstr([a1 + a2, B, C])}$`, `$${pstr([A, B, -C])}$`, `$${pstr([A, B + 1, C])}$`, `$${pstr([A, B, C + 2])}$`] : [`$${pstr([A, b1 - b2, C])}$`, `$${pstr([A, B, c1 - c2])}$`, `$${pstr([A, B + 1, C])}$`, `$${pstr([A, B, C + 2])}$`]
    return mk(r, `${sub ? 'Subtract' : 'Add'}: $(${pstr([a1, b1, c1])})${sub ? '-' : '+'}(${pstr([a2, b2, c2])})$`, ans, w,
      `**Words:** **like terms** have the same power of x. You can only combine like terms.\n${sub ? `**Step 1 (distribute the minus sign: change the sign of EVERY term in the second bracket):** $${pstr([a1, b1, c1])}${pstr([-a2, -b2, -c2]).startsWith('-') ? '' : '+'}${pstr([-a2, -b2, -c2])}$.\n` : '**Step 1 (remove the brackets):** nothing changes sign when adding.\n'}**Step 2 (x² terms):** ${a1} ${sub ? '−' : '+'} ${a2} = ${A}.\n**Step 3 (x terms):** ${b1} ${sub ? '−' : '+'} (${b2}) = ${B}.\n**Step 4 (numbers):** ${c1} ${sub ? '−' : '+'} (${c2}) = ${C}.\n**Answer: ${plain(ans)}**`,
      'Subtracting a bracket flips EVERY sign inside it.')
  },
  polyMul(r) {
    const sq = r.pick([true, false])
    const p = r.int(1, 4), q = r.pick([-6, -5, -3, -2, -1, 1, 2, 3, 4, 5])
    const [rr, s] = sq ? [p, q] : [r.int(1, 3), r.pick([-5, -4, -2, -1, 1, 3, 4, 6])]
    const A = p * rr, B = p * s + q * rr, C = q * s
    if (B === 0) return GEN.polyMul(r)
    const ans = `$${pstr([A, B, C])}$`
    return mk(r, sq ? `Expand: $(${lin(p, q)})^2$` : `Multiply: $(${lin(p, q)})(${lin(rr, s)})$`, ans, [`$${pstr([A, 0, C])}$`, `$${pstr([A, -B, C])}$`, `$${pstr([A, B, -C])}$`],
      `**Words:** use **FOIL**: First, Outer, Inner, Last. ${sq ? `A square means the bracket times itself: $(${lin(p, q)})(${lin(p, q)})$.` : ''}\n**Step 1 (First):** ${coef(p, 'x')} × ${coef(rr, 'x')} = ${coef(A, 'x²')}.\n**Step 2 (Outer):** ${coef(p, 'x')} × (${s}) = ${coef(p * s, 'x')}.\n**Step 3 (Inner):** (${q}) × ${coef(rr, 'x')} = ${coef(q * rr, 'x')}.\n**Step 4 (Last):** (${q}) × (${s}) = ${C}.\n**Step 5 (combine the middle terms):** ${p * s} + (${q * rr}) = ${B}.\n**Answer: ${plain(ans)}**`,
      '(a + b)² is NOT a² + b²: there is always a middle term 2ab.')
  },
  quadFactorSolve(r) {
    const key = (a: number, b: number) => [a, b].sort((x, y) => x - y).map(z => z.toFixed(5)).join()
    if (r.pick([true, false])) {
      const a = r.pick([1, 1, 2, 3]), k = r.int(2, 9)
      if (gcd(a, k) !== 1) return GEN.quadFactorSolve(r)
      const v = frac(k, a), ans = `$x=-${v}$ or $x=${v}$`
      return mk(r, `Solve by factoring: $${a * a === 1 ? '' : a * a}x^2-${k * k}=0$`, ans, [`$x=${v}$ only`, `$x=-${frac(k * k, a * a)}$ or $x=${frac(k * k, a * a)}$`, `$x=-${frac(a, k)}$ or $x=${frac(a, k)}$`],
        `**Words:** this is a **difference of squares**, $A^2-B^2=(A-B)(A+B)$. Then set each bracket equal to 0 (if a product is 0, one of the factors must be 0).\n**Step 1 (factor):** (${coef(a, 'x')} − ${k})(${coef(a, 'x')} + ${k}) = 0.\n**Step 2 (each bracket = 0):** ${coef(a, 'x')} = ${k} or ${coef(a, 'x')} = −${k}.\n**Step 3:** x = ${v.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')} or x = −${v.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')}.\n**Answer: ${plain(ans).replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '$1/$2')}**`,
        'x² − k² = 0 → x = ±k.')
    }
    const vals = [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]
    const p = r.pick(vals), q = r.pick(vals)
    if (p === q || p === -q) return GEN.quadFactorSolve(r)
    const [lo, hi] = p < q ? [p, q] : [q, p]
    const pair = (x: number, y: number) => `$x=${Math.min(x, y)}$ or $x=${Math.max(x, y)}$`
    const w: string[] = []
    for (const [x, y] of [[-lo, -hi], [lo, -hi], [-lo, hi], [lo + 1, hi]]) if (x !== y && key(x, y) !== key(lo, hi) && !w.includes(pair(x, y))) w.push(pair(x, y))
    return mk(r, `Solve by factoring: $${quad(1, -(p + q), p * q)}=0$`, pair(lo, hi), w,
      `**Words:** factor, then use the **zero product rule**: if two brackets multiply to 0, one of them is 0.\n**Step 1 (two numbers, product ${p * q}, sum ${-(p + q)}):** ${-p} and ${-q}.\n**Step 2 (factor):** (x${sgn(-p)})(x${sgn(-q)}) = 0.\n**Step 3 (each bracket = 0):** x = ${p} or x = ${q}.\n**Answer: x = ${lo} or x = ${hi}**`,
      'The answers have the OPPOSITE signs of the numbers in the brackets.')
  },
  maxMinWord(r) {
    if (r.pick([true, false])) {
      const a = r.pick([1, 2, 5]), X = r.pick([10, 15, 20, 25, 30, 40]), c = r.pick([100, 200, 300, 500])
      const b = 2 * a * X, top = c + a * X * X
      const ask = r.pick(['units', 'profit'] as const)
      const ans = ask === 'units' ? `${X}` : `${top}`
      return mk(r, `A company's profit is $P=-${a === 1 ? '' : a}x^2+${b}x+${c}$, where x is the number of units sold. ${ask === 'units' ? 'How many units give the MAXIMUM profit?' : 'What is the MAXIMUM profit?'}`, ans, ask === 'units' ? [`${b}`, `${2 * X}`, `${top}`] : [`${X}`, `${top - c}`, `${c + b * X}`],
        `**Words:** the graph is a parabola that opens DOWN (the x² number is negative), so its highest point, the **vertex**, gives the maximum. x of the vertex $=-\\dfrac{b}{2a}$.\n**Step 1 (a and b):** a = −${a}, b = ${b}.\n**Step 2 (x of the vertex):** −${b} ÷ (2 × −${a}) = ${X} units.\n${ask === 'profit' ? `**Step 3 (put x = ${X} back in):** −${a}(${X})² + ${b}(${X}) + ${c} = ${-a * X * X} + ${b * X} + ${c} = ${top}.\n` : ''}**Answer: ${ans}**`,
        'Max/min word problem → find the vertex. x = −b/(2a) answers “how many”; plug it in for “how much”.')
    }
    const v = r.pick([10, 20, 30, 40]), h0 = r.pick([0, 5, 20, 45, 100]), t = v / 10, H = h0 + (v * v) / 20
    const ask = r.pick(['time', 'height'] as const)
    const ans = ask === 'time' ? `${t} s` : `${H} m`
    return mk(r, `A ball's height is $h=-5t^2+${v}t${h0 ? '+' + h0 : ''}$ (meters, t in seconds). ${ask === 'time' ? 'When does it reach its maximum height?' : 'What is its maximum height?'}`, ans, ask === 'time' ? [`${2 * t} s`, `${v / 5 + 1} s`, `${t + 1} s`] : [`${H + 5} m`, `${h0 + v} m`, `${(v * v) / 10 + h0} m`],
      `**Words:** height vs time is a downward parabola; the top is the **vertex**. Time of the top: $t=-\\dfrac{b}{2a}$.\n**Step 1 (a and b):** a = −5, b = ${v}.\n**Step 2 (time):** −${v} ÷ (2 × −5) = ${t} s.\n${ask === 'height' ? `**Step 3 (height at t = ${t}):** −5(${t})² + ${v}(${t})${h0 ? ' + ' + h0 : ''} = ${-5 * t * t} + ${v * t}${h0 ? ' + ' + h0 : ''} = ${H} m.\n` : ''}**Answer: ${ans}**`,
      'Time of the max = −b/(2a). Max height = plug that time back in.')
  },
  funcOps(r) {
    const a = r.int(2, 5), b = r.pick([-5, -3, -1, 1, 2, 4, 5]), c = r.pick([-6, -4, -1, 3, 7])
    const kind = r.pick(['sum', 'diff', 'prod', 'eval'] as const)
    const f = lin(a, b), g = quad(1, 0, c)
    if (kind === 'eval') {
      const m = r.int(-2, 3), n = r.int(-2, 3), v = a * m + b + n * n + c
      return mk(r, `Let $f(x)=${f}$ and $g(x)=${g}$. Find $f(${m})+g(${n})$.`, `${v}`, [`${a * m + b}`, `${v - 2 * c}`, `${a * n + b + m * m + c}`],
        `**Step 1 (f(${m})):** ${a}(${m}) + (${b}) = ${a * m + b}.\n**Step 2 (g(${n})):** (${n})² + (${c}) = ${n * n + c}.\n**Step 3 (add):** ${a * m + b} + (${n * n + c}) = ${v}.\n**Answer: ${v}**`, 'Find each value first, then do the operation.')
    }
    const sum = pstr([1, a, b + c]), diff = pstr([-1, a, b - c]), prod = pstr([a, b, a * c, b * c])
    const ans = `$${kind === 'sum' ? sum : kind === 'diff' ? diff : prod}$`
    const w = kind === 'sum' ? [`$${pstr([1, a, b - c])}$`, `$${pstr([a, 1, b + c])}$`, `$${prod}$`] : kind === 'diff' ? [`$${pstr([-1, a, b + c])}$`, `$${pstr([1, a, b - c])}$`, `$${pstr([-1, -a, b - c])}$`] : [`$${pstr([a, b, 0, b * c])}$`, `$${sum}$`, `$${pstr([a, b, -a * c, b * c])}$`]
    return mk(r, `Let $f(x)=${f}$ and $g(x)=${g}$. Find $${kind === 'sum' ? '(f+g)(x)' : kind === 'diff' ? '(f-g)(x)' : '(f\\cdot g)(x)'}$.`, ans, w,
      `**Words:** $(f${kind === 'sum' ? '+' : kind === 'diff' ? '-' : '\\cdot '}g)(x)$ means ${kind === 'sum' ? 'add' : kind === 'diff' ? 'subtract' : 'multiply'} the two formulas.\n**Step 1:** (${f}) ${kind === 'sum' ? '+' : kind === 'diff' ? '−' : '×'} (${g}).\n${kind === 'diff' ? `**Step 2 (the minus changes EVERY sign in g):** ${f} − x² ${c > 0 ? '−' : '+'} ${Math.abs(c)}.\n` : kind === 'prod' ? `**Step 2 (distribute each term of f):** ${coef(a, 'x')}·x² + ${coef(a, 'x')}·(${c}) + (${b})·x² + (${b})(${c}).\n` : ''}**Step 3 (combine like terms, highest power first):** ${plain(ans)}.\n**Answer: ${plain(ans)}**`,
      'f − g: subtract the WHOLE of g, so every sign in g flips.')
  },
}

export const DRILL_KINDS = Object.keys(GEN)
/** Tidy the worked solution: 1x → x, −1x → −x, a + -b → a − b. */
const tidy = (e: string) =>
  e.replace(/(^|[^\d.\w^])([-−]?)1x(?![\d])/g, '$1$2x').replace(/ \+ -(\d)/g, ' − $1')

export function mathDrill(r: Rng, kind?: string): Question {
  const q = GEN[kind ?? r.pick(DRILL_KINDS)](r)
  return { ...q, e: tidy(q.e) }
}
