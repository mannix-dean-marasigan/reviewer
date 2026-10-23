import { describe, expect, it } from 'vitest'
import { LESSONS } from './content'
import { VIDEO_MAP } from './content/videoMap'
import { DRILL_KINDS } from './lib/drills'

describe('video map', () => {
  it('has an entry for every math lesson, aligned with its videos, using real generator kinds', () => {
    for (const l of LESSONS.filter(x => x.subject === 'math')) {
      const m = VIDEO_MAP[l.id]
      expect(m, `${l.id} missing from the video map`).toBeDefined()
      expect(m.kinds.length, `${l.id}: kinds must match the number of videos`).toBe(l.videos.length)
      expect((m.q ?? []).length, `${l.id}: q must match the number of videos`).toBe(l.videos.length)
      m.kinds.flat().forEach(k => expect(DRILL_KINDS, `${l.id}: unknown kind ${k}`).toContain(k))
      ;(m.q ?? []).flat().forEach(j => expect(l.checks?.video[j], `${l.id}: bad video question index ${j}`).toBeDefined())
      // every video should lead to at least one question
      m.kinds.forEach((k, i) => expect(k.length + (m.q?.[i]?.length ?? 0), `${l.id}: video ${i + 1} has no checkpoint questions`).toBeGreaterThan(0))
    }
  })
})
