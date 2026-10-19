import type { Lesson, Question } from '../types'

/** Every question that belongs to a lesson. The final quiz comes first so older saved mistake indexes stay valid. */
export function lessonPool(l: Lesson): Question[] {
  const c = l.checks
  return [...l.quiz, ...(c?.video ?? []), ...(c?.learn ?? []), ...(c?.lab ?? []), ...(c?.more ?? []), ...(c?.extra ?? [])]
}

/** Index of the first question of each group inside lessonPool(l). */
export function poolOffsets(l: Lesson) {
  const c = l.checks
  const video = l.quiz.length
  const learn = video + (c?.video.length ?? 0)
  const lab = learn + (c?.learn.length ?? 0)
  const more = lab + (c?.lab?.length ?? 0)
  const extra = more + (c?.more?.length ?? 0)
  return { quiz: 0, video, learn, lab, more, extra }
}
