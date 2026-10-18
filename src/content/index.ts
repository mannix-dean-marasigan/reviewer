import type { Lesson } from '../types'
import { ENGLISH } from './english'
import { ESSAY } from './essay'
import { MATH1 } from './math1'
import { MATH2 } from './math2'
import { MATH3 } from './math3'
import { MATH4 } from './math4'
import { MENTAL } from './mental'
import { READING } from './reading'

export * from './extras'

export const LESSONS: Lesson[] = [...MATH1, ...MATH2, ...MATH3, ...MATH4, ...ENGLISH, ...READING, ...MENTAL, ...ESSAY]
export const lessonById = (id: string) => LESSONS.find(l => l.id === id)
