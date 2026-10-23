import type { Checks } from '../types'
import { q } from './helpers'

const S = (...lines: string[]) => lines.join('\n')

export const CHECKS_GM: Record<string, Checks> = {
  'm-functions': {
    video: [
      q('A function gives each input:', ['exactly one output', 'two outputs', 'no output', 'the same output as every other input'], 0, S('**Words:** a **function** is a rule where every input x has exactly ONE output y.', '**Answer: exactly one output**')),
      q('The vertical line test tells you whether a graph is:', ['a function', 'a straight line', 'increasing', 'symmetric'], 0, S('**Step 1:** if a vertical line crosses the graph at TWO points, one x has two y-values.', '**Step 2:** that breaks the rule of a function.', '**Answer: a function**')),
    ],
    learn: [
      q('What is the domain of $f(x)=\\dfrac{1}{x-2}$?', ['$x\\ne2$', '$x>2$', '$x\\ne0$', 'all real numbers'], 0, S('**Step 1:** the denominator $x-2$ cannot be 0.', '**Step 2:** $x\\ne2$.', '**Answer: $x\\ne2$**')),
      q('If $f(x)=3x-1$, then $f(4)=$', ['11', '12', '13', '7'], 0, S('**Step 1 (replace x by 4):** $3(4)-1$.', '**Step 2:** $12-1=11$.', '**Answer: 11**')),
      q('$f(x)=x+1$ and $g(x)=x^2$. Find $(g\\circ f)(2)$.', ['9', '5', '4', '6'], 0, S('**Words:** $(g\\circ f)(2)=g(f(2))$: do f first.', '**Step 1:** $f(2)=2+1=3$.', '**Step 2:** $g(3)=3^2=9$.', '**Answer: 9**')),
      q('The inverse of $f(x)=x+5$ is:', ['$f^{-1}(x)=x-5$', '$f^{-1}(x)=x+5$', '$f^{-1}(x)=5-x$', '$f^{-1}(x)=\\dfrac1{x+5}$'], 0, S('**Step 1 (swap x and y):** $x=y+5$.', '**Step 2 (solve for y):** $y=x-5$.', '**Answer: $f^{-1}(x)=x-5$**')),
    ],
    lab: [
      q('The DOMAIN of a function is the set of:', ['allowed inputs (x-values)', 'outputs (y-values)', 'zeros only', 'slopes'], 0, S('**Step 1:** the domain lists the x-values you can put in.', '**Answer: allowed inputs (x-values)**')),
      q('The RANGE of a function is the set of:', ['outputs (y-values)', 'inputs (x-values)', 'intercepts', 'asymptotes'], 0, S('**Step 1:** the range lists the y-values that come out.', '**Answer: outputs (y-values)**')),
    ],
    more: [
      q('What is the range of $f(x)=x^2+1$?', ['$y\\ge1$', 'all real numbers', '$y\\ge0$', '$y>1$'], 0, S('**Step 1:** $x^2$ is never negative, so $x^2\\ge0$.', '**Step 2 (add 1):** $x^2+1\\ge1$.', '**Step 3:** the smallest output is 1 (at $x=0$).', '**Answer: $y\\ge1$**')),
      q('If $f(x)=2x-3$, find $x$ when $f(x)=7$.', ['5', '2', '11', '−5'], 0, S('**Step 1 (set the rule equal to 7):** $2x-3=7$.', '**Step 2 (add 3):** $2x=10$.', '**Step 3:** $x=5$.', '**Answer: 5**')),
      q('What is the domain of $f(x)=\\dfrac{1}{x-3}$?', ['all real numbers except 3', 'all real numbers except −3', 'all real numbers', '$x>3$'], 0, S('**Words:** the **domain** is every x you are allowed to use. The bottom of a fraction cannot be 0.', '**Step 1 (bottom = 0):** $x-3=0$, so $x=3$.', '**Step 2:** every number except 3 is allowed.', '**Answer: all real numbers except 3**')),
      q('If $f(x)=x+2$ and $g(x)=3x$, then $f(g(x))=$', ['$3x+2$', '$3x+6$', '$3x^2+2$', '$4x+2$'], 0, S('**Step 1 (inner function):** $g(x)=3x$.', '**Step 2 (put it inside f, replacing x):** $f(3x)=3x+2$.', '**Answer: $3x+2$**')),
    ],
  },
  'm-rational-fn': {
    video: [
      q('A vertical asymptote of a rational function occurs where the:', ['denominator is 0', 'numerator is 0', 'function equals 1', 'graph crosses the y-axis'], 0, S('**Step 1:** the function blows up when we divide by something close to 0.', '**Answer: where the denominator is 0**')),
      q('A horizontal asymptote describes what the function approaches when:', ['x gets very large', 'x is 0', 'y is 0 only', 'the denominator is 0'], 0, S('**Step 1:** it shows the long-run value of y as x goes to the far right or far left.', '**Answer: x gets very large**')),
    ],
    learn: [
      q('What is the domain of $f(x)=\\dfrac{5}{x^2-9}$?', ['all real numbers except 3 and −3', 'all real numbers except 9', 'all real numbers except 3', 'all real numbers'], 0, S('**Step 1 (denominator = 0):** $x^2-9=0$.', '**Step 2 (factor):** $(x-3)(x+3)=0$.', '**Step 3:** $x=3$ or $x=-3$.', '**Answer: all real numbers except 3 and −3**')),
      q('The horizontal asymptote of $f(x)=\\dfrac{4x}{x^2+1}$ is:', ['$y=0$', '$y=4$', '$y=1$', 'none'], 0, S('**Step 1 (compare degrees):** top degree 1, bottom degree 2.', '**Step 2:** when the top has the smaller degree, $y=0$ is the horizontal asymptote.', '**Answer: $y=0$**')),
      q('What cancels to make a HOLE (instead of an asymptote)?', ['a factor common to the top and bottom', 'any number', 'the x-intercept', 'the constant term'], 0, S('**Step 1:** if a factor appears on both the top and bottom, it cancels.', '**Step 2:** the graph is missing just that one point: a hole.', '**Answer: a factor common to the top and bottom**')),
    ],
    lab: [
      q('In the lab set $a=1$, $h=2$, $k=3$. The vertical asymptote is at:', ['$x=2$', '$x=3$', '$x=1$', '$y=2$'], 0, S('**Idea:** for $f(x)=\\frac{a}{x-h}+k$ the vertical asymptote is $x=h$ and the horizontal one is $y=k$.', '**Answer: $x=2$**')),
      q('For the same settings the horizontal asymptote is:', ['$y=3$', '$y=2$', '$y=1$', '$x=3$'], 0, S('**Step 1:** the horizontal asymptote is $y=k$.', '**Answer: $y=3$**')),
    ],
    more: [
      q('Find the y-intercept of $f(x)=\\dfrac{3x+6}{x+3}$.', ['2', '3', '6', '−2'], 0, S('**Step 1 (put x = 0):** $\\frac{3(0)+6}{0+3}=\\frac63$.', '**Step 2:** $=2$.', '**Answer: 2**')),
      q('The x-intercept of $f(x)=\\dfrac{x-5}{x+1}$ is:', ['$x=5$', '$x=-1$', '$x=1$', '$x=-5$'], 0, S('**Step 1 (top = 0):** $x-5=0$.', '**Step 2:** $x=5$.', '**Answer: $x=5$**')),
      q('Simplify $\\dfrac{x^2-1}{x+1}$ and state the hole.', ['$x-1$, with a hole at $x=-1$', '$x+1$, with a hole at $x=1$', '$x-1$, with a vertical asymptote at $x=-1$', '$x^2$'], 0, S('**Step 1 (factor the top):** $(x-1)(x+1)$.', '**Step 2 (cancel $(x+1)$):** $x-1$.', '**Step 3:** the cancelled factor gives a hole where $x+1=0$, that is $x=-1$.', '**Answer: $x-1$, with a hole at $x=-1$**')),
      q('The vertical asymptote of $f(x)=\\dfrac{x}{2x-8}$ is:', ['$x=4$', '$x=8$', '$x=-4$', '$x=2$'], 0, S('**Step 1 (bottom = 0):** $2x-8=0$.', '**Step 2:** $2x=8$, so $x=4$.', '**Answer: $x=4$**')),
    ],
  },
  'm-exp-log': {
    video: [
      q('$\\log_2 8=$', ['3', '4', '16', '2'], 0, S('**Words:** $\\log_2 8$ asks “2 to what power gives 8?”.', '**Step 1:** $2^3=8$.', '**Answer: 3**')),
      q('If $b^x=N$, then in logarithmic form:', ['$\\log_bN=x$', '$\\log_xN=b$', '$\\log_Nb=x$', '$\\log_bx=N$'], 0, S('**Step 1:** a logarithm gives the exponent.', '**Step 2:** base $b$, result $N$, exponent $x$: $\\log_bN=x$.', '**Answer: $\\log_bN=x$**')),
    ],
    learn: [
      q('Solve $3^{x}=81$.', ['4', '27', '3', '9'], 0, S('**Step 1 (write 81 as a power of 3):** $3\\times3\\times3\\times3=81$, so $81=3^4$.', '**Step 2 (same base, equal exponents):** $x=4$.', '**Answer: 4**')),
      q('Write $\\log_5 25=2$ in exponential form.', ['$5^2=25$', '$2^5=25$', '$25^2=5$', '$5^{25}=2$'], 0, S('**Step 1 (the log is the exponent):** base 5, exponent 2, result 25.', '**Step 2:** $5^2=25$.', '**Answer: $5^2=25$**')),
      q('$\\log_2 32-\\log_2 4=$', ['3', '1', '28', '8'], 0, S('**Step 1 (quotient rule):** $\\log_2\\frac{32}{4}=\\log_28$.', '**Step 2:** $2^3=8$, so $\\log_28=3$.', '**Check:** $\\log_232=5$ and $\\log_24=2$, and $5-2=3$ ✓', '**Answer: 3**')),
      q('Solve $\\log_3 x=2$.', ['$x=9$', '$x=6$', '$x=8$', '$x=\\dfrac23$'], 0, S('**Step 1 (exponential form):** $\\log_3x=2$ means $3^2=x$.', '**Step 2:** $x=9$.', '**Answer: $x=9$**')),
    ],
    lab: [
      q('In the lab with the exponential family and $a=1$, $b=2$, $h=0$, $k=0$, the horizontal asymptote is:', ['$y=0$', '$y=1$', '$x=0$', 'none'], 0, S('**Step 1:** the horizontal asymptote of an exponential graph is $y=k$.', '**Step 2:** $k=0$.', '**Answer: $y=0$**')),
      q('In the lab’s logarithmic graph with $h=0$ the domain is:', ['$x>0$', 'all real numbers', '$x<0$', '$x\\ge0$'], 0, S('**Step 1:** you can only take the log of a positive number.', '**Step 2:** the vertical asymptote is $x=h=0$ and the graph lives to its right.', '**Answer: $x>0$**')),
    ],
    more: [
      q('Evaluate $\\log_{10}10000$.', ['4', '5', '3', '1000'], 0, S('**Step 1:** $10^4=10{,}000$.', '**Answer: 4**')),
      q('Evaluate $\\log_4 16+\\log_4 4$.', ['3', '2', '4', '20'], 0, S('**Step 1:** $\\log_416=2$ because $4^2=16$.', '**Step 2:** $\\log_44=1$.', '**Step 3 (add):** $2+1=3$.', '**Answer: 3**')),
      q('Solve $5^{x-1}=125$.', ['4', '3', '2', '26'], 0, S('**Step 1:** $125=5^3$.', '**Step 2 (equal exponents):** $x-1=3$.', '**Step 3:** $x=4$.', '**Answer: 4**')),
      q('Which expression equals $\\log_b(M^3)$?', ['$3\\log_bM$', '$(\\log_bM)^3$', '$\\log_bM+3$', '$\\log_b3M$'], 0, S('**Words:** the **power rule** of logarithms.', '**Step 1:** an exponent inside a log can be brought out front as a multiplier.', '**Answer: $3\\log_bM$**')),
    ],
  },
  'm-finance': {
    video: [
      q('In simple interest the interest is calculated on:', ['the original principal only', 'the principal plus past interest', 'the final amount', 'half of the principal'], 0, S('**Step 1:** simple interest never adds interest on top of interest.', '**Answer: the original principal only**')),
      q('Compound interest is bigger than simple interest because:', ['interest earns interest', 'the rate is higher', 'the time is longer', 'the principal is bigger'], 0, S('**Step 1:** each period’s interest is added to the principal, so the next interest is calculated on a bigger amount.', '**Answer: interest earns interest**')),
    ],
    learn: [
      q('What is the interest on ₱8,000 at 5% simple interest for 6 months?', ['₱200', '₱400', '₱2,400', '₱20'], 0, S('**Step 1 (time in years):** 6 months = 0.5 years.', '**Step 2:** $I=8000\\times0.05\\times0.5$.', '**Step 3:** $8000\\times0.05=400$, and $400\\times0.5=200$.', '**Answer: ₱200**')),
      q('₱1,000 at 12% compounded monthly: what is the interest rate per month?', ['1%', '12%', '0.1%', '0.12%'], 0, S('**Step 1:** monthly means $m=12$.', '**Step 2:** rate per period $=\\frac{12\\%}{12}=1\\%$.', '**Answer: 1%**')),
      q('A series of equal payments made at the end of each period is called an:', ['ordinary annuity', 'bond', 'stock dividend', 'simple loan'], 0, S('**Step 1:** equal payments at regular times = annuity.', '**Step 2:** paid at the END of each period = ordinary annuity.', '**Answer: ordinary annuity**')),
      q('A bond’s face value is ₱5,000 and its coupon rate is 6%. What is the yearly coupon?', ['₱300', '₱30', '₱3,000', '₱5,300'], 0, S('**Step 1:** coupon = face value × coupon rate.', '**Step 2:** $5000\\times0.06=300$.', '**Answer: ₱300**')),
    ],
    lab: [
      q('In the lab, with ₱10,000, 6% and 5 years, simple interest gives a total of:', ['₱13,000', '₱13,382', '₱10,300', '₱16,000'], 0, S('**Step 1:** $F=P(1+rt)=10{,}000(1+0.06\\times5)$.', '**Step 2:** $0.06\\times5=0.3$, so $10{,}000\\times1.3=13{,}000$.', '**Answer: ₱13,000** (compound annually would give about ₱13,382).')),
      q('When you raise the compounding frequency in the lab (yearly → monthly), the compound amount:', ['gets slightly bigger', 'gets smaller', 'stays exactly the same', 'becomes simple interest'], 0, S('**Step 1:** more frequent compounding means interest starts earning interest sooner.', '**Answer: gets slightly bigger**')),
    ],
    more: [
      q('₱2,000 at 10% compounded annually for 2 years gives:', ['₱2,420', '₱2,400', '₱2,200', '₱2,440'], 0, S('**Step 1 (year 1):** $2000\\times1.1=2200$.', '**Step 2 (year 2):** $2200\\times1.1=2420$.', '**Answer: ₱2,420**')),
      q('₱5,000 earns ₱1,500 in simple interest in 5 years. What is the annual interest rate?', ['6%', '3%', '30%', '0.6%'], 0, S('**Words:** **simple interest** uses $I=Prt$.', '**Step 1 (substitute):** $1500=5000\\times r\\times5=25000r$.', '**Step 2 (divide):** $r=\\frac{1500}{25000}=0.06$.', '**Step 3 (decimal to percent):** 6%.', '**Answer: 6%**')),
      q('How many payments are made if you pay at the end of each month for 2 years?', ['24', '2', '12', '48'], 0, S('**Step 1:** 12 months in each year.', '**Step 2:** $12\\times2=24$.', '**Answer: 24**')),
      q('The simple interest on ₱12,000 at 3% for 2 years is:', ['₱720', '₱360', '₱12,720', '₱72'], 0, S('**Step 1:** $I=12000\\times0.03\\times2$.', '**Step 2:** $12000\\times0.03=360$ per year, so $360\\times2=720$.', '**Answer: ₱720**')),
    ],
  },
}
