import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_ALG: Record<string, Checks> = {
  'm-systems': {
    video: [
      q('The solution of a system of two linear equations is the point where the two lines:', ['cross', 'are parallel', 'are perpendicular only', 'start'], 0, S('**Words:** a **solution** of a system makes BOTH equations true.', '**Step 1:** a point on line 1 satisfies equation 1; a point on line 2 satisfies equation 2.', '**Step 2:** a point that satisfies both must lie on both lines, so it is where they cross.', '**Answer: cross**')),
      q('If two lines are parallel (same slope, different intercepts), the system has:', ['no solution', 'one solution', 'two solutions', 'infinitely many solutions'], 0, S('**Step 1:** parallel lines never meet.', '**Step 2:** no common point means no pair $(x,y)$ works in both equations.', '**Answer: no solution**')),
    ],
    learn: [
      q('Is $(3,2)$ a solution of $x+y=5$ and $2x-y=4$?', ['Yes', 'No, it fails the first', 'No, it fails the second', 'No, it fails both'], 0, S('**Idea:** a point is a solution only if it works in BOTH equations.', '**Step 1 (first equation):** $3+2=5$ ✓.', '**Step 2 (second equation):** $2(3)-2=6-2=4$ ✓.', '**Answer: Yes**')),
      q('Solve by substitution: $y=x+2$ and $2x+y=14$. What is $x$?', ['4', '6', '2', '8'], 0, S('**Step 1 (replace y in the second equation by $x+2$):** $2x+(x+2)=14$.', '**Step 2 (combine):** $3x+2=14$.', '**Step 3 (subtract 2):** $3x=12$.', '**Step 4:** $x=4$ (and $y=6$).', '**Answer: 4**')),
      q('2 pencils and 1 notebook cost ₱25. 1 pencil and 1 notebook cost ₱15. What is the price of a pencil?', ['₱10', '₱5', '₱15', '₱8'], 0, S('**Step 1 (equations):** $2p+n=25$ and $p+n=15$.', '**Step 2 (subtract the second from the first; n cancels):** $(2p+n)-(p+n)=25-15$.', '**Step 3:** $p=10$.', '**Check:** $n=15-10=5$ and $2(10)+5=25$ ✓', '**Answer: ₱10**')),
    ],
    lab: [
      q('In the lab set the lines to $y=x+1$ and $y=-x+5$. Where do they cross?', ['(2, 3)', '(3, 2)', '(1, 2)', '(4, 1)'], 0, S('**Step 1 (set the y’s equal):** $x+1=-x+5$.', '**Step 2:** $2x=4$, so $x=2$.', '**Step 3:** $y=2+1=3$.', '**Answer: (2, 3)**')),
      q('What happens in the lab when both lines have the same slope but different y-intercepts?', ['The lines are parallel: no solution', 'They cross once', 'They are the same line', 'They cross twice'], 0, S('**Step 1:** the same slope means the lines tilt the same way.', '**Step 2:** different intercepts mean they start at different heights.', '**Step 3:** so they never meet.', '**Answer: parallel, no solution**')),
    ],
    more: [
      q('Solve $x+2y=8$ and $3x-2y=8$. Find $x+y$.', ['6', '4', '8', '2'], 0, S('**Step 1 (the y-terms are +2y and −2y, so add):** $4x=16$, so $x=4$.', '**Step 2 (find y):** $4+2y=8$, so $y=2$.', '**Step 3 (the question asks for $x+y$):** $4+2=6$.', '**Answer: 6**')),
      q('Solve $x=2y$ and $x+y=9$. What is $x$?', ['6', '3', '9', '4.5'], 0, S('**Step 1 (substitute $x=2y$):** $2y+y=9$.', '**Step 2:** $3y=9$, so $y=3$.', '**Step 3:** $x=2(3)=6$.', '**Answer: 6**')),
      q('How many solutions do $2x+4y=6$ and $x+2y=3$ have?', ['Infinitely many', 'None', 'Exactly one', 'Exactly two'], 0, S('**Step 1 (multiply the second equation by 2):** $2x+4y=6$.', '**Step 2:** that is exactly the first equation, so both equations describe the SAME line.', '**Step 3:** every point on the line is a solution.', '**Answer: infinitely many**')),
      q('Two numbers add up to 40 and one is 3 times the other. What is the larger number?', ['30', '10', '20', '40'], 0, S('**Step 1 (equations):** $x+y=40$ and $x=3y$.', '**Step 2 (substitute):** $3y+y=40$, so $4y=40$ and $y=10$.', '**Step 3 (the other number):** $x=3(10)=30$.', '**Answer: 30**')),
    ],
  },
  'm-polynomials': {
    video: [
      q('The degree of $5x^3+2x-7$ is:', ['3', '5', '2', '7'], 0, S('**Words:** the **degree** is the biggest exponent of x.', '**Step 1:** exponents are 3, 1 and 0.', '**Answer: 3**')),
      q('Synthetic division is a shortcut for dividing a polynomial by:', ['a linear factor $x-c$', 'any polynomial', 'a quadratic only', 'a constant only'], 0, S('**Step 1:** the method uses the number $c$ from a divisor of the form $x-c$.', '**Answer: a linear factor $x-c$**')),
    ],
    learn: [
      q('$(2x+1)(x-3)=$', ['$2x^2-5x-3$', '$2x^2+7x-3$', '$2x^2-5x+3$', '$2x^2-3$'], 0, S('**Step 1 (FOIL):** first $2x\\cdot x=2x^2$; outer $2x\\cdot(-3)=-6x$; inner $1\\cdot x=x$; last $1\\cdot(-3)=-3$.', '**Step 2 (combine the middle terms):** $-6x+x=-5x$.', '**Answer: $2x^2-5x-3$**')),
      q('Dividing $x^2+5x+6$ by $x+2$ gives the quotient:', ['$x+3$', '$x+2$', '$x+5$', '$x-3$'], 0, S('**Step 1 (factor the top):** product 6 and sum 5 → 2 and 3, so $(x+2)(x+3)$.', '**Step 2 (cancel $(x+2)$):** $x+3$.', '**Answer: $x+3$**')),
      q('For $p(x)=x^2-4x+3$ we find $p(3)=0$. What does that tell us?', ['$x-3$ is a factor', '$x+3$ is a factor', 'The remainder is 3', 'The polynomial has degree 3'], 0, S('**Words:** the **Factor Theorem**: if $p(c)=0$ then $(x-c)$ is a factor.', '**Step 1:** $p(3)=9-12+3=0$.', '**Step 2:** so $x-3$ divides $p(x)$ with no remainder.', '**Answer: $x-3$ is a factor**')),
    ],
    lab: [
      q('In the synthetic division activity, what is the quotient?', ['$x^2+4x+3$', '$x^2+2x+3$', '$x^2+4x-3$', '$x+4$'], 0, S('**Step 1:** the bottom row is 1, 4, 3, 0.', '**Step 2:** the last number (0) is the remainder; the rest are the quotient’s coefficients, one degree lower than the original.', '**Answer: $x^2+4x+3$**')),
      q('What does a remainder of 0 tell you?', ['The divisor is a factor', 'The polynomial is zero', 'The polynomial has no roots', 'The quotient is zero'], 0, S('**Step 1:** remainder 0 means the division is exact.', '**Step 2:** so the divisor multiplies with the quotient to give the original polynomial: it is a factor.', '**Answer: the divisor is a factor**')),
    ],
    more: [
      q('Find the remainder when $x^2+3x-4$ is divided by $x+1$.', ['−6', '6', '0', '−4'], 0, S('**Idea (Remainder Theorem):** divide by $x-c$ → remainder is $p(c)$. Here $x+1=x-(-1)$, so $c=-1$.', '**Step 1:** $p(-1)=(-1)^2+3(-1)-4$.', '**Step 2:** $1-3-4=-6$.', '**Answer: −6**')),
      q('The leading coefficient of $7-3x^2+9x^4$ is:', ['9', '7', '−3', '4'], 0, S('**Words:** the **leading coefficient** is the number in front of the term with the highest power.', '**Step 1 (highest power):** $x^4$.', '**Step 2 (its coefficient):** 9.', '**Answer: 9**')),
      q('If $p(2)=0$ for a polynomial $p(x)$, then:', ['$x-2$ is a factor', '$x+2$ is a factor', '2 is the remainder', '$p(x)$ has degree 2'], 0, S('**Step 1:** the Factor Theorem says $p(c)=0$ means $(x-c)$ is a factor.', '**Step 2:** with $c=2$, the factor is $x-2$.', '**Answer: $x-2$ is a factor**')),
      q('How many terms does $4x^3-x^2+2$ have, and what is it called?', ['3 terms, a trinomial', '2 terms, a binomial', '4 terms', '1 term, a monomial'], 0, S('**Step 1 (count the terms separated by + or −):** $4x^3$, $-x^2$ and $2$.', '**Step 2:** three terms is called a trinomial.', '**Answer: 3 terms, a trinomial**')),
    ],
  },
  'm-rational': {
    video: [
      q('A rational expression is:', ['a fraction whose top and bottom are polynomials', 'a whole number', 'a square root', 'an equation with no x'], 0, S('**Words:** “rational” comes from “ratio”, which is a fraction.', '**Step 1:** a rational expression is polynomial ÷ polynomial.', '**Answer: a fraction whose top and bottom are polynomials**')),
      q('Simplify $\\dfrac{6x}{9x^2}$.', ['$\\dfrac{2}{3x}$', '$\\dfrac{2x}{3}$', '$\\dfrac{3}{2x}$', '$\\dfrac{6}{9x}$'], 0, S('**Step 1 (divide the numbers by 3):** $\\frac{2x}{3x^2}$.', '**Step 2 (cancel one x):** $\\frac{2}{3x}$.', '**Answer: $\\frac{2}{3x}$**')),
    ],
    learn: [
      q('For which value is $\\dfrac{x}{x-5}$ undefined?', ['$x=5$', '$x=0$', '$x=-5$', '$x=1$'], 0, S('**Idea:** a fraction is undefined when its bottom is 0 (you cannot divide by zero).', '**Step 1:** $x-5=0$.', '**Step 2:** $x=5$.', '**Answer: $x=5$**')),
      q('What is the LCD (lowest common denominator) of $\\dfrac1{2x}$ and $\\dfrac1{3x^2}$?', ['$6x^2$', '$6x$', '$5x^2$', '$x^2$'], 0, S('**Step 1 (numbers):** the smallest number that 2 and 3 both divide into is 6.', '**Step 2 (letters):** take the highest power of x: $x^2$.', '**Step 3:** $6x^2$.', '**Answer: $6x^2$**')),
      q('An extraneous solution of a rational equation is one that:', ['makes a denominator zero', 'is negative', 'is a fraction', 'is zero'], 0, S('**Idea:** solving by multiplying through can create an “answer” that is not actually allowed.', '**Step 1:** if that answer makes a denominator 0 in the original equation, it is **extraneous** and must be rejected.', '**Answer: it makes a denominator zero**')),
    ],
    lab: [
      q('In the activity solving $\\frac2{x-1}+\\frac13=1$, which value of x is NOT allowed?', ['$x=1$', '$x=4$', '$x=3$', '$x=0$'], 0, S('**Step 1:** the denominator $x-1$ is 0 when $x=1$.', '**Answer: $x=1$**')),
      q('What is the final solution in that activity?', ['$x=4$', '$x=1$', '$x=3$', '$x=8$'], 0, S('**Step 1:** after clearing the denominators: $x+5=3x-3$.', '**Step 2:** $8=2x$, so $x=4$.', '**Step 3:** 4 is allowed, so it is a real solution.', '**Answer: $x=4$**')),
    ],
    more: [
      q('Simplify $\\dfrac{x^2-1}{x-1}$.', ['$x+1$', '$x-1$', '$x^2$', '$\\dfrac{x+1}{x-1}$'], 0, S('**Step 1 (factor the top, difference of squares):** $(x-1)(x+1)$.', '**Step 2 (cancel $(x-1)$):** $x+1$.', '**Answer: $x+1$**')),
      q('Solve $\\dfrac4x=2$.', ['$x=2$', '$x=8$', '$x=0.5$', '$x=4$'], 0, S('**Step 1 (cross-multiply):** $4=2x$.', '**Step 2:** $x=2$.', '**Check:** $\\frac42=2$ ✓', '**Answer: $x=2$**')),
      q('Divide: $\\dfrac23\\div\\dfrac{x}{6}=$', ['$\\dfrac4x$', '$\\dfrac{x}{4}$', '$\\dfrac{2x}{18}$', '$4x$'], 0, S('**Step 1 (keep, change, flip):** $\\frac23\\times\\frac6x$.', '**Step 2 (multiply and cancel 3 into 6):** $\\frac{2\\times2}{x}$.', '**Step 3:** $\\frac4x$.', '**Answer: $\\frac4x$**')),
      q('Add: $\\dfrac12+\\dfrac1x=$', ['$\\dfrac{x+2}{2x}$', '$\\dfrac{2}{x+2}$', '$\\dfrac{1}{2x}$', '$\\dfrac{x+1}{2x}$'], 0, S('**Step 1 (LCD):** $2x$.', '**Step 2 (rewrite):** $\\frac{x}{2x}+\\frac{2}{2x}$.', '**Step 3 (add the tops):** $\\frac{x+2}{2x}$.', '**Answer: $\\frac{x+2}{2x}$**')),
    ],
  },
  'm-quad-fn': {
    video: [
      q('A parabola opens UP when:', ['$a>0$', '$a<0$', '$b>0$', '$c>0$'], 0, S('**Step 1:** in $y=ax^2+bx+c$ the sign of $a$ controls the direction.', '**Step 2:** $a>0$ gives a smile (up); $a<0$ gives a frown (down).', '**Answer: $a>0$**')),
      q('The vertex of a parabola is:', ['its lowest or highest point', 'its y-intercept', 'its x-intercept', 'its widest point'], 0, S('**Step 1:** the vertex is where the parabola turns around.', '**Step 2:** for an upward parabola it is the lowest point; for a downward one, the highest.', '**Answer: its lowest or highest point**')),
    ],
    learn: [
      q('The axis of symmetry of $y=(x-3)^2+2$ is:', ['$x=3$', '$x=-3$', '$x=2$', '$y=3$'], 0, S('**Idea:** in vertex form $y=a(x-h)^2+k$ the axis is $x=h$.', '**Step 1:** here $h=3$.', '**Answer: $x=3$**')),
      q('At what x does $y=-2x^2+8x$ reach its maximum?', ['$x=2$', '$x=-2$', '$x=4$', '$x=8$'], 0, S('**Step 1 (a = −2, so it opens down and has a maximum).**', '**Step 2 (vertex x):** $x=-\\frac{b}{2a}=-\\frac{8}{2(-2)}=\\frac{-8}{-4}=2$.', '**Answer: $x=2$**')),
      q('Solve $(x-1)(x+4)<0$.', ['$-4<x<1$', '$x<-4$ or $x>1$', '$x<1$', '$x>-4$'], 0, S('**Step 1 (critical values):** $x=1$ and $x=-4$.', '**Step 2 (the parabola opens up; below the axis means BETWEEN the roots).**', '**Step 3 (test $x=0$):** $(-1)(4)=-4<0$ ✓, and 0 is between −4 and 1.', '**Answer: $-4<x<1$**')),
    ],
    lab: [
      q('In the lab with $a=1$, $h=0$, $k=0$ the graph is $y=x^2$. What is its vertex?', ['(0, 0)', '(1, 0)', '(0, 1)', '(1, 1)'], 0, S('**Step 1 (vertex form):** $y=a(x-h)^2+k$ with $h=0$ and $k=0$.', '**Answer: (0, 0)**')),
      q('How do you make the lab’s parabola open DOWNWARD?', ['make $a$ negative', 'make $h$ negative', 'make $k$ negative', 'make $a$ larger'], 0, S('**Step 1:** only the sign of $a$ controls the direction.', '**Step 2:** negative $a$ → opens down.', '**Answer: make $a$ negative**')),
    ],
    more: [
      q('The y-intercept of $y=x^2-3x+7$ is:', ['7', '−3', '1', '0'], 0, S('**Step 1:** the y-intercept is where $x=0$.', '**Step 2:** $y=0-0+7=7$.', '**Answer: 7**')),
      q('What is the minimum value of $y=x^2-2x+3$?', ['2', '3', '1', '−2'], 0, S('**Step 1 (x of the vertex):** $-\\frac{-2}{2(1)}=1$.', '**Step 2 (y of the vertex):** $1-2+3=2$.', '**Step 3 (opens up, so this is the minimum):** 2.', '**Answer: 2**')),
      q('Solve $x^2>16$.', ['$x<-4$ or $x>4$', '$-4<x<4$', '$x>4$', '$x<4$'], 0, S('**Step 1 (move 16 over and factor):** $x^2-16>0$ → $(x-4)(x+4)>0$.', '**Step 2 (critical values):** $x=4$ and $x=-4$.', '**Step 3 (upward parabola, “> 0” means OUTSIDE the roots):** $x<-4$ or $x>4$.', '**Answer: $x<-4$ or $x>4$**')),
      q('The roots of $x^2-4x-5=0$ add up to:', ['4', '−4', '5', '−5'], 0, S('**Step 1 (factor):** $(x-5)(x+1)=0$, so the roots are 5 and −1.', '**Step 2 (add):** $5+(-1)=4$.', '**Check:** sum of roots $=-\\frac ba=4$ ✓', '**Answer: 4**')),
    ],
  },
  'm-variation': {
    video: [
      q('Direct variation has the form:', ['$y=kx$', '$y=\\dfrac kx$', '$y=k+x$', '$y=x^k$'], 0, S('**Words:** **direct variation**: y is a constant multiple of x.', '**Answer: $y=kx$**')),
      q('Inverse variation has the property that:', ['$xy$ stays constant', '$y/x$ stays constant', '$x+y$ stays constant', '$x-y$ stays constant'], 0, S('**Step 1:** $y=\\frac kx$ rearranges to $xy=k$.', '**Answer: $xy$ stays constant**')),
    ],
    learn: [
      q('$y$ varies directly as $x$ and $y=24$ when $x=6$. What is $k$?', ['4', '144', '18', '30'], 0, S('**Step 1:** $y=kx$.', '**Step 2:** $24=k\\times6$.', '**Step 3:** $k=24\\div6=4$.', '**Answer: 4**')),
      q('$z=kxy$ with $k=2$. Find $z$ when $x=3$ and $y=5$.', ['30', '10', '13', '15'], 0, S('**Step 1 (substitute):** $z=2\\times3\\times5$.', '**Step 2:** $2\\times3=6$ and $6\\times5=30$.', '**Answer: 30**')),
    ],
    lab: [
      q('Which type of variation is $y=\\dfrac{k}{x^2}$?', ['Inverse square', 'Direct', 'Joint', 'Direct square'], 0, S('**Step 1:** the x is squared and in the denominator.', '**Step 2:** that is called inverse variation with the square of x.', '**Answer: inverse square**')),
      q('Which equation is joint variation?', ['$z=kxy$', '$y=kx$', '$y=\\dfrac kx$', '$y=kx^2$'], 0, S('**Step 1:** joint means z depends on the PRODUCT of two other variables.', '**Answer: $z=kxy$**')),
    ],
    more: [
      q('A car at 60 km/h takes 4 hours for a trip (time varies inversely as speed). How long at 80 km/h?', ['3 hours', '5 hours', '2 hours', '6 hours'], 0, S('**Step 1 (inverse variation, speed × time is constant):** $60\\times4=240$.', '**Step 2:** $80\\times t=240$.', '**Step 3:** $t=3$.', '**Answer: 3 hours**')),
      q('6 workers finish a job in 10 days. How long do 15 workers take (same rate)?', ['4 days', '25 days', '6 days', '2.5 days'], 0, S('**Step 1 (more workers → fewer days: inverse):** workers × days is constant: $6\\times10=60$.', '**Step 2:** $15\\times d=60$.', '**Step 3:** $d=4$.', '**Answer: 4 days**')),
      q('The area of a circle varies directly as the square of its radius. If the radius doubles, the area becomes:', ['4 times as large', '2 times as large', '8 times as large', 'half as large'], 0, S('**Step 1:** $A=kr^2$.', '**Step 2 (replace r by 2r):** $A=k(2r)^2=4kr^2$.', '**Answer: 4 times as large**')),
      q('A direct variation passes through $(2,10)$. What is the constant of variation?', ['5', '20', '12', '0.2'], 0, S('**Step 1:** $y=kx$, so $k=\\frac yx$.', '**Step 2:** $k=\\frac{10}{2}=5$.', '**Answer: 5**')),
    ],
  },
}
