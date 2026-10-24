import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { LESSONS } from './content'
import { lessonPool } from './lib/pool'
import { DRILL_KINDS, mathDrill } from './lib/drills'
import { rng } from './lib/rand'

const strings = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach(x => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach(x => strings(x, out))
  return out
}

describe('math rendering', () => {
  it('every $math$ string in the math lessons and generators is valid KaTeX', () => {
    const bad = new Set<string>()
    const check = (txt: string, where: string) => {
      for (const m of txt.matchAll(/\$([^$]+)\$/g)) {
        try { katex.renderToString(m[1], { throwOnError: true, strict: 'ignore' }) } catch (e) { bad.add(`${where}: ${m[1].slice(0, 60)} :: ${(e as Error).message.slice(0, 50)}`) }
      }
    }
    for (const l of LESSONS.filter(x => x.subject === 'math')) {
      check(strings(l.blocks).join(' '), `${l.id} blocks`)
      check(strings(l.interactive).join(' '), `${l.id} interactive`)
      for (const qq of lessonPool(l)) check([qq.q, qq.e, ...qq.c].join(' '), l.id)
    }
    for (const k of DRILL_KINDS) {
      const r = rng(9 + k.length)
      for (let i = 0; i < 40; i++) { const q = mathDrill(r, k); check([q.q, q.e, ...q.c].join(' '), `gen ${k}`) }
    }
    expect([...bad].slice(0, 10)).toEqual([])
  })
})
