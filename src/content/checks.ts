import type { Checks } from '../types'
import { CHECKS_ALG } from './checks-alg'
import { CHECKS_GEO } from './checks-geo'
import { CHECKS_GM } from './checks-gm'
import { CHECKS_JHS } from './checks-jhs'
import { CHECKS_LANG } from './checks-lang'
import { CHECKS_MATH1 } from './checks-math1'
import { CHECKS_MATH2 } from './checks-math2'
import { CHECKS_OTHER } from './checks-other'
import { CHECKS_WP } from './checks-wp'
import { EXTRA } from './checks-extra'

// generated-problem kinds (see lib/drills.ts) that match each math lesson; they fill the checkpoint after every video
const DRILLS: Record<string, string[]> = {
  'm-number-sense': ['order', 'lcm'],
  'm-fractions': ['fracAdd', 'fracDiv', 'percentOf'],
  'm-exponents': ['exponent', 'radical', 'sciNot'],
  'm-ratio': ['ratioShare', 'mean'],
  'm-percent': ['percentOf', 'discount', 'pctChange'],
  'm-equations': ['linear', 'work'],
  'm-factoring': ['factor', 'factorNeg', 'factorA', 'factorGroup', 'factorGcfTri', 'diffSq', 'gcfPoly', 'gcfBinom'],
  'm-quadratics': ['quadFormula', 'quadFormulaA', 'discriminant', 'discValue', 'quadRoot'],
  'm-lines': ['slope', 'slopeSpecial', 'slopeGraph', 'lineGraph', 'lineEq', 'pointSlopeForm', 'stdForm', 'distance', 'distCircle'],
  'm-sequences': ['arith', 'arithSum', 'arithMid', 'sigmaSum', 'geo', 'geoFinite', 'geoSum', 'geoMean', 'geoConverge', 'seqClassify'],
  'm-angles': ['angles', 'polyAngle'],
  'm-shapes': ['circle', 'rect'],
  'm-similar': ['pythag', 'distance'],
  'm-trig': ['trig'],
  'm-counting': ['combos', 'mean', 'dice'],
  'm-sets': ['venn'],
  'm-systems': ['sys2', 'sysElim', 'sysSub', 'sysWord'],
  'm-polynomials': ['polyRem', 'polyDiv', 'synthDiv', 'longDiv'],
  'm-rational': ['ratSimp', 'ratGcf', 'ratNeg', 'ratAdd', 'ratEq', 'ratCross'],
  'm-quad-fn': ['vertex', 'vertexA', 'vertexForm', 'vertexFactored', 'quadIneqFull'],
  'm-variation': ['joint', 'ratioShare'],
  'm-word-problems': ['numWord', 'consecutive', 'ageWord', 'work', 'workFind'],
  'm-functions': ['funcEval', 'piecewise', 'composite', 'compositeExpr', 'inverseFn', 'inversePoint'],
  'm-rational-fn': ['asymptote', 'horizAsym', 'ratHole', 'slantAsym', 'ratShift'],
  'm-exp-log': ['expEq', 'expEqTwoBase', 'expLn', 'logVal', 'logRules', 'logEqForms', 'logEqSum'],
  'm-finance': ['simpleInt', 'simpleIntSolve', 'compInt', 'compIntN', 'rule72', 'annuity'],
  'm-logic': ['truthVal', 'logicForm', 'logicParts'],
  'm-stats': ['quartile', 'variance'],
  'm-probability': ['probOr', 'probAnd', 'dice'],
  'm-trig2': ['lawCos'],
  'g-basics': ['segAdd', 'logicForm'],
  'g-congruence': ['triIneq', 'angles'],
  'g-quads': ['parAngle', 'polyAngle'],
  'g-circles': ['arcAngle', 'circle'],
  'g-lines-planes': ['pythCheck', 'triIneq', 'angles'],
}

const BASE: Record<string, Checks> = { ...CHECKS_MATH1, ...CHECKS_MATH2, ...CHECKS_ALG, ...CHECKS_GM, ...CHECKS_JHS, ...CHECKS_GEO, ...CHECKS_LANG, ...CHECKS_OTHER, ...CHECKS_WP }
export const CHECKS: Record<string, Checks> = Object.fromEntries(
  Object.entries(BASE).map(([id, c]) => [id, { ...c, drill: DRILLS[id] ?? c.drill, extra: EXTRA[id], gen: id === 'a-series' ? 'series' : undefined }]),
)
