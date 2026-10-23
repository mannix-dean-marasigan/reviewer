import { DRILL_KINDS, mathDrill } from '../src/lib/drills'
import { rng } from '../src/lib/rand'
const out = new Map<string, string>()
for (const k of DRILL_KINDS) {
  const r = rng(7 + k.length)
  for (let s = 0; s < 300; s++) {
    const e = mathDrill(r, k).e
    const m = e.match(/\(x[+-]0\)|(?<![\d.\w])1x|[+-]0x|\$x\^1\$|NaN|Infinity|\d\.\d{6,}|\+ -|\+-\d/)
    if (m && !out.has(k)) out.set(k, `${m[0]}  ::  ${e.slice(Math.max(0, m.index! - 60), m.index! + 40).replace(/\n/g, ' ')}`)
  }
}
for (const [k, v] of out) console.log(k, '=>', v)
console.log(out.size, 'kinds with explanation issues')
