// Plain-language definitions. The quiz shows every term that appears in a question or its explanation.
export interface Term { name: string; re: RegExp; def: string }

const T = (name: string, re: RegExp, def: string): Term => ({ name, re, def })

export const GLOSSARY: Term[] = [
  T('GCF (greatest common factor)', /\bgcf\b|greatest common factor|\bhcf\b/i, 'The BIGGEST number that divides evenly into two (or more) numbers. Example: 12 and 18 can both be divided by 1, 2, 3 and 6, so the GCF is 6.'),
  T('LCM (least common multiple)', /\blcm\b|least common multiple|\blcd\b|common denominator/i, 'The SMALLEST number that both numbers fit into evenly. Example: multiples of 4 are 4, 8, 12… and multiples of 6 are 6, 12, 18…, so the LCM of 4 and 6 is 12. For fractions, this is the “common denominator”.'),
  T('Factor', /\bfactors?\b|\bfactoring\b|\bfactored\b/i, 'A number that divides another number evenly. The factors of 12 are 1, 2, 3, 4, 6, 12. In algebra, to factor means to rewrite an expression as a product, like x² − 9 = (x − 3)(x + 3).'),
  T('Multiple', /\bmultiples?\b/i, 'What you get when you multiply a number by 1, 2, 3… The multiples of 5 are 5, 10, 15, 20…'),
  T('Prime number', /\bprimes?\b/i, 'A number bigger than 1 whose only factors are 1 and itself: 2, 3, 5, 7, 11, 13… (2 is the only even prime).'),
  T('Prime factorization', /prime factori[sz]ation|prime factors/i, 'Breaking a number into primes multiplied together. 12 = 2 × 2 × 3.'),
  T('Divisible', /\bdivisible\b|\bdivisibility\b/i, '“Divisible by 3” means you can divide by 3 and get a whole number with nothing left over.'),
  T('Exponent / power', /\bexponents?\b|\bpowers?\b|\bsquared\b|\bcubed\b/i, 'The small raised number that says how many times to multiply the base by itself. 2⁵ = 2 × 2 × 2 × 2 × 2 = 32, where 2 is the base and 5 is the exponent.'),
  T('Square root / radical', /square roots?|\bradicals?\b|\brationali[sz]/i, 'The square root of 49 (written √49) is the number that multiplies by itself to give 49. It is 7, because 7 × 7 = 49. The √ sign is called a radical.'),
  T('Perfect square', /perfect squares?/i, 'A number you get by multiplying a whole number by itself: 1, 4, 9, 16, 25, 36, 49…'),
  T('Reciprocal', /reciprocal|keep-change-flip/i, 'The fraction flipped upside-down. The reciprocal of 3/4 is 4/3. Dividing by a fraction means multiplying by its reciprocal.'),
  T('Numerator / denominator', /numerators?|denominators?/i, 'In a fraction like 3/4, the TOP number (3) is the numerator: how many pieces you have. The BOTTOM number (4) is the denominator: how many equal pieces the whole was cut into.'),
  T('Simplest form', /simplest form|simplify|simplified|lowest terms/i, 'Divide the top and bottom of a fraction by the same number until you cannot anymore. 18/12 → divide by 6 → 3/2.'),
  T('Improper fraction / mixed number', /improper fraction|mixed number/i, 'An improper fraction has a bigger top than bottom (7/2). A mixed number shows the whole part and the leftover (3½). 7/2 = 3½.'),
  T('Repeating decimal', /repeating decimal|\\overline/i, 'A decimal whose digits repeat forever, like 0.333… A bar over the repeating digits shows this. 0.3̅ = 3/9 = 1/3.'),
  T('Ratio', /\bratios?\b/i, 'A comparison of two amounts by division. “3:5” means for every 3 of the first there are 5 of the second.'),
  T('Proportion', /proportions?\b|cross-multipl/i, 'Two ratios set equal, like 2/3 = 4/6. To solve one, cross-multiply: the diagonal products must be equal (2 × 6 = 3 × 4).'),
  T('Direct / inverse variation', /direct variation|inverse variation|varies directly|varies inversely|directly proportional|inversely proportional/i, 'Direct: when one quantity goes UP the other goes UP by the same factor (y = kx). Inverse: when one goes UP the other goes DOWN (xy stays the same).'),
  T('Percent', /percent|%/i, '“Per hundred”. 25% means 25 out of every 100, which is 25/100 = 0.25 = 1/4.'),
  T('Discount / markup', /discounts?|mark(ed)? ?ups?|sale price/i, 'A discount is money taken OFF the price. A markup is money ADDED on top of the cost. 20% off means you pay 80%.'),
  T('Simple / compound interest', /simple interest|compound|\binterest\b|principal/i, 'The principal is the money you start with. Simple interest = principal × rate × time (always on the starting amount). Compound interest also earns interest on the interest.'),
  T('Variable', /\bvariables?\b/i, 'A letter such as x that stands for a number we do not know yet.'),
  T('Coefficient / constant', /coefficients?|constants?/i, 'In 5x + 7, the coefficient is 5 (the number multiplying x) and the constant is 7 (the number on its own).'),
  T('Equation vs. expression', /\bequations?\b|\bexpressions?\b/i, 'An expression is a phrase with no equals sign (3x + 2). An equation has an equals sign and can be solved (3x + 2 = 11).'),
  T('Inequality', /inequalit/i, 'Like an equation but with <, >, ≤ or ≥. Solve it the same way, but FLIP the sign if you multiply or divide by a negative number.'),
  T('Distribute', /distribut/i, 'Multiply the outside number by every term inside the brackets: 3(x + 2) = 3x + 6.'),
  T('FOIL', /\bfoil\b/i, 'A way to multiply two brackets: multiply the First, Outer, Inner and Last terms, then add. (x + 2)(x + 3) = x² + 3x + 2x + 6.'),
  T('Trinomial', /trinomial/i, 'An expression with three terms, like x² + 5x + 6.'),
  T('Difference of squares', /difference of (two )?squares/i, 'A pattern: a² − b² = (a − b)(a + b). Example: x² − 49 = (x − 7)(x + 7).'),
  T('Quadratic', /quadratic/i, 'An equation or expression whose highest power of x is 2, like x² − 5x + 6 = 0.'),
  T('Root / solution of an equation', /\broots?\b|\bsolutions?\b|\bzeros?\b/i, 'A value of x that makes the equation true. For x² − 5x + 6 = 0 the roots are 2 and 3. On the graph they are where the curve crosses the x-axis.'),
  T('Discriminant', /discriminant/i, 'The number D = b² − 4ac from ax² + bx + c = 0. D > 0: two real roots. D = 0: one repeated root. D < 0: no real roots.'),
  T('Slope', /\bslope\b/i, 'How steep a line is: rise ÷ run = (change in y) ÷ (change in x). Going up to the right is positive, going down is negative.'),
  T('Intercept', /intercepts?/i, 'The place a line crosses an axis. The y-intercept is where x = 0; the x-intercept is where y = 0.'),
  T('Parallel / perpendicular', /\bparallel\b|perpendicular/i, 'Parallel lines never meet and have the SAME slope. Perpendicular lines meet at a right angle (90°); their slopes multiply to −1.'),
  T('Midpoint / distance', /midpoint|distance between/i, 'The midpoint is the point exactly halfway between two points (average the x’s and the y’s). The distance uses the Pythagorean theorem: √((Δx)² + (Δy)²).'),
  T('Arithmetic sequence', /arithmetic (sequence|progression)|common difference/i, 'A list where you ADD the same number each time. 4, 7, 10, 13… adds 3 each time (the common difference).'),
  T('Geometric sequence', /geometric (sequence|progression|series)|common ratio/i, 'A list where you MULTIPLY by the same number each time. 3, 6, 12, 24… multiplies by 2 each time (the common ratio).'),
  T('Term (of a sequence)', /\bterms?\b|\bnth\b/i, 'One number in a list. In 4, 7, 10, 13 the 3rd term is 10. “nth term” means the term at any position n.'),
  T('Interior / exterior angle', /interior angles?|exterior angles?/i, 'An interior angle is inside a shape at a corner. An exterior angle is formed outside by extending one side.'),
  T('Complementary / supplementary', /complementary|supplementary|supplement\b/i, 'Complementary angles add to 90°. Supplementary angles add to 180° (a straight line).'),
  T('Vertical angles', /vertical angles?|opposite angles/i, 'The two angles directly across from each other where two straight lines cross. They are always equal.'),
  T('Transversal / alternate angles', /transversal|alternate|corresponding|co-interior|allied/i, 'A transversal is a line that cuts across two other lines. If those two lines are parallel, alternate (Z-shaped) and corresponding (F-shaped) angles are equal, and co-interior (C-shaped) angles add to 180°.'),
  T('Polygon / diagonal', /polygons?|diagonals?|hexagon|pentagon|octagon|regular polygon/i, 'A polygon is a closed shape with straight sides. A diagonal is a line joining two corners that are not neighbours. A regular polygon has all sides and angles equal.'),
  T('Perimeter / area', /perimeter|\barea\b/i, 'Perimeter is the distance AROUND a shape (add the sides). Area is the space INSIDE it (square units).'),
  T('Circle words', /circumference|\bradius\b|\bdiameter\b|\bsector\b|\barc\b/i, 'Radius: centre to the edge. Diameter: edge to edge through the centre (2 × radius). Circumference: the distance around the circle (2πr). Arc: a piece of the circle’s edge. Sector: a slice, like pizza.'),
  T('Volume / surface area', /volume|surface area/i, 'Volume is how much space a 3-D solid holds (cubic units). Surface area is the total area of all its outside faces.'),
  T('Inscribed / central angle', /inscribed|central angle/i, 'A central angle has its corner at the centre of the circle. An inscribed angle has its corner ON the circle. The inscribed angle is half of the central angle that faces the same arc.'),
  T('Hypotenuse / legs', /hypotenuse|\blegs?\b/i, 'In a right triangle the hypotenuse is the longest side, opposite the 90° corner. The other two sides are the legs.'),
  T('Pythagorean theorem', /pythag|\btriple\b/i, 'In a right triangle, leg² + leg² = hypotenuse². A “triple” is a set of whole numbers that works, like 3-4-5 (9 + 16 = 25).'),
  T('Similar triangles / scale factor', /\bsimilar\b|scale factor/i, 'Same shape, different size. All matching angles are equal and all matching sides are in the same ratio (the scale factor). Areas change by (scale factor)².'),
  T('Sine, cosine, tangent', /\bsin\b|\bcos\b|\btan\b|\\sin|\\cos|\\tan|soh|cah|toa|trigonometr/i, 'Ratios of the sides of a right triangle. SOH: sin = opposite ÷ hypotenuse. CAH: cos = adjacent ÷ hypotenuse. TOA: tan = opposite ÷ adjacent.'),
  T('Opposite / adjacent', /\bopposite\b|\badjacent\b/i, 'Relative to the angle θ you are looking at: the opposite side is across from θ, the adjacent side touches θ (and is not the hypotenuse).'),
  T('Angle of elevation / depression', /elevation|depression/i, 'Elevation: the angle you look UP from the horizontal. Depression: the angle you look DOWN from the horizontal. They are equal for the same sight line.'),
  T('Factorial (n!)', /factorial|\d!|n!/i, '5! means 5 × 4 × 3 × 2 × 1 = 120. It counts the ways to arrange 5 different things in a row.'),
  T('Permutation / combination', /permutation|combination|\bP\(|\bC\(|\\binom/i, 'A permutation counts arrangements where ORDER matters (a race podium). A combination counts groups where order does NOT matter (a committee).'),
  T('Probability', /probabilit|\bP\(/i, 'How likely something is: (ways it can happen) ÷ (all possible outcomes). It is between 0 (impossible) and 1 (certain).'),
  T('Mean / median / mode', /\bmean\b|\bmedian\b|\bmode\b|\baverage\b/i, 'Mean (average) = total ÷ how many. Median = the middle value after sorting. Mode = the value that appears most often.'),
  T('Set / union / intersection', /\bsets?\b|\bunion\b|intersection|\bn\(A|\\cup|\\cap/i, 'A set is a group of things. Union (A ∪ B) = in A or B or both. Intersection (A ∩ B) = in BOTH.'),
  T('Venn diagram / complement', /venn|complement/i, 'A picture with overlapping circles for sets. The overlap is “both”. The complement of A is everything NOT in A.'),
  T('Syllogism', /syllogism|\ball .* are\b/i, 'A logic puzzle built from statements like “All A are B”. Draw circles: “All A are B” puts circle A inside circle B.'),
  T('Consecutive numbers', /consecutive/i, 'Numbers that follow one another with no gaps: 7, 8, 9 (consecutive integers) or 6, 8, 10 (consecutive even numbers).'),
  T('Scientific notation', /scientific notation/i, 'A short way to write very big or small numbers as (number from 1 to 10) × 10 raised to a power. 45,000 = 4.5 × 10⁴.'),
  T('Rate / unit rate', /\brates?\b|unit price|per hour|km\/h/i, 'A rate compares two different things, like distance per hour. A unit rate is “per ONE”, like ₱17 for one pen.'),
]

/** Terms that appear in the given text (max 6, in the order they are found). */
export function termsIn(text: string): Term[] {
  const found: { t: Term; at: number }[] = []
  for (const t of GLOSSARY) {
    const m = t.re.exec(text)
    if (m) found.push({ t, at: m.index })
  }
  return found.sort((a, b) => a.at - b.at).slice(0, 6).map(x => x.t)
}
