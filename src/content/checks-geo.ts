import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_GEO: Record<string, Checks> = {
  'g-basics': {
    video: [
      q('Points that lie on the same line are called:', ['collinear', 'coplanar', 'concurrent', 'congruent'], 0, S('**Words:** “col-” sounds like “line”. **Collinear** = on the same line. (**Coplanar** = in the same plane.)', '**Step 1:** the question says “on the same line”.', '**Answer: collinear**')),
      q('The part of a line with TWO endpoints is called a:', ['segment', 'ray', 'plane', 'point'], 0, S('**Step 1:** a **ray** has one endpoint and goes on forever. A **line** has no endpoints.', '**Step 2:** a **segment** has two endpoints, so it has a measurable length.', '**Answer: segment**')),
    ],
    learn: [
      q('Which statement is TRUE?', ['Three non-collinear points determine exactly one plane.', 'Two points determine exactly one plane.', 'Three collinear points determine exactly one plane.', 'Any four points are coplanar.'], 0, S('**Idea:** “determine” means there is exactly one such figure.', '**Step 1:** two points only make a line; many planes can contain a line (like pages of a book on its spine). ✗', '**Step 2:** three points on one line also lie on many planes. ✗', '**Step 3:** three points NOT on one line make a triangle, and exactly one flat plane holds it. ✓', '**Answer: three non-collinear points determine exactly one plane.**')),
      q('Z is the midpoint of $\\overline{XY}$ and $XZ=9$. What is $XY$?', ['18', '9', '4.5', '81'], 0, S('**Words:** a **midpoint** splits a segment into two equal halves.', '**Step 1:** $XZ=ZY=9$.', '**Step 2 (Segment Addition Postulate):** $XY=XZ+ZY=9+9=18$.', '**Answer: 18**')),
      q('Which is the CONVERSE of “If a number is even, then it is divisible by 2”?', ['If a number is divisible by 2, then it is even.', 'If a number is not even, then it is not divisible by 2.', 'If a number is not divisible by 2, then it is not even.', 'If a number is even, then it is not divisible by 2.'], 0, S('**Words:** the **converse** swaps the “if” part and the “then” part.', '**Step 1:** p = “a number is even”, q = “it is divisible by 2”.', '**Step 2 (swap):** If q, then p.', '**Step 3 (write it):** If a number is divisible by 2, then it is even.', '**Answer: If a number is divisible by 2, then it is even.**')),
    ],
    lab: [
      q('In the activity, why is $AD=2\\times AC$ when C is the midpoint of $\\overline{AD}$?', ['The two halves AC and DC are equal, and together they make AD.', 'Because AD is always twice any segment.', 'Because C is on the line.', 'Because the plane is flat.'], 0, S('**Step 1:** C is the midpoint, so $AC=DC$.', '**Step 2 (Segment Addition Postulate):** $AD=AC+DC$.', '**Step 3:** since $DC=AC$, $AD=AC+AC=2\\times AC$.', '**Answer: the two halves are equal and together make AD.**')),
      q('C is the midpoint of $\\overline{AD}$ and $AD=30$. What is $AC$?', ['15', '60', '30', '10'], 0, S('**Step 1:** the midpoint splits AD into two equal halves.', '**Step 2:** $AC=AD\\div2=30\\div2=15$.', '**Answer: 15**')),
    ],
    more: [
      q('B is between A and C on a line. $AB=2x+1$, $BC=3x-2$ and $AC=24$. Find $x$.', ['5', '4', '6', '3'], 0, S('**Idea:** B is between A and C, so use the Segment Addition Postulate: $AB+BC=AC$.', '**Step 1:** $(2x+1)+(3x-2)=24$.', '**Step 2 (combine like terms):** $5x-1=24$.', '**Step 3 (add 1):** $5x=25$.', '**Step 4:** $x=5$.', '**Check:** $AB=11$, $BC=13$, and $11+13=24$ ✓', '**Answer: 5**')),
      q('What is the midpoint of the segment on a number line from $-4$ to $10$?', ['3', '6', '7', '-3'], 0, S('**Words:** the midpoint is exactly halfway between two numbers, so average them.', '**Step 1:** $\\frac{-4+10}{2}=\\frac{6}{2}$.', '**Step 2:** $=3$.', '**Check:** from −4 to 3 is 7 steps, and from 3 to 10 is 7 steps ✓', '**Answer: 3**')),
      q('The conditional “If $x=3$, then $x^2=9$” is true. Is its CONVERSE “If $x^2=9$, then $x=3$” also true?', ['No, because x could be −3', 'Yes, always', 'Yes, because 3² = 9', 'It cannot be tested'], 0, S('**Words:** a **counterexample** is one example that makes a statement false.', '**Step 1:** the converse says: whenever $x^2=9$, $x$ must be 3.', '**Step 2:** try $x=-3$: $(-3)^2=9$ but $x\\ne3$.', '**Step 3:** one counterexample is enough to make the converse false.', '**Answer: No, because x could be −3**')),
      q('What is the CONTRAPOSITIVE of “If it is Monday, then I have class”?', ['If I do not have class, then it is not Monday.', 'If I have class, then it is Monday.', 'If it is not Monday, then I do not have class.', 'If it is Monday, then I do not have class.'], 0, S('**Words:** contrapositive = swap AND negate.', '**Step 1:** p = “it is Monday”, q = “I have class”.', '**Step 2 (swap and add “not”):** If not q, then not p.', '**Step 3:** If I do not have class, then it is not Monday.', '**Answer: If I do not have class, then it is not Monday.**')),
    ],
  },
  'g-congruence': {
    video: [
      q('A triangle with three equal sides is called:', ['equilateral', 'isosceles', 'scalene', 'right'], 0, S('**Words:** “equi-” means equal and “lateral” means sides.', '**Step 1:** three equal sides → **equilateral**.', '**Answer: equilateral**')),
      q('Which shortcut uses three pairs of equal SIDES?', ['SSS', 'SAS', 'ASA', 'AAS'], 0, S('**Step 1:** each letter stands for one thing: S = side, A = angle.', '**Step 2:** three S’s means three pairs of equal sides.', '**Answer: SSS**')),
    ],
    learn: [
      q('A triangle has sides 7, 7 and 10. By its sides it is:', ['isosceles', 'equilateral', 'scalene', 'right'], 0, S('**Words:** **isosceles** = exactly two equal sides.', '**Step 1:** two of the sides are 7, and the third (10) is different.', '**Answer: isosceles**')),
      q('Two triangles have two pairs of equal angles and the side BETWEEN those angles is equal. Which shortcut proves them congruent?', ['ASA', 'AAS', 'SAS', 'SSA'], 0, S('**Step 1:** the order of what you know is Angle, Side, Angle (the side sits between the two angles).', '**Step 2:** that is **ASA**. (AAS is when the side is NOT between the angles.)', '**Answer: ASA**')),
      q('$\\triangle PQR\\cong\\triangle XYZ$. Which side of $\\triangle XYZ$ corresponds to $QR$?', ['YZ', 'XY', 'XZ', 'ZX'], 0, S('**Idea (CPCTC):** the letters of a congruence statement match IN ORDER.', '**Step 1:** P↔X, Q↔Y, R↔Z.', '**Step 2:** side QR uses Q and R, so it matches the side using Y and Z.', '**Answer: YZ**')),
    ],
    lab: [
      q('Which of these does NOT prove two triangles congruent?', ['AAA (three equal angles)', 'SSS', 'SAS', 'ASA'], 0, S('**Step 1:** AAA gives triangles with the same SHAPE, but one can be a big copy of the other.', '**Step 2:** so the triangles are similar, not necessarily congruent.', '**Answer: AAA**')),
      q('The HL shortcut works only for:', ['right triangles', 'acute triangles', 'equilateral triangles', 'any triangle'], 0, S('**Words:** **HL** = Hypotenuse-Leg. The hypotenuse exists only in a **right** triangle.', '**Step 1:** if two right triangles have an equal hypotenuse and an equal leg, the third side follows from Pythagoras, so they are congruent.', '**Answer: right triangles**')),
    ],
    more: [
      q('An equilateral triangle has side 8. Its perimeter is:', ['24', '16', '64', '32'], 0, S('**Words:** the **perimeter** is the distance around: add all the sides.', '**Step 1:** an equilateral triangle has three equal sides of 8.', '**Step 2:** $8+8+8=24$.', '**Answer: 24**')),
      q('A triangle has angles 30°, 60° and 90°. By its angles it is:', ['right', 'acute', 'obtuse', 'equiangular'], 0, S('**Words:** **right** = one angle of exactly 90°.', '**Step 1:** the angle 90° is there.', '**Answer: right**')),
      q('An isosceles triangle has two equal angles of 55° each. The third angle is:', ['70°', '55°', '110°', '125°'], 0, S('**Step 1:** the three angles add up to 180°.', '**Step 2:** $55+55=110$.', '**Step 3:** $180-110=70°$.', '**Answer: 70°**')),
      q('A triangle has angles 100°, 40° and 40°. By its angles it is:', ['obtuse', 'acute', 'right', 'equilateral'], 0, S('**Words:** **obtuse** = one angle bigger than 90°.', '**Step 1:** 100° is bigger than 90°.', '**Answer: obtuse** (and it is also isosceles, because two angles are equal).')),
    ],
  },
  'g-quads': {
    video: [
      q('Opposite sides of a parallelogram are:', ['parallel and equal', 'perpendicular', 'only equal', 'only parallel'], 0, S('**Words:** a **parallelogram** has two pairs of parallel sides.', '**Step 1:** the opposite sides are parallel, and they are also equal in length.', '**Answer: parallel and equal**')),
      q('The four angles of ANY quadrilateral add up to:', ['360°', '180°', '270°', '540°'], 0, S('**Step 1:** a diagonal splits a quadrilateral into 2 triangles.', '**Step 2:** each triangle has angles adding to 180°.', '**Step 3:** $2\\times180=360°$.', '**Answer: 360°**')),
    ],
    learn: [
      q('Two consecutive angles of a parallelogram are $4x$ and $5x$. What is the smaller angle?', ['80°', '100°', '20°', '40°'], 0, S('**Step 1:** consecutive angles of a parallelogram add to 180°.', '**Step 2:** $4x+5x=180$, so $9x=180$.', '**Step 3:** $x=20$.', '**Step 4 (smaller angle):** $4x=80°$.', '**Answer: 80°**')),
      q('A rhombus has a perimeter of 52. What is the length of one side?', ['13', '26', '52', '8'], 0, S('**Words:** a **rhombus** has four equal sides. The **perimeter** is the sum of the sides.', '**Step 1:** four equal sides add to 52.', '**Step 2:** $52\\div4=13$.', '**Answer: 13**')),
      q('In an isosceles trapezoid one base angle is 65°. Each angle at the OTHER base is:', ['115°', '65°', '25°', '295°'], 0, S('**Words:** in an **isosceles trapezoid** the base angles at each base are equal. The sides between the bases are parallel-side partners, so angles next to each other on a leg add to 180°.', '**Step 1:** the angle at the other base is on the same leg, so it is supplementary to 65°.', '**Step 2:** $180-65=115°$.', '**Answer: 115°**')),
    ],
    lab: [
      q('Which shape has diagonals that are equal and bisect each other, but are NOT necessarily perpendicular?', ['Rectangle', 'Rhombus', 'Kite', 'Trapezoid'], 0, S('**Step 1:** rhombus and kite have PERPENDICULAR diagonals.', '**Step 2:** a rectangle has EQUAL diagonals that bisect each other, but they are only perpendicular if it is a square.', '**Answer: rectangle**')),
      q('Which shape is BOTH a rectangle and a rhombus?', ['Square', 'Kite', 'Trapezoid', 'Parallelogram only'], 0, S('**Step 1:** a rectangle has four right angles; a rhombus has four equal sides.', '**Step 2:** a shape with four right angles AND four equal sides is a square.', '**Answer: square**')),
    ],
    more: [
      q('A square has side 6. Its diagonal is:', ['$6\\sqrt2$', '12', '6', '$\\sqrt{6}$'], 0, S('**Step 1:** the diagonal splits the square into a 45-45-90 right triangle with legs 6.', '**Step 2:** hypotenuse = leg × $\\sqrt2$.', '**Step 3:** $6\\times\\sqrt2=6\\sqrt2$.', '**Check:** $6^2+6^2=72=(6\\sqrt2)^2$ ✓', '**Answer: $6\\sqrt2$**')),
      q('Three angles of a quadrilateral are 80°, 90° and 100°. The fourth angle is:', ['90°', '80°', '100°', '110°'], 0, S('**Step 1:** the four angles add to 360°.', '**Step 2:** $80+90+100=270$.', '**Step 3:** $360-270=90°$.', '**Answer: 90°**')),
      q('A parallelogram has base 10 and height 4. Its area is:', ['40', '14', '20', '28'], 0, S('**Words:** the **height** is the straight-up (perpendicular) distance between the base and the opposite side, not the slanted side.', '**Step 1:** area $=\\text{base}\\times\\text{height}$.', '**Step 2:** $10\\times4=40$.', '**Answer: 40**')),
      q('A rectangle is 6 by 8. What is the length of its diagonal?', ['10', '14', '48', '7'], 0, S('**Idea:** the diagonal is the hypotenuse of a right triangle with legs 6 and 8.', '**Step 1:** $6^2+8^2=36+64=100$.', '**Step 2:** $\\sqrt{100}=10$.', '**Answer: 10**')),
    ],
  },
  'g-circles': {
    video: [
      q('A line that touches a circle at EXACTLY one point is called a:', ['tangent', 'secant', 'chord', 'radius'], 0, S('**Step 1:** a **secant** cuts the circle at two points. A **chord** is a segment with both ends on the circle.', '**Step 2:** a line touching at only one point is a **tangent**.', '**Answer: tangent**')),
      q('The whole circle measures:', ['360°', '180°', '90°', '720°'], 0, S('**Step 1:** a full turn around the centre is 360°.', '**Step 2:** so all the arcs of a circle add up to 360°.', '**Answer: 360°**')),
    ],
    learn: [
      q('A circle has radius 9. The longest possible chord has length:', ['18', '9', '27', '81'], 0, S('**Words:** a **chord** joins two points on the circle. The **diameter** is the chord through the centre.', '**Step 1:** the diameter is the longest chord.', '**Step 2:** diameter = 2 × radius $=2\\times9=18$.', '**Answer: 18**')),
      q('A tangent and a chord meet at a point on the circle and cut off an arc of 120°. The angle between them is:', ['60°', '120°', '240°', '30°'], 0, S('**Step 1:** the angle between a tangent and a chord is half the arc it cuts off.', '**Step 2:** $120\\div2=60°$.', '**Answer: 60°**')),
      q('Two chords cross inside a circle. One is cut into 5 and 8; the other into 4 and $x$. Find $x$.', ['10', '9', '6.4', '20'], 0, S('**Rule:** (piece × piece) = (piece × piece).', '**Step 1:** $5\\times8=4\\times x$.', '**Step 2:** $40=4x$.', '**Step 3:** $x=10$.', '**Answer: 10**')),
    ],
    lab: [
      q('In the lab set the arc to 60°. The inscribed angle is:', ['30°', '60°', '120°', '15°'], 0, S('**Step 1:** an inscribed angle is half its arc.', '**Step 2:** $60\\div2=30°$.', '**Answer: 30°**')),
      q('When the arc is a semicircle (180°) the inscribed angle is:', ['90°', '180°', '45°', '60°'], 0, S('**Step 1:** half of 180° is 90°.', '**Answer: 90°** (a right angle: the angle in a semicircle).')),
    ],
    more: [
      q('A triangle is inscribed in a circle and one side is a diameter. The angle opposite that side measures:', ['90°', '60°', '45°', '180°'], 0, S('**Step 1:** the diameter cuts off a semicircle (an arc of 180°).', '**Step 2:** the inscribed angle that looks at it is half: 90°.', '**Answer: 90°**')),
      q('Three arcs of a circle measure 90°, 120° and 100°. The fourth arc is:', ['50°', '40°', '60°', '90°'], 0, S('**Step 1:** all arcs of a circle add up to 360°.', '**Step 2:** $90+120+100=310$.', '**Step 3:** $360-310=50°$.', '**Answer: 50°**')),
      q('Two tangents are drawn to a circle from the same outside point. One has length 8. The other has length:', ['8', '4', '16', 'Cannot be known'], 0, S('**Rule:** tangent segments from the same outside point to a circle are EQUAL.', '**Step 1:** so the other tangent also measures 8.', '**Answer: 8**')),
      q('A circle’s diameter is 14. Its radius is:', ['7', '28', '14', '49'], 0, S('**Words:** the **radius** is half the **diameter**.', '**Step 1:** $14\\div2=7$.', '**Answer: 7**')),
    ],
  },
  'g-lines-planes': {
    video: [
      q('Skew lines are lines that:', ['do not meet and are not parallel', 'meet at one point', 'are parallel', 'are perpendicular'], 0, S('**Step 1:** parallel lines are in one plane and never meet. Intersecting lines meet.', '**Step 2:** skew lines are in DIFFERENT planes, never meet, and are not parallel (like a road and a bridge passing over it at an angle).', '**Answer: do not meet and are not parallel**')),
      q('The Triangle Inequality says that for sides $a$, $b$ and $c$:', ['any two sides add to more than the third', 'all sides are equal', 'the angles add to 90°', 'the longest side is twice the shortest'], 0, S('**Step 1:** if two sides were too short, they could not reach each other to close a triangle.', '**Step 2:** so any two sides must add up to MORE than the third side.', '**Answer: any two sides add to more than the third**')),
    ],
    learn: [
      q('The top and bottom faces of a box are:', ['parallel planes', 'intersecting planes', 'skew planes', 'perpendicular planes'], 0, S('**Words:** **parallel planes** never meet.', '**Step 1:** the top face and bottom face are flat and never touch.', '**Answer: parallel planes**')),
      q('Two parallel lines are cut by a transversal. One angle is 75°. A corresponding angle is:', ['75°', '105°', '15°', '285°'], 0, S('**Words:** a **transversal** crosses two lines. **Corresponding** angles are in the same position at each crossing (an “F” shape).', '**Step 1:** for parallel lines corresponding angles are EQUAL.', '**Answer: 75°**')),
      q('A triangle has sides 8, 15 and 17. It is:', ['right', 'acute', 'obtuse', 'not a triangle'], 0, S('**Step 1 (two shorter sides):** $8^2+15^2=64+225=289$.', '**Step 2 (longest side):** $17^2=289$.', '**Step 3:** they are equal, so it is a right triangle.', '**Answer: right**')),
    ],
    lab: [
      q('In the lab set the sides to 3, 4 and 5. The triangle is:', ['right', 'acute', 'obtuse', 'impossible'], 0, S('**Step 1:** $3^2+4^2=9+16=25=5^2$.', '**Answer: right**')),
      q('In the lab set the sides to 3, 4 and 8. What happens?', ['No triangle can be made', 'It is obtuse', 'It is acute', 'It is right'], 0, S('**Step 1 (Triangle Inequality):** the two short sides add to $3+4=7$.', '**Step 2:** 7 is not bigger than 8, so the short sides cannot reach.', '**Answer: no triangle can be made**')),
    ],
    more: [
      q('A triangle has sides 6, 8 and 9. It is:', ['acute', 'right', 'obtuse', 'not a triangle'], 0, S('**Step 1:** $6^2+8^2=36+64=100$.', '**Step 2:** $9^2=81$.', '**Step 3:** $100>81$, so it is acute.', '**Answer: acute**')),
      q('A triangle has sides 4, 5 and 8. It is:', ['obtuse', 'acute', 'right', 'not a triangle'], 0, S('**Step 1 (does it exist?):** $4+5=9>8$ ✓.', '**Step 2:** $4^2+5^2=16+25=41$.', '**Step 3:** $8^2=64$.', '**Step 4:** $41<64$, so it is obtuse.', '**Answer: obtuse**')),
      q('Two lines cut by a transversal are parallel. A co-interior (same-side interior) angle is 110°. The other co-interior angle is:', ['70°', '110°', '180°', '250°'], 0, S('**Step 1:** co-interior angles between parallel lines add to 180°.', '**Step 2:** $180-110=70°$.', '**Answer: 70°**')),
      q('Two sides of a triangle are both 7. Which could be the third side?', ['7', '14', '0', '15'], 0, S('**Step 1:** the third side must be more than $7-7=0$ and less than $7+7=14$.', '**Step 2:** among the choices only 7 is between 0 and 14.', '**Answer: 7**')),
    ],
  },
}
