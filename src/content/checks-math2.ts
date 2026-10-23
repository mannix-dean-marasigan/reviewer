import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_MATH2: Record<string, Checks> = {
  'm-lines': {
    drill: ['slope'],
    video: [
      q('Find the slope of the line through (1, 2) and (3, 6).', ['2', '1/2', '4', '−2'], 0, '$m=\\frac{6-2}{3-1}=\\frac42=2$.'),
      q('In $y=2x+3$, the y-intercept is:', ['3', '2', '−3', '1.5'], 0, 'In $y=mx+b$, $b$ is the y-intercept; here $b=3$.'),
    ],
    learn: [
      q('The line through (2, 5) and (4, 9) has the equation:', ['$y=2x+1$', '$y=2x+5$', '$y=4x-3$', '$y=x+3$'], 0, 'Slope $=\\frac{9-5}{4-2}=2$. Then $5=2(2)+b$ → $b=1$.'),
      q('A line parallel to $y=3x-2$ and passing through the origin is:', ['$y=3x$', '$y=-3x$', '$y=\\frac13x$', '$y=3x-2$'], 0, 'Parallel means the same slope (3). Through the origin means $b=0$.'),
      q('A line has slope 4. A line perpendicular to it has slope:', ['$-\\frac14$', '$\\frac14$', '$-4$', '$4$'], 0, 'Perpendicular slopes multiply to −1: negative reciprocal of 4 is $-\\frac14$.'),
    ],
    lab: [
      q('In the lab put the points at (1, 2) and (4, 8). The slope is:', ['2', '3', '6', '1/2'], 0, '$\\frac{8-2}{4-1}=\\frac63=2$. The lab also shows $y=2x$.'),
      q('If both points have the same x-value, the line is:', ['vertical with undefined slope', 'horizontal with slope 0', 'a line with slope 1', 'not a line'], 0, 'The run is 0, so the slope formula divides by zero: the line is vertical.'),
    ],
    more: [
      q('The slope of $3x+4y=12$ is:', ['$-\\frac34$', '$\\frac34$', '$-\\frac43$', '3'], 0, 'Solve for y: $4y=-3x+12$ → $y=-\\frac34x+3$.'),
      q('The distance between $(-3,1)$ and $(2,13)$ is:', ['13', '17', '12', '5'], 0, '$\\sqrt{5^2+12^2}=\\sqrt{169}=13$.'),
      q('What is the slope of a line parallel to $y=5x-2$?', ['5', '−5', '$\\frac15$', '$-\\frac15$'], 0, S('**Words:** **parallel** lines have the SAME slope.', '**Step 1 (slope of the given line, the number in front of x):** 5.', '**Step 2 (same slope):** 5.', '**Answer: 5**')),
      q('On the line $y=-2x+5$, when $x=3$, $y=$', ['−1', '11', '1', '−11'], 0, '$-2(3)+5=-1$.'),
    ],
  },
  'm-sequences': {
    drill: ['arith'],
    video: [
      q('In 3, 7, 11, 15, … the common difference is:', ['4', '3', '7', '−4'], 0, 'Each term adds 4.'),
      q('In 2, 6, 18, 54, … each term is found by:', ['multiplying by 3', 'adding 4', 'adding 3', 'squaring'], 0, 'Ratios are constant ($6/2=18/6=3$): geometric with $r=3$.'),
    ],
    learn: [
      q('The 10th term of 4, 7, 10, 13, … is:', ['31', '34', '40', '30'], 0, '$a_{10}=4+9(3)=31$.'),
      q('The 6th term of the geometric sequence 5, 10, 20, … is:', ['160', '320', '100', '80'], 0, '$a_6=5\\cdot2^{5}=5\\cdot32=160$.'),
    ],
    lab: [
      q('In the lab choose arithmetic, first term 3, $d=4$, $n=10$. The 10th term is:', ['39', '43', '36', '40'], 0, '$3+9(4)=39$. The lab shows the sum $\\frac{10}{2}(3+39)=210$.'),
      q('Geometric with first term 2, $r=3$. The 5th term is:', ['162', '486', '54', '30'], 0, '$2\\cdot3^4=2\\cdot81=162$.'),
    ],
    more: [
      q('The sum of the integers from 1 to 50 is:', ['1,275', '1,250', '2,550', '1,225'], 0, '$\\frac{50(51)}2=1275$.'),
      q('The 20th term of 100, 95, 90, … is:', ['5', '0', '−5', '10'], 0, '$d=-5$. $a_{20}=100+19(-5)=5$.'),
      q('Which sequence is geometric?', ['2, 6, 18, 54', '2, 5, 8, 11', '1, 4, 9, 16', '3, 6, 9, 12'], 0, 'Only the first has a constant ratio (3). The second and fourth are arithmetic; the third is squares.'),
      q('The sum of the first 6 terms of 2, 4, 8, … is:', ['126', '64', '62', '128'], 0, '$S_6=\\frac{2(2^6-1)}{2-1}=2(63)=126$.'),
    ],
  },
  'm-angles': {
    drill: ['angles'],
    video: [
      q('Two angles of a triangle are 50° and 60°. The third is:', ['70°', '110°', '80°', '60°'], 0, '$180-50-60=70$.'),
      q('The supplement of 65° is:', ['115°', '25°', '295°', '35°'], 0, 'Supplementary angles add to 180°: $180-65=115$.'),
    ],
    learn: [
      q('Two vertical angles measure $(3x+10)°$ and $(5x-20)°$. Find $x$.', ['15', '5', '10', '30'], 0, 'Vertical angles are equal: $3x+10=5x-20$ → $30=2x$ → $x=15$.'),
      q('Two remote interior angles of a triangle are 45° and 55°. The exterior angle is:', ['100°', '80°', '180°', '10°'], 0, 'Exterior angle = sum of the two remote interior angles: $45+55=100$.'),
      q('The sum of the interior angles of a pentagon is:', ['540°', '360°', '720°', '450°'], 0, '$(5-2)\\times180=540$.'),
    ],
    lab: [
      q('In the lab set A = 55° and B = 65°. The exterior angle at C is:', ['120°', '60°', '180°', '110°'], 0, '$C=60°$. Exterior $=180-60=120=A+B$.'),
      q('If A = 40° and B = 70°, the exterior angle at C is:', ['110°', '70°', '30°', '140°'], 0, 'Exterior = $A+B=110°$ (and the interior C is 70°).'),
    ],
    more: [
      q('Each interior angle of a regular hexagon is:', ['120°', '108°', '135°', '60°'], 0, '$\\frac{(6-2)180}{6}=120$.'),
      q('Parallel lines are cut by a transversal. An alternate interior angle is 72°. The other is:', ['72°', '108°', '18°', '144°'], 0, 'Alternate interior angles are equal.'),
      q('The angles of a triangle are $x$, $2x$ and $3x$. The largest is:', ['90°', '60°', '30°', '120°'], 0, '$6x=180$ → $x=30$. Largest $=90°$.'),
      q('Each interior angle of a regular polygon is 150°. How many sides?', ['12', '10', '8', '15'], 0, 'Exterior angle $=30°$, so $n=360/30=12$.'),
    ],
  },
  'm-shapes': {
    drill: ['circle'],
    video: [
      q('The area of a rectangle 8 by 5 is:', ['40', '26', '13', '80'], 0, '$8\\times5=40$.'),
      q('The circumference of a circle with radius 7 is:', ['$14\\pi$', '$49\\pi$', '$7\\pi$', '$28\\pi$'], 0, '$C=2\\pi r=14\\pi$.'),
    ],
    learn: [
      q('A triangle has base 10 and height 6. Its area is:', ['30', '60', '16', '15'], 0, '$\\frac12(10)(6)=30$.'),
      q('The surface area of a cube with side 3 is:', ['54', '27', '18', '36'], 0, '$6s^2=6\\cdot9=54$.'),
      q('An angle inscribed in a semicircle measures:', ['90°', '180°', '45°', '60°'], 0, 'It is half of the 180° central angle.'),
    ],
    lab: [
      q('In the lab set the arc to 100°. The inscribed angle is:', ['50°', '100°', '200°', '25°'], 0, 'Inscribed angle = half the central angle.'),
      q('When the arc is 180° (a diameter), the inscribed angle is:', ['90°', '180°', '45°', '360°'], 0, '$180/2=90$. This is the right-angle-in-a-semicircle theorem.'),
    ],
    more: [
      q('The volume of a sphere with radius 3 is:', ['$36\\pi$', '$12\\pi$', '$27\\pi$', '$108\\pi$'], 0, '$\\frac43\\pi(27)=36\\pi$.'),
      q('A sector with a 90° angle and radius 4 has area:', ['$4\\pi$', '$16\\pi$', '$8\\pi$', '$2\\pi$'], 0, '$\\frac{90}{360}\\pi(16)=4\\pi$.'),
      q('The volume of a cylinder with radius 2 and height 5 is:', ['$20\\pi$', '$10\\pi$', '$40\\pi$', '$100\\pi$'], 0, '$\\pi r^2h=\\pi(4)(5)=20\\pi$.'),
      q('A rhombus has diagonals 6 and 8. Its area is:', ['24', '48', '14', '28'], 0, '$\\frac12d_1d_2=\\frac12(6)(8)=24$.'),
    ],
  },
  'm-similar': {
    drill: ['pythag'],
    video: [
      q('A right triangle has legs 5 and 12. Its hypotenuse is:', ['13', '17', '15', '10'], 0, '5-12-13 triple.'),
      q('Two similar triangles have a side ratio of 1:3. Their area ratio is:', ['1:9', '1:3', '1:6', '2:6'], 0, 'Areas scale by the square of the side ratio: $1^2:3^2=1:9$.'),
    ],
    learn: [
      q('A right triangle has hypotenuse 25 and one leg 7. The other leg is:', ['24', '18', '32', '20'], 0, '7-24-25 triple: $\\sqrt{625-49}=\\sqrt{576}=24$.'),
      q('A 45-45-90 triangle has legs of 6. The hypotenuse is:', ['$6\\sqrt2$', '$12$', '$6\\sqrt3$', '$6$'], 0, 'Hypotenuse = leg × $\\sqrt2$.'),
      q('A 5-ft pole casts a 3-ft shadow. At the same time a building casts a 24-ft shadow. The building is:', ['40 ft', '14.4 ft', '36 ft', '24 ft'], 0, '$\\frac53=\\frac h{24}$ → $h=\\frac{5\\times24}3=40$.'),
    ],
    lab: [
      q('In the lab set $k=2$. The new triangle’s area is the old area times:', ['4', '2', '8', '6'], 0, 'Area scales by $k^2=4$ (24 → 96).'),
      q('At $k=3$ the lengths are ×3 and the volumes of matching solids would be:', ['×27', '×9', '×3', '×81'], 0, 'Volume scales by $k^3=27$.'),
    ],
    more: [
      q('The diagonal of a 9 by 12 rectangle is:', ['15', '21', '18', '13'], 0, '9-12-15 (3-4-5 scaled by 3).'),
      q('An equilateral triangle has side 10. Its height is:', ['$5\\sqrt3$', '$10\\sqrt3$', '$5$', '$\\frac{10}{\\sqrt3}$'], 0, 'Height $=\\frac{\\sqrt3}2\\times10=5\\sqrt3$.'),
      q('In a 30-60-90 triangle the short leg is 5. The long leg is:', ['$5\\sqrt3$', '10', '$\\frac{5}{\\sqrt3}$', '$5\\sqrt2$'], 0, 'Long leg = short leg × $\\sqrt3$.'),
      q('Which set of lengths forms a right triangle?', ['9, 40, 41', '7, 8, 9', '5, 6, 7', '4, 5, 6'], 0, '$9^2+40^2=81+1600=1681=41^2$.'),
    ],
  },
  'm-trig': {
    video: [
      q('$\\sin30°=$', ['$\\frac12$', '$\\frac{\\sqrt3}2$', '1', '$\\frac{\\sqrt2}2$'], 0, 'One of the special values to memorize.'),
      q('In a right triangle, $\\tan\\theta$ equals:', ['opposite ÷ adjacent', 'adjacent ÷ hypotenuse', 'opposite ÷ hypotenuse', 'hypotenuse ÷ opposite'], 0, 'SOH-CAH-TOA: TOA = tangent is opposite over adjacent.'),
    ],
    learn: [
      q('A right triangle has opposite = 6 and adjacent = 8. $\\tan\\theta=$', ['$\\frac34$', '$\\frac43$', '$\\frac35$', '$\\frac45$'], 0, '$\\frac68=\\frac34$.'),
      q('$\\cos60°=$', ['$\\frac12$', '$\\frac{\\sqrt3}2$', '$\\sqrt3$', '1'], 0, 'Cosine of 60° is one half (and sine of 30° too).'),
      q('If $\\sin\\theta=\\frac35$ (acute θ), then $\\cos\\theta=$', ['$\\frac45$', '$\\frac35$', '$\\frac54$', '$\\frac25$'], 0, '$\\cos^2\\theta=1-\\frac9{25}=\\frac{16}{25}$ → $\\frac45$.'),
    ],
    lab: [
      q('In the lab at 45°, $\\tan\\theta$ is:', ['1', '0.5', '0.71', '1.41'], 0, 'Opposite = adjacent at 45°, so $\\tan45°=1$ and sin = cos ≈ 0.71.'),
      q('As θ goes from 10° to 80°, $\\sin\\theta$:', ['increases', 'decreases', 'stays the same', 'becomes bigger than 1'], 0, 'The opposite side grows relative to the hypotenuse; sin never exceeds 1.'),
    ],
    more: [
      q('From 20 m away the angle of elevation to the top of a tower is 60°. The tower is about:', ['$20\\sqrt3$ m', '$10$ m', '$\\frac{20}{\\sqrt3}$ m', '$40$ m'], 0, '$\\tan60°=\\frac h{20}$ → $h=20\\sqrt3\\approx34.6$ m.'),
      q('A 20 m hypotenuse and a 30° angle: the side opposite the 30° angle is:', ['10', '20', '$10\\sqrt3$', '5'], 0, '$20\\sin30°=10$.'),
      q('If $\\tan\\theta=1$ (acute θ), then θ =', ['45°', '30°', '60°', '90°'], 0, 'Opposite = adjacent → isosceles right triangle → 45°.'),
      q('If $\\cos\\theta=\\frac5{13}$ (acute), then $\\sin\\theta=$', ['$\\frac{12}{13}$', '$\\frac{5}{12}$', '$\\frac{8}{13}$', '$\\frac{13}{12}$'], 0, 'Opposite $=\\sqrt{169-25}=12$, so $\\sin=\\frac{12}{13}$.'),
    ],
  },
  'm-counting': {
    drill: ['combos', 'mean'],
    video: [
      q('3 shirts and 4 pants make how many different outfits?', ['12', '7', '24', '81'], 0, 'Choices multiply: $3\\times4=12$.'),
      q('$P(5,2)=$', ['20', '10', '25', '120'], 0, '$5\\times4=20$ ordered pairs.'),
    ],
    learn: [
      q('In how many ways can 4 different books be arranged on a shelf?', ['24', '16', '12', '4'], 0, '4 choices for the first spot, 3 for the next, then 2, then 1: $4\\times3\\times2\\times1=4!=24$.'),
      q('A bag has 5 red and 3 blue marbles. The probability of drawing a red one is:', ['$\\frac58$', '$\\frac35$', '$\\frac53$', '$\\frac12$'], 0, 'Favorable / total $=\\frac5{5+3}$.'),
      q('The mean of 4, 8, 6, 10, 12 is:', ['8', '10', '6', '7'], 0, 'Sum $=40$, divided by 5 is 8.'),
    ],
    lab: [
      q('In the lab set $n=6$, $r=3$. The number of combinations $C(6,3)$ is:', ['20', '120', '6', '18'], 0, '$\\frac{6\\cdot5\\cdot4}{3\\cdot2\\cdot1}=20$; the lab shows permutations $=120=20\\times3!$.'),
      q('$P(5,2)=20$. Then $C(5,2)=$', ['10', '20', '40', '5'], 0, '$C=P/r!=20/2=10$ (each pair is counted twice in a permutation).'),
    ],
    more: [
      q('How many distinct arrangements are there of the letters of “BOOK”?', ['12', '24', '6', '4'], 0, '$\\frac{4!}{2!}=12$ (the two O’s are identical).'),
      q('The median of 3, 9, 5, 7 is:', ['6', '5', '7', '6.5'], 0, 'Sorted: 3, 5, 7, 9. Average the middle two: $\\frac{5+7}2=6$.'),
      q('Two dice are rolled. P(sum = 8) is:', ['$\\frac5{36}$', '$\\frac16$', '$\\frac1{9}$', '$\\frac{8}{36}$'], 0, 'Pairs: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 of 36.'),
      q('A card is drawn from a standard 52-card deck. P(not an ace) is:', ['$\\frac{12}{13}$', '$\\frac{1}{13}$', '$\\frac{4}{52}$', '$\\frac{11}{13}$'], 0, '$1-\\frac4{52}=\\frac{48}{52}=\\frac{12}{13}$.'),
    ],
  },
  'm-sets': {
    video: [
      q('$n(A)=12$, $n(B)=9$ and $n(A\\cap B)=4$. Then $n(A\\cup B)=$', ['17', '21', '25', '8'], 0, '$12+9-4=17$.'),
      q('“All dogs are mammals” is drawn as:', ['the dogs circle inside the mammals circle', 'the mammals circle inside the dogs circle', 'two separate circles', 'two identical circles always'], 0, 'Every dog is a mammal, so dogs ⊂ mammals.'),
    ],
    learn: [
      q('A group of 60: 35 like A, 30 like B, 10 like both. How many like neither?', ['5', '15', '25', '0'], 0, 'At least one $=35+30-10=55$. Neither $=60-55=5$.'),
      q('“Some students are athletes” means:', ['at least one student is an athlete', 'all students are athletes', 'no student is an athlete', 'all athletes are students'], 0, '“Some” means at least one (and possibly all).'),
    ],
    lab: [
      q('In the lab: total 40, n(A) = 25, n(B) = 18, both = 10. How many are in neither?', ['7', '33', '3', '13'], 0, 'Union $=25+18-10=33$; neither $=40-33=7$.'),
      q('Why can “both” never be larger than the smaller set?', ['the overlap is part of each circle', 'because totals must be even', 'because of the rounding rule', 'it can be larger'], 0, 'The overlap sits inside both circles, so it cannot exceed either circle.'),
    ],
    more: [
      q('A class of 30: 20 like math, 15 like science, 5 like both. How many like neither?', ['0', '5', '10', '15'], 0, 'Union $=20+15-5=30$, so nobody is left over.'),
      q('All A are B. No B are C. Therefore:', ['No A are C', 'Some A are C', 'All C are A', 'All B are A'], 0, 'A sits inside B, and B does not touch C, so A does not touch C.'),
      q('40 take A, 25 take B, 10 take both. How many take exactly one?', ['45', '55', '35', '65'], 0, 'Only A $=30$, only B $=15$; total $=45$.'),
      q('In a universal set of 100, $n(A)=64$. Then $n(A^c)=$', ['36', '64', '164', '6.4'], 0, 'The complement is everything outside A: $100-64=36$.'),
    ],
  },
}
