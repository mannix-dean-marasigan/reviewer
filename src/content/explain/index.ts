import type { Lesson, Question } from '../../types'
import { EXPLAIN_A } from './a'
import { EXPLAIN_B } from './b'
import { EXPLAIN_C } from './c'
import { EXPLAIN_D } from './d'

const ALL: Record<string, [string, string][]> = { ...EXPLAIN_A, ...EXPLAIN_B, ...EXPLAIN_C, ...EXPLAIN_D }

/** Replace each math question's explanation by its step-by-step version (same order as lessonPool). */
export function withSteps(l: Lesson): Lesson {
  const list = ALL[l.id]
  if (!list) return l
  let i = 0
  const apply = (qs: Question[] | undefined) => qs?.map(q => {
    const hit = list[i++]
    return hit && q.q.startsWith(hit[0]) ? { ...q, e: hit[1] } : q
  })
  const quiz = apply(l.quiz)!
  const c = l.checks
  return {
    ...l,
    quiz,
    checks: c && { ...c, video: apply(c.video)!, learn: apply(c.learn)!, lab: apply(c.lab), more: apply(c.more) },
  }
}

export const STEP_LESSONS = Object.keys(ALL)
export const stepEntries = (id: string) => ALL[id]
