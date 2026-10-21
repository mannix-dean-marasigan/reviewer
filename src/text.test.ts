import { describe, expect, it } from 'vitest'
import { LESSONS } from './content'

// A single backslash before t, f, b, r or n inside a TypeScript string turns into a control character
// (for example "\text" becomes TAB + "ext") and silently breaks the formula. Scan all lesson text for them.
function* strings(x: unknown): Generator<string> {
  if (typeof x === 'string') yield x
  else if (Array.isArray(x)) for (const y of x) yield* strings(y)
  else if (x && typeof x === 'object') for (const y of Object.values(x)) yield* strings(y)
}

describe('lesson text', () => {
  it('has no stray control characters in blocks, tricks or interactive data', () => {
    for (const l of LESSONS) {
      for (const s of strings([l.blocks, l.tricks, l.interactive, l.title, l.blurb])) {
        for (const ch of s) {
          const code = ch.charCodeAt(0)
          expect(code < 32 && code !== 10, `${l.id}: control character ${code} near “${s.slice(0, 50)}”`).toBe(false)
        }
      }
    }
  })
})
