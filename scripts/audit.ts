// Prints every checkpoint question for the given lessons (authored + samples of each generated kind), video by video.
// Usage: npx vite-node scripts/audit.ts m-lines m-systems ...
import { LESSONS } from '../src/content'
import { VIDEO_MAP } from '../src/content/videoMap'
import { mathDrill } from '../src/lib/drills'
import { rng } from '../src/lib/rand'
import type { Question } from '../src/types'

const ids = process.argv.slice(2)
const show = (x: Question) => `Q: ${x.q}\n   ✔ ${x.c[x.a]}   ✗ ${x.c.filter((_, i) => i !== x.a).join(' | ')}`
for (const id of ids) {
  const l = LESSONS.find(x => x.id === id)!
  const m = VIDEO_MAP[id]
  console.log(`\n######## ${id}: ${l.title}`)
  l.videos.forEach((v, i) => {
    console.log(`\n=== video ${i + 1}: ${v.id} ${v.title}`)
    for (const j of m.q?.[i] ?? []) console.log('[authored] ' + show(l.checks!.video[j]))
    for (const k of m.kinds[i]) {
      const r = rng(1234 + k.length * 7)
      for (let s = 0; s < 3; s++) console.log(`[${k}] ` + show(mathDrill(r, k)))
    }
  })
}
