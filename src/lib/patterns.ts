// Procedural abstract-reasoning puzzles (sequence, matrix, odd-one-out) + number/letter series.
import { Rng } from './rand'

export type ShapeName = 'tri' | 'sq' | 'circ' | 'diamond' | 'arrow' | 'L' | 'pent' | 'dot'
export interface Item { s: ShapeName; rot: number; fill: 0 | 1 | 2; sz: number; x: number; y: number; flip?: boolean }
export type Cell = Item[]

export interface Puzzle {
  kind: 'sequence' | 'matrix' | 'odd'
  stem: (Cell | null)[] // sequence: shown cells then null; matrix: 9 cells, last null; odd: 5 cells
  options: Cell[] // unused for odd (answer = index into stem)
  answer: number
  rule: string
  tip: string
}

type Fill = 0 | 1 | 2
const it = (s: ShapeName, o: Partial<Item> = {}): Item => ({ s, rot: 0, fill: 0, sz: 1, x: 0, y: 0, ...o })
const norm = (r: number) => ((r % 360) + 360) % 360
export const cellKey = (c: Cell) =>
  JSON.stringify(c.map(i => ({ ...i, rot: norm(i.rot), flip: !!i.flip, sz: Math.round(i.sz * 100) / 100 })).sort((a, b) => a.x - b.x || a.y - b.y))
const nf = (f: number): Fill => (((f % 3) + 3) % 3) as Fill

const FILLS = ['white', 'gray', 'black']
const ASYM: ShapeName[] = ['arrow', 'L']
const SHAPES: ShapeName[] = ['tri', 'sq', 'circ', 'diamond', 'pent']
const NAME: Record<string, string> = { tri: 'triangle', sq: 'square', circ: 'circle', diamond: 'diamond', pent: 'pentagon', arrow: 'arrow', L: 'L-shape', dot: 'dot' }

function dotsGrid(n: number, fill: Fill = 2): Cell {
  const spots: [number, number][] = [[-22, -22], [22, 22], [22, -22], [-22, 22], [0, 0], [0, -30], [0, 30], [-30, 0], [30, 0]]
  return spots.slice(0, n).map(([x, y]) => it('dot', { x, y, fill, sz: 1.3 }))
}

function finish(r: Rng, correct: Cell, wrong: Cell[]): { options: Cell[]; answer: number } {
  const w = [...wrong]
  while (w.length < 3) w.push([it('sq', { fill: 1, sz: 0.4 + w.length * 0.1 })])
  const answer = r.int(0, 3)
  const options = w.slice(0, 3)
  options.splice(answer, 0, correct)
  return { options, answer }
}

// ---- sequence puzzles --------------------------------------------------
type RuleKind = 'rotate' | 'fill' | 'size' | 'count' | 'shape' | 'move'

export function makeSequence(r: Rng, hard: boolean): Puzzle {
  const pool: RuleKind[] = ['rotate', 'fill', 'size', 'count', 'shape', 'move']
  const first = r.pick(pool)
  let second: RuleKind | null = null
  if (hard) {
    const compat: Record<RuleKind, RuleKind[]> = {
      rotate: ['fill', 'size'], fill: ['rotate', 'size', 'move', 'shape'], size: ['rotate', 'fill'],
      count: ['fill'], shape: ['fill'], move: ['fill'],
    }
    second = r.pick(compat[first])
  }
  const rules: RuleKind[] = second ? [first, second] : [first]
  const has = (k: RuleKind) => rules.includes(k)
  const baseShape: ShapeName = has('rotate') ? r.pick(ASYM) : r.pick(SHAPES)
  const step = r.pick([45, 90, -90, 135])
  const cyc = r.shuffle(SHAPES).slice(0, 3)
  const dir = r.pick([1, -1])
  const startFill = r.int(0, 2) as Fill
  const corners: [number, number][] = [[-26, -26], [26, -26], [26, 26], [-26, 26]]
  const startCorner = r.int(0, 3)

  const cellAt = (i: number): Cell => {
    if (has('count')) return dotsGrid(1 + (i % 5), has('fill') ? nf(startFill + i) : 2)
    let shape: ShapeName = baseShape
    if (has('shape')) shape = cyc[i % 3]
    const item = it(shape)
    if (has('rotate')) item.rot = step * i
    item.fill = has('fill') ? nf(startFill + i) : startFill === 1 ? 0 : startFill
    if (has('size')) item.sz = 0.5 + 0.18 * (i % 4)
    if (has('move')) {
      const [x, y] = corners[(((startCorner + dir * i) % 4) + 4) % 4]
      return [it('sq', { sz: 1.3 }), it('dot', { x, y, fill: item.fill === 0 ? 2 : item.fill, sz: 1.2 })]
    }
    return [item]
  }

  const stem: (Cell | null)[] = [cellAt(0), cellAt(1), cellAt(2), cellAt(3), null]
  const correct = cellAt(4)

  const mutate = (c: Cell): Cell => {
    const copy: Cell = c.map(x => ({ ...x }))
    const t = copy[copy.length - 1]
    const opts: (() => void)[] = []
    if (has('rotate')) opts.push(() => { t.rot += step }, () => { t.rot -= step }, () => { t.rot += 180 })
    if (has('fill')) opts.push(() => { t.fill = nf(t.fill + 1) }, () => { t.fill = nf(t.fill + 2) })
    if (has('size')) opts.push(() => { t.sz += 0.18 }, () => { t.sz = Math.max(0.4, t.sz - 0.2) })
    if (has('shape')) opts.push(() => { t.s = r.pick(SHAPES.filter(s => s !== t.s)) })
    if (has('count')) {
      opts.length = 0
      opts.push(() => {
        const n = Math.max(1, Math.min(9, copy.length + r.pick([-1, 1, 2])))
        copy.length = 0
        copy.push(...dotsGrid(n, c[0].fill))
      })
    }
    if (has('move')) {
      opts.length = 0
      opts.push(() => {
        const dot = copy[1]
        const [x, y] = r.pick(corners.filter(([cx, cy]) => cx !== dot.x || cy !== dot.y))
        dot.x = x; dot.y = y
      })
      opts.push(() => { copy[1].fill = nf(copy[1].fill + 1) })
    }
    r.pick(opts)()
    return copy
  }
  const seen = new Set([cellKey(correct)])
  const wrong: Cell[] = []
  let guard = 0
  while (wrong.length < 3 && guard++ < 300) {
    const m = mutate(correct)
    if (!seen.has(cellKey(m))) { seen.add(cellKey(m)); wrong.push(m) }
  }
  const { options, answer } = finish(r, correct, wrong)

  const parts: string[] = []
  if (has('rotate')) parts.push(`the ${NAME[baseShape]} turns ${Math.abs(step)}° ${step > 0 ? 'clockwise' : 'counter-clockwise'} each step`)
  if (has('fill')) parts.push(`the shading cycles ${FILLS[startFill]} → ${FILLS[nf(startFill + 1)]} → ${FILLS[nf(startFill + 2)]} and repeats`)
  if (has('size')) parts.push('the figure grows a little each step, then resets')
  if (has('count')) parts.push('one more dot is added each step')
  if (has('shape')) parts.push(`the shape cycles ${cyc.map(s => NAME[s]).join(' → ')}`)
  if (has('move')) parts.push(`the dot hops to the next corner ${dir > 0 ? 'clockwise' : 'counter-clockwise'}`)
  return {
    kind: 'sequence', stem, options, answer,
    rule: parts.join(', and '),
    tip: rules.length > 1
      ? 'Two things change at once: check ONE attribute at a time (shape, then turning, then shading) and cross out options that break it.'
      : 'Name the change in one phrase ("turns 90°", "one more dot"), then apply it one more time.',
  }
}

// ---- matrix puzzles ---------------------------------------------------
export function makeMatrix(r: Rng, hard: boolean): Puzzle {
  const mode = r.pick(hard ? ['latin2', 'progress', 'rotcol'] : ['latin', 'progress', 'rotcol'])
  const shapes = r.shuffle(SHAPES).slice(0, 3)
  const cells: Cell[] = []
  const fillBase = r.int(0, 2)
  let rule = ''
  let tip = 'Every row AND every column contains each ingredient exactly once. The missing cell is whatever is still missing.'
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (mode === 'latin') cells.push([it(shapes[(row + col) % 3], { fill: 1 })])
      else if (mode === 'latin2') cells.push([it(shapes[(row + col) % 3], { fill: nf(fillBase + row + 2 * col) })])
      else if (mode === 'progress') cells.push(dotsGrid(col + 1, nf(fillBase + row)))
      else cells.push([it('arrow', { rot: 90 * col, fill: nf(fillBase + row) })])
    }
  }
  if (mode === 'latin') rule = `each row and column holds the ${shapes.map(s => NAME[s]).join(', ')} once, so the missing cell is the ${NAME[shapes[(2 + 2) % 3]]}`
  if (mode === 'latin2') rule = 'shapes form a Latin square (each shape once per row and column) and the shading also follows a fixed pattern, so the missing cell takes the one shape and shading that is still missing'
  if (mode === 'progress') { rule = 'the number of dots grows 1, 2, 3 across each row, and the shading stays the same within a row'; tip = 'Read rows for what CHANGES (count) and what STAYS (shading). Rows and columns can play different roles.' }
  if (mode === 'rotcol') { rule = 'across each row the arrow turns 90° clockwise each step, and the shading stays the same within a row'; tip = 'When a figure is asymmetric (arrow, L), expect rotation. Follow the tip of the arrow.' }
  const correct = cells[8]
  const stem: (Cell | null)[] = [...cells.slice(0, 8), null]
  const seen = new Set([cellKey(correct)])
  const wrong: Cell[] = []
  let g = 0
  while (wrong.length < 3 && g++ < 300) {
    const c: Cell = correct.map(x => ({ ...x }))
    const t = c[0]
    const pick = r.int(0, 2)
    if (mode === 'progress') {
      const n = Math.max(1, Math.min(6, c.length + r.pick([-2, -1, 1])))
      c.length = 0
      c.push(...dotsGrid(n, pick === 0 ? nf(correct[0].fill + 1) : correct[0].fill))
    } else if (mode === 'rotcol') {
      if (pick === 0) t.rot += 90 * r.pick([1, 2]); else if (pick === 1) t.fill = nf(t.fill + 1); else t.rot += 180
    } else if (pick === 0) t.s = r.pick(shapes.filter(s => s !== t.s))
    else if (pick === 1) t.fill = nf(t.fill + 1)
    else t.s = r.pick(SHAPES.filter(s => s !== t.s))
    if (!seen.has(cellKey(c))) { seen.add(cellKey(c)); wrong.push(c) }
  }
  const { options, answer } = finish(r, correct, wrong)
  return { kind: 'matrix', stem, options, answer, rule, tip }
}

// ---- odd-one-out -------------------------------------------------------
export function makeOdd(r: Rng): Puzzle {
  const mode = r.pick(['mirror', 'count', 'fill', 'shape'])
  const cells: Cell[] = []
  const odd = r.int(0, 4)
  let rule = '', tip = ''
  if (mode === 'mirror') {
    const rots = r.shuffle([0, 90, 180, 270, 45, 135])
    for (let i = 0; i < 5; i++) cells.push([it('L', { rot: rots[i], flip: i === odd })])
    rule = 'four figures are the same L-shape just rotated, but one is a mirror image. Rotations can be matched by turning the paper; a mirror image never can.'
    tip = 'Mirror trap: rotating a shape never creates its mirror image. Pick the one you could NOT match by turning the page.'
  } else if (mode === 'count') {
    const n = r.int(2, 4)
    const f = r.pick([0, 2]) as Fill
    for (let i = 0; i < 5; i++) cells.push(dotsGrid(i === odd ? n + r.pick([-1, 1]) : n, f))
    rule = `four figures contain ${n} dots; one has a different number`
    tip = 'Count first. It is the quickest property to check, so test it before anything fancy.'
  } else if (mode === 'fill') {
    const s = r.pick(SHAPES), f = r.int(0, 2) as Fill
    for (let i = 0; i < 5; i++) cells.push([it(s, { fill: i === odd ? nf(f + 1) : f }), it('dot', { x: 28, y: -28, fill: 2 })])
    rule = `all figures are a ${NAME[s]} with a dot, but one is shaded differently`
    tip = 'Compare shading, size and position; the odd one usually differs in just ONE of them.'
  } else {
    const [a, b] = r.shuffle(SHAPES)
    for (let i = 0; i < 5; i++) cells.push([it(i === odd ? b : a, { fill: 1, sz: r.pick([0.8, 1, 1.1]) })])
    rule = `four figures are ${NAME[a]}s and one is a ${NAME[b]}, regardless of size`
    tip = 'Ignore size and position unless nothing else differs; look at the kind of shape.'
  }
  return { kind: 'odd', stem: cells, options: [], answer: odd, rule, tip }
}

export function makePuzzle(r: Rng, level: 'easy' | 'hard' = 'easy', kind?: Puzzle['kind']): Puzzle {
  const k = kind ?? r.pick(['sequence', 'sequence', 'matrix', 'odd'] as const)
  if (k === 'matrix') return makeMatrix(r, level === 'hard')
  if (k === 'odd') return makeOdd(r)
  return makeSequence(r, level === 'hard')
}

// ---- number / letter series -------------------------------------------
export interface Series { prompt: string; answer: number | string; options: (number | string)[]; rule: string; correctIndex: number }

export function makeNumberSeries(r: Rng, level: 1 | 2 | 3 = 1): Series {
  const kinds = level === 1 ? ['arith', 'geo', 'square'] : level === 2 ? ['arith', 'geo', 'square', 'alt', 'diffgrow', 'cube'] : ['alt', 'diffgrow', 'fib', 'altop', 'cube', 'sqplus']
  const kind = r.pick(kinds)
  let seq: number[] = []
  let rule = ''
  if (kind === 'arith') {
    const a = r.int(2, 30), d = r.pick([-7, -4, -3, 3, 4, 5, 6, 7, 9, 11])
    seq = Array.from({ length: 6 }, (_, i) => a + d * i)
    rule = `add ${d} each time (common difference ${d})`
  } else if (kind === 'geo') {
    const a = r.int(1, 5), q = r.pick([2, 3, -2, 4])
    seq = Array.from({ length: 6 }, (_, i) => a * q ** i)
    rule = `multiply by ${q} each time`
  } else if (kind === 'square') {
    const o = r.int(0, 4)
    seq = Array.from({ length: 6 }, (_, i) => (i + 1 + o) ** 2)
    rule = `perfect squares: ${[0, 1, 2].map(i => `${i + 1 + o}²`).join(', ')}, …`
  } else if (kind === 'cube') {
    const o = r.int(0, 2)
    seq = Array.from({ length: 6 }, (_, i) => (i + 1 + o) ** 3)
    rule = `perfect cubes: ${[0, 1, 2].map(i => `${i + 1 + o}³`).join(', ')}, …`
  } else if (kind === 'sqplus') {
    const k = r.pick([1, -1, 2, 3])
    seq = Array.from({ length: 6 }, (_, i) => (i + 1) ** 2 + k)
    rule = `n² ${k > 0 ? '+' : '−'} ${Math.abs(k)} for n = 1, 2, 3, …`
  } else if (kind === 'alt') {
    const a = r.int(1, 9), d = r.int(2, 5), b = r.int(20, 40), e = r.pick([-3, -2, 4, 5])
    seq = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? a + d * (i / 2) : b + e * ((i - 1) / 2)))
    rule = `two series woven together: positions 1, 3, 5 go up by ${d}; positions 2, 4, 6 change by ${e}`
  } else if (kind === 'diffgrow') {
    const a = r.int(1, 10), d0 = r.int(1, 3), inc = r.pick([1, 2, 3])
    seq = [a]
    let d = d0
    for (let i = 1; i < 6; i++) { seq.push(seq[i - 1] + d); d += inc }
    rule = `the DIFFERENCES grow: +${d0}, +${d0 + inc}, +${d0 + 2 * inc}, … (the gap itself goes up by ${inc})`
  } else if (kind === 'fib') {
    const a = r.int(1, 4), b = r.int(2, 6)
    seq = [a, b]
    for (let i = 2; i < 6; i++) seq.push(seq[i - 1] + seq[i - 2])
    rule = 'each term = the sum of the two terms before it (Fibonacci-style)'
  } else {
    const a = r.int(2, 6)
    seq = [a]
    for (let i = 1; i < 6; i++) seq.push(i % 2 ? seq[i - 1] * 2 : seq[i - 1] + 3)
    rule = '×2, then +3, then ×2, then +3, … (alternating operations)'
  }
  const answer = seq[5]
  const set = new Set<number>([answer])
  const near = [answer + 1, answer - 1, answer + (seq[5] - seq[4]), answer * 2, answer + 2, answer - 2, answer + 10, answer - 10, answer + 3]
  for (const n of r.shuffle(near)) { if (set.size >= 4) break; if (n !== answer) set.add(n) }
  let bump = 4
  while (set.size < 4) set.add(answer + bump++)
  const options = r.shuffle([...set])
  return { prompt: seq.slice(0, 5).join(',  ') + ',  ?', answer, options, rule, correctIndex: options.indexOf(answer) }
}

export function makeLetterSeries(r: Rng): Series {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const kind = r.pick(['skip', 'alt', 'pair'])
  let letters: string[] = []
  let rule = ''
  if (kind === 'skip') {
    const s = r.int(0, 3), k = r.int(2, 4)
    letters = Array.from({ length: 6 }, (_, i) => A[s + k * i])
    rule = `jump ${k} places in the alphabet each time (skip ${k - 1})`
  } else if (kind === 'alt') {
    const s1 = r.int(0, 5), s2 = r.int(14, 19)
    letters = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? A[s1 + i / 2] : A[s2 - (i - 1) / 2]))
    rule = 'two series woven together: one moves forward through the alphabet, the other moves backward'
  } else {
    const s = r.int(0, 8)
    letters = Array.from({ length: 6 }, (_, i) => A[s + i] + A[s + 2 * i + 1])
    rule = 'first letter moves +1 each time, second letter moves +2 each time'
  }
  const answer = letters[5]
  const pool = new Set<string>([answer])
  const mut = (x: string) => {
    const d = r.pick([1, -1, 2, -2, 3])
    const sh = (ch: string) => A[(A.indexOf(ch) + d + 26) % 26]
    return x.length === 1 ? sh(x) : x[0] + sh(x[1])
  }
  let g = 0
  while (pool.size < 4 && g++ < 200) pool.add(mut(answer))
  const options = r.shuffle([...pool])
  return { prompt: letters.slice(0, 5).join(',  ') + ',  ?', answer, options, rule, correctIndex: options.indexOf(answer) }
}
