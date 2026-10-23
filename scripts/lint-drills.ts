// Scans every generator over many seeds for formatting and answer-key problems.
// Usage: npx vite-node scripts/lint-drills.ts [kind ...]   (prints samples when kinds are given)
import { DRILL_KINDS, mathDrill } from '../src/lib/drills'
import { rng } from '../src/lib/rand'
import { CHECKS } from '../src/content/checks'
import { VIDEO_MAP } from '../src/content/videoMap'

const bad: string[] = []
const rules: [RegExp, string][] = [
  [/\*+$/, 'padded choice (not enough distinct wrong answers)'],
  [/\+-|--|-\+/, 'double sign'],
  [/(^|[^\d.\w])1x/, '1x'],
  [/(^|[^\d.\w])-1x/, '-1x'],
  [/[+-]0(?![\d.,])/, '+0 / -0'],
  [/(^|[^\d])0x/, '0x'],
  [/x\^1(?!\d)/, 'x^1'],
  [/NaN|undefined|Infinity/, 'NaN/undefined'],
  [/\d\.\d{5,}/, 'long decimal'],
]
const kinds = process.argv.slice(2)
for (const k of kinds.length ? kinds : DRILL_KINDS) {
  const r = rng(99 + k.length)
  for (let s = 0; s < 400; s++) {
    const q = mathDrill(r, k)
    const texts = [q.q, ...q.c]
    for (const t of texts) for (const [re, name] of rules) if (re.test(t)) bad.push(`${k}: ${name}: ${t}`)
    if (new Set(q.c).size !== 4) bad.push(`${k}: duplicate choices ${q.c.join(' | ')}`)
    if (kinds.length && s < 5) console.log(`[${k}] ${q.q}\n   ✔ ${q.c[q.a]}   ✗ ${q.c.filter((_, i) => i !== q.a).join(' | ')}`)
  }
}
for (const [id, c] of Object.entries(CHECKS)) for (const k of c.drill ?? []) if (!DRILL_KINDS.includes(k)) bad.push(`DRILLS ${id}: unknown kind ${k}`)
for (const [id, m] of Object.entries(VIDEO_MAP)) for (const k of m.kinds.flat()) if (!DRILL_KINDS.includes(k)) bad.push(`VIDEO_MAP ${id}: unknown kind ${k}`)
const uniq = [...new Set(bad)]
console.log(`\n${uniq.length} problems`)
const byKind = new Map<string, string[]>()
for (const b of uniq) { const k = b.split(':')[0]; byKind.set(k, [...(byKind.get(k) ?? []), b]) }
for (const [, list] of byKind) list.slice(0, 3).forEach(b => console.log(b))
