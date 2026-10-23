import { describe, expect, it } from 'vitest'
import { PLAN } from './content'
import { buildMock } from './pages/Mock'

describe('daily mock exams', () => {
  for (const day of [1, 2, 3] as const) {
    it(`day ${day} has 100 valid questions that cover every lesson of that day`, () => {
      const items = buildMock(`day${day}` as 'day1', 12345 + day)
      expect(items.length).toBe(100)
      items.forEach((it, i) => {
        expect(it.q, `item ${i}`).toBeDefined()
        expect(new Set(it.q!.c).size, `item ${i} duplicate choices`).toBe(4)
        expect(it.q!.e.length).toBeGreaterThan(4)
      })
      const lessonsInPlan = new Set(PLAN[day - 1].items.map(i => i.lesson).filter(Boolean))
      const topics = new Set(items.map(i => i.topic))
      expect(topics.size, `day ${day} should include every lesson`).toBe(lessonsInPlan.size)
    })
  }
})
