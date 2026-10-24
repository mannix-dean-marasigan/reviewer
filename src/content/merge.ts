import type { Lesson, Question } from '../types'
import { VIDEO_MAP } from './videoMap'

/**
 * Put several lessons into ONE lesson without cutting anything: every video, written section,
 * checkpoint, practice question and quiz question of every part is kept, in order.
 */
export function mergeLessons(id: string, title: string, blurb: string, parts: Lesson[]): Lesson {
  const video: Question[] = []
  const learn: Question[] = []
  const lab: Question[] = []
  const more: Question[] = []
  const kinds: string[][] = []
  const qmap: number[][] = []
  const drill = new Set<string>()
  parts.forEach(l => {
    const c = l.checks!
    const m = VIDEO_MAP[l.id]
    const off = video.length
    video.push(...c.video)
    l.videos.forEach((_, i) => { kinds.push(m?.kinds[i] ?? []); qmap.push((m?.q?.[i] ?? []).map(j => j + off)) })
    // one section question per written section, kept in step with the sections
    const h = l.blocks.filter(b => b.t === 'h').length
    learn.push(...c.learn.slice(0, h))
    more.push(...c.learn.slice(h), ...(c.more ?? []))
    lab.push(...(c.lab ?? []))
    ;(c.drill ?? []).forEach(k => drill.add(k))
  })
  VIDEO_MAP[id] = { kinds, q: qmap }
  return {
    id,
    subject: parts[0].subject,
    title,
    blurb,
    minutes: parts.reduce((a, l) => a + l.minutes, 0),
    parts: parts.length,
    videos: parts.flatMap(l => l.videos),
    blocks: parts.flatMap((l, i) => {
      let first = true
      return l.blocks.map(b => {
        if (b.t === 'h' && first) { first = false; return { ...b, text: `Part ${i + 1} of ${parts.length}: ${l.title}. ${b.text}` } }
        return b
      })
    }),
    tricks: parts.flatMap(l => l.tricks),
    quiz: parts.flatMap(l => l.quiz),
    checks: { video, learn, lab, more, drill: [...drill] },
  }
}
