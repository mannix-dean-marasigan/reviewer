// Small seeded RNG so generated drills are reproducible and testable.
export function rng(seed = Date.now() % 2147483647) {
  let s = seed || 1
  const next = () => (s = (s * 48271) % 2147483647) / 2147483647
  return {
    next,
    int: (a: number, b: number) => a + Math.floor(next() * (b - a + 1)),
    pick: <T,>(arr: readonly T[]): T => arr[Math.floor(next() * arr.length)],
    shuffle: <T,>(arr: readonly T[]): T[] => {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
      return a
    },
  }
}
export type Rng = ReturnType<typeof rng>

import type { Question } from '../types'
/** Randomise the order of a question's four choices so the correct letter is not predictable. */
export function shuffleChoices(q: Question, r: Rng): Question {
  const order = r.shuffle([0, 1, 2, 3])
  return { ...q, c: order.map(i => q.c[i]) as Question['c'], a: order.indexOf(q.a) as Question['a'] }
}
