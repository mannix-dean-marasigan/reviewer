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
    return mk(r, `Solve for $x$: $${a}x + ${b} = ${c}$`, `${x}`, [`${x + 1}`, `${x - 1}`, `${(c + b) / a}`, `${-x}`].map(String),
      `**Idea:** an equation is a balance. Whatever you do to one side you must do to the other. We want x alone.\n**Step 1 (subtract ${b} from both sides):** $${a}x=${c - b}$.\n**Step 2 (divide both sides by ${a}):** $x=${x}$.\n**Check:** ${a}(${x})+${b}=${c} ✓\n**Answer: ${x}**`,
      'Always plug your answer back in; it takes 5 seconds and catches sign errors.')
  },
  discriminant(r) {
    const a = r.pick([1, 2, 3]), b = r.int(-7, 7), c = r.int(-6, 6)
    const D = b * b - 4 * a * c
    const ans = D > 0 ? 'Two different real roots' : D === 0 ? 'One repeated real root' : 'No real roots'
    return mk(r, `How many real roots does $${a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0$ have?`, ans,
      ['Two different real roots', 'One repeated real root', 'No real roots', 'Cannot be determined'],
      `**Words:** the **discriminant** $D=b^2-4ac$ tells how many real roots a quadratic has: $D>0$ → two, $D=0$ → one, $D<0$ → none.\n**Step 1 (read a, b, c):** $a=${a}$, $b=${b}$, $c=${c}$.\n**Step 2 (substitute):** $D=(${b})^2-4(${a})(${c})=${b * b}-(${4 * a * c})=${D}$.\n**Step 3:** ${D > 0 ? 'D is positive, so there are two different real roots.' : D === 0 ? 'D is zero, so there is exactly one (repeated) real root.' : 'D is negative, so there are no real roots.'}\n**Answer: ${ans}**`,
      'D > 0: 2 roots, D = 0: 1 root, D < 0: none. No need to solve the equation.')
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
    const eq = `x^2${B === 0 ? '' : B > 0 ? `+${B}x` : `${B}x`}${C > 0 ? `+${C}` : C}=0`
    return mk(r, `Solve $${eq}$. What is the larger root?`, `${a}`,
      [`${b}`, `${a + 1}`, `${-a}`, `${C}`].map(String),
      `**Words:** the **roots** of an equation are the x-values that make it true.\n**Step 1 (factor the left side):** find two numbers with product ${C} and sum ${B}. They are ${-a} and ${-b}.\n**Step 2 (write the brackets):** $(x${-a < 0 ? '-' : '+'}${Math.abs(a)})(x${-b < 0 ? '-' : '+'}${Math.abs(b)})=0$.\n**Step 3 (each bracket must be 0 for the product to be 0):** $x=${a}$ or $x=${b}$.\n**Step 4 (pick the larger):** ${a}.\n**Answer: ${a}**`,
      'Sum of roots = −b, product = c.')
  },
  segAdd(r) {
    const x = r.int(2, 9), a = r.int(2, 6), c = r.int(1, a - 1), b = r.int(1, 8)
    const d = (a - c) * x + b
    const pm = a * x + b
    return mk(r, `M is the midpoint of $\\overline{PQ}$. $PM=${a}x+${b}$ and $MQ=${c}x+${d}$. Find $PQ$.`, `${2 * pm}`,
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
}

export const DRILL_KINDS = Object.keys(GEN)
export function mathDrill(r: Rng, kind?: string): Question {
  return GEN[kind ?? r.pick(DRILL_KINDS)](r)
}
