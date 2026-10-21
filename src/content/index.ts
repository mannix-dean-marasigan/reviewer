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
import { MATH7 } from './math7'
import { MATH8 } from './math8'
import { MENTAL } from './mental'
import { READING } from './reading'

export * from './extras'

const BASE: Lesson[] = [...MATH1, ...MATH2, ...MATH3, ...MATH4, ...MATH5, ...MATH6, ...MATH7, ...MATH8, ...ENGLISH, ...READING, ...MENTAL, ...ESSAY]
export const LESSONS: Lesson[] = BASE.map(l => withSteps({ ...l, checks: CHECKS[l.id] }))
export const lessonById = (id: string) => LESSONS.find(l => l.id === id)
