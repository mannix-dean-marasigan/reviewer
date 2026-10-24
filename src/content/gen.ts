import type { Question } from '../types'
import { mathDrill } from '../lib/drills'
import { rng } from '../lib/rand'

/** n distinct generated questions (fixed seed, so the lesson is the same every time), cycling through the kinds. */
export function gen(kinds: string[], n: number, seed: number): Question[] {
  const r = rng(seed)
  const out: Question[] = []
  const seen = new Set<string>()
  for (let guard = 0; out.length < n && guard < 600; guard++) {
    const x = mathDrill(r, kinds[out.length % kinds.length])
    if (seen.has(x.q)) continue
    seen.add(x.q)
    out.push(x)
  }
  return out
}
