import { describe, expect, it } from 'vitest'
import { DRILL_KINDS, mathDrill } from './lib/drills'
import { rng } from './lib/rand'

// Generated questions must look clean: no filler choices, no "1x", no "+0", no long decimals.
const rules: [RegExp, string][] = [
  [/\*+$/, 'filler choice (not enough distinct wrong answers)'],
  [/\+-|--|-\+/, 'double sign'],
  [/(^|[^\d.\w])-?1x/, '1x'],
  [/[+-]0(?![\d.,])/, '+0 / -0'],
  [/(^|[^\d])0x/, '0x'],
  [/NaN|undefined|Infinity/, 'NaN/undefined'],
  [/\d\.\d{5,}/, 'long decimal'],
]

describe('generated question formatting', () => {
  it('every kind renders cleanly over many seeds', () => {
    const bad: string[] = []
    for (const k of DRILL_KINDS) {
      const r = rng(31 + k.length)
      for (let s = 0; s < 150; s++) {
        const q = mathDrill(r, k)
        for (const t of [q.q, ...q.c]) for (const [re, name] of rules) if (re.test(t)) bad.push(`${k}: ${name}: ${t}`)
      }
    }
    expect(bad.slice(0, 10)).toEqual([])
  })
})
