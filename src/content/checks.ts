import type { Checks } from '../types'
import { CHECKS_GEO } from './checks-geo'
import { CHECKS_LANG } from './checks-lang'
import { CHECKS_MATH1 } from './checks-math1'
import { CHECKS_MATH2 } from './checks-math2'
import { CHECKS_OTHER } from './checks-other'
import { EXTRA } from './checks-extra'

// generated-problem kinds (see lib/drills.ts) that match each math lesson; they fill the checkpoint after every video
const DRILLS: Record<string, string[]> = {
  'm-number-sense': ['order', 'lcm'],
  'm-fractions': ['fracAdd', 'fracDiv', 'percentOf'],
  'm-exponents': ['exponent', 'radical', 'sciNot'],
  'm-ratio': ['ratioShare', 'mean'],
  'm-percent': ['percentOf', 'discount', 'pctChange'],
  'm-equations': ['linear', 'work'],
  'm-factoring': ['factor'],
  'm-quadratics': ['discriminant', 'quadRoot'],
  'm-lines': ['slope', 'distance'],
  'm-sequences': ['arith', 'geo'],
  'm-angles': ['angles', 'polyAngle'],
  'm-shapes': ['circle', 'rect'],
  'm-similar': ['pythag', 'distance'],
  'm-trig': ['trig'],
  'm-counting': ['combos', 'mean', 'dice'],
  'm-sets': ['venn'],
  'g-basics': ['segAdd', 'logicForm'],
  'g-congruence': ['triIneq', 'angles'],
  'g-quads': ['parAngle', 'polyAngle'],
  'g-circles': ['arcAngle', 'circle'],
  'g-lines-planes': ['pythCheck', 'triIneq', 'angles'],
}

const BASE: Record<string, Checks> = { ...CHECKS_MATH1, ...CHECKS_MATH2, ...CHECKS_GEO, ...CHECKS_LANG, ...CHECKS_OTHER }
export const CHECKS: Record<string, Checks> = Object.fromEntries(
  Object.entries(BASE).map(([id, c]) => [id, { ...c, drill: DRILLS[id] ?? c.drill, extra: EXTRA[id], gen: id === 'a-series' ? 'series' : undefined }]),
)
