import { ORIGINAL_LESSONS } from './index'
import { update } from '../lib/store'

// The lab questions were removed, so saved mistakes after them moved up in their lesson. Fix them once.
update(s => {
  if ((s.v ?? 1) >= 2) return s
  const wrong: typeof s.wrong = {}
  for (const w of Object.values(s.wrong)) {
    const l = ORIGINAL_LESSONS.find(x => x.id === w.lesson)
    const c = l?.checks
    if (!l || !c) { wrong[`${w.lesson}:${w.idx}`] = w; continue }
    const labStart = l.quiz.length + c.video.length + c.learn.length
    const labLen = c.lab?.length ?? 0
    if (w.idx >= labStart && w.idx < labStart + labLen) continue // a lab question: gone
    const idx = w.idx >= labStart + labLen ? w.idx - labLen : w.idx
    wrong[`${w.lesson}:${idx}`] = { ...w, idx }
  }
  return { ...s, wrong, v: 2 }
})
