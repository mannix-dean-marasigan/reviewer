import type { Lesson } from '../types'
import { CHECKS } from './checks'
import { withSteps } from './explain'
import { mergeLessons } from './merge'
import { ENGLISH } from './english'
import { ESSAY } from './essay'
import { MATH1 } from './math1'
import { MATH2 } from './math2'
import { MATH3 } from './math3'
import { MATH4 } from './math4'
import { MATH5 } from './math5'
import { MATH6 } from './math6'
import { MATH9 } from './math9'
import { MATH10 } from './math10'
import { MATH7 } from './math7'
import { MATH8 } from './math8'
import { MENTAL } from './mental'
import { READING } from './reading'

export * from './extras'
import './migrate'

// Learning order of the math lessons: each lesson builds on the ones before it.
export const MATH_ORDER = [
  'm-number-sense', 'm-fractions', 'm-exponents', 'm-ratio', 'm-percent', 'm-equations', 'm-word-problems', 'm-variation', 'm-lines', 'm-systems', 'm-sequences',
  'm-factoring', 'm-polynomials', 'm-rational', 'm-quadratics', 'm-quad-fn', 'm-functions', 'm-rational-fn', 'm-exp-log', 'm-finance', 'm-logic',
  'geometry', 'm-trig',
  'm-sets', 'm-counting', 'm-probability', 'm-stats',
]
/** 1-based lesson number in the math learning order (0 if the lesson is not a math lesson). */
export const lessonNumber = (id: string) => MATH_ORDER.indexOf(id) + 1

// Lessons that were taken out of the app: only the basic trigonometry lesson (m-trig) stays.
const REMOVED = ['m-trig-angles', 'm-trig-identities', 'm-trig-graphs', 'm-trig2']
const BASE: Lesson[] = [...MATH1, ...MATH2, ...MATH3, ...MATH4, ...MATH5, ...MATH6, ...MATH7, ...MATH8, ...MATH9, ...MATH10, ...ENGLISH, ...READING, ...MENTAL, ...ESSAY].filter(l => !REMOVED.includes(l.id))
/** Every lesson as it was before the interactives and lab questions were removed (needed to fix old saved mistakes). */
export const ORIGINAL_LESSONS: Lesson[] = BASE.map(l => withSteps({ ...l, checks: CHECKS[l.id] }))
// no interactives and no lab questions (they only made sense next to an interactive)
const BUILT: Lesson[] = ORIGINAL_LESSONS.map(l => ({ ...l, interactive: undefined, moreInteractives: undefined, checks: l.checks && { ...l.checks, lab: [] } }))
const byId = (id: string) => BUILT.find(l => l.id === id)!

/** Every geometry lesson, put together in one (nothing cut): 9 lessons, 23 videos. */
export const GEOMETRY_PARTS = ['g-basics', 'm-angles', 'g-congruence', 'm-similar', 'm-shapes', 'g-quads', 'g-circles', 'g-extras', 'g-lines-planes']

const GEOMETRY = mergeLessons('geometry', 'Geometry: everything in one lesson', 'All of geometry in order: points and lines, angles, triangles, congruence, Pythagorean and similar triangles, area and volume, quadrilaterals, circles, cylinders, arcs and sectors, triangle lines, and skew lines. Use sprint mode (the default) for the 15 key videos.', GEOMETRY_PARTS.map(byId))

const rank = (l: Lesson) => { const i = MATH_ORDER.indexOf(l.id); return i === -1 ? 1000 + BASE.findIndex(b => b.id === l.id) : i }
export const LESSONS: Lesson[] = [...BUILT.filter(l => !GEOMETRY_PARTS.includes(l.id)), GEOMETRY].sort((a, b) => rank(a) - rank(b))
export const lessonById = (id: string) => LESSONS.find(l => l.id === id)
