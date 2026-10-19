import type { Checks } from '../types'
import { CHECKS_LANG } from './checks-lang'
import { CHECKS_MATH1 } from './checks-math1'
import { CHECKS_MATH2 } from './checks-math2'
import { CHECKS_OTHER } from './checks-other'

export const CHECKS: Record<string, Checks> = { ...CHECKS_MATH1, ...CHECKS_MATH2, ...CHECKS_LANG, ...CHECKS_OTHER }
