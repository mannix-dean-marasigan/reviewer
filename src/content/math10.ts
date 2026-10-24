import type { Checks, Lesson } from '../types'
import { gen } from './gen'
import { q, VID } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

// Geometry extras (surface area, arcs, triangle lines) and the three extra trigonometry lessons.
export const MATH10: Lesson[] = [
  {
    id: 'g-extras', subject: 'math', title: 'Geometry Extras: Cylinders, Arcs, Sectors & Triangle Lines', minutes: 45,
    blurb: 'Surface area of a cylinder, arc length, sector area, and the median, altitude and bisectors of a triangle.',
    videos: [VID.ocCylinder, VID.ocArcSector, VID.ocTriLines],
    interactive: { k: 'flash', data: { frontLabel: 'FORMULA', cards: [['Volume of a cylinder', '$V=\\pi r^2h$'], ['Surface area of a cylinder', '$2\\pi r^2+2\\pi rh$ (two circles + the side)'], ['Arc length (angle θ in degrees)', '$\\dfrac{\\theta}{360}\\times2\\pi r$'], ['Sector area (angle θ in degrees)', '$\\dfrac{\\theta}{360}\\times\\pi r^2$'], ['Arc length (angle θ in radians)', '$s=r\\theta$'], ['Median', 'vertex → MIDPOINT of the opposite side'], ['Altitude', 'vertex → opposite side, making 90°'], ['Angle bisector', 'splits an angle into 2 equal angles'], ['Perpendicular bisector', '90° AND through the midpoint']] } },
    blocks: [
      { t: 'h', text: 'Cylinders: volume and surface area' },
      { t: 'formula', items: ['**Volume** = area of the base × height: $V=\\pi r^2h$.', '**Surface area** = 2 circles + the curved side: $SA=2\\pi r^2+2\\pi rh$.', 'The curved side (the **lateral area**) is a rectangle that rolls up: its width is the circle’s circumference $2\\pi r$ and its height is $h$.'] },
      { t: 'ex', title: 'A cylinder has radius 7 in and height 12 in. Find its surface area.', steps: ['Two circles: $2\\pi(7)^2=98\\pi$.', 'Curved side: $2\\pi(7)(12)=168\\pi$.', 'Add: $98\\pi+168\\pi=266\\pi$ square inches.'], ans: '$266\\pi$' },
      { t: 'trap', text: 'Volume is in CUBIC units (cm³) and surface area is in SQUARE units (cm²). Also make the units match (all inches, or all cm) before you substitute.' },
      { t: 'h', text: 'Arc length and sector area' },
      { t: 'formula', items: ['An **arc** is a piece of the circle’s edge; a **sector** is a “pizza slice”. Both depend on the **central angle** θ (the angle at the center).', 'Fraction of the circle $=\\dfrac{\\theta}{360^\\circ}$.', '**Arc length** = fraction × circumference $=\\dfrac{\\theta}{360}\\times2\\pi r$.', '**Sector area** = fraction × circle area $=\\dfrac{\\theta}{360}\\times\\pi r^2$.', 'If θ is in **radians**: $s=r\\theta$.'] },
      { t: 'ex', title: 'A circle has radius 9. Find the arc length for a central angle of 120°.', steps: ['Fraction: $\\frac{120}{360}=\\frac13$.', 'Circumference: $2\\pi(9)=18\\pi$.', 'Arc: $\\frac13\\times18\\pi=6\\pi$.'], ans: '$6\\pi$' },
      { t: 'h', text: 'Lines inside a triangle' },
      { t: 'table', head: ['Name', 'What it does', 'Remember'], rows: [['Median', 'joins a vertex to the MIDPOINT of the opposite side', 'cuts that side into two equal parts'], ['Altitude', 'joins a vertex to the opposite side at 90°', 'the height of the triangle'], ['Angle bisector', 'a ray from a vertex that splits the angle in two equal angles', 'two equal angles'], ['Perpendicular bisector', 'a line at 90° through the MIDPOINT of a side', 'a median AND an altitude combined']] },
      { t: 'tip', text: 'If a segment is a median (or a perpendicular bisector), the two pieces of the side are EQUAL. Set them equal, solve for x, then double to get the whole side.' },
    ],
    tricks: [
      'Arc and sector: write the fraction θ/360 FIRST, then multiply by the whole circumference (arc) or the whole area (sector).',
      'Cylinder surface area: two circles (top and bottom) plus the rolled-up side. Do not forget the circles.',
      'Volume is “cubic”, surface area is “square”.',
      'Median → midpoint. Altitude → 90°. Bisector → splits in half.',
      'If the volume is given, find the radius first (divide by πh, then square root).',
    ],
    quiz: gen(['cylSA', 'arcSector', 'triSegments', 'medianSolve'], 7, 1101),
  },
  {
    id: 'm-trig-angles', subject: 'math', title: 'Trig: Radians, the Unit Circle & Reference Angles', minutes: 45,
    blurb: 'Degrees and radians, the six trig functions, and exact values at any angle using reference angles.',
    videos: [VID.ocRadians, VID.ocSixFn, VID.ocSpecialTrick, VID.ocRefAngles],
    interactive: { k: 'flash', data: { frontLabel: 'ANGLE', cards: [['30°', '$\\sin=\\frac12,\\ \\cos=\\frac{\\sqrt3}{2},\\ \\tan=\\frac{\\sqrt3}{3}$ (π/6)'], ['45°', '$\\sin=\\cos=\\frac{\\sqrt2}{2},\\ \\tan=1$ (π/4)'], ['60°', '$\\sin=\\frac{\\sqrt3}{2},\\ \\cos=\\frac12,\\ \\tan=\\sqrt3$ (π/3)'], ['0°', '$\\sin=0,\\ \\cos=1,\\ \\tan=0$'], ['90°', '$\\sin=1,\\ \\cos=0,\\ \\tan$ undefined (π/2)'], ['180° in radians', '$\\pi$'], ['Quadrant I', 'All positive'], ['Quadrant II', 'Only sine positive'], ['Quadrant III', 'Only tangent positive'], ['Quadrant IV', 'Only cosine positive']] } },
    blocks: [
      { t: 'h', text: 'Degrees and radians' },
      { t: 'formula', items: ['A full turn is $360^\\circ=2\\pi$ radians, so $180^\\circ=\\pi$ radians.', '**Degrees → radians:** multiply by $\\dfrac{\\pi}{180}$.', '**Radians → degrees:** multiply by $\\dfrac{180}{\\pi}$.', 'One **radian** is the angle that cuts off an arc as long as the radius, so $\\theta=\\dfrac sr$ and $s=r\\theta$.'] },
      { t: 'ex', title: 'Convert 150° to radians, then $\\frac{2\\pi}{3}$ to degrees.', steps: ['$150\\times\\frac{\\pi}{180}=\\frac{150\\pi}{180}=\\frac{5\\pi}{6}$.', '$\\frac{2\\pi}{3}\\times\\frac{180}{\\pi}=\\frac{360}{3}=120^\\circ$.'], ans: '$\\frac{5\\pi}{6}$ and $120^\\circ$' },
      { t: 'h', text: 'The six trig functions' },
      { t: 'formula', items: ['In a right triangle: $\\sin=\\frac{\\text{opp}}{\\text{hyp}}$, $\\cos=\\frac{\\text{adj}}{\\text{hyp}}$, $\\tan=\\frac{\\text{opp}}{\\text{adj}}$.', 'Their reciprocals: $\\csc=\\frac1{\\sin}$, $\\sec=\\frac1{\\cos}$, $\\cot=\\frac1{\\tan}$.', 'On the **unit circle** (radius 1) the point at angle θ is $(\\cos\\theta,\\ \\sin\\theta)$ and $\\tan\\theta=\\frac yx$.'] },
      { t: 'table', head: ['Angle', 'sin', 'cos', 'tan'], rows: [['30°', '1/2', '√3/2', '√3/3'], ['45°', '√2/2', '√2/2', '1'], ['60°', '√3/2', '1/2', '√3']] },
      { t: 'h', text: 'Any angle: reference angles and signs' },
      { t: 'formula', items: ['The **reference angle** is the small angle between the terminal side and the x-axis (always 0° to 90°).', 'Quadrant II: $180^\\circ-\\theta$. Quadrant III: $\\theta-180^\\circ$. Quadrant IV: $360^\\circ-\\theta$.', 'Value = (value of the reference angle) with the **sign** of the quadrant: **A**ll **S**tudents **T**ake **C**alculus (I all, II sine, III tangent, IV cosine).'] },
      { t: 'ex', title: 'Find the exact value of $\\sin300^\\circ$.', steps: ['300° is in quadrant IV; the reference angle is $360-300=60^\\circ$.', '$\\sin60^\\circ=\\frac{\\sqrt3}{2}$.', 'Sine is negative in quadrant IV, so $\\sin300^\\circ=-\\frac{\\sqrt3}{2}$.'], ans: '$-\\frac{\\sqrt3}{2}$' },
    ],
    tricks: [
      'Memorize 30°, 45°, 60° from the two special triangles (1, √3, 2) and (1, 1, √2).',
      'Degrees → radians: × π/180. Radians → degrees: × 180/π. Write it so the unwanted unit cancels.',
      'Reference angle first (for the NUMBER), quadrant second (for the SIGN).',
      'All Students Take Calculus tells you which functions are positive in each quadrant.',
      'sin 0 = 0, cos 0 = 1, sin 90° = 1, cos 90° = 0.',
    ],
    quiz: gen(['degToRad', 'radToDeg', 'trigValue', 'refAngle', 'sixFn', 'quadSign', 'radianArc'], 7, 1202),
  },
  {
    id: 'm-trig-identities', subject: 'math', title: 'Trig: Identities & Solving Trig Equations', minutes: 40,
    blurb: 'The Pythagorean and reciprocal identities, simplifying expressions, and solving simple trig equations.',
    videos: [VID.ocPythId, VID.ocSimplifyTrig, VID.ocSolveTrig],
    interactive: { k: 'flash', data: { frontLabel: 'IDENTITY', cards: [['$\\sin^2\\theta+\\cos^2\\theta$', '$=1$'], ['$1+\\tan^2\\theta$', '$=\\sec^2\\theta$'], ['$1+\\cot^2\\theta$', '$=\\csc^2\\theta$'], ['$\\tan\\theta$', '$=\\dfrac{\\sin\\theta}{\\cos\\theta}$'], ['$\\cot\\theta$', '$=\\dfrac{\\cos\\theta}{\\sin\\theta}$'], ['$\\sec\\theta$', '$=\\dfrac1{\\cos\\theta}$'], ['$\\csc\\theta$', '$=\\dfrac1{\\sin\\theta}$'], ['Period of sin and cos', '$2\\pi$ (360°)'], ['Period of tan', '$\\pi$ (180°)']] } },
    blocks: [
      { t: 'h', text: 'The identities' },
      { t: 'formula', items: ['An **identity** is an equation that is true for every angle.', '**Pythagorean:** $\\sin^2\\theta+\\cos^2\\theta=1$, $\\ 1+\\tan^2\\theta=\\sec^2\\theta$, $\\ 1+\\cot^2\\theta=\\csc^2\\theta$.', '**Quotient:** $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$, $\\ \\cot\\theta=\\frac{\\cos\\theta}{\\sin\\theta}$.', '**Reciprocal:** $\\sec\\theta=\\frac1{\\cos\\theta}$, $\\ \\csc\\theta=\\frac1{\\sin\\theta}$.'] },
      { t: 'ex', title: '$\\sin\\theta=\\frac45$ and θ is in quadrant I. Find $\\cos\\theta$.', steps: ['$\\cos^2\\theta=1-\\sin^2\\theta=1-\\frac{16}{25}=\\frac9{25}$.', '$\\cos\\theta=\\pm\\frac35$.', 'Cosine is positive in quadrant I, so $\\cos\\theta=\\frac35$.'], ans: '$\\frac35$' },
      { t: 'h', text: 'Simplifying trig expressions' },
      { t: 'formula', items: ['Strategy: turn everything into sine and cosine, then cancel.', 'Spot $1-\\sin^2\\theta=\\cos^2\\theta$ and $1-\\cos^2\\theta=\\sin^2\\theta$.', 'Spot $\\tan^2\\theta+1=\\sec^2\\theta$ and $\\sec^2\\theta-\\tan^2\\theta=1$.'] },
      { t: 'ex', title: 'Simplify $\\tan\\theta\\cdot\\cos\\theta$.', steps: ['$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$.', '$\\frac{\\sin\\theta}{\\cos\\theta}\\cdot\\cos\\theta=\\sin\\theta$.'], ans: '$\\sin\\theta$' },
      { t: 'h', text: 'Solving trig equations' },
      { t: 'formula', items: ['Step 1: get the trig function alone ($2\\sin x+\\sqrt3=0\\to\\sin x=-\\frac{\\sqrt3}{2}$).', 'Step 2: find the reference angle, then use the quadrants (sine: I, II positive; cosine: I, IV positive; tangent: I, III positive).', 'Step 3: for **all** solutions add the period: $2\\pi n$ for sine and cosine, $\\pi n$ for tangent (n is any integer).'] },
      { t: 'ex', title: 'Solve $\\sin x=\\frac12$ for $0\\le x<2\\pi$.', steps: ['sin 30° = ½, so the reference angle is π/6.', 'Sine is positive in quadrants I and II: $x=\\frac\\pi6$ and $x=\\pi-\\frac\\pi6=\\frac{5\\pi}6$.'], ans: '$x=\\frac\\pi6,\\ \\frac{5\\pi}6$' },
    ],
    tricks: [
      'Pythagorean identity: after the square root you get ±, so use the quadrant to choose the sign.',
      'Stuck simplifying? Change everything to sin and cos.',
      'Each of sin, cos, tan has TWO angles in one turn: use the reference angle in the two correct quadrants.',
      'Isolate the trig function first, just like solving 2x + 3 = 0.',
      '“All solutions” means add 2πn (sin, cos) or πn (tan).',
    ],
    quiz: gen(['pythId', 'simplifyTrig', 'solveTrigLin', 'solveTrig', 'solveTrigAll'], 7, 1303),
  },
  {
    id: 'm-trig-graphs', subject: 'math', title: 'Trig: Graphs of Sine & Cosine', minutes: 35,
    blurb: 'Amplitude, period, midline, phase shift and periodic values of sine and cosine waves.',
    videos: [VID.ocGraphTrig, VID.ocPeriodic],
    interactive: { k: 'flash', data: { frontLabel: 'IN y = A sin(Bx − C) + D', cards: [['A', 'amplitude = |A| (how tall the wave is)'], ['B', 'period = $2\\pi\\div B$ (how long one wave is)'], ['C ÷ B', 'phase shift (slides left or right)'], ['D', 'midline $y=D$ (vertical shift)'], ['Range', 'from $D-|A|$ to $D+|A|$'], ['sin 0', '0, so sine starts on the midline'], ['cos 0', '1, so cosine starts at the top'], ['Negative A', 'flips the wave upside down'], ['Domain', 'all real numbers']] } },
    blocks: [
      { t: 'h', text: 'Amplitude, period and midline' },
      { t: 'formula', items: ['The graphs of sine and cosine are smooth waves that repeat. For $y=A\\sin(Bx)+D$ (or cosine):', '**Amplitude** $=|A|$, the height above the middle (never negative).', '**Period** $=\\dfrac{2\\pi}{B}$, the length of one full wave.', '**Midline** $y=D$; the **range** is from $D-|A|$ to $D+|A|$. The domain is all real numbers.'] },
      { t: 'ex', title: 'For $y=3\\sin(2x)+1$ find the amplitude, period and range.', steps: ['Amplitude $=|3|=3$.', 'Period $=\\frac{2\\pi}{2}=\\pi$.', 'Midline $y=1$, so the range is $1-3=-2$ to $1+3=4$.'], ans: 'amp 3, period π, range [−2, 4]' },
      { t: 'h', text: 'Starting points and shifts' },
      { t: 'formula', items: ['Sine starts on the midline and goes up (sin 0 = 0). Cosine starts at the maximum (cos 0 = 1). A negative A flips them.', 'To graph one wave, mark 5 key points: start, quarter, half, three-quarter and end of one period.', '**Phase shift:** in $y=\\sin(x-c)$ set the inside to 0. $x-c$ shifts RIGHT by c; $x+c$ shifts LEFT by c.'] },
      { t: 'ex', title: 'How is $y=\\sin\\left(x-\\frac\\pi2\\right)$ different from $y=\\sin x$?', steps: ['Set the inside equal to 0: $x-\\frac\\pi2=0$, so $x=\\frac\\pi2$.', 'The wave starts at $\\frac\\pi2$ instead of 0: it is shifted $\\frac\\pi2$ to the RIGHT.'], ans: 'shifted π/2 to the right' },
      { t: 'h', text: 'Periodic values' },
      { t: 'formula', items: ['Sine and cosine repeat every 360° (2π): $\\sin(\\theta+360^\\circ)=\\sin\\theta$.', 'To evaluate a big angle, subtract 360° until it is between 0° and 360°, then use the unit circle.'] },
      { t: 'ex', title: 'Find $\\sin750^\\circ$.', steps: ['$750-360=390$, and $390-360=30$.', 'So $\\sin750^\\circ=\\sin30^\\circ=\\frac12$.'], ans: '$\\frac12$' },
    ],
    tricks: [
      'Amplitude is |A|: ignore the minus sign.',
      'Period = 2π ÷ B. A fraction for B makes the wave LONGER; a bigger B makes it SHORTER.',
      'Range = midline ± amplitude.',
      'Shifts: x − c moves right, x + c moves left (set the inside to 0).',
      'Big angle? Subtract 360° (or 2π) until it is small, then use the unit circle.',
    ],
    quiz: gen(['ampPeriod', 'trigRange', 'phaseShift', 'graphMatch', 'periodicVal', 'trigAtZero'], 7, 1404),
  },
]

const D = (kinds: string[], n: number, seed: number) => gen(kinds, n, seed)

export const CHECKS_NEW: Record<string, Checks> = {
  'g-extras': {
    video: [
      q('The surface area of a cylinder is:', ['$2\\pi r^2+2\\pi rh$', '$\\pi r^2h$', '$2\\pi rh$', '$\\pi r^2+\\pi rh$'], 0, S('**Words:** the **surface area** is the total area of the outside.', '**Step 1:** a cylinder has 2 circles (top and bottom): $2\\pi r^2$.', '**Step 2:** plus the curved side (a rolled-up rectangle): $2\\pi rh$.', '**Answer: $2\\pi r^2+2\\pi rh$**')),
      q('The length of an arc with central angle θ (in degrees) on a circle of radius r is:', ['$\\dfrac{\\theta}{360}\\times2\\pi r$', '$\\dfrac{\\theta}{360}\\times\\pi r^2$', '$\\theta\\times\\pi r$', '$\\dfrac{\\theta}{180}\\times\\pi r^2$'], 0, S('**Words:** an **arc** is a part of the circle’s edge, so it is the same FRACTION of the circumference as the angle is of 360°.', '**Step 1 (fraction):** $\\frac{\\theta}{360}$.', '**Step 2 (circumference):** $2\\pi r$.', '**Answer: $\\frac{\\theta}{360}\\times2\\pi r$**')),
      q('An altitude of a triangle:', ['makes a 90° angle with the opposite side', 'goes to the midpoint of the opposite side', 'splits the angle into two equal angles', 'is always inside the triangle'], 0, S('**Words:** an **altitude** is the height of the triangle.', '**Step 1:** it joins a vertex to the opposite side and meets it at a right angle (90°).', '**Step 2:** a median goes to the midpoint; an angle bisector splits the angle.', '**Answer: it makes a 90° angle with the opposite side**')),
    ],
    learn: D(['cylSA', 'arcSector', 'triSegments'], 3, 2101),
    lab: D(['cylSA', 'arcSector'], 2, 2102),
    more: D(['cylSA', 'arcSector', 'triSegments', 'medianSolve'], 6, 2103),
  },
  'm-trig-angles': {
    video: [
      q('180° is equal to:', ['π radians', '2π radians', '$\\frac\\pi2$ radians', '360 radians'], 0, S('**Words:** a full turn is 360° = 2π radians.', '**Step 1 (divide by 2):** 180° = π radians.', '**Answer: π radians**')),
      q('The cosecant (csc) of an angle is the reciprocal of:', ['sine', 'cosine', 'tangent', 'secant'], 0, S('**Words:** a **reciprocal** is a flipped fraction.', '**Step 1:** csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.', '**Answer: sine**')),
      q('$\\cos60^\\circ=$', ['$\\frac12$', '$\\frac{\\sqrt3}{2}$', '$\\frac{\\sqrt2}{2}$', '$\\sqrt3$'], 0, S('**Step 1 (30-60-90 triangle, sides 1, √3, 2; the side next to 60° is 1):** cos = adjacent ÷ hypotenuse.', '**Step 2:** $\\frac12$.', '**Answer: $\\frac12$**')),
      q('The reference angle of $300^\\circ$ is:', ['$60^\\circ$', '$30^\\circ$', '$120^\\circ$', '$240^\\circ$'], 0, S('**Words:** the **reference angle** is the small angle between the terminal side and the x-axis.', '**Step 1 (300° is in quadrant IV):** 360° − 300°.', '**Step 2:** 60°.', '**Answer: 60°**')),
    ],
    learn: D(['degToRad', 'sixFn', 'trigValue'], 3, 2201),
    lab: D(['trigValue', 'quadSign'], 2, 2202),
    more: D(['degToRad', 'radToDeg', 'refAngle', 'trigValue', 'radianArc', 'quadSign'], 6, 2203),
  },
  'm-trig-identities': {
    video: [
      q('$\\sin^2\\theta+\\cos^2\\theta=$', ['1', '0', '2', '$\\sin\\theta\\cos\\theta$'], 0, S('**Words:** this is the **Pythagorean identity**: it comes from the unit circle, where $x^2+y^2=1$.', '**Answer: 1**')),
      q('$\\sec\\theta$ is equal to:', ['$\\dfrac1{\\cos\\theta}$', '$\\dfrac1{\\sin\\theta}$', '$\\dfrac{\\cos\\theta}{\\sin\\theta}$', '$\\dfrac{\\sin\\theta}{\\cos\\theta}$'], 0, S('**Words:** the reciprocal identities flip the fraction.', '**Step 1:** sec is the reciprocal of cos.', '**Answer: $\\frac1{\\cos\\theta}$**')),
      q('The period of the sine and cosine functions is:', ['$2\\pi$', '$\\pi$', '$\\frac\\pi2$', '$4\\pi$'], 0, S('**Words:** the **period** is how long it takes the function to repeat.', '**Step 1:** sine and cosine repeat every full turn: 2π (360°). (Tangent repeats every π.)', '**Answer: 2π**')),
    ],
    learn: D(['pythId', 'simplifyTrig', 'solveTrig'], 3, 2301),
    lab: D(['simplifyTrig', 'solveTrigLin'], 2, 2302),
    more: D(['pythId', 'simplifyTrig', 'solveTrigLin', 'solveTrig', 'solveTrigAll', 'simplifyTrig'], 6, 2303),
  },
  'm-trig-graphs': {
    video: [
      q('In $y=A\\sin(Bx)$ the amplitude is:', ['$|A|$', '$B$', '$\\dfrac{2\\pi}{B}$', '$A+B$'], 0, S('**Words:** the **amplitude** is how high the wave goes above its middle line.', '**Step 1:** it is the absolute value of the number in front of sin: |A|.', '**Answer: |A|**')),
      q('$\\sin(\\theta+360^\\circ)$ is equal to:', ['$\\sin\\theta$', '$-\\sin\\theta$', '$\\cos\\theta$', '0'], 0, S('**Words:** sine is **periodic**: it repeats every 360°.', '**Step 1:** adding a full turn lands on the same point of the circle.', '**Answer: $\\sin\\theta$**')),
    ],
    learn: D(['ampPeriod', 'phaseShift', 'periodicVal'], 3, 2401),
    lab: D(['trigRange', 'trigAtZero'], 2, 2402),
    more: D(['ampPeriod', 'trigRange', 'phaseShift', 'graphMatch', 'periodicVal'], 5, 2403),
  },
}
