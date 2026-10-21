import { describe, expect, it } from 'vitest'
import { LESSONS, PLAN, lessonById } from './content'
import { VID } from './content/helpers'
import { lessonPool } from './lib/pool'
import { stepEntries } from './content/explain'
import { mathDrill, DRILL_KINDS } from './lib/drills'
import { makeLetterSeries, makeNumberSeries, makePuzzle, cellKey } from './lib/patterns'
import { rng } from './lib/rand'

describe('lesson content', () => {
  it('has unique lesson ids and valid quiz structure', () => {
    const ids = new Set<string>()
    for (const l of LESSONS) {
      expect(ids.has(l.id), `dup ${l.id}`).toBe(false)
      ids.add(l.id)
      expect(l.videos.length, l.id).toBeGreaterThan(0)
      expect(l.quiz.length, l.id).toBeGreaterThanOrEqual(6)
      expect(l.tricks.length, l.id).toBeGreaterThanOrEqual(4)
      const c = l.checks
      expect(c, `${l.id} needs checkpoints`).toBeDefined()
      expect(c!.video.length, `${l.id} video checks`).toBeGreaterThanOrEqual(2)
      expect(c!.learn.length, `${l.id} learn checks`).toBeGreaterThanOrEqual(l.blocks.filter(b => b.t === 'h').length)
      expect((c!.lab ?? []).length, `${l.id} lab checks`).toBeGreaterThanOrEqual(2)
      expect((c!.more ?? []).length, `${l.id} more`).toBeGreaterThanOrEqual(4)
      expect(l.interactive, `${l.id} needs an interactive`).toBeDefined()
      lessonPool(l).forEach((qq, i) => {
        const tag = `${l.id} Q${i + 1}`
        expect(qq.c.length, tag).toBe(4)
        expect([0, 1, 2, 3], tag).toContain(qq.a)
        expect(new Set(qq.c).size, `${tag} duplicate choices`).toBe(4)
        expect(qq.e.length, `${tag} needs explanation`).toBeGreaterThan(4)
        qq.c.forEach(c => expect(c.trim().length, tag).toBeGreaterThan(0))
        // a stray single backslash in a TS string turns into a control character and breaks the math
        expect([...[qq.q, qq.e, qq.trick ?? '', ...qq.c].join('')].some(ch => ch.charCodeAt(0) < 32 && ch !== String.fromCharCode(10)), `${tag} has a control character`).toBe(false)
      })
    }
  })
  it('video ids look like youtube ids and all are defined', () => {
    for (const [k, v] of Object.entries(VID)) { expect(v, k).toBeDefined(); expect(v.id, k).toMatch(/^[\w-]{11}$/) }
    for (const l of LESSONS) l.videos.forEach(v => expect(v?.id, l.id).toBeTruthy())
  })
  it('study plan only references existing lessons and totals the stated hours', () => {
    for (const d of PLAN) {
      d.items.forEach(i => { if (i.lesson) expect(lessonById(i.lesson), i.lesson).toBeDefined() })
      expect(d.items.filter(i => !i.optional).reduce((a, i) => a + i.minutes, 0)).toBeLessThanOrEqual(d.hours * 60)
    }
    const all = new Set(PLAN.flatMap(d => d.items.map(i => i.lesson)).filter(Boolean))
    for (const l of LESSONS) expect(all.has(l.id), `${l.id} missing from plan`).toBe(true)
  })
})

describe('generators', () => {
  it('math drills have a unique correct answer', () => {
    for (let s = 1; s <= 60; s++) {
      const r = rng(s * 131)
      for (const k of DRILL_KINDS) {
        const q = mathDrill(r, k)
        expect(new Set(q.c).size, `${k} seed ${s}`).toBe(4)
        expect(q.c[q.a]).toBeTruthy()
        expect(q.e.includes('**Step 1'), `${k} explanation should be step by step`).toBe(true)
        expect(q.e.includes('**Answer'), `${k} explanation should state the answer`).toBe(true)
        expect(q.e.includes('undefined') || q.e.includes('NaN'), `${k} explanation has a bad value`).toBe(false)
      }
    }
  })
  it('patterns have 4 distinct options with the answer inside', () => {
    for (let s = 1; s <= 300; s++) {
      const p = makePuzzle(rng(s * 17), s % 2 ? 'easy' : 'hard')
      if (p.kind === 'odd') { expect(p.stem.length).toBe(5); expect(p.answer).toBeLessThan(5); continue }
      expect(p.options.length).toBe(4)
      expect(new Set(p.options.map(cellKey)).size, `seed ${s} ${p.kind}`).toBe(4)
    }
  })
  it('series have a distinct correct option', () => {
    for (let s = 1; s <= 200; s++) {
      const a = makeNumberSeries(rng(s * 7), ((s % 3) + 1) as 1 | 2 | 3)
      expect(a.options[a.correctIndex]).toBe(a.answer)
      expect(new Set(a.options).size).toBe(4)
      const b = makeLetterSeries(rng(s * 11))
      expect(b.options[b.correctIndex]).toBe(b.answer)
      expect(new Set(b.options).size).toBe(4)
    }
  })
})

describe('step-by-step math explanations', () => {
  it('cover every math question, aligned and containing steps', () => {
    for (const l of LESSONS.filter(x => x.subject === 'math')) {
      const list = stepEntries(l.id)
      const pool = lessonPool(l)
      if (!list) { pool.forEach((q, i) => { expect(q.e.includes('**Step 1') && q.e.includes('**Answer'), `${l.id} #${i} must be step by step`).toBe(true) }); continue }
      expect(list.length, `${l.id} count`).toBe(pool.length)
      pool.forEach((q, i) => {
        expect(q.q.startsWith(list[i][0]), `${l.id} #${i} misaligned: ${list[i][0]}`).toBe(true)
        expect(q.e, `${l.id} #${i} not replaced`).toBe(list[i][1])
        expect(q.e.includes('**Step 1') || q.e.includes('**Idea') || q.e.includes('**Rule') || q.e.includes('**Memory') || q.e.includes('**Words'), `${l.id} #${i} should be step by step`).toBe(true)
        expect(q.e.includes('**Answer'), `${l.id} #${i} should state the answer`).toBe(true)
      })
    }
  })
})
