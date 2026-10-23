import type { Lesson } from '../types'
import { CHECKS } from './checks'
import { withSteps } from './explain'
import { ENGLISH } from './english'
import { ESSAY } from './essay'
import { MATH1 } from './math1'
import { MATH2 } from './math2'
import { MATH3 } from './math3'
import { MATH4 } from './math4'
import { MATH5 } from './math5'
import { MATH6 } from './math6'
import { MATH9 } from './math9'
import { MATH7 } from './math7'
import { MATH8 } from './math8'
import { MENTAL } from './mental'
import { READING } from './reading'

export * from './extras'

// Learning order of the math lessons: each lesson builds on the ones before it.
export const MATH_ORDER = [
  'm-number-sense', 'm-fractions', 'm-exponents', 'm-ratio', 'm-percent', 'm-equations', 'm-word-problems', 'm-variation', 'm-lines', 'm-systems', 'm-sequences',
  'm-factoring', 'm-polynomials', 'm-rational', 'm-quadratics', 'm-quad-fn', 'm-functions', 'm-rational-fn', 'm-exp-log', 'm-finance', 'm-logic',
  'g-basics', 'm-angles', 'g-congruence', 'm-similar', 'm-shapes', 'g-quads', 'g-lines-planes', 'g-circles', 'm-trig', 'm-trig2',
  'm-sets', 'm-counting', 'm-probability', 'm-stats',
]
/** 1-based lesson number in the math learning order (0 if the lesson is not a math lesson). */
export const lessonNumber = (id: string) => MATH_ORDER.indexOf(id) + 1

const BASE: Lesson[] = [...MATH1, ...MATH2, ...MATH3, ...MATH4, ...MATH5, ...MATH6, ...MATH7, ...MATH8, ...MATH9, ...ENGLISH, ...READING, ...MENTAL, ...ESSAY]
const rank = (l: Lesson) => { const i = MATH_ORDER.indexOf(l.id); return i === -1 ? 1000 + BASE.indexOf(l) : i }
export const LESSONS: Lesson[] = BASE.map(l => withSteps({ ...l, checks: CHECKS[l.id] })).sort((a, b) => rank(a) - rank(b))
export const lessonById = (id: string) => LESSONS.find(l => l.id === id)
