import { mathDrill } from '../src/lib/drills'
import { rng } from '../src/lib/rand'
for (const k of process.argv.slice(2)) {
  const r = rng(4242 + k.length * 13)
  for (let s = 0; s < 4; s++) { const q = mathDrill(r, k); console.log(`[${k}] ${q.q}  ==> ${q.c[q.a]}   (wrong: ${q.c.filter((_, i) => i !== q.a).join(' | ')})`) }
}
